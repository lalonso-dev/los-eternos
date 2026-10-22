-- Migracion 2: roles (admin / musico), campos nuevos y banners en Storage.
-- Pegar completo en Supabase > SQL Editor > Run. Se puede correr mas de una vez.

------------------------------------------------------------------
-- 1. Campos de eventos
------------------------------------------------------------------
do $$
begin
  if exists (select 1 from information_schema.columns
             where table_schema = 'public' and table_name = 'eventos' and column_name = 'hora') then
    alter table public.eventos rename column hora to hora_inicio;
  end if;
  if exists (select 1 from information_schema.columns
             where table_schema = 'public' and table_name = 'eventos' and column_name = 'link') then
    alter table public.eventos rename column link to maps_url;
  end if;
end $$;

alter table public.eventos add column if not exists hora_fin time;
-- "lugar" ahora incluye la ciudad (ej. "Zacapu, Mich").
alter table public.eventos drop column if exists ciudad;

------------------------------------------------------------------
-- 2. Roles
------------------------------------------------------------------
create table if not exists public.perfiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  rol     text not null default 'musico' check (rol in ('admin', 'musico'))
);

alter table public.perfiles enable row level security;

-- Cada usuario puede leer su propio perfil (para saber que rol tiene).
drop policy if exists "perfiles_leer_propio" on public.perfiles;
create policy "perfiles_leer_propio"
  on public.perfiles for select
  to authenticated
  using (user_id = auth.uid());

-- Todo usuario nuevo nace como musico. Los admin se promueven a mano (ver abajo).
create or replace function public.crear_perfil()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.perfiles (user_id) values (new.id) on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.crear_perfil();

-- Perfiles para los usuarios que ya existian.
insert into public.perfiles (user_id)
select id from auth.users
on conflict do nothing;

create or replace function public.es_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (select 1 from public.perfiles where user_id = auth.uid() and rol = 'admin');
$$;

create or replace function public.es_integrante()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (select 1 from public.perfiles where user_id = auth.uid());
$$;

------------------------------------------------------------------
-- 3. Permisos de eventos
------------------------------------------------------------------
drop policy if exists "eventos_lectura_autenticados" on public.eventos;
drop policy if exists "eventos_insert_autenticados" on public.eventos;
drop policy if exists "eventos_update_autenticados" on public.eventos;
drop policy if exists "eventos_delete_autenticados" on public.eventos;

-- Musicos y admin ven todo (incluye borradores y datos internos).
create policy "eventos_lectura_integrantes"
  on public.eventos for select
  to authenticated
  using (public.es_integrante());

-- Solo admin escribe.
create policy "eventos_insert_admin"
  on public.eventos for insert
  to authenticated
  with check (public.es_admin());

create policy "eventos_update_admin"
  on public.eventos for update
  to authenticated
  using (public.es_admin()) with check (public.es_admin());

create policy "eventos_delete_admin"
  on public.eventos for delete
  to authenticated
  using (public.es_admin());

-- El publico (anon) solo puede pedir estas columnas: sin horarios, mapa ni notas.
revoke select on public.eventos from anon;
grant select (id, fecha, lugar, banner_url, publicado) on public.eventos to anon;

------------------------------------------------------------------
-- 4. Storage para los banners
------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('banners', 'banners', true)
on conflict (id) do nothing;

drop policy if exists "banners_lectura_publica" on storage.objects;
create policy "banners_lectura_publica"
  on storage.objects for select
  using (bucket_id = 'banners');

drop policy if exists "banners_insert_admin" on storage.objects;
create policy "banners_insert_admin"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'banners' and public.es_admin());

drop policy if exists "banners_update_admin" on storage.objects;
create policy "banners_update_admin"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'banners' and public.es_admin());

drop policy if exists "banners_delete_admin" on storage.objects;
create policy "banners_delete_admin"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'banners' and public.es_admin());

------------------------------------------------------------------
-- 5. Promover a un admin (cambiar el correo y correr SOLO esta linea).
------------------------------------------------------------------
-- update public.perfiles set rol = 'admin'
-- where user_id = (select id from auth.users where email = 'tu-correo@ejemplo.com');

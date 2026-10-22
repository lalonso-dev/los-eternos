-- Tabla de eventos de Los Eternos.
-- Pegar completo en Supabase > SQL Editor > Run.

create table if not exists public.eventos (
  id          uuid primary key default gen_random_uuid(),
  fecha       date not null,
  hora        time,
  lugar       text not null,
  ciudad      text,
  link        text,
  notas       text,
  banner_url  text,
  publicado   boolean not null default true,
  created_at  timestamptz not null default now(),
  created_by  uuid references auth.users (id) default auth.uid()
);

create index if not exists eventos_fecha_idx on public.eventos (fecha);

alter table public.eventos enable row level security;

-- Cualquiera (el sitio publico) puede leer los eventos publicados.
drop policy if exists "eventos_lectura_publica" on public.eventos;
create policy "eventos_lectura_publica"
  on public.eventos for select
  using (publicado = true);

-- Los usuarios con login pueden ver todo, incluidos borradores.
drop policy if exists "eventos_lectura_autenticados" on public.eventos;
create policy "eventos_lectura_autenticados"
  on public.eventos for select
  to authenticated
  using (true);

-- Solo usuarios con login pueden crear, editar y borrar.
drop policy if exists "eventos_insert_autenticados" on public.eventos;
create policy "eventos_insert_autenticados"
  on public.eventos for insert
  to authenticated
  with check (true);

drop policy if exists "eventos_update_autenticados" on public.eventos;
create policy "eventos_update_autenticados"
  on public.eventos for update
  to authenticated
  using (true) with check (true);

drop policy if exists "eventos_delete_autenticados" on public.eventos;
create policy "eventos_delete_autenticados"
  on public.eventos for delete
  to authenticated
  using (true);

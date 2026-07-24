export interface Contact {
  name: string;
  phone: string;
  whatsapp: string;
}

export const contacts: Contact[] = [
  { name: "Mario Carranza", phone: "524435497444", whatsapp: "524435497444" },
  { name: "Marco Antonio", phone: "524432072456", whatsapp: "524432072456" },
];

export function whatsappHref(contact: Contact) {
  return `https://wa.me/${contact.whatsapp}?text=Hola%20Los%20Eternos%2C%20quiero%20información%20sobre%20contrataciones`;
}

export function telHref(contact: Contact) {
  return `tel:+${contact.phone}`;
}

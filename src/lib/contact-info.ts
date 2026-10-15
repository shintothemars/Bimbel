type ContactInfo = {
  whatsappPhone: string | null;
  email: string | null;
  address: string | null;
  mapUrl: string | null;
  operatingHours: string | null;
};

export const contactInfo: ContactInfo = {
  whatsappPhone: null,
  email: null,
  address: null,
  mapUrl: null,
  operatingHours: null,
};

export function getWhatsAppUrl(phone: string | null) {
  if (!phone) {
    return null;
  }

  const normalizedPhone = phone.replace(/\D/g, "");

  if (
    !/^\+?[\d\s().-]+$/.test(phone) ||
    normalizedPhone.length < 8 ||
    normalizedPhone.length > 15
  ) {
    return null;
  }

  return `https://wa.me/${normalizedPhone}`;
}

export function getEmailUrl(email: string | null) {
  if (!email || !/^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)+$/i.test(email)) {
    return null;
  }

  return `mailto:${encodeURIComponent(email)}`;
}

export function getMapUrl(mapUrl: string | null) {
  if (!mapUrl) {
    return null;
  }

  try {
    const url = new URL(mapUrl);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

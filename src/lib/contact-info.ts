export const contactInfo = {
  whatsappPhone: null,
  email: null,
  address: null,
  mapUrl: null,
  operatingHours: null,
} satisfies {
  whatsappPhone: string | null;
  email: string | null;
  address: string | null;
  mapUrl: string | null;
  operatingHours: string | null;
};

export function getWhatsAppUrl(phone: string | null) {
  if (!phone) {
    return null;
  }

  const normalizedPhone = phone.replace(/\D/g, "");

  if (normalizedPhone.length < 8 || normalizedPhone.length > 15) {
    return null;
  }

  return `https://wa.me/${normalizedPhone}`;
}

export function getEmailUrl(email: string | null) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return null;
  }

  return `mailto:${email}`;
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

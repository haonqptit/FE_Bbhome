export const roomIds = ["premier", "balcony", "deluxe", "standard"] as const;
export type RoomId = (typeof roomIds)[number];

export type Room = {
  id: RoomId;
  /** decorative label shown as the ghost number on the rooms page */
  label: string;
  sizeM2: number;
  guests: number;
  /** VND / night — đã gồm thuế & phí (tax & fees included) */
  priceFrom: number;
  cover: string;
  images: string[];
};

const base = (folder: string) => ({
  cover: `/bbhomes/${folder}/cover.png`,
  images: [
    `/bbhomes/${folder}/cover.png`,
    `/bbhomes/${folder}/01.png`,
    `/bbhomes/${folder}/02.png`,
    `/bbhomes/${folder}/03.png`,
    `/bbhomes/${folder}/04.png`,
    `/bbhomes/${folder}/05.png`,
  ],
});

export const rooms: Record<RoomId, Room> = {
  premier: {
    id: "premier",
    label: "08",
    sizeM2: 32,
    guests: 3,
    priceFrom: 880000,
    ...base("premier"),
  },
  balcony: {
    id: "balcony",
    label: "04",
    sizeM2: 26,
    guests: 2,
    priceFrom: 860000,
    ...base("balcony"),
  },
  deluxe: {
    id: "deluxe",
    label: "06",
    sizeM2: 24,
    guests: 2,
    priceFrom: 830000,
    ...base("deluxe"),
  },
  standard: {
    id: "standard",
    label: "02",
    sizeM2: 20,
    guests: 2,
    priceFrom: 800000,
    ...base("standard"),
  },
};

// Signature (Premier) first → down to Standard
export const roomOrder: RoomId[] = ["premier", "balcony", "deluxe", "standard"];

export function isRoomId(value: string): value is RoomId {
  return (roomIds as readonly string[]).includes(value);
}

export function formatPrice(price: number, locale: "vi" | "ja") {
  return new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "ja-JP", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

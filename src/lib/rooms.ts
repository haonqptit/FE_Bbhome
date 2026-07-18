export const roomIds = ["studio-802", "cityview-801", "balcony-302", "cozy-301"] as const;
export type RoomId = (typeof roomIds)[number];

export type Room = {
  id: RoomId;
  number: string;
  floor: number;
  sizeM2: number;
  guests: number;
  priceFrom: number; // VND / night
  cover: string;
  images: string[];
};

const IMG = "/ImageBbhomes/ImageRoom";

export const rooms: Record<RoomId, Room> = {
  "studio-802": {
    id: "studio-802",
    number: "802",
    floor: 8,
    sizeM2: 45,
    guests: 3,
    priceFrom: 1850000,
    cover: `${IMG}/802_BBHotel_resize.jpg`,
    images: [
      `${IMG}/802_BBHotel_resize.jpg`,
      `${IMG}/802_BBHotel_02_resize.jpg`,
      `${IMG}/802_BBHotel_03_resize.jpg`,
      `${IMG}/802_BBHotel_05_resize.jpg`,
      `${IMG}/802_BBHotel_07_resize.jpg`,
      `${IMG}/802_BBHotel_09_resize.jpg`,
      `${IMG}/802_BBHotel_11_resize.jpg`,
      `${IMG}/802_BBHotel_13_resize.jpg`,
      `${IMG}/802_BBHotel_15_resize.jpg`,
      `${IMG}/802_BBHotel_16_resize.jpg`,
    ],
  },
  "cityview-801": {
    id: "cityview-801",
    number: "801",
    floor: 8,
    sizeM2: 38,
    guests: 2,
    priceFrom: 1450000,
    cover: `${IMG}/801_BBHotel_resize.jpg`,
    images: [
      `${IMG}/801_BBHotel_resize.jpg`,
      `${IMG}/801_BBHotel_02_resize.jpg`,
      `${IMG}/801_BBHotel_03_resize.jpg`,
      `${IMG}/801_BBHotel_04_resize.jpg`,
      `${IMG}/801_BBHotel_05_resize.jpg`,
      `${IMG}/801_BBHotel_06_resize.jpg`,
    ],
  },
  "balcony-302": {
    id: "balcony-302",
    number: "302",
    floor: 3,
    sizeM2: 28,
    guests: 2,
    priceFrom: 1250000,
    cover: `${IMG}/302_BBHotel_resize.jpg`,
    images: [
      `${IMG}/302_BBHotel_resize.jpg`,
      `${IMG}/302_BBHotel_02_resize.jpg`,
      `${IMG}/302_BBHotel_03_resize.jpg`,
      `${IMG}/302_BBHotel_04_resize.jpg`,
      `${IMG}/302_BBHotel_05_resize.jpg`,
      `${IMG}/302_BBHotel_06_resize.jpg`,
    ],
  },
  "cozy-301": {
    id: "cozy-301",
    number: "301",
    floor: 3,
    sizeM2: 22,
    guests: 2,
    priceFrom: 950000,
    cover: `${IMG}/301_BBHotel_resize.jpg`,
    // Mock: phòng 301 hiện chỉ có 1 ảnh thật, mượn tạm 2 ảnh 302 cùng phong cách
    images: [
      `${IMG}/301_BBHotel_resize.jpg`,
      `${IMG}/302_BBHotel_05_resize.jpg`,
      `${IMG}/302_BBHotel_03_resize.jpg`,
    ],
  },
};

export const roomOrder: RoomId[] = ["studio-802", "cityview-801", "balcony-302", "cozy-301"];

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

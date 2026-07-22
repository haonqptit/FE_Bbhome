export type GalleryCategory = "rooms" | "spaces" | "details";

export type GalleryItem = {
  src: string;
  category: GalleryCategory;
  /** aspect ratio hint for masonry: portrait renders taller */
  tall?: boolean;
};

export const galleryItems: GalleryItem[] = [
  { src: "/bbhomes/facade/night.png", category: "spaces", tall: true },
  { src: "/bbhomes/premier/cover.png", category: "rooms" },
  { src: "/bbhomes/balcony/cover.png", category: "rooms", tall: true },
  { src: "/bbhomes/amenities/kit.png", category: "details" },
  { src: "/bbhomes/deluxe/cover.png", category: "rooms" },
  { src: "/bbhomes/facade/day.png", category: "spaces", tall: true },
  { src: "/bbhomes/standard/01.png", category: "rooms", tall: true },
  { src: "/bbhomes/premier/01.png", category: "rooms" },
  { src: "/bbhomes/amenities/tray.png", category: "details" },
  { src: "/bbhomes/facade/lobby-1.png", category: "spaces" },
  { src: "/bbhomes/balcony/01.png", category: "rooms", tall: true },
  { src: "/bbhomes/deluxe/02.png", category: "rooms" },
  { src: "/bbhomes/standard/02.png", category: "details", tall: true },
  { src: "/bbhomes/premier/03.png", category: "rooms" },
  { src: "/bbhomes/facade/lobby-2.png", category: "spaces", tall: true },
  { src: "/bbhomes/balcony/03.png", category: "rooms" },
  { src: "/bbhomes/deluxe/04.png", category: "rooms", tall: true },
  { src: "/bbhomes/premier/04.png", category: "rooms" },
];

export type GalleryCategory = "rooms" | "spaces" | "izakaya";

export type GalleryItem = {
  src: string;
  category: GalleryCategory;
  /** aspect ratio hint for masonry: portrait renders taller */
  tall?: boolean;
};

const ROOM = "/ImageBbhomes/ImageRoom";
const BASEMENT = "/ImageBbhomes/ImageHotelBasement";

export const galleryItems: GalleryItem[] = [
  { src: `${ROOM}/802_BBHotel_resize.jpg`, category: "rooms", tall: true },
  { src: `${BASEMENT}/1.jpg`, category: "izakaya" },
  { src: `${ROOM}/302_BBHotel_02_resize.jpg`, category: "rooms" },
  { src: `${ROOM}/Ngoaicanh_BBHotel_resize.jpg`, category: "spaces", tall: true },
  { src: `${ROOM}/801_BBHotel_02_resize.jpg`, category: "rooms" },
  { src: `${BASEMENT}/4.jpg`, category: "izakaya", tall: true },
  { src: `${ROOM}/802_BBHotel_05_resize.jpg`, category: "rooms" },
  { src: `${ROOM}/302_BBHotel_05_resize.jpg`, category: "rooms", tall: true },
  { src: `${BASEMENT}/2.jpg`, category: "izakaya" },
  { src: `${ROOM}/Ngoaicanh_BBHotel_02_resize.jpg`, category: "spaces" },
  { src: `${ROOM}/801_BBHotel_04_resize.jpg`, category: "rooms", tall: true },
  { src: `${ROOM}/802_BBHotel_09_resize.jpg`, category: "rooms" },
  { src: `${BASEMENT}/5.jpg`, category: "izakaya" },
  { src: `${ROOM}/302_BBHotel_03_resize.jpg`, category: "rooms" },
  { src: `${ROOM}/Ngoaicanh_BBHotel_03_resize.jpg`, category: "spaces", tall: true },
  { src: `${ROOM}/801_BBHotel_06_resize.jpg`, category: "rooms" },
  { src: `${BASEMENT}/3.jpg`, category: "izakaya", tall: true },
  { src: `${ROOM}/802_BBHotel_12_resize.jpg`, category: "rooms" },
];

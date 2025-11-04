export type FlavorInfo = {
  name: string;
  color: string;
  rotation: string;
};

export type NutrientInfo = {
  label: string;
  amount: string;
};

export type TestimonialCard = {
  src: string;
  rotation: string;
  name: string;
  img: string;
  translation?: string;
};

const flavorlists: FlavorInfo[] = [
  {
    name: "El Intruso",
    color: "brown",
    rotation: "md:rotate-[-8deg] rotate-0",
  },
  {
    name: "Busca el Objeto",
    color: "red",
    rotation: "md:rotate-[8deg] rotate-0",
  },
  {
    name: "Encaja y Aprende",
    color: "blue",
    rotation: "md:rotate-[-8deg] rotate-0",
  },
  {
    name: "Sonidos y Palabras",
    color: "orange",
    rotation: "md:rotate-[8deg] rotate-0",
  },
  {
    name: "Mi Héroe del Día",
    color: "white",
    rotation: "md:rotate-[-8deg] rotate-0",
  },
  {
    name: "Baila con Ritmo",
    color: "black",
    rotation: "md:rotate-[8deg] rotate-0",
  },
];

const nutrientLists: NutrientInfo[] = [
  { label: "Ejercicios guiados", amount: "120+" },
  { label: "Plantillas IA", amount: "180+" },
  { label: "Sesiones en vivo", amount: "24/mes" },
  { label: "Voces expertas", amount: "30+" },
  { label: "Amigos seguros", amount: "∞" },
];

const cards: TestimonialCard[] = [
  {
    src: "/videos/f1.mp4",
    rotation: "rotate-z-[-10deg]",
    name: "Amelia",
    img: "/images/p1.png",
    translation: "translate-y-[-5%]",
  },
  {
    src: "/videos/f2.mp4",
    rotation: "rotate-z-[4deg]",
    name: "Nicolás",
    img: "/images/p2.png",
  },
  {
    src: "/videos/f3.mp4",
    rotation: "rotate-z-[-4deg]",
    name: "Martina",
    img: "/images/p3.png",
    translation: "translate-y-[-5%]",
  },
  {
    src: "/videos/f4.mp4",
    rotation: "rotate-z-[4deg]",
    name: "Thiago",
    img: "/images/p4.png",
    translation: "translate-y-[5%]",
  },
  {
    src: "/videos/f5.mp4",
    rotation: "rotate-z-[-10deg]",
    name: "Lucía",
    img: "/images/p5.png",
  },
  {
    src: "/videos/f6.mp4",
    rotation: "rotate-z-[4deg]",
    name: "Iván",
    img: "/images/p6.png",
    translation: "translate-y-[5%]",
  },
  {
    src: "/videos/f7.mp4",
    rotation: "rotate-z-[-3deg]",
    name: "Abril",
    img: "/images/p7.png",
    translation: "translate-y-[10%]",
  },
];

export { flavorlists, nutrientLists, cards };

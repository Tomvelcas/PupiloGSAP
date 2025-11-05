export type FlavorInfo = {
  name: string;
  color: string;
  rotation: string;
  art: {
    background: string;
    character: string;
    elements: string;
  };
  classes?: {
    container?: string;
    background?: string;
    character?: string;
    elements?: string;
  };
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
    name: "Bosque Encantado",
    color: "hongo",
    rotation: "md:rotate-[-8deg] rotate-0",
    art: {
      background: "/images/hongo-bg.svg",
      character: "/images/hongo-pj.svg",
      elements: "/images/hongo-elements.svg",
    },

  },
  {
    name: "Montaña del Dragón",
    color: "dragon",
    rotation: "md:rotate-[8deg] rotate-0",
    art: {
      background: "/images/dragon-bg.svg",
      character: "/images/dragon-pj.svg",
      elements: "/images/dragon-elements.svg",
    },
  },
  {
    name: "Imperio del Océano",
    color: "sirena",
    rotation: "md:rotate-[-8deg] rotate-0",
    art: {
      background: "/images/sirena-bg.svg",
      character: "/images/sirena-pj.svg",
      elements: "/images/sirena-elements.svg",
    },
  },
  {
    name: "Tundra del Tiempo Congelado",
    color: "pinguino",
    rotation: "md:rotate-[8deg] rotate-0",
    art: {
      background: "/images/pinguino-bg.svg",
      character: "/images/pinguino-pj.svg",
      elements: "/images/pinguino-elements.svg",
    },
  },
  {
    name: "Mi Héroe del Día",
    color: "perro",
    rotation: "md:rotate-[-8deg] rotate-0",
    art: {
      background: "/images/perro-bg.svg",
      character: "/images/perro-pj.svg",
      elements: "/images/perro-elements.svg",
    },
  },
  {
    name: "Baila con Ritmo",
    color: "black",
    rotation: "md:rotate-[8deg] rotate-0",
    art: {
      background: "/images/black-bg.svg",
      character: "/images/black-drink.webp",
      elements: "/images/black-elements.webp",
    },
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

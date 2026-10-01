import noirImage from "../assets/slides/36W-black.jpg";
import mossImage from "../assets/slides/36W-green.jpg";
import signalImage from "../assets/slides/36W-red.jpg";
import ivoryImage from "../assets/slides/36W-white.jpg";
import sandImage from "../assets/slides/46V-sand.jpg";
import stoneImage from "../assets/slides/48V-grey-white.jpg";

export const slides = Object.freeze([
  {
    id: "noir",
    sequence: "01",
    title: "Noir",
    tone: "Black",
    focus: "Contrast",
    description: "A dark colorway study used to verify card contrast, focus visibility, and edge-state clarity.",
    image: noirImage,
    alt: "Black headwear product study on a neutral background"
  },
  {
    id: "moss",
    sequence: "02",
    title: "Moss",
    tone: "Green",
    focus: "Balance",
    description: "A muted green study for checking visual balance across compact and multi-card viewport densities.",
    image: mossImage,
    alt: "Green headwear product study on a neutral background"
  },
  {
    id: "signal",
    sequence: "03",
    title: "Signal",
    tone: "Red",
    focus: "Emphasis",
    description: "A high-emphasis red study that makes active-position and neighboring-card relationships easy to inspect.",
    image: signalImage,
    alt: "Red headwear product study on a neutral background"
  },
  {
    id: "ivory",
    sequence: "04",
    title: "Ivory",
    tone: "White",
    focus: "Separation",
    description: "A light study for testing card separation, border hierarchy, and image framing against the canvas.",
    image: ivoryImage,
    alt: "White headwear product study on a neutral background"
  },
  {
    id: "sand",
    sequence: "05",
    title: "Sand",
    tone: "Sand",
    focus: "Continuity",
    description: "A warm neutral study for validating continuity when the carousel exposes partial neighboring slides.",
    image: sandImage,
    alt: "Sand-colored headwear product study on a neutral background"
  },
  {
    id: "stone",
    sequence: "06",
    title: "Stone",
    tone: "Grey / white",
    focus: "Completion",
    description: "A neutral closing study used to make the terminal navigation state visually and programmatically explicit.",
    image: stoneImage,
    alt: "Grey and white headwear product study on a neutral background"
  }
]);

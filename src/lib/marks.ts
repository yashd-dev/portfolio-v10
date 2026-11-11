import type { MarkDefinition } from "./components/mark.svelte";

export const highlightCalm: MarkDefinition = {
  layer: "behind",
  layers: [
    {
      opacity: 0.46,
      path: "M1 6 C18 3 38 5 55 4 C72 3 89 5 99 7 L97 25 C78 27 61 25 43 27 C26 28 11 26 2 24 Z",
      reveal: {
        path: "M1 16 C24 13 48 16 72 14 C84 13 93 15 100 16",
        strokeWidth: 27,
      },
      timing: { duration: 480 },
      type: "fill",
    },
  ],
  name: "highlight-calm",
  placement: { height: "96%", left: "-4%", top: "3%", width: "108%" },
  viewBox: "0 0 100 30",
};

export const circleCalm: MarkDefinition = {
  layer: "front",
  layers: [
    {
      path: "M53 3 C77 2 96 10 97 23 C99 38 75 45 49 45 C23 46 3 38 3 25 C2 11 26 4 53 3",
      strokeWidth: 2.1,
      timing: { duration: 620 },
      type: "stroke",
    },
  ],
  name: "circle-calm",
  placement: { height: "122%", left: "-8%", top: "-8%", width: "116%" },
  viewBox: "0 0 100 48",
};

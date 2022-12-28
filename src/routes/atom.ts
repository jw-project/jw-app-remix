import { atom } from "jotai";

type Color = "blue" | "red";

export const colorAtom = atom<Color>("red");

export const changeAtom = atom(null, (get, set, newValue?: never) => {
  // setTimeout(() => {
  //   console.log("settimeout");
  //   set(colorAtom, "blue");
  // }, 3000);
});

export type DataFe = { a: string; b: string };

export const dataAtom = atom<DataFe | undefined>(undefined);

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const loadDataAtom = atom(null, async (get, set) => {
  await timeout(3000);

  set(dataAtom, { a: "alguma coisa a", b: "alguma outra coisa b" });
});

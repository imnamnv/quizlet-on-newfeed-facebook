import { Category } from "../models";

export function shuffleAray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function convertToCategoryList(
  name: string,
  data: string | ArrayBuffer
) {
  const result: Category = {
    name,
    data: [],
  };
  if (typeof data === "string") {
    const newArray = data.split(/\r\n/);
    for (let i = 0; i < newArray.length; i++) {
      const element = newArray[i];
      const [front, back] = element.split("|");
      result.data.push({
        id: i,
        back: back || "Wrong format file",
        front: front || "Wrong format file",
      });
    }
  }
  return result;
}

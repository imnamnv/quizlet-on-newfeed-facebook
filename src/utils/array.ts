import { Category } from "../models";
import { v4 as uuidv4 } from "uuid";

export function shuffleAray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function convertToCategoryList(
  name: string,
  data: string | ArrayBuffer,
  termAndDefinitionValue: string,
  rowsValue: string
) {
  const result: Category = {
    name: name || "New Category",
    data: [],
  };
  if (typeof data === "string") {
    const regexTermAndDefinition = new RegExp(
      `${termAndDefinitionValue.replace(/\n?^\t/g, "\r\n")}`
    );

    const regexRows = new RegExp(`${rowsValue.replace(/\n^\t?/g, "\r\n")}`);

    const newArray = data.split(regexRows);

    for (let i = 0; i < newArray.length; i++) {
      const element = newArray[i];
      if (element) {
        const [front, back] = element.split(regexTermAndDefinition);
        result.data.push({
          id: uuidv4(),
          back: back || "Wrong format file",
          front: front || "Wrong format file",
        });
      }
    }
  }

  return result;
}

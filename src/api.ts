import { bookValues } from "./interface.js";

const apiUrl: string =
  " https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";

let savedData: Promise<bookValues[]>;
/*Function that makes an api call to get the relevant data*/
async function getApi(apiUrl: string): Promise<bookValues[] | undefined> {
  try {
    const response: Response = await fetch(apiUrl);
    if (!response) {
      throw new Error("Error");
    }
    const data: Promise<bookValues[]> = response.json();
    savedData = data;
    return data;
  } catch {
    console.log("Could not make api call.");
  }
}

export { getApi, apiUrl };

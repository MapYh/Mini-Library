/*-----------Imports--------------*/
//Imports the interface from interface file to this file.
import { bookValues } from "./interface.js";
import { getApi, apiUrl } from "./api.js";

/*-----------Variables--------------*/

let mainTopSectionForBooks: HTMLElement =
  document.querySelector(".main__books");
let bookCard: HTMLElement;
let bookTitle: HTMLElement;
let bookAuthor: HTMLElement;

/*-----------Functions--------------*/

/*
Function that creates elements for the front covers for the books,
and the title and author.*/
async function createElementsForBook(): Promise<{}> {
  let data: bookValues[] = await getApi(apiUrl);
  console.log(data);
  for (let i = 0; i < Object.keys(data).length; i++) {
    bookCard = document.createElement("article");
    bookTitle = document.createElement("h2");
    bookAuthor = document.createElement("figcaption");
    bookCard.classList.add("main__book");
    bookCard.classList.add("main__book--styling");
    bookCard.append(bookTitle);
    bookCard.append(bookAuthor);
    mainTopSectionForBooks.append(bookCard);
    getInformationForBook(i, data);
  }
  return data;
}

/*A function that gets the information to a book*/
function getInformationForBook(index: number, data: bookValues[]) {
  bookCard.style.background = data[index].color;
  bookTitle.textContent = data[index].title;
  bookAuthor.textContent = data[index].author;
}

createElementsForBook();

/*-----------Imports--------------*/
//Imports the interface from interface file to this file.
import { bookValues } from "./interface.js";
import { getApi, apiUrl } from "./api.js";

/*-----------Variables--------------*/
let showMoreInformationpage = document.querySelectorAll(".hide");
let backbutton = document.querySelector(".information-page__closingX");
let informationWrapper = document.querySelector(".information-wrapper");
let mainSectionForBooks: HTMLElement = document.querySelector(".main__books");
let bookCard: HTMLElement;
let bookTitle: HTMLElement;
let bookAuthor: HTMLElement;

/*-----------Functions--------------*/

/*
Function that creates elements for the front covers for the books,
and the title and author.*/
async function createElementsForBook(): Promise<bookValues[]> {
  let data: bookValues[] = await getApi(apiUrl);
  console.log("createfunc", data);
  for (let i = 0; i < Object.keys(data).length; i++) {
    bookCard = document.createElement("article");
    bookTitle = document.createElement("h2");
    bookAuthor = document.createElement("figcaption");
    bookCard.classList.add("main__book");
    bookCard.classList.add("main__book--styling");
    bookCard.append(bookTitle);
    bookCard.append(bookAuthor);
    mainSectionForBooks.append(bookCard);
    addEvents(i, data);
    getInformationForBook(i, data);
  }
  return data;
}

/*A function that gets the information to a book*/
function getInformationForBook(index: number, data: bookValues[]): void {
  bookCard.style.background = data[index].color;
  bookTitle.textContent = data[index].title;
  bookAuthor.textContent = data[index].author;
}
//Function to add events to all the book covers on the first page.
function addEvents(i: number, data: bookValues[]): void {
  bookCard.addEventListener("click", () => {
    showMoreInformation(i, data);
  });
}

function showMoreInformation(index: number, data: bookValues[]) {
  showMoreInformationpage[0].classList.toggle("hide");
  informationWrapper.classList.toggle("hide");
  console.log(showMoreInformationpage);
  bookCard.style.background = data[index].color;
  bookTitle.textContent = data[index].title;
  bookAuthor.textContent = data[index].author;

  /*  bookPlot = data[index].plot;

  bookAudience = data[index].audience;
  bookyear = data[index].year;
  bookPages = data[index].pages;
  bookPublisher = data[index].publisher; */
}
//Event listener to the back button on the information page.
backbutton.addEventListener("click", () => {
  closeInformationPage();
});
//Function that hides the book covers an the search field
//when the information about a book is rendered on the page.
function closeInformationPage() {
  showMoreInformationpage[0].classList.toggle("hide");
  informationWrapper.classList.toggle("hide");
}

createElementsForBook();

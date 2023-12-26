import { getApi, apiUrl } from "./api.js";
/*-----------Variables--------------*/
let mainSectionForBooks = document.querySelector(".main__books");
let bookCard;
let bookTitle;
let bookAuthor;
/*-----------Functions--------------*/
/*
Function that creates elements for the front covers for the books,
and the title and author.*/
async function createElementsForBook() {
    let data = await getApi(apiUrl);
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
        bookCard.addEventListener("click", () => {
            console.log(true);
        });
        getInformationForBook(i, data);
    }
    return data;
}
/*A function that gets the information to a book*/
function getInformationForBook(index, data) {
    bookCard.style.background = data[index].color;
    bookTitle.textContent = data[index].title;
    bookAuthor.textContent = data[index].author;
}
createElementsForBook();

import { getApi, apiUrl } from "./api.js";
/*-----------Variables--------------*/
let showMoreInformationpage = document.querySelectorAll(".hide");
let backbutton = document.querySelector(".information-page__closingX");
let frontPageWrapper = document.querySelector(".frontPage-wrapper");
let mainSectionForBooks = document.querySelector(".main__books");
let bookElements;
let bookCard;
let bookTitle;
let bookAuthor;
let BookCardInfo;
let BookTitleInfo;
let BookTitleInfoBody;
let BookTitleInfofigcaptionBody;
let BookAuthorInfo;
let BookPlotInfo;
let BookYearInfo;
let BookAudienceInfo;
let BookPagesnfo;
let BookPublisherInfo;
//Array to search for a book by title.
let arrayOfBookNames = [];
/*-----------Functions--------------*/
/*
Function that creates elements for the front covers for the books,
and the title and author.*/
async function createElementsForBook() {
    //Get data from api.
    let data = await getApi(apiUrl);
    //Need the data for the length, how many elements are to be created.
    for (let i = 0; i < Object.keys(data).length; i++) {
        //Create elements for the first page book covers.
        bookCard = document.createElement("article");
        bookTitle = document.createElement("h2");
        bookAuthor = document.createElement("figcaption");
        bookCard.classList.add("main__book");
        bookCard.classList.add("main__book--styling");
        /* bookCard.classList.add("main__book-line"); */
        bookCard.append(bookTitle);
        bookCard.append(bookAuthor);
        mainSectionForBooks.append(bookCard);
        addEvents(i, data);
        getInformationForBook(i, data);
    }
    bookElements = document.querySelectorAll(".main__book");
    //return data for the next function.
    return data;
}
/*A function that gets the information to a book*/
function getInformationForBook(index, data) {
    bookCard.setAttribute("data-title", data[index].title);
    bookCard.style.background = data[index].color;
    bookTitle.textContent = data[index].title;
    bookAuthor.textContent = data[index].author;
    //adds the titles to ann array.
    arrayOfBookNames.push(data[index].title);
}
//Function to add events to all the book covers on the first page.
function addEvents(i, data) {
    bookCard.addEventListener("click", () => {
        showMoreInformation(i, data);
    });
}
function showMoreInformation(index, data) {
    //Change the background color for infopage and hide the front page and show the information page.
    document.body.style.background = "#222222";
    showMoreInformationpage[0].classList.toggle("hide");
    frontPageWrapper.classList.toggle("hide");
    //fill in the information for the book elements.
    bookCard.style.background = data[index].color;
    bookTitle.textContent = data[index].title;
    bookAuthor.textContent = data[index].author;
    //find all the places where the information needs to be placed.
    BookCardInfo = document.querySelector(".information-page__bookCover");
    BookTitleInfo = document.querySelector(".title");
    BookAuthorInfo = document.querySelector(".bookAuthor");
    BookPlotInfo = document.querySelector(".plot");
    BookPagesnfo = document.querySelector(".pages");
    BookYearInfo = document.querySelector(".year");
    BookPublisherInfo = document.querySelector(".publisher");
    BookTitleInfoBody = document.querySelector(".title-body");
    BookTitleInfofigcaptionBody = document.querySelector(".figcaption-body");
    BookAudienceInfo = document.querySelector(".audience");
    //Change the cursor to auto so that it dosen't seem that you can click on the book cover.
    BookCardInfo.style.cursor = "auto";
    //Write all the information to the page.
    BookCardInfo.style.background = data[index].color;
    BookTitleInfo.textContent = data[index].title;
    BookTitleInfoBody.textContent = data[index].title;
    BookTitleInfofigcaptionBody.textContent = `by ${data[index].author}`;
    BookAuthorInfo.textContent = data[index].author;
    BookPlotInfo.textContent = data[index].plot;
    BookYearInfo.textContent = `First published: ${data[index].year} `;
    BookAudienceInfo.textContent = `Audience: ${data[index].audience}`;
    BookPagesnfo.textContent = `Pages: ${data[index].pages}`;
    BookPublisherInfo.textContent = `Publisher: ${data[index].publisher} `;
}
//Event listener to the back button on the information page.
backbutton.addEventListener("click", () => {
    closeInformationPage();
});
//Function that hides the book covers and the search field
//when the information about a book is rendered on the page.
function closeInformationPage() {
    //Show the front page again and hide the information page when clicking on the backbutton.
    showMoreInformationpage[0].classList.toggle("hide");
    frontPageWrapper.classList.toggle("hide");
    //Change the background color back to white.
    document.body.style.background = "white";
}
//The code below is used to search for a book using the search field.
//The input from the search field.
let search = document.querySelector("#search-field");
search.addEventListener("input", function () {
    //splits the input into individual words or letter.
    let s = search.value.split(/\s+/);
    //Compares the inpu to a array with all the title of the books and shows the
    // books that match the search term the best.
    for (let i = 0; i < arrayOfBookNames.length; i++) {
        if (!s.every((x) => arrayOfBookNames[i].toLocaleLowerCase().includes(x))) {
            console.log(bookElements[i]);
            //Disables the display to the books that dont match the search term.
            bookElements[i + 1].style.display = "none";
        }
    }
});
createElementsForBook();

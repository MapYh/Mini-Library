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
        bookCard.append(bookTitle);
        bookCard.append(bookAuthor);
        mainSectionForBooks.append(bookCard);
        addEvents(i, data);
        getInformationForBook(i, data);
    }
    bookElements = document.querySelectorAll(".main__book");
    console.log("1", bookElements);
    //return data for the next function.
    return data;
}
/*A function that gets the information to a book*/
function getInformationForBook(index, data) {
    bookCard.setAttribute("data-title", data[index].title);
    bookCard.style.background = data[index].color;
    bookTitle.textContent = data[index].title;
    bookAuthor.textContent = data[index].author;
    //Pushar in titlarna till en array.
    arrayOfBookNames.push(data[index].title);
}
console.log(arrayOfBookNames);
//Function to add events to all the book covers on the first page.
function addEvents(i, data) {
    bookCard.addEventListener("click", () => {
        showMoreInformation(i, data);
    });
}
function showMoreInformation(index, data) {
    //Change the background color for infopage and hide the front page and show the information page.
    document.body.style.background = "#3C3737";
    showMoreInformationpage[0].classList.toggle("hide");
    frontPageWrapper.classList.toggle("hide");
    //fill in the information for the book elements.
    bookCard.style.background = data[index].color;
    bookTitle.textContent = data[index].title;
    bookAuthor.textContent = data[index].author;
    BookCardInfo = document.querySelector(".information-page__bookCover");
    BookTitleInfo = document.querySelector(".title");
    BookAuthorInfo = document.querySelector(".bookAuthor");
    BookPlotInfo = document.querySelector(".plot");
    BookYearInfo = document.querySelector(".year");
    BookAudienceInfo = document.querySelector(".pages");
    BookPagesnfo = document.querySelector(".year");
    BookPublisherInfo = document.querySelector(".publisher");
    BookTitleInfoBody = document.querySelector(".title-body");
    BookTitleInfofigcaptionBody = document.querySelector(".figcaption-body");
    BookCardInfo.style.background = data[index].color;
    BookTitleInfo.textContent = data[index].title;
    BookTitleInfoBody.textContent = data[index].title;
    BookTitleInfofigcaptionBody.textContent = data[index].author;
    BookAuthorInfo.textContent = data[index].author;
    BookPlotInfo.textContent = data[index].plot;
    BookYearInfo.textContent = data[index].year;
    BookAudienceInfo.textContent = data[index].audience;
    BookPagesnfo.textContent = data[index].pages;
    BookPublisherInfo.textContent = data[index].publisher;
}
//Event listener to the back button on the information page.
backbutton.addEventListener("click", () => {
    closeInformationPage();
});
//Function that hides the book covers an the search field
//when the information about a book is rendered on the page.
function closeInformationPage() {
    //Show the front page again and hide the information page when clicking on the backbutton.
    showMoreInformationpage[0].classList.toggle("hide");
    frontPageWrapper.classList.toggle("hide");
    //Change the background color back to white.
    document.body.style.background = "white";
    /*  for (let i = 0; i < bookElements.length; i++) {
      bookElements[i + 1].style.display;
    } */
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
        else {
            console.log(true);
        }
    }
});
createElementsForBook();

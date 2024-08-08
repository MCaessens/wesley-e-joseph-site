"use strict";

var bookContainer;
var bookTemplate;

const init = () => {
    bookContainer = document.getElementById("book-container");
    bookTemplate = document.getElementById("book-template");
    createBookElements();
};

window.addEventListener("load", init);

const createBookElements = () => {
    books.forEach((book) => {
        const cardBody = bookTemplate.content.querySelector("div.card-body");
        cardBody.innerHTML = "";

        const titleEl = Object.assign(document.createElement("h5"), {
            className: "card-title",
            textContent: book.title,
        });
        cardBody.append(titleEl);

        const cardImage = bookTemplate.content.querySelector("img.card-img-top");
        cardImage.src = `./images/${book.imageName}`;

        book.description.forEach((bookDescription) => {
            const descriptionEl = document.createElement("p");
            descriptionEl.className = "card-text";
            descriptionEl.textContent = bookDescription;

            cardBody.append(descriptionEl);
        });

        const clone = bookTemplate.content.cloneNode(true);
        bookContainer.append(clone);
    });
};

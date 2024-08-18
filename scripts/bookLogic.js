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

        const cardImageLink = bookTemplate.content.querySelector("a.book");
        if (book.imageLinkTo) {
            cardImageLink.href = book.imageLinkTo;
        } else {
            cardImageLink.classList.add("disabled-link");
        }

        const cardImage = bookTemplate.content.querySelector("img.card-img-top");
        cardImage.src = `./images/${book.imageName}`;
        cardImage.alt = `Covert art for ${book.title}`;

        const tagContainer = Object.assign(document.createElement("p"), { className: "card-text" });
        book.tags.forEach((tag, index) => {
            var className = "badge rounded-pill bg-secondary px-3";
            if (index !== 0) className += " mx-1";
            const tagEl = Object.assign(document.createElement("span"), {
                className,
            });
            tagEl.textContent = tag;
            tagContainer.append(tagEl);
        });
        cardBody.append(tagContainer);

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

"use strict";

var newsLetterForm;
var newsLetterFormBody;
var thankYouForSigningUpLabel;
var submitSpinner;

var emailInput;
var hcaptchaResponseInput;

const submitForm = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isValid = newsLetterForm.checkValidity();
    newsLetterForm.classList.add("was-validated");
    if (!isValid) return;

    submitSpinner.hidden = false;
    const captchaKey = hcaptchaResponseInput.value;
    const email = emailInput.value;

    await fetch("http://localhost:7071/api/sign-up", {
        method: "POST",
        body: JSON.stringify({ email, captchaKey }),
    })
        .finally((_) => (submitSpinner.hidden = true))
        .then((_) => {
            newsLetterFormBody.hidden = true;
            thankYouForSigningUpLabel.hidden = false;
        });
};

const init = () => {
    newsLetterForm = document.getElementById("sign-up-form");
    newsLetterForm.addEventListener("submit", submitForm);
    newsLetterFormBody = document.getElementById("sign-up-form-body");

    emailInput = document.getElementById("e-mail-input");
    hcaptchaResponseInput = document.getElementById("hcaptcha-input");

    thankYouForSigningUpLabel = document.getElementById("thank-you-for-signing-up");
    submitSpinner = document.getElementById("submit-spinner");
};

function hcaptchaCallback(callback) {
    hcaptchaResponseInput.value = callback;
}

window.addEventListener("load", init);

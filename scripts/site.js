"use strict";

var newsLetterForm;
var newsLetterFormBody;
var thankYouForSigningUpLabel;
var somethingWentWrongLabel;
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

    await fetch("https://wesley-author-site.azurewebsites.net/api/sign-up", {
        method: "POST",
        body: JSON.stringify({ email, captchaKey }),
    })
        .then((resp) => {
            if (resp.status !== 200) {
                somethingWentWrongLabel.hidden = false;
                thankYouForSigningUpLabel.hidden = true;
                return;
            }
            newsLetterFormBody.hidden = true;
            thankYouForSigningUpLabel.hidden = false;
        })
        .catch((_) => {
            somethingWentWrongLabel.hidden = false;
            thankYouForSigningUpLabel.hidden = true;
        })
        .finally((_) => (submitSpinner.hidden = true));
};

const init = () => {
    newsLetterForm = document.getElementById("sign-up-form");
    newsLetterForm.addEventListener("submit", submitForm);
    newsLetterFormBody = document.getElementById("sign-up-form-body");

    emailInput = document.getElementById("e-mail-input");
    hcaptchaResponseInput = document.getElementById("hcaptcha-input");

    thankYouForSigningUpLabel = document.getElementById("thank-you-for-signing-up");
    somethingWentWrongLabel = document.getElementById("something-went-wrong");
    submitSpinner = document.getElementById("submit-spinner");
};

function hcaptchaCallback(callback) {
    hcaptchaResponseInput.value = callback;
}

window.addEventListener("load", init);

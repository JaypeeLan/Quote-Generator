"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let quotes = [];
// loading
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
};
// finish loading
const complete = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
};
// generate new quote
const newQuote = () => {
    loading();
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    //   console.log(quote);
    if (!quote.author) {
        authorText.textContent = "unknown";
    }
    else {
        authorText.textContent = quote.author;
    }
    //   --------------------
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    }
    else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = quote.text;
    complete();
};
// Get Quotes
function getQuotes() {
    return __awaiter(this, void 0, void 0, function* () {
        loading();
        const apiUrl = "https://type.fit/api/quotes";
        try {
            const res = yield fetch(apiUrl);
            quotes = yield (res === null || res === void 0 ? void 0 : res.json());
            newQuote();
        }
        catch (error) {
            quoteText.textContent = `Ooopps... Please try again.`;
        }
    });
}
// tweet quote
const tweetQuote = () => {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, "_blank");
};
// --------------------- EVENT LISTNERS
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
loading();
getQuotes();

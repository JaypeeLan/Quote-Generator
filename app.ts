const quoteContainer = document.getElementById(
  "quote-container"
)! as HTMLElement;
const quoteText = document.getElementById("quote")! as HTMLElement;
const authorText = document.getElementById("author")! as HTMLElement;
const twitterBtn = document.getElementById("twitter")! as HTMLButtonElement;
const newQuoteBtn = document.getElementById("new-quote")! as HTMLButtonElement;
const loader = document.getElementById("loader")! as HTMLElement;

let quotes: {}[] = [];

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
  type Quote = {
    [key: string]: string;
  };
  const quote: Quote = quotes[Math.floor(Math.random() * quotes.length)];
  //   console.log(quote);
  if (!quote.author) {
    authorText.textContent = "unknown";
  } else {
    authorText.textContent = quote.author;
  }

  //   --------------------
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  complete();
};

// Get Quotes
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const res = await fetch(apiUrl);
    quotes = await res?.json();
    newQuote();
  } catch (error) {
    quoteText.textContent = `Ooopps... Please try again.`;
  }
}

// tweet quote
const tweetQuote = (): void => {
  const twitterURL: string = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, "_blank");
};

// --------------------- EVENT LISTNERS
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

loading();
getQuotes();

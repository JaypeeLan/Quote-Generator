let quotes = [];

// Get Quotes
async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const res = await fetch(apiUrl);
    quotes = await res.json();
    console.log(quotes);
  } catch (error) {}
}

getQuotes();

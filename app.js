const fs = require('fs').promises;

async function readData() {
    try {
        const data = await fs.readFile('data.json', 'utf-8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        console.error(error); // Handle errors
    }
}

async function toUSD(amount, fromKey) {
    try {
            const dataObject = await readData();
            const exchangeRate = dataObject[fromKey].rate; // Gets exchange rate for the key that was passed in
            const usd = amount / exchangeRate; // Calculates the USD equivilant
            return usd;
        } catch (error) {
            console.error(error); // Handle errors
    }
}

async function fromUSD(usd, toKey) {
    try {
            const dataObject = await readData();
            const exchangeRate = dataObject[toKey].rate; // Gets the exchange rate for the current currency
            const otherCurrency = usd * exchangeRate; // Converts USD to the desired currency.
            return otherCurrency;
        } catch (error) {
            console.error(error); // Handle errors
    }
}

async function main() {
    try {
        const dataObject = await readData();
        
    } catch (error) {
        console.error(error); // Handle errors
    }
}

main(); // Call the main async function

// How to read in each Currency name and exchange rate.
// for (const key in dataObject) {
//     const country = dataObject[key];
//     console.log(`Currency Name: ${country.name} - Exchange Rate: ${country.rate}`); // Print each name and exchange rate of each country.
// }
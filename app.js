// Create Global Variables
let data = '';

// Creates a object of the JSON data
async function readData() {
    try {
        const response = await fetch('https://www.floatrates.com/daily/usd.json');
        const data = await response.text();
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        console.error('Error fetching exchange rates:', error); // Handle errors
    }
}

// Adds the object as options in the HTML using DOM.
function createOptions (data, targetID) {
    // iterate through each object populating the options in the DOM.
    for (const key in data) {
        // Get the option value and name
        const value = key;
        const name = data[key].name;
        // Create object and add values.
        newOption = document.createElement('option');
        newOption.text = name;
        newOption.value = value;
        // Target the DOM and append the new option to the targeted list
        const options = document.getElementById(`${targetID}`);
        options.appendChild(newOption);
    }
};

// // Takes the input and converts it to USD
function inputCurrency(qty, key, data) {
    try {
            if (key == 'usd') {
                return qty;
            } else {
                const exchangeRate = data[key].inverseRate; // Gets exchange rate for the key that was passed in
                const usd = qty * exchangeRate; // Calculates the USD equivilant
                return usd;
            }
        } catch (error) {
            console.error(error); // Handle errors
    }
}

function outputCurrency(usd, key, data) {
    try {
            const exchangeRate = data[key].rate; // Gets the exchange rate for the current currency
            const otherCurrency = usd * exchangeRate; // Converts USD to the desired currency.
            return otherCurrency;
        } catch (error) {
            console.error(error); // Handle errors
    }
}

function convertCurrency (event) {
    if (event.target === input) {
        // Get the current key and the desired key.
        let inputKey = document.getElementById('input').selectedOption.value;
        let outputKey = document.getElementById('output').selectedOption.value;
        // Get the qty and rate of the current key.
        let qty = event.target.text;
        // Get the current rate and the inverse rate of the desired currency.
        let rate = data[inputKey].rate
        let inverseRate = data[outputKey].inverseRate
        // Get the location to put the converted value.
        let target = document.getElementById('out');
        if (inputKey == 'usd') {
            target.text = qty;
        } else {
            let usd = qty * rate;
            target.text = usd * inverseRate;
        }
    } else if (event.target == output) {

    };
};

async function main() {
    try {
        // Call in and store the data a sigle time.
        data = await readData();
        // Create the input and output options.
        createOptions(data, "input");
        createOptions(data, "output");
    } catch (error) {
        console.error(error); // Handle errors
    }
}

// Call the main async function
main();

let input = document.getElementById('in');
let output = document.getElementById('out');

// Event Listeners
input.addEventListener('change', convertCurrency)
output.addEventListener('change', convertCurrency)
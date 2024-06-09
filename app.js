// Create Global Variables
let data;
let input = document.getElementById('in');
let output = document.getElementById('out');

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

function convertCurrency (event) {
    if (event.target === input) {
        // Get the current key and the desired key and target.
        let inputKey = document.getElementById('input').value;
        let outputKey = document.getElementById('output').value;
        let target = document.getElementById('out');

        // Get the qty and rate of the current key.
        let qty = event.target.value;

        // Get the current rate and the inverse rate of the desired currency.
        let rate = data[inputKey].rate;
        let inverseRate = data[outputKey].inverseRate;
        let usd = qty * rate;
        let endCurrency = (usd * inverseRate);

        // Update the target with the converted value.
        if (outputKey == 'usd') {
            target.value = usd.toFixed(2);
        } else {
            target.value = endCurrency.toFixed(2);
        }
    } else if (event.target == output) {
        // Get the current key and the desired key and target
        let inputKey = document.getElementById('output').value;
        let outputKey = document.getElementById('input').value;
        let target = document.getElementById('in');

        // Get the qty and rate of the current key.
        let qty = event.target.value;
    
        // Get the current rate and the inverse rate of the desired currency.
        let rate = data[inputKey].rate;
        let inverseRate = data[outputKey].inverseRate;
        let usd = qty * rate;
        let endCurrency = (usd * inverseRate);

        // Update the target with the converted value.
        if (inputKey == 'usd') {
            target.value = usd.toFixed(2);
        } else {
            target.value = endCurrency.toFixed(2);
        }
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

// Event Listeners
input.addEventListener('keyup', convertCurrency)
output.addEventListener('keyup', convertCurrency)
/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let apiKey = "8ea681a22e60ea9c3d7a2884e7afc995"
let countryCode = "us"
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip="


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateEntry);

/* Function called by event listener */
function generateEntry() {
    let newZip = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;

    getWeather(baseURL, newZip, apiKey) 

        .then((data) => {
            console.log('date:',d);
            console.log('temp:',data.main.temp);
            console.log('feelings:',feelings);

            postData('/addData', { date:d, temp: data.main.temp, feelings: feelings})
            updateUI()
        })

}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, key) => { 
    let res = await fetch(`${baseURL}${zip},${countryCode}&appid=${key}`);
    try {
        let data = await res.json();
        return data;
    } catch(error) {
        console.log("error",error);
    }

}


/* Function to POST data */
const postData = async (url = '', data = {}) => {
    console.log(data);
    let response = await fetch(url, {
        method:'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    try {
        let newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}



/* Function to GET Project Data */

const updateUI = async () => {
    let request = await fetch('/allData');
    try {
        let allData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData[0].date}`;
        document.getElementById('temp').innerHTML = `Temp: ${allData[0].temp}`;
        document.getElementById('content').innerHTML = `I feel: ${allData[0].feelings}`
    } catch(error) {
        console.log('error',error);
    }
};

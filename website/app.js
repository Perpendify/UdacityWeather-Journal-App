/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let apiKey = "8ea681a22e60ea9c3d7a2884e7afc995"
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateEntry);

/* Function called by event listener */
function generateEntry() {
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(baseURL, newZip, apiKey) 

        .then(function(data){
            console.log('date:',d);
            console.log('temp:',data.main.temp);
            console.log('content:',feelings);

            postData('/addData', { date:d, temp: data.main.temp, content: feelings})
        })

}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, key) => { 
    const res = await fetch(`${baseURL}${zip},us&appid=${key}`);
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("error",error);
    }

}


/* Function to POST data */
const postData = async ( url = '', data = {date, temp, content}) => {
    console.log(data);
    const response = await fetch(url, {
        method:'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}



/* Function to GET Project Data */

const updateUI = async () => {
    const request = await fetch('/allData');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData[0].date}`;
        document.getElementById('temp').innerHTML = `Temp: ${allData[0].temp}`;
        document.getElementById('content').innerHTML = `I feel: ${allData[0].feelings}`
    } catch(error) {
        console.log('error',error);
    }
};

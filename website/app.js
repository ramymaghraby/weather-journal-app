/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// Open Weather API Key
const APIKey = '&appid=4d76bfe471f7932b03422a9d592af47c&units=metric';

// Open Weather Base URL
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='

// Async function to get weather data from Open Weather API
const getWeather = async (baseURL, zipCode, APIKey)=>{
    const res = await fetch(baseURL+zipCode+APIKey)
    try {
        const retreivedWeather = await res.json();
        return retreivedWeather;
    } catch (err){
        console.log(err);
    }
}

// Async function to post data to server
const postData = async (url='', data={}) =>{
    const dataResponse = fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}

// Async function to get data from server
const getSavedDataFromServer = async (url='')=>{
    const res = await fetch(url)
    try{
        const dataFromServer = res.json()
        return dataFromServer
    } catch(err) {
        console.log(err)
    }
}

// Main Fuction to get data from Open Weather API
// Send data to backend server
// Fetch data back from server
// Update UI inside div with id entryHolder
function postWeatherAndFeelingsAndUpdateUI() {
    const zipCode = document.getElementById("zip").value;
    if (!zipCode) {
        alert("Please enter a zip code")
    } else {
       getWeather(baseURL,zipCode,APIKey).then(weatherData=>{
        const feelings = document.getElementById('feelings').value;
        const tempreature = weatherData.main.temp
        const data = {
            date: newDate,
            feels: feelings,
            temp: tempreature
        }
        postData('/all', data);
        getSavedDataFromServer('all').then((data) => {
            document.getElementById('date').innerText = 'Date:' + data.date;
            document.getElementById('temp').innerText = 'Temp:' + data.temp + '°C';
            document.getElementById('content').innerText = 'Your Feeling:' + data.feels;
        })
    })
}  
    }
   
// Add Event listener to Generate button
document.getElementById('generate').addEventListener('click', postWeatherAndFeelingsAndUpdateUI);
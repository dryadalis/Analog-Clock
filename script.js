
// Geting the current time
let displayTime = () => {
let now = new Date();
let h = now.getHours();
let m = now.getMinutes();
let s = now.getSeconds();

let timeString = formatHour(h) + ":" + padZero(m) + ":" + padZero(s) + getTimePeriod(h);
document.querySelector("#current-time").innerHTML = timeString;


// Analog Clock
let canvas = document.querySelector("#clock");
let context = canvas.getContext("2d");

let clockRadius = 100;

// Make sure the clock is centered in the canvas
let clockX = canvas.width / 2;
let clockY = canvas.height / 2;

// <--- put math here later;

// this line should be 10 px thick and red
context.lineWidth = 10;
context.strokeStyle = "#DD0000";

context.beginPath();
context.moveTo(clockX, clockY); // start at the center
context.lineTo(clockX + clockRadius, clockY); // Draw to the right
context.stroke();

// this line should be 5 px thick and black
context.lineWidth = 5;
context.strokeStyle = "#000000"

context.beginPath();
context.moveTo(clockX, clockY);
context.lineTo(clockX, clockY - clockRadius);
context.stroke();

};

document.addEventListener('DOMContentLoaded', displayTime);

// Padding the zero to the beginning of the number if needed
let padZero = (num) => {
    if (num < 10) {
        return "0" + String(num);
    } else {
        return String(num);
    }
}; 

// Converting hour to the 12-hours time

let formatHour = (h) => {
    let hour = h % 12;

    if (hour === 0) {
        hour = 12;
    }
    return String(hour)
}

// Use AM or PM :
getTimePeriod = (h) => {
    return (h < 12) ? " AM" : " PM";
}


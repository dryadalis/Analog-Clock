
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

// How big the clock is 
let clockRadius = 125;

// Make sure the clock is centered in the canvas
let clockX = canvas.width / 2;
let clockY = canvas.height / 2;


Math.TAU = 2 * Math.PI;

let drawArm = (progress, armThickness, armLength, armColor) => {
    let armRadians = (Math.TAU * progress) - (Math.TAU/4);

    let targetX = clockX + Math.cos(armRadians) * (armLength * clockRadius);
    let targetY = clockY + Math.sin(armRadians) * (armLength * clockRadius);

// style
context.lineWidth = armThickness;
context.strokeStyle = armColor;

context.beginPath();
context.moveTo(clockX, clockY); // start at the center
context.lineTo(targetX, targetY); // Draw to the right
context.stroke();
     }

context.clearRect(0, 0, canvas.width, canvas.height); // Remove old lines;

drawArm(h / 12, 10, 0.50, "#000000"); // Hours
drawArm(m / 60, 4, 0.75, "#000000"); // Minutes
drawArm(s / 60, 2, 1.00, "#FF0000"); // Seconds
};

let setTimer = () => {
    setInterval(displayTime, 1000);
    displayTime();
}

document.addEventListener('DOMContentLoaded', setTimer);


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

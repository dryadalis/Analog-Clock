
let setTimer = () => {
    setInterval(displayTime, 1000);
    displayTime();
}

document.addEventListener('DOMContentLoaded', setTimer);

// Geting the current time
let displayTime = () => {
let now = new Date();
let h = now.getHours() % 12;
let m = now.getMinutes();
let s = now.getSeconds();

// Digital clock
let timeString = formatHour(h) + ":" + padZero(m) + ":" + padZero(s) + getTimePeriod(h);
document.querySelector("#current-time").innerHTML = timeString;



// Analog Clock
let canvas = document.getElementById("clock");
let context = canvas.getContext("2d");

// How big the clock is 
let clockRadius = 100;

// Make sure the clock is centered in the canvas
let clockX = canvas.width / 2;
let clockY = canvas.height / 2;


Math.TAU = 2 * Math.PI;
context.clearRect(0, 0, canvas.width, canvas.height); // Remove old lines;

// Draw background:
    for (let i = 0; i < 12; i++) {

        let innerDist = (i % 3) ? 1.0 : 0.80;
        let outerDist = (i % 3) ? 0.80 : 1.0;
        context.lineWidth = (i % 3) ? 4 : 8;
        context.strokeStyle = '#999999';

        let armRadians = (Math.TAU * (i / 12)) - (Math.TAU / 4);
        let x1 = clockX + Math.cos(armRadians) * (innerDist * clockRadius);
        let y1 = clockY + Math.sin(armRadians) * (innerDist * clockRadius);
        let x2 = clockX + Math.cos(armRadians) * (outerDist * clockRadius);
        let y2 = clockY + Math.sin(armRadians) * (outerDist * clockRadius);

        context.beginPath();
        context.moveTo(x1, y1); // Start at the center
        context.lineTo(x2, y2); // Draw a line outwards
        context.stroke();
    }

// Draw Arms
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

let hProgress = (h / 12) + (1 / 12) * (m / 60) + (1 / 12) * (1 / 60) * (s / 60);
let mProgress = (m / 60) + (1 / 60) * (s / 60);
let sProgress = (s / 60);


drawArm(hProgress, 8, 0.50, "#000000"); // Hours
drawArm(hProgress, 8, -5/clockRadius, "#000000");

drawArm(mProgress, 4, 0.75, "#000000"); // Minutes
drawArm(mProgress, 4, -2/clockRadius, "#000000");


drawArm(sProgress, 2, 1.00, "#FF0000"); // Seconds
drawArm(sProgress, 2, -10/clockRadius, "#FF0000");
};


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

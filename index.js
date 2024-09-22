const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLabel = document.getElementById('milliseconds');

const startPauseButton = document.getElementById('startPauseBtn');
const lapButton = document.getElementById('lapBtn');
const resetButton = document.getElementById('resetBtn');

const lapList = document.getElementById('laplist');

/// stopwatch variables

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let isRunning = false;

startPauseButton.addEventListener('click', startPauseTimer);
lapButton.addEventListener('click', addToLapList);
resetButton.addEventListener('click', resetTimer);

function startPauseTimer() {
    if (isRunning) {
        clearInterval(interval);
        startPauseButton.textContent = 'Start';
    } else {
        interval = setInterval(updateTimer, 10);
        startPauseButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(interval);
    resetTimerData();
    startPauseButton.textContent = 'Start';
    isRunning = false;
}

function updateTimer() {
    milliseconds++;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }

    displayTimer();
}

function displayTimer() {
    millisecondsLabel.textContent = padTime(milliseconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);
}

function padTime(time) {
    return time.toString().padStart(2, '0');
}

function resetTimerData() {
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    displayTimer();
}

function addToLapList() {
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;

    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>Lap ${lapList.childElementCount + 1}: </span>${lapTime}`;
    lapList.appendChild(listItem);
}

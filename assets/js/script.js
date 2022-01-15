var timerEl = document.getElementById('timer-display');

function gameTimer() {
    var timeLeft = 90;

    var timeInterval = setInterval(function() {
        timerEl.textContent = timeLeft;
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            clearInterval(timeInterval);
        }
    }, 1000)
}

gameTimer();
let flag = 0;

function isNumber(char) {
    return /^\d$/.test(char);
}

document.getElementById("answer").readOnly = true;
let screen = document.getElementById("answer");
buttons = document.querySelectorAll("button");
let screenValue = "";
let lastScreenValue = "";
let maxItems = 6;
let isSign = true;

for (item of buttons) {
    item.addEventListener("click", (e) => {
        buttonText = e.target.innerText;
        if (buttonText == "X" && !isSign) {
            if (flag == 1) {
                flag = 0;
            }
            buttonText = "*";
            isSign = true;
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText == "C") {
            if (flag == 1) {
                flag = 0;
            }
            screenValue = "";
            screen.value = screenValue;
            screen.classList.remove("negative");
            isSign = true;
        } else if (buttonText == "CE") {
            deleteLastEntry();
        } else if (buttonText == "=") {
            checkForBracketMulti();
            if (parseFloat(screen.value) < 0) {
                screen.classList.add("negative");
            } else {
                screen.classList.remove("negative");
            }
        } else if (isNumber(buttonText)) {
            if (flag == 1) {
                screenValue = buttonText;
                flag = 0;
            } else {
                screenValue += buttonText;
            }
            screen.value = screenValue;
            isSign = false;
            screen.classList.remove("negative");
        } else {
            if (flag == 1) {
                flag = 0;
            }
            if (!isSign) {
                screenValue = screen.value + buttonText;
                screen.value = screenValue;
                isSign = true;
            }
            screen.classList.remove("negative");
        }
    });
}

document.addEventListener("keydown", function (event) {
    handleKeyPress(event.key);
});

window.onerror = function () {
    alert("PLEASE INPUT VALID EXPRESSION");
    screenValue = "";
    screen.value = screenValue;
    screen.classList.remove("negative");
    console.clear();
};

function deleteLastEntry() {
    if (flag == 1) {
        flag = 0;
    }
    if (screenValue.length > 0) {
        screenValue = screenValue.slice(0, -1);
        screen.value = screenValue;
    }
    screen.classList.remove("negative");
    isSign = false;
}

function checkForBracketMulti() {
    // ... (same code as before)
    
    if (eval(screenValue) !== undefined) {
        screen.value = eval(screenValue);
        lastScreenValue = screenValue;
        screenValue = screen.value;
        if (parseFloat(screen.value) < 0) {
            screen.classList.add("negative");
        } else {
            screen.classList.remove("negative");
        }
        // ... (same code as before)
    }
    flag = 1;
}

// ... (other code)

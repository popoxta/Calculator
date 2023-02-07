let storedNumber = ""
let operator = ""
let currentNumber = ""

//display values
const display = document.getElementById('display')

function showValues() {
    display.textContent = `${storedNumber} ${operator} ${currentNumber}`
    console.log(`stored: ${storedNumber} operator: ${operator} current: ${currentNumber}`)
}

//clear all values and display
const clearAll = document.getElementById('clear')
clearAll.addEventListener("click", () => {
    storedNumber = ""
    operator = ""
    currentNumber = ""
    display.textContent = ""
})

//numbers pad and input
const numPad = document.querySelectorAll('.num')
numPad.forEach(number => number.addEventListener('click', () => numberPressed(number.id)))

function numberPressed(clicked) {
    if (operator === "" && storedNumber !== "") {
        storedNumber = ""
    }
    if (currentNumber.indexOf('.') !== -1 && clicked === ".") {
        //Checks for double decimals (no double decimal dipping!)
        return;
    } else if (clicked === "Back") {
        currentNumber = currentNumber.substring(0, currentNumber.length - 1)
    } else {
        display.textContent += clicked
        currentNumber += clicked
    }
    showValues()
}

//operators pad and input
const operatorPad = document.querySelectorAll('.op')
operatorPad.forEach(op => op.addEventListener("click", () => operatorPressed(op.id)))

function operatorPressed(clicked) {
    if (currentNumber === "" && storedNumber === "") {
        return
    } else if (currentNumber !== "" && storedNumber === "") {
        storedNumber = currentNumber
        currentNumber = ""
    }
    calculateResult()

    operator = clicked
    showValues()
}

//calculation of results and continuation
const calculateBtn = document.getElementById('calculate')
calculateBtn.addEventListener('click', calculateResult)

function calculateResult() {
    if (storedNumber === "" || currentNumber === "" || operator === "") {
        return
    }

    const result = Math.round(calculateNumber(+storedNumber, +currentNumber, operator) * 100) / 100

    if (!isFinite(result)) {
        display.textContent = "Very funny, how clever."
        storedNumber = ""
        operator = ""
        currentNumber = ""
        return;
    }
    storedNumber = result
    display.textContent = storedNumber
    currentNumber = ""
    operator = ""
}

function calculateNumber(num1, num2, operator) {
    const operations = {
        '+': num1 + num2,
        '-': num1 - num2,
        '*': num1 * num2,
        '/': num1 / num2
    }
    return operations[operator]
}

//keypress support
document.addEventListener("keydown", (e) => {
    e.preventDefault()
    const keyPressed = e.key

    if (e.code !== "Space" && isFinite(keyPressed) || keyPressed === ".") {
        numberPressed(keyPressed)
    } else if (keyPressed === "Backspace") {
        numberPressed("Back")
    } else if (keyPressed === "+" || keyPressed === "-" || keyPressed === "/" || keyPressed === "*") {
        operatorPressed(keyPressed)
    } else if (keyPressed === "=" || keyPressed === "Enter") {
        calculateResult()
    }
})

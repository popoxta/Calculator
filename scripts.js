let storedNumber = ""
let operator = ""
let currentNumber = ""


//display values
const display = document.getElementById('display')

function showValues() {
    display.textContent = `${storedNumber} ${operator} ${currentNumber}`
    console.log(`stored: ${storedNumber} operator: ${operator} current: ${currentNumber}`)
}

//clear all values andd display
const clearAll = document.getElementById('clear')
clearAll.addEventListener("click", () => {
    storedNumber = ""
    operator = ""
    currentNumber = ""
    display.textContent = ""
})

//numbers pad and input
const numPad = document.getElementById('calculator-num')
numPad.addEventListener('click', (e) => numberPressed(e.target.id))

function numberPressed(eventTargetId) {
    const clicked = eventTargetId
    if (clicked === "calculator-num" || currentNumber.indexOf('.') !== -1 && clicked === ".") {
        return;
    }
    if (operator === "" && storedNumber !== "") {
        storedNumber = ""
    }
    display.textContent += clicked
    currentNumber += clicked
    showValues()
}

//operators pad and input
const operatorPad = document.getElementById('operators')
operatorPad.addEventListener("click", (e) => operatorPressed(e.target.id))

function operatorPressed(eventTargetId) {
    const clicked = eventTargetId
    if (clicked === "operators" || currentNumber === "" && storedNumber === "") {
        return
    }
    if (currentNumber !== "" && storedNumber === "") {
        storedNumber = currentNumber
        currentNumber = ""
    }
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
document.addEventListener("keypress", (e) => {
    e.preventDefault()
    console.log(e)
    if (e.code.indexOf('Digit') !== -1 || e.key === ".") {
        numberPressed(e.key)
    } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*"
    ) {
        operatorPressed(e.key)
    } else if (e.key === "=" || e.key === "Enter") {
        calculateResult()
    }
})

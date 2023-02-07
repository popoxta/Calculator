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
clearAll.addEventListener("click", ()=>{
    storedNumber = ""
    operator = ""
    currentNumber = ""
    display.textContent = ""
})

//numbers pad and input
const numPad = document.getElementById('calculator-num')
numPad.addEventListener('click', (e) => { //UPDATES CURRENT NUMBER
    const clicked = e.target.id
    if (clicked === "calculator-num") {
        return;
    } else if (operator === "" && storedNumber !== "") {
        storedNumber = ""
    }
    display.textContent += clicked
    currentNumber += clicked
    showValues()
})

//operators pad and input
const operatorPad = document.getElementById('operators')
operatorPad.addEventListener("click", (e) => {
    const clicked = e.target.id
    if (clicked === "operators" || currentNumber === "" && storedNumber === "") {
        return
    }

    if (currentNumber !== "" && storedNumber === "") {
        storedNumber = currentNumber
        currentNumber = ""
    }
    operator = clicked
    showValues()
})

//calculation of results and continuation
const calculateBtn = document.getElementById('calculate')
calculateBtn.addEventListener('click', () => {
    const result = calculateNumber(+storedNumber, +currentNumber, operator)
    storedNumber = Math.round(result * 100) / 100
    currentNumber = ""
    operator = ""
    display.textContent = result
})

function calculateNumber(num1, num2, operator) {
    const operations = {
        '+': num1 + num2,
        '-': num1 - num2,
        '*': num1 * num2,
        '/': num1 / num2
    }
    return operations[operator]
}
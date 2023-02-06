
function calculateNumber(num1, num2, operator) {
    const operations = {
        add: num1 + num2,
        subtract: num1 - num2,
        multiply: num1 * num2,
        divide: num1 / num2
    }
    return operations[operator]
}

calculateNumber(1, 1, "add")



// CLEAR
const clearAll = document.getElementById('clear')
clearAll.addEventListener('click', () => displayBox.textContent = "")

//CALCULATOR MAIN
    //DISPLAY BOX
const displayBox = document.getElementById('display')
const calculatorMain = document.getElementById('calculator-main')
calculatorMain.addEventListener('click', (e) => {
    let clicked = e.target.id
    if (clicked === "calculator-main") {
        return
    }
    displayBox.textContent+=clicked
})

//OPERATE

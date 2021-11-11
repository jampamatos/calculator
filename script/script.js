const display = document.querySelector('#display');
const numberKeys = Array.from(document.querySelectorAll('.number'));
const operatorKeys = document.querySelectorAll('.operator');
const clearKey = document.querySelector('#clear');
const dotKey = document.querySelector('#num-dot')
const equalKey = document.querySelector('#equal')

let operatorMemory = '';
let resultMemory = 0;

numberKeys.forEach(key => key.addEventListener("click", event => {
    updateDisplay(key.dataset.value)
}));

operatorKeys.forEach(key => key.addEventListener("click", event => {
    if (resultMemory === 0) {
        resultMemory = Number.parseFloat(display.textContent, 10);
        clearDisplay();
        operatorMemory = key.dataset.value;
        console.log(resultMemory);
    } else {
        resultMemory = (operate(operatorMemory, resultMemory, Number.parseFloat(display.textContent, 10)))
        operatorMemory = key.dataset.value;
        clearDisplay();
        console.log(resultMemory);
    }
}));

clearKey.addEventListener('click', clearDisplay);

dotKey.addEventListener('click', addDot);

equalKey.addEventListener('click', equalCalc);

function sum(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(op, n, m) {
    switch (op) {
        case "+":
            return sum(n, m);
            break;
        case "-":
            return subtract(n, m);
            break;
        case "*":
            return multiply(n, m);
            break;
        case "/":
            return divide(n, m);
            break;
    }
}

function updateDisplay(newNumb) {
    if (display.textContent.length <= 10 && display.textContent !== "0")
        display.textContent += newNumb;
    else
        display.textContent = newNumb;
}

function addDot() {
    if (!display.textContent.includes('.'))
        display.textContent += '.';
    else if (display.textContent === "0" || display.textContent === '')
        display.textContent = '0.';
}

function clearDisplay() {
    if (display.hasChildNodes())
        display.removeChild(display.firstChild);
    display.textContent = 0;
}

function equalCalc() {
    if (resultMemory !== 0) {
        display.textContent = operate(operatorMemory, resultMemory, Number.parseFloat(display.textContent, 10));
        operatorMemory = '';
        resultMemory = 0;
    }
}




/*Expressions-that-took-me-a-while-to-figure-out dump:

-> operatorKeys.forEach(key => key.addEventListener("click", event => {
  console.log(key.getAttribute('class'), key.dataset.value)
}));

->

*/

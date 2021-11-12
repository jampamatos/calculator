const display = document.querySelector('#display');
const numberKeys = document.querySelectorAll('.number');
const operatorKeys = document.querySelectorAll('.operator');
const clearKey = document.querySelector('#clear');
const dotKey = document.querySelector('#num-dot')
const equalKey = document.querySelector('#equal')
const backKey = document.querySelector('#backspace');

let operatorMemory = '';
let numMemory = 0;
let result = 0;
let isOperating = false;

window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-pad='${e.keyCode}']`);
    key.click();
});

numberKeys.forEach(key => key.addEventListener("click", event => {
    if (isOperating === false) {
        updateDisplay(key.dataset.value);
    } else {
        display.textContent = '0';
        updateDisplay(key.dataset.value);
        isOperating = false;
        Array.from(operatorKeys)
            .forEach(k => k.classList.remove('depressed'))
    }

}));

operatorKeys.forEach(key => key.addEventListener("click", event => {
    if (numMemory === 0) {
        numMemory = Number.parseFloat(display.textContent, 10);
        operatorMemory = key.dataset.value;
        isOperating = true;
        key.classList.add('depressed');
    } else {
        result = operate(operatorMemory, numMemory, Number.parseFloat(display.textContent, 10));
        if (result.toString(10).length > 10)
            display.textContent = "TOO BIG!";
        else if (result > Number.MAX_VALUE)
            display.textContent = "NOPE";
        else 
            display.textContent = result;
        numMemory = Number.parseFloat(display.textContent, 10);
        operatorMemory = key.dataset.value;
        isOperating = true;
        key.classList.add('depressed');
    }
}));

clearKey.addEventListener('click', clearDisplay);

dotKey.addEventListener('click', addDot);

equalKey.addEventListener('click', equalCalc);

backKey.addEventListener('click', backspace);

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
    return parseFloat((a / b).toFixed(4));
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
    if (display.textContent == 0)
        display.textContent = newNumb;
    else if (display.textContent.length <= 10 && display.textContent !== "0")
        display.textContent += newNumb;
}

function backspace(){
    if (display.textContent !== 0 && display.textContent.length > 1){
        let sliceNumb = display.textContent.slice(0, -1);
        display.textContent = sliceNumb;
    } else{
        display.textContent = 0;
    }
}

function addDot() {
    if (isOperating === false) {
        if (!display.textContent.includes('.'))
            display.textContent += '.';
        else if (display.textContent === "0" || display.textContent === '')
            display.textContent = '0.';
    } else {
        display.textContent = '0.';
        isOperating = false;
        Array.from(operatorKeys)
            .forEach(k => k.classList.remove('depressed'))
    }
}

function clearDisplay() {
    if (display.hasChildNodes())
        display.removeChild(display.firstChild);
    display.textContent = 0;
    numMemory = 0;
    operatorMemory = 0;
    Array.from(operatorKeys)
        .forEach(k => k.classList.remove('depressed'))
}

function equalCalc() {
    if (numMemory !== 0) {
        result = operate(operatorMemory, numMemory, Number.parseFloat(display.textContent, 10));
        if (result.toString(10).length > 10)
            display.textContent = "TOO BIG!";
        else if (result > Number.MAX_VALUE)
            display.textContent = "NOPE";
        else 
            display.textContent = result;
        numMemory = 0;
        operatorMemory = '';
        isOperating = true;
        Array.from(operatorKeys)
            .forEach(k => k.classList.remove('depressed'))
    }
}


/*Expressions-that-took-me-a-while-to-figure-out dump:

-> operatorKeys.forEach(key => key.addEventListener("click", event => {
  console.log(key.getAttribute('class'), key.dataset.value)
}));

->  if (resultMemory === 0) {
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

->  function equalCalc() {
        if (resultMemory !== 0) {
        display.textContent = operate(operatorMemory, resultMemory, Number.parseFloat(display.textContent, 10));
        operatorMemory = '';
        resultMemory = 0;
    }
}

*/

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
        case '+':
            return sum(n, m);
            break;
        case '-':
            return subtract(n, m);
            break;
        case '*':
            return multiply(n, m);
            break;
        case '/':
            return divide(n, m);
            break;
    }
}
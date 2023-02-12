const display = document.querySelector('#display');
const clear = document.querySelector('#clear');
const backspace = document.querySelector('#backspace');
const posNeg = document.querySelector('#pos-neg');
const divide = document.querySelector('#divide');
const seven = document.querySelector('#seven');
const eight = document.querySelector('#eight');
const nine = document.querySelector('#nine');
const multiply = document.querySelector('#multiply');
const four = document.querySelector('#four');
const five = document.querySelector('#five');
const six = document.querySelector('#six');
const subtract = document.querySelector('#subtract');
const one = document.querySelector('#one');
const two = document.querySelector('#two');
const three = document.querySelector('#three');
const add = document.querySelector('#add');
const zero = document.querySelector('#zero');
const decimal = document.querySelector('#decimal');
const equals = document.querySelector('#equals');
let isPositive = true;
let operatorPressed = false;
let calcObj = {};
let maxDigits = 0;
//check for 11 digits in display, disable number buttons if so
const checkDigits = function() {
    checkNumberInDisplay();
    if (maxDigits >= 11) {
        one.disabled = true;
        two.disabled = true;
        three.disabled = true;
        four.disabled = true;
        five.disabled = true;
        six.disabled = true;
        seven.disabled = true;
        eight.disabled = true;
        nine.disabled = true;
        zero.disabled = true;
        decimal.disabled = true;
    } else {one.disabled = false;
        two.disabled = false;
        three.disabled = false;
        four.disabled = false;
        five.disabled = false;
        six.disabled = false;
        seven.disabled = false;
        eight.disabled = false;
        nine.disabled = false;
        zero.disabled = false;
        checkDecimal();
    }
};
//check if a decimal exists in display, disable decimal button if so
const checkDecimal = function() {
    if (/\./.test(display.textContent) === true) {
        decimal.disabled = true;
    } else {decimal.disabled = false;}
};
const checkPositive = function() {
    if (!isPositive && /-/.test(display.textContent) === false) {
        display.textContent = '-' + display.textContent;
    } else if (isPositive && /-/.test(display.textContent) === true) {
        display.textContent = display.textContent.slice(1);
    }
};
//toggle operator buttons if no numbers in display
const checkNumberInDisplay = function() {
    if (maxDigits === 0) {
        divide.disabled = true;
        multiply.disabled = true;
        subtract.disabled = true;
        add.disabled = true;
        equals.disabled = true;
    } else {
        divide.disabled = false;
        multiply.disabled = false;
        subtract.disabled = false;
        add.disabled = false;
        equals.disabled = false;
    }
};
const getNumberButtonValue = function() {
    display.textContent += this.textContent;
    if ((display.textContent.charAt(0) === '/' || display.textContent.charAt(0) === '*' ||
    display.textContent.charAt(0) === '+' || display.textContent.charAt(0) === '-') &&
    operatorPressed === true) {
        display.textContent = display.textContent.slice(1);
    }
    maxDigits++;
    checkDigits();
};
const getOperator = function() {
    calcObj.firstNumber = +display.textContent;
    calcObj.operator = this.textContent;
    maxDigits = 0;
    isPositive = true;
    operatorPressed = true;
    display.textContent = this.textContent;
    checkDigits();
};
const getResult = function(operator) {
    if (calcObj.hasOwnProperty('firstNumber')) {
        calcObj.secondNumber = +display.textContent;
        switch (operator) {
            case '/':
                display.textContent = calcObj.firstNumber / calcObj.secondNumber;
                calcObj.firstNumber = +display.textContent;
                break;
            case '*':
                display.textContent = calcObj.firstNumber * calcObj.secondNumber;
                calcObj.firstNumber = +display.textContent;
                break;
            case '-':
                display.textContent = calcObj.firstNumber - calcObj.secondNumber;
                calcObj.firstNumber = +display.textContent;
                break;
            case '+':
                display.textContent = calcObj.firstNumber + calcObj.secondNumber;
                calcObj.firstNumber = +display.textContent;
                break;
        };
    };
};
//disable operator buttons on page load
document.addEventListener('DOMContentLoaded', checkNumberInDisplay);

//special buttons - all clear, backspace, pos-neg
clear.addEventListener('click', function() {
    isPositive = true;
    operatorPressed = false;
    calcObj = {};
    display.textContent = '';
    maxDigits = 0;
    checkDigits();
});
backspace.addEventListener('click', function() {
    if (display.textContent.length === 0) {
        return;
//check what is being deleted, reduce digit count by 1 if a number is deleted from display
    } else if (display.textContent.slice(-1) !== '.' && display.textContent.slice(-1) !== '-') {
        maxDigits--;
//if all you delete is a negative symbol, flip isPositive boolean to true
    } else if (display.textContent.length === 1 && /-/.test(display.textContent) === true) {
        isPositive = true;
    }
    display.textContent = display.textContent.slice(0, display.textContent.length-1);
    checkDigits();
});
posNeg.addEventListener('click', function() {
    isPositive = !isPositive;
    checkPositive();
});

//number buttons
one.addEventListener('click', getNumberButtonValue);
two.addEventListener('click', getNumberButtonValue);
three.addEventListener('click', getNumberButtonValue);
four.addEventListener('click', getNumberButtonValue);
five.addEventListener('click', getNumberButtonValue);
six.addEventListener('click', getNumberButtonValue);
seven.addEventListener('click', getNumberButtonValue);
eight.addEventListener('click', getNumberButtonValue);
nine.addEventListener('click', getNumberButtonValue);
zero.addEventListener('click', getNumberButtonValue);

//decimal button
decimal.addEventListener('click', function() {
    display.textContent += this.textContent;
    checkDecimal();
})

//operator buttons
divide.addEventListener('click', getOperator);
multiply.addEventListener('click', getOperator);
subtract.addEventListener('click', getOperator);
add.addEventListener('click', getOperator);
equals.addEventListener('click', function() {
    getResult(calcObj.operator);
});

//still need getResult for pressing a second operator instead of equals
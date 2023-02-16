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
let ranOperatorResult = false;
let calcObj = {};
let maxDigits = 0;
//check for 11 digits in display, disable number buttons if so
const checkDigits = function() {
    if (posNeg.disabled) {
        posNeg.disabled = false;
    }
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
const checkResultLength = function(result) {
    if (result.length > 11 && result.includes("-") === false && result.includes(".") === false) {
        result = result.slice(0, 11);
    } else if(result.length >= 13 && result.includes("-") === true && result.includes(".") === true) {
        result = result.slice(0, 13);
    } else if(result.length > 12 && (result.includes("-") === true || result.includes(".") === true)) {
        result = result.slice(0, 12);
    }
    display.textContent = result;
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
    if (posNeg.disabled) {
        display.textContent = '';
    }
    if (ranOperatorResult) {
        ranOperatorResult = false;
        display.textContent = '';
    }
    display.textContent += this.textContent;
    if ((display.textContent.charAt(0) === '/' || display.textContent.charAt(0) === '*' ||
    display.textContent.charAt(0) === '+' || display.textContent.charAt(0) === '-') &&
    operatorPressed === true) {
        display.textContent = display.textContent.slice(1);
    }
    maxDigits++;
    checkDigits();
};
const getOperator = function(operator) {
    if (!operatorPressed) {
        calcObj.firstNumber = display.textContent;
        calcObj.operator = operator;
        maxDigits = 0;
        isPositive = true;
        operatorPressed = true;
        display.textContent = operator;
        checkDigits();
    }
};


const getEqualsResult = function(operator) {
    if (calcObj.hasOwnProperty('firstNumber')) {
        calcObj.secondNumber = display.textContent;
//determine if either number entered has a decimal and how many zeroes to add if needed to fix float errors
        let firstNumDecimalIndex = calcObj.firstNumber.search(/\./);
        let secondNumDecimalIndex = calcObj.secondNumber.search(/\./);
        let lengthOfFirstDecimal = calcObj.firstNumber.slice(firstNumDecimalIndex).length - 1;
        let lengthOfSecondDecimal = calcObj.secondNumber.slice(secondNumDecimalIndex).length - 1;
        let decimalFix = 1;
        let result = 0;
        if (firstNumDecimalIndex >= 0 || secondNumDecimalIndex >= 0) {
            if (firstNumDecimalIndex >= 0 && secondNumDecimalIndex >= 0) {
                if (lengthOfFirstDecimal === lengthOfSecondDecimal || lengthOfFirstDecimal > lengthOfSecondDecimal) {
                    decimalFix = Math.pow(10, lengthOfFirstDecimal);
                } else {
                    decimalFix = Math.pow(10, lengthOfSecondDecimal);
                }
            } else if(firstNumDecimalIndex >= 0) {
                decimalFix = Math.pow(10, lengthOfFirstDecimal);
            } else if (secondNumDecimalIndex >= 0) {
                decimalFix = Math.pow(10, lengthOfSecondDecimal);
            }
        }
        calcObj.firstNumber = +calcObj.firstNumber * decimalFix;
        calcObj.secondNumber = +calcObj.secondNumber * decimalFix;
        switch (operator) {
            case '/':
                result = ((calcObj.firstNumber / calcObj.secondNumber)).toString();
                checkResultLength(result);
                break;
            case '*':
                result = ((calcObj.firstNumber * calcObj.secondNumber) / decimalFix**2).toString();
                checkResultLength(result);
                break;
            case '-':
                result = ((calcObj.firstNumber - calcObj.secondNumber) / decimalFix).toString();
                checkResultLength(result);
                break;
            case '+':
                result = ((calcObj.firstNumber + calcObj.secondNumber) / decimalFix).toString();
                checkResultLength(result);
                break;
        };
    };
};
const getOperatorResult = function(currentOperator, newOperator) {
    if (calcObj.hasOwnProperty('firstNumber') && maxDigits > 0) {
        maxDigits = 0;
        ranOperatorResult = true;
        decimal.disabled = false;
        calcObj.operator = newOperator;
        calcObj.secondNumber = display.textContent;
//determine if either number entered has a decimal and how many zeroes to add if needed to fix float errors
        let firstNumDecimalIndex = calcObj.firstNumber.search(/\./);
        let secondNumDecimalIndex = calcObj.secondNumber.search(/\./);
        let lengthOfFirstDecimal = calcObj.firstNumber.slice(firstNumDecimalIndex).length - 1;
        let lengthOfSecondDecimal = calcObj.secondNumber.slice(secondNumDecimalIndex).length - 1;
        let decimalFix = 1;
        let result = 0;
        if (firstNumDecimalIndex >= 0 || secondNumDecimalIndex >= 0) {
            if (firstNumDecimalIndex >= 0 && secondNumDecimalIndex >= 0) {
                if (lengthOfFirstDecimal === lengthOfSecondDecimal || lengthOfFirstDecimal > lengthOfSecondDecimal) {
                    decimalFix = Math.pow(10, lengthOfFirstDecimal);
                } else {
                    decimalFix = Math.pow(10, lengthOfSecondDecimal);
                }
            } else if(firstNumDecimalIndex >= 0) {
                decimalFix = Math.pow(10, lengthOfFirstDecimal);
            } else if (secondNumDecimalIndex >= 0) {
                decimalFix = Math.pow(10, lengthOfSecondDecimal);
            }
        }
        calcObj.firstNumber = +calcObj.firstNumber * decimalFix;
        calcObj.secondNumber = +calcObj.secondNumber * decimalFix;
        switch (currentOperator) {
            case '/':
                result = ((calcObj.firstNumber / calcObj.secondNumber)).toString();
                checkResultLength(result);
                calcObj.firstNumber = display.textContent;
                break;
            case '*':
                result = ((calcObj.firstNumber * calcObj.secondNumber) / decimalFix**2).toString();
                checkResultLength(result);
                calcObj.firstNumber = display.textContent;
                break;
            case '-':
                result = ((calcObj.firstNumber - calcObj.secondNumber) / decimalFix).toString();
                checkResultLength(result);
                calcObj.firstNumber = display.textContent;
                break;
            case '+':
                result = ((calcObj.firstNumber + calcObj.secondNumber) / decimalFix).toString();
                checkResultLength(result);
                calcObj.firstNumber = display.textContent;
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
    if (posNeg.disabled) {
        display.textContent = '';
        posNeg.disabled = false;
    }
    display.textContent += this.textContent;
    if ((display.textContent.charAt(0) === '/' || display.textContent.charAt(0) === '*' ||
    display.textContent.charAt(0) === '+' || display.textContent.charAt(0) === '-') &&
    operatorPressed === true) {
        display.textContent = display.textContent.slice(1);
    }
    checkDecimal();
})

//operator buttons
divide.addEventListener('click', function() {
    getOperator(this.textContent);
    getOperatorResult(calcObj.operator, this.textContent);
    posNeg.disabled = true;
});
multiply.addEventListener('click', function() {
    getOperator(this.textContent);
    getOperatorResult(calcObj.operator, this.textContent);
    posNeg.disabled = true;
});
subtract.addEventListener('click', function() {
    getOperator(this.textContent);
    getOperatorResult(calcObj.operator, this.textContent);
    posNeg.disabled = true;
});
add.addEventListener('click', function() {
    getOperator(this.textContent);
    getOperatorResult(calcObj.operator, this.textContent);
    posNeg.disabled = true;
});
equals.addEventListener('click', function() {
    getEqualsResult(calcObj.operator);
    equals.disabled = true;
    backspace.disabled = true;
    posNeg.disabled = true;
    divide.disabled = true;
    multiply.disabled = true;
    subtract.disabled = true;
    add.disabled = true;
    calcObj = {};
    isPositive = true;
    maxDigits = 0;
    operatorPressed = false;
});


/* KNOWN BUGS
run getOperatorResult, press decimal button, press number button - now decimal gets deleted due to ranOperatorResult boolean
*/
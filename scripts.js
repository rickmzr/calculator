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
const minus = document.querySelector('#subtract');
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
//use to always be listening for 11 digits in display.textContent, remove number button listeners if so
const checkDigits = function() {
    if (maxDigits >= 11) {
        one.removeEventListener('click', );

    } else {one.addEventListener('click', )

    }
};

//special buttons - all clear, backspace, pos-neg
clear.addEventListener('click', function() {
    isPositive = true;
    operatorPressed = false;
    calcObj = {};
    display.textContent = '';
    maxDigits = 0;
});
backspace.addEventListener('click', function() {
    if (display.textContent.length === 0) {
        return;
    } else if (!display.textContent.slice(-1) === '.' && !display.textContent.slice(-1) === '-') {
        maxDigits--
    }
    display.textContent = display.textContent.slice(0, display.textContent.length-1);
});
posNeg.addEventListener('click', function() {
    isPositive = !isPositive;
});

//number buttons
one.addEventListener('click', function() {
    
    maxDigits++
})

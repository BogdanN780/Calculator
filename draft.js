const lineOne = document.querySelector('.line');
const lineTwo = document.querySelector('.linetwo');
const lineThree = document.querySelector('.linethree');
const lineFour = document.querySelector('.linefour');
const lineFive = document.querySelector('.linefive');
const container = document.querySelector('.container');
let display = document.querySelector('.text');
const allClear = document.querySelector('.allclear');
const num = document.querySelectorAll('.num');
let result = "";
let paranthesesState = 0;
const undo = document.querySelector('.clear');
let divide = document.querySelector("#divide");
let modulo = document.querySelector("#modulo");
let multiply = document.querySelector("#multiply");

allClear.addEventListener('click' , function(){
    display.textContent = '';
    paranthesesState = 0;
})

num.forEach(button => {
  button.addEventListener('click', function() {
    
    if (display.textContent === "NaN" || display.textContent.startsWith("Invalid") || display.textContent.startsWith("Inf")) {
      display.textContent = "";} 

    if (display.textContent === "" && /[-+x%=÷]/.test(button.textContent)) {
      return; 
    }
    if (button.textContent === "()") {
      if (paranthesesState === 0) {
        display.textContent += "(";
        paranthesesState = 1;
      } else if (paranthesesState === 1) {
        display.textContent += ")";
        paranthesesState = 0;
      }
    } else if (button.textContent === ",") {
      const lastChar = display.textContent.slice(-1);
      if (lastChar !== "," && !isNaN(parseFloat(lastChar))) {
        display.textContent += ",";
      }
    }
    else if (button.textContent === "x") {
      const lastChar = display.textContent.slice(-1);
      if (lastChar !== "x" && !isNaN(parseFloat(lastChar))) {
        display.textContent += "x";
      }
    }
    else if (button.textContent === "%") {
      const lastChar = display.textContent.slice(-1);
      if (lastChar !== "%" && !isNaN(parseFloat(lastChar))) {
        display.textContent += "%";
      }
    }
    else if (button.textContent === "+") {
      const lastChar = display.textContent.slice(-1);
      if (lastChar !== "+" && !isNaN(parseFloat(lastChar))) {
        display.textContent += "+";
      }
    }
    else if (button.textContent === "-") {
      const lastChar = display.textContent.slice(-1);
      if (lastChar !== "-" && !isNaN(parseFloat(lastChar))) {
        display.textContent += "-";
      }
    }
    else if (button.textContent === "÷") {
      const lastChar = display.textContent.slice(-1);
      if (lastChar !== "÷" && !isNaN(parseFloat(lastChar))) {
        display.textContent += "÷";
      }
    }


    else {
      display.textContent += button.textContent;
    }
  });
});


   undo.addEventListener('click', function() {
    if (display.textContent === "NaN" || display.textContent.startsWith("Invalid") || display.textContent.startsWith("Inf")) {
      display.textContent = "";} 
    let currentDisplay = display.textContent;
    if (currentDisplay.length > 0) {
      display.textContent = currentDisplay.slice(0, -1);
    }
  }); 


  const equalButton = document.querySelector('#equal');
  equalButton.addEventListener('click', function() {
    const expression = display.textContent;
    const calculatedResult = calculate(expression);
    display.textContent = calculatedResult;
  })

function calculate(expression) {
  const sanitizedExpression = expression.replace(/\s/g, ""); // Remove whitespace from the expression
  const result = evaluateExpression(sanitizedExpression);
  return  Math.round(result * 10000) / 10000;}

function evaluateExpression(expression) {
  const numbers = expression.split(/[-+x÷%]/);
  const operators = expression.match(/[-+x÷%]/g);

  if (!numbers || !operators) {
    return "Invalid expression";
  }

  let result = parseFloat(numbers[0].replace(",", "."));

  for (let i = 1; i < numbers.length; i++) {
    const number = parseFloat(numbers[i].replace(",", "."));
    const operator = operators[i - 1];

    if (isNaN(number)) {
      return "Invalid number";
    }

    if (operator === "+") {
      result += number;
    } else if (operator === "-") {
      result -= number;
    } else if (operator === "x") {
      result *= number;
    } else if (operator === "÷") {
      result /= number;
    } else if (operator === "%") {
      result %= number;
    }
  }
  return result;
}

const keyMap = {
  "Digit0": "0","Digit1": "1","Digit2": "2","Digit3": "3","Digit4": "4","Digit5": "5","Digit6": "6","Digit7": "7",
  "Digit8": "8","Digit9": "9","Numpad0": "0","Numpad1": "1","Numpad2": "2","Numpad3": "3","Numpad4": "4",
  "Numpad5": "5","Numpad6": "6","Numpad7": "7","Numpad8": "8","Numpad9": "9","NumpadAdd": "+","NumpadSubtract": "-",
  "NumpadMultiply": "x","NumpadDivide": "÷","Enter": "=","Comma": ",","NumpadDecimal": ",","NumpadEnter": "=", 
  "Backspace": "undo","Minus": "-","Slash" : "÷","Shift+Digit8" : "x","Shift+Digit5": "%","Shift+Equal": "+",
  "Shift+Digit9": "(", "Shift+Digit0": ")",
};
  document.addEventListener('keydown', function(event) {
  const key = event.code;
  const shiftKey = event.shiftKey;
  const buttonContent = keyMap[(shiftKey ? "Shift+" : "") + key];

  if (buttonContent) {
    if (buttonContent === "undo") {
      undoAction(); 
    } else {
      const buttons = Array.from(document.getElementsByClassName('num')).filter(btn => btn.textContent === buttonContent);

      if (buttons.length > 0) {
        buttons[0].click(); 
      }
    }
    event.preventDefault(); 
  }
});

function undoAction() {
  if (display.textContent === "NaN" || display.textContent.startsWith("Invalid") || display.textContent.startsWith("Inf")) {
    display.textContent = ""; 
  }
  let currentDisplay = display.textContent;
  if (currentDisplay.length > 0) {
    display.textContent = currentDisplay.slice(0, -1);
  }
}
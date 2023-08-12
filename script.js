const storedOperationHistory = document.getElementById("operations-history");
const finalResult = document.getElementById("final-result");
const tempResult = document.getElementById("temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationsEl = document.querySelectorAll(".operation");
const equalBtn = document.getElementById("equal");
const clearAllBtn = document.getElementById("clear-all");
const clearLastEntityBtn = document.getElementById("clear-last-entity");

// Variables will store the logic
let storedNumber = "";
let operationSign = "";
let currentNumber = "";
let haveDot = false;
let result;

// Loop on numbers & know if the dot exist or not
// Get the first number and give it to the result
numbersEl.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    currentNumber += e.target.innerText;
    finalResult.innerText = currentNumber;
  });
});

// Loop on operations to get the operation sign
// Get back to use the dot after using the sign
// Know if the stored and current number and the operation to call the math function
//Set currentNumber to storedNumber
// Store the operationSign from the operationName
operationsEl.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!currentNumber) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (storedNumber && currentNumber && operationSign) {
      mathOperation();
    } else {
      result = parseFloat(currentNumber);
    }
    setCurrentNumberToStoredNumber(operationName);
    operationSign = operationName;
  });
});

// Clear the currentNumber by storing it to storedNumber
function setCurrentNumberToStoredNumber(operationName = "") {
  storedNumber += `${currentNumber} ${operationName} `;
  storedOperationHistory.innerText = storedNumber;
  finalResult.innerText = "";
  currentNumber = "";
  tempResult.innerText = result;
}

// Update the screen after slicing one number from the logic
function updateAllScreen(value) {
  finalResult.innerText = !value ? "0" : value;
  storedOperationHistory.innerText = !value ? "0" : value;
  tempResult.innerText = !value ? "0" : value;
}

function updateCurrentScreen(value) {
  finalResult.innerText = !value ? "0" : value;
}

// The function will make the math Operation by taking the math sign
function mathOperation() {
  switch (operationSign) {
    case "%":
      result = parseFloat(result) % parseFloat(currentNumber);
      break;
    case "/":
      result = parseFloat(result) / parseFloat(currentNumber);
      if (result === Infinity) {
        result = 0;
      }
      break;
    case "x":
      result = parseFloat(result) * parseFloat(currentNumber);
      break;
    case "-":
      result = parseFloat(result) - parseFloat(currentNumber);
      break;
    case "+":
      result = parseFloat(result) + parseFloat(currentNumber);
      break;
  }
}

// equalBtn checking the stored and current number
// Make the dot used again
// Call the mathOperation Function
// Give the result
equalBtn.addEventListener("click", (e) => {
  if (!storedNumber || !currentNumber) return;
  haveDot = false;
  mathOperation();
  setCurrentNumberToStoredNumber();
  finalResult.innerText = result;
  tempResult.innerText = "";
  currentNumber = result;
  storedNumber = "";
});

// clearAll btn to clear the logic and the screen
clearAllBtn.addEventListener("click", (e) => {
  operationSign = "";
  storedNumber = "";
  currentNumber = "";
  haveDot = false;
  updateAllScreen(currentNumber);
});

// Slice one number from the logic and update screen
clearLastEntityBtn.addEventListener("click", (e) => {
  if (currentNumber.length > 0) {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
    updateCurrentScreen(currentNumber);
  }
});

// keyboard accessibility
// Give btns effects if pressed the keyBoard
// Click the event of the key you are pressing
function btnsClickingEffect(btn) {
  btn.classList.add("btn-clicked");
  setTimeout(() => {
    btn.classList.remove("btn-clicked");
  }, 300);
  btn.click();
}

// Click numbers on keyboard
function clickNumbers(keyboardNumbers) {
  numbersEl.forEach((btn) => {
    if (btn.innerText === keyboardNumbers) {
      btnsClickingEffect(btn);
    }
  });
}

// Click operationsSigns on keyboard
function clickOperations(keyboardOperations) {
  operationsEl.forEach((btn) => {
    if (btn.innerText === keyboardOperations) {
      btnsClickingEffect(btn);
    }
  });
}

// Click the equal or enter on keyboard
function clickEqual() {
  if (!storedNumber || !currentNumber) return;
  btnsClickingEffect(equalBtn);
}

// Click the c key to clear one number
function clickCKey() {
  btnsClickingEffect(clearLastEntityBtn);
}

// click A key to clear all numbers
function clickAKey() {
  btnsClickingEffect(clearAllBtn);
}

const keyNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const keyOperations = ["+", "-", "/"];

window.addEventListener("keydown", (e) => {
  if (keyNumbers.includes(e.key)) {
    clickNumbers(e.key);
  } else if (keyOperations.includes(e.key)) {
    clickOperations(e.key);
  } else if (e.key === "*") {
    clickOperations("x");
  } else if (e.key === "=" || e.key == "Enter") {
    clickEqual();
  } else if (e.key === "c" || e.key === "Backspace") {
    clickCKey(e.key);
  } else if (e.key === "a") {
    clickAKey(e.key);
  }
});

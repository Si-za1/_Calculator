let runningTotal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector(".screen"); //displays whaterver is on the screen


function buttonClick(value){  //activates when the button is clicked and the value is passed
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    rerender();
}

function handleNumber(){
    if (buffer === "0"){
        buffer = value;
    }
    else{
        buffer += value;
    }
}
function handleMath(value) {
    if (buffer === "0") 
    {
      // do nothing
      return;
    }
  
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
      runningTotal = intBuffer;
    } 
    else {
      flushOperation(intBuffer);
    }
  
    previousOperator = value;
  
    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator === "+") 
    {
      runningTotal += intBuffer;
    } else if (previousOperator === "-") 
    {
      runningTotal -= intBuffer;
    } 
    else if (previousOperator === "×")
    {
      runningTotal *= intBuffer;
    } 
    else
    {
      runningTotal /= intBuffer;
    }
}

function handleSymbol(value)
{
    switch (value){
        case "C":
            buffer = "0";
            runningTotal = 0;
        break;

        case "=":
            if (previousOperator === null )
            {
                return; //since it needs two operators to perform calculation
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = +runningTotal;
            runningTotal = 0;
        break;

        case "←":
            if (buffer.length === 1) {
              buffer = "0";
            } else {
              buffer = buffer.substring(0, buffer.length - 1);
            }
        break;

        case "+":
        case "-":
        case "×":
        case "÷":
            handleMath(value);
        break;
        }
}


function rerender() 
{
    screen.innerText = buffer;
}


function init(){
    document
    .querySelector(".calc-buttons")
    .addEventListener("click", function(event){
        buttonClick(event.target.innerText)
    });
}

init();


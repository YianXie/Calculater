const symbols = ["0","1","2","3","4","5","6","7","8","9",".","+","-","*","/","+/-","%"];
const calculation_symbols = ["+","-","*","/"];
let input = "";
let currentInput = "";

window.onload = () => {
    const signs = document.querySelectorAll("td");
    for (let i = 0; i < signs.length; i++) {
        if (symbols.includes(signs[i].innerHTML) && signs[i].id != "inputArea") {
            signs[i].onclick = () => updateInput(signs[i].innerHTML);
        } else if (signs[i].innerHTML == "=") {
            signs[i].onclick = () => compute();
        } else if (signs[i].innerHTML == "C") {
            signs[i].onclick = () => clearInput();
        }
    }
} 

const updateInput = (sign) => {
    console.log(sign);
    if (calculation_symbols.includes(sign)) {
        input = input + currentInput + sign;
        // console.log("currentInput:",currentInput);
        // console.log("input:",input);
        currentInput = "";
        document.getElementById("inputArea").innerHTML = input;
    } else {
        if (sign == "+/-") {
            // console.log(typeof(currentInput));
            currentInput = currentInput.at(0) == "-" ? toPositive() : toNegative();
            document.getElementById("inputArea").innerHTML = currentInput;
        } else if (sign == "%") {
            currentInput = eval("(" + currentInput + ")" + "/100");
            currentInput = currentInput.toString();
            document.getElementById("inputArea").innerHTML = currentInput;
        } else {
            currentInput = currentInput + sign;
            document.getElementById("inputArea").innerHTML += sign;
        }
    }
}

const toPositive = () => {
    console.log("to positive");
    return currentInput.slice(1,currentInput.length);
}

const toNegative = () => {
    console.log("to negative");
    return "-" + currentInput;
}

const compute = () => {
    try {
        input += currentInput;
        currentInput = "";
        input = eval(input);
        document.getElementById("inputArea").innerHTML = input;
    }
    catch(err) {
        console.error("calculation error");
    }
}

const clearInput = () => {
    console.log("clear input");
    input = "";
    currentInput = "";
    document.getElementById("inputArea").innerHTML = input;
}
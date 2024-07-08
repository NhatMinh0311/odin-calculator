function checkSyntax() {
    return array.length === 3;
}

function operate() {
    if (checkSyntax()) {
        const a = +array[0] || 0;
        const b = +array[2];
        switch (array[1]) {
            case '+' :
                array[0] = a + b;
                array.splice(1, 2);
                break;
            case '-' :
                array[0] = a - b;
                array.splice(1, 2);
                break;
            case '*' :
                array[0] = a * b;
                array.splice(1, 2);
                break;
            case '/' :
                if (b === 0) {
                    array.splice(0, array.length, "ERROR");
                    break;
                }
                array[0] = a / b;
                array.splice(1, 2);
                break;
        }
        array[0] = array[0].toString();
    }
    else if (array[1] && !array[2]) array.splice(0, array.length, "ERROR");
}

function isNum(str) {
    return /^[+-]?\d+(\.\d+)?$/.test(str);
}

function checkOperator(oper) {
    return oper === "+" || oper === "-" || oper === "*" || oper === "/";
}

function clear() {
    array.splice(0, 3);
}

function checkDot() {
    const value  = array[array.length - 1];
    for (let i = 0; i < value.length; i++) {
        if (value[i] === '.') {
            return true;
        }
    }
    return false;
}

function addValue(value) {
    if (!array[0] && !array[1]) array[0] = value;
    else if (!array[1]) array[0] += value;
    else if (array[1]) {
        if (array[2]) array[2] += value;
        else array[2] = value;
    }  
}

const calculator = document.querySelector("#calculator");
calculator.addEventListener("click", (event) => {
    if (event.target.nodeName != "BUTTON") return;

    const value = event.target.innerText;
    
    if (value === '=') {
        operate();
    }
    else if (value === 'Clear') {
        clear();
    }
    else if (value === "Delete") {
        if (array[2]) array[2] = array[2].slice(0, array[2].length - 1);
        else if (array[1]) array[1] = undefined;
        else if (array[0]) array[0] = array[0].slice(0, array[0].length - 1);
    }
    else if (checkOperator(value)) {
        if (checkSyntax()) operate();

        array[1] = value;
    }
    else {
        if (value === '.' && checkDot()) return;
        addValue(value);
    }
    const display = document.querySelector("#display");
    display.textContent = array.join(" ");
});


let array = [];
const btnsNum = document.querySelectorAll('.btnNum');
const btnsOp = document.querySelectorAll('.btnOperator');
const btnsUti = document.querySelectorAll('.btnUtility');

let buffer = '0';
let Total = 0;
let previousOperator = undefined;

btnsNum.forEach((btn) => {
    btn.addEventListener('click', () => {
        if(buffer === '0' && btn.value !== '.') buffer = '';
        buffer += btn.value;
        displayObj.renderMain();
    });
});

btnsOp.forEach((btn) => {
    btn.addEventListener('click', () => {
        let customStr = undefined;
        if(previousOperator !== undefined) {
            if('=' === btn.value)
                customStr = `${Total} ${previousOperator} ${buffer}`;

            handleOperation(previousOperator);
            buffer = '0';
        }else {
            Total = +buffer;
            buffer = '0';
        }

        previousOperator = btn.value;

        if(previousOperator === '=') {
            previousOperator = undefined;
            buffer = ''+Total;
            Total = 0;
        }

        displayObj.renderSecondary(customStr);
        displayObj.renderMain();
    });
});

btnsUti.forEach((btn) => {
    btn.addEventListener('click', () => {
        handleUtilities(btn.value);
    });
});

function handleUtilities(op) {
    switch(op) {
        case 'clean':
            buffer = '0';
            Total = 0;
            previousOperator = undefined;
            displayObj.cleanDisplays();
        break

        case 'sign': 
            buffer = mathObj.invertSign(buffer);
            displayObj.renderMain();
        break

        case 'percentage':
            let str = buffer + '%';
            displayObj.renderMain(str);
            buffer = mathObj.parseToPercentage(buffer);
        break

        case '←':
            buffer = buffer.slice(0, -1);
            displayObj.renderMain();
        break
    }
}

function handleOperation(op) {
    switch(op) {
        case '+':
            Total = mathObj.add(Total, buffer);
        break;

        case '-':
            Total = mathObj.sub(Total, buffer);
        break;

        case '*':
            Total = mathObj.mult(Total, buffer);
        break;

        case '/':
            Total = mathObj.div(Total, buffer);
        break;
    }
}

const displayObj = (function() {
    const mainDisplay = document.getElementById('mainDisplay');
    const secondaryDisplay = document.getElementById('secondaryDisplay');
    
    const renderMain = (str = undefined) => {
        if(str === undefined)
            mainDisplay.textContent = buffer;
        else
            mainDisplay.textContent = str;
    }

    const renderSecondary = (str = undefined) => {
        if(str === undefined)
            secondaryDisplay.textContent = `${Total} ${previousOperator}`;
        else
            secondaryDisplay.textContent = str;
    }

    const cleanDisplays = () => {
        mainDisplay.textContent = 0;
        secondaryDisplay.textContent = '';
    }

    return { renderMain, renderSecondary, cleanDisplays };
})();

const mathObj = (function() {
    const add = (a, b) => {
        return (+a) + (+b)
    }

    const sub = (a, b) => {
        return (+a) - (+b)
    }

    const mult = (a, b) => {
        return (+a) * (+b)
    }

    const div = (a, b) => {
        return (+a) / (+b)
    }

    const parseToPercentage = (a) => {
        return (+a)/100;
    }
    
    const invertSign = (a) => {
        return (+a) * (-1);
    }

    return { add, sub, mult, div, parseToPercentage, invertSign }
})();
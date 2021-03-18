// initial variable DOM FUNC
const acFuncEle = document.querySelector('.ac');
const pmFuncEle = document.querySelector('.pm');
const percFuncEle = document.querySelector('.percent');
// ---------------------

// initial variable DOM OPERATOR
const divOperatorEle = document.querySelector('.div');

const mulOperatorEle = document.querySelector('.mul');

const subOperatorEle = document.querySelector('.sub');

const sumOperatorEle = document.querySelector('.sum');

const equalOperatorEle = document.querySelector('.equal');

//-----------------------

// initial variable DOM NUMBER

const numberZeroEle = document.querySelector('.number-0');

const numberOneEle = document.querySelector('.number-1');

const numberTwoEle = document.querySelector('.number-2');

const numberThreeEle = document.querySelector('.number-3');

const numberFourEle = document.querySelector('.number-4');

const numberFiveEle = document.querySelector('.number-5');

const numberSixEle = document.querySelector('.number-6');

const numberSevenEle = document.querySelector('.number-7');

const numberEightEle = document.querySelector('.number-8');

const numberNineEle = document.querySelector('.number-9');

const dotDecimalEle = document.querySelector('.dot-decimal');


// ------------------------

const resultCal = document.querySelector('.result-cal');

const listNumberEle = [
  numberZeroEle,
  numberOneEle, numberTwoEle, numberThreeEle, numberFourEle, numberFiveEle, numberSixEle,numberSevenEle, numberEightEle, numberNineEle]


resultCal.textContent = '0';

let strValueInMemory = null;
let operatorInMemory = null;


const getCurrentStringValue = () => resultCal.textContent.split(',').join('');

const getCurrentNumberValue = () => parseFloat(getCurrentStringValue);

const setUpdateResult = (numberStr) => {

  if (numberStr[numberStr.length - 1] === '.') {
    resultCal.textContent += '.';
    return;    
  }

  const [number, decimal] = numberStr.split('.');

  if (decimal) {
    resultCal.textContent = numberStr;
  } else {
    resultCal.textContent = number.toString();
  }
  

}

const handleNumberClick = (number) => {
  const currentStringValue = getCurrentStringValue();
  
  if (currentStringValue === '0') {
    setUpdateResult(number.toString());
    return;
  }

  setUpdateResult(currentStringValue + number);

}

const resultCalWithOperator = () => {
  const currentStringValue = getCurrentStringValue();
  const currentNumberValue = parseFloat(currentStringValue);
  const numberInMemory = parseFloat(strValueInMemory);
  let result;

  switch(operatorInMemory) {
    case 'div': 
      result = numberInMemory / currentNumberValue;
      break;
    case 'mul':
      result = numberInMemory * currentNumberValue;
      break;
    case 'sub':
      result = numberInMemory - currentNumberValue;
      break;

    case 'sum':
      result = numberInMemory + currentNumberValue;
      break;
  }

  return result.toString();
} 

const handleOperatorClick = (operator) => {

  const currentValueString = getCurrentStringValue();
  const numberInMemory = parseFloat(strValueInMemory);
  
  if(!strValueInMemory) {
    strValueInMemory = currentValueString;
    operatorInMemory = operator;
    setUpdateResult('0');
    return;
  }

  strValueInMemory = resultCalWithOperator();
  operatorInMemory = operator
  setUpdateResult('0');
}

// Event Click of Numbers Button

for (let i = 0 ; i < listNumberEle.length ; i++) {
  listNumberEle[i].addEventListener('click', () => {
    handleNumberClick(i);
  });
}

dotDecimalEle.addEventListener('click', () => {
  const currentStringValue = getCurrentStringValue();

  if (!currentStringValue.includes('.')) {
    setUpdateResult(currentStringValue + '.')
  }
});

// Event click func

acFuncEle.addEventListener('click', () => {
  setUpdateResult('0');
  strValueInMemory = null;
  operatorInMemory = null;
});

pmFuncEle.addEventListener('click', () => {
  const currentStringValue = getCurrentStringValue();
  if (currentStringValue === '-0') {
    setUpdateResult('0');
    return;
  }

  if (parseFloat(currentStringValue) > 0) {
    setUpdateResult(`-${currentStringValue}`);
    return
  }

 
  setUpdateResult(currentStringValue.substring(1));
});

percFuncEle.addEventListener('click', () => {
  const currentStringValue = getCurrentStringValue();
  const percentResult = parseFloat(currentStringValue) / 100;
  setUpdateResult(percentResult.toString());
});

// Event click of operator

divOperatorEle.addEventListener('click', () => {
  handleOperatorClick('div');
});

mulOperatorEle.addEventListener('click', () => {
  handleOperatorClick('mul');
});

subOperatorEle.addEventListener('click', () => {
  handleOperatorClick('sub');
});

sumOperatorEle.addEventListener('click', () => {
  handleOperatorClick('sum');
});

equalOperatorEle.addEventListener('click', () => {
  const numberInMemory = parseFloat(strValueInMemory);
  const currentStringValue = getCurrentStringValue();

 
  if(currentStringValue){
    setUpdateResult(resultCalWithOperator());
    operatorInMemory = null;
    strValueInMemory = null;
  }

});


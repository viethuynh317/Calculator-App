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


let strValueInMemory = '';
let operatorInMemory = '';
let expressionInMemory = '';
let expressionInMemoryPriority = '';
let operatorInMemory2 = '';
let operatorInMemory3 = '';

let temp = 1;
let toggleACAndC = true;
let isClickOperator = false;
let calPriority = false;

const getCurrentStringValue = () => resultCal.textContent.split(',').join('');

const getCurrentNumberValue = () => parseFloat(getCurrentStringValue);


const removeOperatorActive = () => {
  divOperatorEle.classList.remove('operator-active');
  mulOperatorEle.classList.remove('operator-active');
  subOperatorEle.classList.remove('operator-active');
  sumOperatorEle.classList.remove('operator-active');
}


const setUpdateResult = (numberStr) => {

  if (numberStr[numberStr.length - 1] === '.') {
    resultCal.textContent += '.';
    return;    
  }
  // test

  const handledNumberStr = eval(numberStr).toString();

  
  const [number, decimal] = handledNumberStr.split('.');
  
  if (decimal) {
    resultCal.textContent = Number(number).toLocaleString() + '.' + decimal;
  } else {
    resultCal.textContent = Number(number).toLocaleString();
  }
  
}


const handleNumberClick = (number) => {
  const currentStringValue = getCurrentStringValue();
  toggleACAndC = false;
  isClickOperator = true;
  acFuncEle.textContent = toggleACAndC ? 'AC' : 'C';

  const compare = temp !== null ? temp : currentStringValue;
  if (compare.toString() === '0') {
    setUpdateResult(number.toString());
    temp = 1;
    return;
  }
  
  setUpdateResult(currentStringValue + number);

}


const handleResultDivAndMul = () => {
  const currentStringValue = getCurrentStringValue();
  const currentNumberValue = Number(currentStringValue);  
  switch(operatorInMemory2) {
    case 'div': 
      if (expressionInMemoryPriority[0] === '*' || expressionInMemoryPriority[0] === '/') expressionInMemoryPriority = expressionInMemoryPriority.slice(1);
      expressionInMemoryPriority += `/ ${currentNumberValue}`
   
      divOperatorEle.classList.add('operator-active');
      mulOperatorEle.classList.remove('operator-active');
      subOperatorEle.classList.remove('operator-active');
      sumOperatorEle.classList.remove('operator-active');
      break;
    case 'mul':
      if (expressionInMemoryPriority[0] === '*' || expressionInMemoryPriority[0] === '/') expressionInMemoryPriority = expressionInMemoryPriority.slice(1);
      expressionInMemoryPriority +=  `* ${currentNumberValue}`;
  
      divOperatorEle.classList.remove('operator-active');
      mulOperatorEle.classList.add('operator-active');
      subOperatorEle.classList.remove('operator-active');
      sumOperatorEle.classList.remove('operator-active');
      break;
  }
  return expressionInMemoryPriority.slice(2);
}

const resultCalWithOperator = () => {
  const currentStringValue = getCurrentStringValue();
  const currentNumberValue = Number(currentStringValue);
  const numberInMemory = Number(strValueInMemory);
  let result;
  if(isClickOperator) {
    switch(operatorInMemory) {
      case 'div': 
      if (expressionInMemoryPriority[0] === '*' || expressionInMemoryPriority[0] === '/') expressionInMemoryPriority = expressionInMemoryPriority.slice(1);
       
        expressionInMemory += expressionInMemoryPriority ? `${expressionInMemory ? ` ${operatorInMemory3} ${expressionInMemoryPriority}` : 'Lỗi'}` : ` / ${expressionInMemory ? currentNumberValue : 'Lỗi'}`;

        expressionInMemoryPriority = '';
       
        divOperatorEle.classList.add('operator-active');
        mulOperatorEle.classList.remove('operator-active');
        subOperatorEle.classList.remove('operator-active');
        sumOperatorEle.classList.remove('operator-active');
        break;
      case 'mul':
        if (expressionInMemoryPriority[0] === '*' || expressionInMemoryPriority[0] === '/') expressionInMemoryPriority = expressionInMemoryPriority.slice(1);

        expressionInMemory += expressionInMemoryPriority ? `${operatorInMemory3} ${expressionInMemoryPriority}` : ` * ${currentNumberValue}`;
        operatorInMemory3 = '';

        expressionInMemoryPriority = '';

        divOperatorEle.classList.remove('operator-active');
        mulOperatorEle.classList.add('operator-active');
        subOperatorEle.classList.remove('operator-active');
        sumOperatorEle.classList.remove('operator-active');
        break;
      case 'sub':
        if (expressionInMemoryPriority[0] === '*' || expressionInMemoryPriority[0] === '/') expressionInMemoryPriority = expressionInMemoryPriority.slice(1);
        expressionInMemory +=  `- ${ currentNumberValue}`;
       
        expressionInMemoryPriority = '';
        divOperatorEle.classList.remove('operator-active');
        mulOperatorEle.classList.remove('operator-active');
        subOperatorEle.classList.add('operator-active');
        sumOperatorEle.classList.remove('operator-active');
        break;
  
      case 'sum':
        if (expressionInMemoryPriority[0] === '*' || expressionInMemoryPriority[0] === '/') expressionInMemoryPriority = expressionInMemoryPriority.slice(1);
        console.log('sum currentNum: ', currentNumberValue);
        expressionInMemory +=  `+ ${ currentNumberValue}`;
        
        expressionInMemoryPriority = '';
        divOperatorEle.classList.remove('operator-active');
        mulOperatorEle.classList.remove('operator-active');
        subOperatorEle.classList.remove('operator-active');
        sumOperatorEle.classList.add('operator-active');
        break;
    }

    isClickOperator = false;
  }
  
  return expressionInMemory;
} 


const handleOperatorClick = (operator) => {

  const currentValueString = getCurrentStringValue();
  const numberInMemory = Number(strValueInMemory);
  
  if(!expressionInMemory) {
    expressionInMemory = currentValueString;
    
    operatorInMemory = operator;
    setUpdateResult(currentValueString);
    tempFunc();
    temp = 0;
    return;
  }
  let newExpression;
  
  if (calPriority) {
    
    operatorInMemory2 = operator;
    newExpression = handleResultDivAndMul();
    
    setUpdateResult(currentValueString);
    calPriority = false;
  } else {
    
    if(operatorInMemory2) {
      handleResultDivAndMul();
      operatorInMemory2 = '';
    }

    setUpdateResult(resultCalWithOperator());
    expressionInMemory = getCurrentStringValue();
    calPriority= false;
    operatorInMemory2 = '';
  }
  
  // strValueInMemory = resultCalWithOperator();
  console.log('expressionInMemoryPriority: ', expressionInMemoryPriority);
  console.log('expressionInMemory: ', expressionInMemory);
  
  operatorInMemory = operator;
  tempFunc()
  // setUpdateResult('0');
  temp = 0;
  
}


const tempFunc = () => {
  switch(operatorInMemory) {
    case 'div': 
      divOperatorEle.classList.add('operator-active');
      mulOperatorEle.classList.remove('operator-active');
      subOperatorEle.classList.remove('operator-active');
      sumOperatorEle.classList.remove('operator-active');
      break;
    case 'mul':
      divOperatorEle.classList.remove('operator-active');
      mulOperatorEle.classList.add('operator-active');
      subOperatorEle.classList.remove('operator-active');
      sumOperatorEle.classList.remove('operator-active');
      break;
    case 'sub':
      divOperatorEle.classList.remove('operator-active');
      mulOperatorEle.classList.remove('operator-active');
      subOperatorEle.classList.add('operator-active');
      sumOperatorEle.classList.remove('operator-active');
      break;

    case 'sum':
      divOperatorEle.classList.remove('operator-active');
      mulOperatorEle.classList.remove('operator-active');
      subOperatorEle.classList.remove('operator-active');
      sumOperatorEle.classList.add('operator-active');
      break;
  }
  
}

// Event Click of Numbers Button

for (let i = 0 ; i < listNumberEle.length ; i++) {
  listNumberEle[i].addEventListener('click', () => {
    handleNumberClick(i);
    removeOperatorActive();
  });
}

dotDecimalEle.addEventListener('click', () => {
  const currentStringValue = getCurrentStringValue();

  if (!currentStringValue.includes('.')) {
    setUpdateResult(currentStringValue + '.')
  }
  removeOperatorActive();
});

// Event click func

acFuncEle.addEventListener('click', () => {
  setUpdateResult('0');

  if (toggleACAndC) removeOperatorActive();

  toggleACAndC = true;
  acFuncEle.textContent = toggleACAndC ? 'AC' : 'C';
  
  strValueInMemory = '';
  operatorInMemory = '';
  expressionInMemory = '';
  expressionInMemoryPriority = '';
  operatorInMemory2 = '';
  operatorInMemory3 = '';
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
  const percentResult = Number(currentStringValue) / 100;
  setUpdateResult(percentResult.toString());
});

// Event click of operator

divOperatorEle.addEventListener('click', () => {
  calPriority = true;
  // operatorInMemory3 = '/';
  handleOperatorClick('div');
});

mulOperatorEle.addEventListener('click', () => {
  calPriority = true;
  // operatorInMemory3 = '*';
  handleOperatorClick('mul');
});

subOperatorEle.addEventListener('click', () => {
  operatorInMemory3 = '-';
  handleOperatorClick('sub');
});

sumOperatorEle.addEventListener('click', () => {
  operatorInMemory3 = '+';
  handleOperatorClick('sum');
});

equalOperatorEle.addEventListener('click', () => {
  const numberInMemory = Number(strValueInMemory);
  const currentStringValue = getCurrentStringValue();
  const currentNumberValue = Number(currentStringValue);
  if(expressionInMemory){
    if (operatorInMemory2) {
      const resultOp = handleResultDivAndMul();
      // setUpdateResult(resultCalWithOperator());
    }
    setUpdateResult(resultCalWithOperator());
    operatorInMemory = null;
    expressionInMemory =  '';
    expressionInMemoryPriority = '';
  }
  removeOperatorActive();
});


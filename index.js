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
let expressionInMemory = null;


let temp = 1;
let toggleACAndC = true;

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

  const [number, decimal] = numberStr.split('.');

  if (decimal) {
    resultCal.textContent = Number(number).toLocaleString() + '.' + decimal;
  } else {
    resultCal.textContent = Number(number).toLocaleString();
  }
  

}


const handleNumberClick = (number) => {
  const currentStringValue = getCurrentStringValue();
  toggleACAndC = false;

  acFuncEle.textContent = toggleACAndC ? 'AC' : 'C';


  const compare = temp !== null ? temp : currentStringValue;
  if (compare.toString() === '0') {
    setUpdateResult(number.toString());
    temp = 1;
    return;
  }
  
  setUpdateResult(currentStringValue + number);

}

const resultCalWithOperator = () => {
  const currentStringValue = getCurrentStringValue();
  const currentNumberValue = Number(currentStringValue);
  const numberInMemory = Number(strValueInMemory);
  let result;

  
  switch(operatorInMemory) {
    case 'div': 
      result = currentNumberValue ? numberInMemory / currentNumberValue : currentNumberValue;
      divOperatorEle.classList.add('operator-active');
      mulOperatorEle.classList.remove('operator-active');
      subOperatorEle.classList.remove('operator-active');
      sumOperatorEle.classList.remove('operator-active');
      break;
    case 'mul':
      result = numberInMemory * currentNumberValue;
      divOperatorEle.classList.remove('operator-active');
      mulOperatorEle.classList.add('operator-active');
      subOperatorEle.classList.remove('operator-active');
      sumOperatorEle.classList.remove('operator-active');
      break;
    case 'sub':
      result = numberInMemory - currentNumberValue;
      divOperatorEle.classList.remove('operator-active');
      mulOperatorEle.classList.remove('operator-active');
      subOperatorEle.classList.add('operator-active');
      sumOperatorEle.classList.remove('operator-active');
      break;

    case 'sum':
      result = numberInMemory + currentNumberValue;
      divOperatorEle.classList.remove('operator-active');
      mulOperatorEle.classList.remove('operator-active');
      subOperatorEle.classList.remove('operator-active');
      sumOperatorEle.classList.add('operator-active');
      break;
  }
  
  return result.toString();
} 

// const resultCalWithOperator1 = () => {
//   const currentStringValue = getCurrentStringValue();
//   const currentNumberValue = Number(currentStringValue);
//   const numberInMemory = Number(strValueInMemory);
//   let result;

  
//   switch(operatorInMemory) {
//     case 'div': 
//       result = currentNumberValue ? numberInMemory / currentNumberValue : currentNumberValue;
//       divOperatorEle.classList.add('operator-active');
//       mulOperatorEle.classList.remove('operator-active');
//       subOperatorEle.classList.remove('operator-active');
//       sumOperatorEle.classList.remove('operator-active');
//       break;
//     case 'mul':
//       result = numberInMemory * currentNumberValue;
//       divOperatorEle.classList.remove('operator-active');
//       mulOperatorEle.classList.add('operator-active');
//       subOperatorEle.classList.remove('operator-active');
//       sumOperatorEle.classList.remove('operator-active');
//       break;
//     case 'sub':
//       result = numberInMemory - currentNumberValue;
//       divOperatorEle.classList.remove('operator-active');
//       mulOperatorEle.classList.remove('operator-active');
//       subOperatorEle.classList.add('operator-active');
//       sumOperatorEle.classList.remove('operator-active');
//       break;

//     case 'sum':
//       result = numberInMemory + currentNumberValue;
//       divOperatorEle.classList.remove('operator-active');
//       mulOperatorEle.classList.remove('operator-active');
//       subOperatorEle.classList.remove('operator-active');
//       sumOperatorEle.classList.add('operator-active');
//       break;
//   }
  
//   return result.toString();
// } 


const handleOperatorClick = (operator) => {

  const currentValueString = getCurrentStringValue();
  const numberInMemory = Number(strValueInMemory);
  
  if(!strValueInMemory) {
    strValueInMemory = currentValueString;
    
    operatorInMemory = operator;
    
    setUpdateResult(currentValueString);
    resultCalWithOperator();
    temp = 0;
    return;
  }

  console.log('str1', strValueInMemory);

  setUpdateResult(resultCalWithOperator());
  
  // strValueInMemory = resultCalWithOperator();

  strValueInMemory = getCurrentStringValue();
  operatorInMemory = operator
  resultCalWithOperator()
  // setUpdateResult('0');
  temp = 0;
  
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
});

// Event click func

acFuncEle.addEventListener('click', () => {
  setUpdateResult('0');

  if (toggleACAndC) removeOperatorActive();

  toggleACAndC = true;
  acFuncEle.textContent = toggleACAndC ? 'AC' : 'C';
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
  const percentResult = Number(currentStringValue) / 100;
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
  const numberInMemory = Number(strValueInMemory);
  const currentStringValue = getCurrentStringValue();
 
  if(strValueInMemory){
    setUpdateResult(resultCalWithOperator());
    operatorInMemory = null;
    strValueInMemory = null;
  }
  removeOperatorActive();
});


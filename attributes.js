let data = require('./data/shortdata');

// console.log(data);

// re = /(\d+\.?\d+)/g;

// let x = data.map(findWidths);

x = document.querySelectorAll('.option_value')
x = Array.from(x)

let allOptions = x.map((el) => {
  let element = el;
  let widths = findWidths(el.innerText);
  return {element, widths}
})

console.log(allOptions);

function findWidths(el) {
  // regRanges = /(\d+\.?\d+-\d+\.?\d+(-\d+\.?\d+)*)/g;
  // regValues = /(\d+\.?\d+)/g;
  regMm = /(-\d+mm)/g;
  const cleanElement = el.replace(regMm, '');

  const widthStr = retrieveWidth(cleanElement);
  const width = splitToNumbers(widthStr);

  return width;
  // return {el, width};
}


function splitToNumbers(str){
  const regValues = /(\d+\.?\d+)/g;
  return str.match(regValues).map(x => parseFloat(x));  
}

function retrieveWidth(str, volumeLimit = 2) {
  const dimensions = str.split('x');
  const maximums = dimensions.map(dimension => Math.max(...splitToNumbers(dimension)));
  const max = Math.max(...maximums.slice(0,volumeLimit)); // consider only first two dimensions. third is height
  const index = maximums.indexOf(max);
  return dimensions[index];
}

// const width = retrieveWidth(str4);
// console.log(splitToNumbers(width));
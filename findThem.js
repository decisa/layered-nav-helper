var MIN = 328.93;
var MAX = 1331.47;
var SELECTOR = '.option_value';

function findThem(min_included, max_not_included, selector = '.option_value'){
  let x = document.querySelectorAll(selector);
  x = Array.from(x)

  let allOptions = x.map((el) => {
    let element = el;
    let widths = findWidths(el.innerText);
    return {element, widths}
  })

  allOptions.forEach(option => {
    const inRange = (width) =>  (width >= min_included) && (width < max_not_included);
    let checkbox = option.element.parentElement.previousElementSibling.firstElementChild;

    if (option.widths.some(inRange)) {
      if (checkbox.checked) {
        // checkbox is checked and it is correct
        console.log(`${option.element.innerText} is correct, checked = ${checkbox.checked}`);
        option.element.style.background = '#aaffda';
        option.element.style.color = '#333';
        option.element.style.padding = '5px';

      }
      else{
        // checkbox is not checked but needs to be.
        console.log(`${option.element.innerText} was checked, checked = ${checkbox.checked}`);
        option.element.style.background = '#fff586';
        option.element.style.color = '#333';
        option.element.style.padding = '5px';
        checkbox.click();
      }     
    }
    else if (checkbox.checked){
      // checkbox is checked but shouldn't be.
      console.log(`${option.element.innerText} had to be unchecked, checked = ${checkbox.checked}`);
      console.log(`widths = ${option.widths}, min = ${min_included}, max = ${max_not_included}`);
      option.element.style.background = '#cd2027';
      option.element.style.color = '#fff';
      option.element.style.padding = '5px';
      checkbox.click();
    }
    else {
      // checkbox is checked but shouldn't be.
      option.element.style.background = '';
      option.element.style.color = '#333';
      option.element.style.padding = '0px 5px';           
    }
  })
}

function findWidths(el) {
  regMm = /(-\d+mm)/g;
  const cleanElement = el.replace(regMm, '');

  const widthStr = retrieveWidth(cleanElement);
  const width = splitToNumbers(widthStr);

  return width;
}

function splitToNumbers(str){
  const regValues = /(\d+\.?\d+)/g;
  return str.match(regValues).map(x => parseFloat(x));  
}

function retrieveWidth(str, volumeLimit = 2) {
  const dimensions = str.split(/x|X|×/);
  const maximums = dimensions.map(dimension => Math.max(...splitToNumbers(dimension)));
  const max = Math.max(...maximums.slice(0,volumeLimit)); // consider only first two dimensions. third is height
  const index = maximums.indexOf(max);
  return dimensions[index];
}

findThem(MIN, MAX, SELECTOR);
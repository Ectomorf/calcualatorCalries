let submitButton = document.querySelector('.submit');
let resetButton = document.querySelector('.reset');
let genderButtons = document.querySelectorAll('.calculator-gender__item');
let forms = document.forms[0];
let physDataInputs = document.querySelectorAll('.data');
let resultContainer = document.querySelector('.results__container');
let resultFields = document.querySelectorAll('.cal');

let physicalDate;
let gender = 'men';
let physicalActivityLvl = 'min';
let ratioActivity = {min: 1.2,
                     low: 1.375,
                     med: 1.55,
                     height: 1.725,
                     veryHeight: 1.9};


let resultNorm = 0;
let resultLostWeigth = 0;
let resultWeightGain = 0;

initGenderButton(genderButtons);

for (let input of physDataInputs) {

    input.addEventListener('input', resetEnabiled);
    input.addEventListener('input', submitEnabiled);

}

submitButton.addEventListener('click', e => {

    physicalDate = {age:forms.elements.age.value, growth:forms.elements.growth.value, weight:forms.elements.weight.value}

    for (elem of forms.elements.physicalActivity) {
        if (elem.checked) physicalActivityLvl = elem.id;
    }

    resultNorm = calculateCalorieRate(gender, physicalDate, physicalActivityLvl);
    resultLostWeigth = Math.round(resultNorm * 0.80);
    resultWeightGain = Math.round(resultNorm * 1.15);

    getCal(resultContainer, resultFields)
    
    e.target.classList.add('disabled-submit');
    submitButton.disabled = true;

    e.preventDefault();
});

resetButton.addEventListener('click', e => {

    submitButton.classList.add('disabled-submit');
    submitButton.disabled = true;

    resultContainer.classList.remove('active');

    resetButton.classList.add('disabled-reset');
});

function initGenderButton (buttons) {

    for (let button of buttons) {

        button.addEventListener('click', selectGender);
    }
}

function selectGender () {

    if (this.classList.contains('men')) {
        this.classList.add('selected-gender');
        genderButtons[1].classList.remove('selected-gender')
        gender = 'man'
    }  else {
        this.classList.add('selected-gender');
        genderButtons[0].classList.remove('selected-gender');
        gender = 'woman';
    }
}

function submitEnabiled() {
    let filledInputs = checkInputs(physDataInputs);

    if (filledInputs > 2 ) {
        submitButton.classList.remove('disabled-submit');
        submitButton.disabled = false;
    }
} 

function resetEnabiled() {

    let filledInputs = checkInputs(physDataInputs);

    if (filledInputs >= 1) {
        resetButton.classList.remove('disabled-reset');
        resetButton.disabled = false;
    }

}

function checkInputs (inputs) {
    let counter = 0;

    for (let input of inputs) {

        if (input.value) counter++;
        
    }

    return counter;
}

function calculateCalorieRate (gender, physicalDate, activityLvl) {
    let result = 0;

    if (gender == 'men') {
        result = 88.36 + (13.4 * physicalDate.weight) + (4.8 * physicalDate.growth) - (5.7 * physicalDate.age);
    } else {
        result = 447.6 + (9.2 * physicalDate.weight) + (3.1 * physicalDate.growth) - (4.3 * physicalDate.age);
    }
    
    return Math.round(result * ratioActivity[activityLvl]);
}

function getCal(parent, arr) {

    for (let field of arr) {
        if (field.classList.contains('maintaining-weight')) field.textContent = resultNorm;
        if (field.classList.contains('lost-weight')) field.textContent = resultLostWeigth;
        if (field.classList.contains('weight-gain')) field.textContent = resultWeightGain;
    }

    parent.classList.add('active');
}
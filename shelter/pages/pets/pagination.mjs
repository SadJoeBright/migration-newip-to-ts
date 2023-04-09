import  petsData  from "../main/petsData.mjs";
let mainArr = [];
let subArr = [];
for (let j = 0; mainArr.length < 6; j ++) {
    subArr = [];
    for (let i = 0; subArr.length < 8; i ++) {
        let randomNumber = Math.floor(Math.random()*8);
        if (!subArr.includes(randomNumber)){
            subArr.push(randomNumber);
        }      
    }
    mainArr.push(subArr)
}

let resultArr = [];
mainArr.forEach((el) => {
    resultArr.push(el.slice(0,3));
    resultArr.push(el.slice(3,6));
    resultArr.push(el.slice(6));
})
resultArr = resultArr.flat();


function getnumberOfCards() {
    if (window.innerWidth >= 1280) return 8;
    if (768 <= window.innerWidth && window.innerWidth < 1280) return 6;
    if (window.innerWidth < 768) return 3;
}


function createCard (petsNumber) {
    let petCard = document.createElement("div");
    petCard.setAttribute('class', 'card');
    petCard.insertAdjacentHTML('beforeend', `<img class src=${petsData[petsNumber].img} alt=${petsData[petsNumber].name}><h3 class="pet_name">${petsData[petsNumber].name}</h3><button class="button_secondary">Learn more</button>`);
    return petCard
}


let startIndex = 0;
function fillCardContainer (numberOfCards) {
    let cardContainer = document.querySelector('.card__container');
    for (let i = startIndex; i < startIndex + numberOfCards; i++) {
        cardContainer.append(createCard(resultArr[i]));
       
    }
}

let btnNext = document.getElementById("nextPage");
let btnLast = document.getElementById("lastPage");
let btnPrev = document.getElementById("prevPage");
let btnFirst = document.getElementById("firstPage");
let pageNumber = document.querySelector(".nav_button_1");

btnNext.disabled = false;
btnLast.disabled = false;
btnPrev.disabled = true;
btnFirst.disabled = true;



function nextPage () {
    btnPrev.disabled = false;
    btnPrev.classList.remove('nav_button_inactive');
    btnPrev.classList.add('nav_button_active');
    btnFirst.disabled = false;
    btnFirst.classList.remove('nav_button_inactive');
    btnFirst.classList.add('nav_button_active');
    startIndex += getnumberOfCards();
    pageNumber.textContent = `${startIndex/ getnumberOfCards() + 1}`;
    if (startIndex === 47 - getnumberOfCards() + 1) {
        btnNext.disabled = true;
        btnNext.classList.remove('nav_button_active');
        btnNext.classList.add('nav_button_inactive');
        btnLast.disabled = true;
        btnLast.classList.remove('nav_button_active');
        btnLast.classList.add('nav_button_inactive');
    }
    let cardContainer = document.querySelector('.card__container');
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
      }
    fillCardContainer(getnumberOfCards())
}

function lastPage () {
    btnNext.disabled = true;
    btnNext.classList.remove('nav_button_active');
    btnNext.classList.add('nav_button_inactive');
    btnLast.disabled = true;
    btnLast.classList.remove('nav_button_active');
    btnLast.classList.add('nav_button_inactive');
    btnPrev.disabled = false;
    btnPrev.classList.remove('nav_button_inactive');
    btnPrev.classList.add('nav_button_active');
    btnFirst.disabled = false;
    btnFirst.classList.remove('nav_button_inactive');
    btnFirst.classList.add('nav_button_active');
    startIndex = 47 - getnumberOfCards() + 1;
    pageNumber.textContent = `${startIndex/ getnumberOfCards() + 1}`;
    let cardContainer = document.querySelector('.card__container');
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
      }
    fillCardContainer(getnumberOfCards())
   
}

btnNext.addEventListener('click', nextPage);

btnLast.addEventListener('click', lastPage);

function prevPage () {
    btnNext.disabled = false;
    btnNext.classList.remove('nav_button_inactive');
    btnNext.classList.add('nav_button_active');
    btnLast.disabled = false;
    btnLast.classList.remove('nav_button_inactive');
    btnLast.classList.add('nav_button_active');
    startIndex -= getnumberOfCards();
    pageNumber.textContent = `${startIndex/ getnumberOfCards() + 1}`;
    if (startIndex === 0) {
        btnPrev.disabled = true;
        btnPrev.classList.remove('nav_button_active');
        btnPrev.classList.add('nav_button_inactive');
        btnFirst.disabled = true;
        btnFirst.classList.remove('nav_button_active');
        btnFirst.classList.add('nav_button_inactive');
    }
    let cardContainer = document.querySelector('.card__container');
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
      }
    fillCardContainer(getnumberOfCards())
}

btnPrev.addEventListener('click', prevPage);


function firstPage () {
    btnPrev.disabled = true;
    btnPrev.classList.remove('nav_button_active');
    btnPrev.classList.add('nav_button_inactive');
    btnFirst.disabled = true;
    btnFirst.classList.remove('nav_button_active');
    btnFirst.classList.add('nav_button_inactive');
    btnNext.disabled = false;
    btnNext.classList.remove('nav_button_inactive');
    btnNext.classList.add('nav_button_active');
    btnLast.disabled = false;
    btnLast.classList.remove('nav_button_inactive');
    btnLast.classList.add('nav_button_active');
    startIndex = 0;
    pageNumber.textContent = `${startIndex/ getnumberOfCards() + 1}`;
    let cardContainer = document.querySelector('.card__container');
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
      }
    fillCardContainer(getnumberOfCards())    
}

btnFirst.addEventListener('click', firstPage);

fillCardContainer(getnumberOfCards())

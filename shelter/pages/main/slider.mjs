import  petsData  from "../main/petsData.mjs";
let cardContainer = document.querySelector('.card__container')
// let sliderWrapper = document.querySelector('.slider-wrapper');


function createCard (petsNumber) {
    let petCard = document.createElement("div");
    petCard.setAttribute('class', 'card');
    petCard.setAttribute('id', `${petsData[petsNumber].name}`);
    petCard.insertAdjacentHTML('beforeend', `<img class src=${petsData[petsNumber].img} alt=${petsData[petsNumber].name}><h3 class="pet_name">${petsData[petsNumber].name}</h3><button class="button_secondary">Learn more</button>`);
    return petCard
}

let prevNextArr = null;
function createArrays (numberOfCards) {
    let currentArr = [];
    let nextArr = [];
    if (prevNextArr !== null) currentArr = prevNextArr;
      
    
    for (let i = 0; nextArr.length < numberOfCards; i ++) {
        let randomNumber = Math.floor(Math.random()*8);
        if (!currentArr.includes(randomNumber) && !nextArr.includes(randomNumber)){
            nextArr.push(randomNumber);
        }      
    }
    prevNextArr = nextArr;
    return {currentArr, nextArr}
}



function fillCardContainer (numberOfCards, direction = 'right') {
    let {currentArr, nextArr} =  createArrays(getnumberOfCards());
    
    for (let i = 0; i < numberOfCards; i++) {
        if (direction === 'right') {
            cardContainer.append(createCard(nextArr[i]))
        }
        if (direction ==='left') {
            cardContainer.prepend(createCard(nextArr[i]))
        }
    }
}

fillCardContainer(getnumberOfCards());
// window.addEventListener('resize', fillCardContainer(getnumberOfCards()))

function getnumberOfCards() {
    if (window.innerWidth >= 1280) return 3;
    if (768 <= window.innerWidth && window.innerWidth < 1280) return 2;
    if (window.innerWidth < 768) return 1;
}


function moveRight () {
    btnRight.removeEventListener('click', moveRight);
    cardContainer.style.justifyContent = 'flex-start';
    fillCardContainer(getnumberOfCards());
    let containerWidth = window.getComputedStyle(cardContainer).width;
    let containerGap = window.getComputedStyle(cardContainer).gap;
    cardContainer.style.transition = 'all ease-in-out 1s'; 
    cardContainer.style.transform = `translatex(-${containerWidth}) translatex(-${containerGap})`;
        setTimeout (() => {
            for (let i = 0; i < getnumberOfCards(); i++) {
                cardContainer.firstElementChild.remove();
            }
            cardContainer.style.transition = 'none'; 
            cardContainer.style.transform = 'translateX(0)';
            btnRight.addEventListener('click', moveRight)
        }, 1000)
}

function moveLeft () {
    btnLeft.removeEventListener('click', moveLeft);
    cardContainer.style.justifyContent = 'flex-end';
    fillCardContainer(getnumberOfCards(), 'left');
    let containerWidth = window.getComputedStyle(cardContainer).width;
    let containerGap = window.getComputedStyle(cardContainer).gap;
    cardContainer.style.transition = 'all ease-in-out 1s'; 
    cardContainer.style.transform = `translatex(${containerWidth}) translatex(${containerGap})`;
        setTimeout (() => {
            for (let i = 0; i < getnumberOfCards(); i++) {
                cardContainer.lastElementChild.remove();
            }
            cardContainer.style.transition = 'none'; 
            cardContainer.style.transform = 'translateX(0)';
            btnLeft.addEventListener('click', moveLeft)
        }, 1000)
}





const btnRight = document.getElementById("btn-right");
const btnLeft = document.getElementById("btn-left");
btnRight.addEventListener('click', moveRight);
btnLeft.addEventListener('click', moveLeft);



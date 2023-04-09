import  petsData  from "./petsData.";
let sliderWrapper = document.querySelector('.slider-wrapper');


function createCard (petsNumber) {
    let petCard = document.createElement("div");
    petCard.setAttribute('class', 'card');
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
    let cardContainer = document.createElement('div');
    cardContainer.setAttribute('class', 'card__container');
    for (let i = 0; i < numberOfCards; i++) {
        cardContainer.append(createCard(nextArr[i]));
        if (direction === 'right') {
            sliderWrapper.append(cardContainer)
        }
        if (direction ==='left') {
            sliderWrapper.prepend(cardContainer)
        }
    }
}

fillCardContainer(getnumberOfCards());


function getnumberOfCards() {
    if (window.innerWidth >= 1280) return 3;
    if (768 <= window.innerWidth && window.innerWidth < 1280) return 2;
    if (window.innerWidth < 768) return 1;
}


function moveRight () {
    btnRight.removeEventListener('click', moveRight);
    sliderWrapper.style.justifyContent = 'flex-start';
    fillCardContainer(getnumberOfCards());
    let cardContainer = document.querySelectorAll('.card__container');
    Array.from(cardContainer).forEach(el => {
        el.classList.add('move-right')
    })
    // cardContainer[1].style.transition = 'all ease-in-out 1s'; 
    // cardContainer[1].style.transform = 'translatex(-100%)';
        setTimeout (() => {
            // for (let i = 0; i < getnumberOfCards(); i++) {
                // cardContainer[0].remove();
            // }
            // cardContainer[1].style.transition = 'none'; 
            // cardContainer[1].style.transform = 'translateX(0)';
            btnRight.addEventListener('click', moveRight)
        }, 2000)
}

function moveLeft () {
    btnLeft.removeEventListener('click', moveLeft);
    cardContainer.parentElement.style.justifyContent = 'flex-end';
    fillCardContainer(getnumberOfCards(), 'left');
    cardContainer.style.transition = 'all ease-in-out 1s'; 
    cardContainer.style.transform = 'translateX(20%)';
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



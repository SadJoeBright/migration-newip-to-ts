import  petsData  from "../main/petsData.mjs";
let modal_winow = document.querySelector('.modal_window');
let modal_wrapper = document.querySelector('.modal_wrapper');
let close_btn = document.querySelector('.close_button');
console.log(1);

function openModal(event) {

	if (event.target.parentNode.className === "card" ||
		event.target.className === "card") {
		const petName = event.target.id || event.target.parentNode.id;
		const currentPet = petsData.filter((item) => item.name === petName);

		modal_winow.classList.add('modal_window_opened');
		modal_wrapper.classList.add('modal_wrapper_opened');
		document.querySelector('.modal_window-img').children[0].setAttribute('src', currentPet[0].img);
		
		document.querySelector('.modal_window-name').innerText = currentPet[0].name;
		document.querySelector('.modal_window-breed').innerText =
		`${currentPet[0].type} - ${currentPet[0].breed}`;
		document.querySelector('.modal_window-description').innerText =
		currentPet[0].description;
		document.querySelector('.modal_window-age').innerHTML = `<b>Age: </b>${currentPet[0].age}`;
		document.querySelector('.modal_window-inoculations').innerHTML =
		`<b>Inoculations: </b>${currentPet[0].inoculations}`;
		document.querySelector('.modal_window-diseases').innerHTML = `<b>Diseases: </b>${currentPet[0].diseases}`;
		document.querySelector('.modal_window-parasites').innerHTML = `<b>Parasites: </b>${currentPet[0].parasites}`;
		// document.documentElement.style.overflowY = 'hidden';	
		document.documentElement.style.overflow = 'hidden';
		document.documentElement.style.marginRight = 'calc(-1 * (100vw - 100%))';
		// document.body.style.position = 'fixed';
  		// document.body.style.overflowY = 'scroll';
	}
}

function closeModal(event) {
	if (event.target.classList.contains('modal_wrapper') ||
		event.currentTarget.classList.contains('close_button')) {
		modal_winow.classList.remove('modal_window_opened');
		modal_wrapper.classList.remove('modal_wrapper_opened');
		// document.body.style.position = 'static';
      	document.documentElement.style.overflow = 'visible';
		document.documentElement.style.marginRight = '0';
		//   document.documentElement.style.overflowY = 'visible';	
	}
}

const cardContainer = document.querySelector('.card__container');
cardContainer.addEventListener("click", openModal);
cardContainer.addEventListener("click", (event) => console.log(event.target.parentNode));
modal_wrapper.addEventListener("click", closeModal);
close_btn.addEventListener("click", closeModal);
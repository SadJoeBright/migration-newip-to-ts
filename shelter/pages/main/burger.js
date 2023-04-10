let logo = document.querySelector('.Logo');
let burger = document.querySelector('.burger');
let nav = document.querySelector('.Nav__menu');
let list = document.querySelector('.nav_list');
let navigationItems = document.querySelectorAll('.nav_item');

function openMenu(){
	burger.classList.add('burger_active');
	nav.classList.add('menu-open');
	list.classList.add('list-open');
	document.body.style.overflow = 'hidden';
}

function closeMenu(){
	burger.classList.remove('burger_active');
	nav.classList.remove('menu-open');
	list.classList.remove('list-open');
	document.body.style.overflow = 'visible';	
}

burger.addEventListener('click', () =>{
	if(list.classList.contains('list-open')){
		closeMenu();
	}
	else{
		openMenu();
	}
})

nav.addEventListener('click', (e) => {
	if(e.target.classList.contains('Nav__menu')){
		closeMenu();
	}
})

navigationItems.forEach(item => {
	item.addEventListener('click', () => {
		closeMenu();
	})
})
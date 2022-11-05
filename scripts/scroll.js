//creation of variables corresponding to elements of the DOM
const cheveron = document.getElementById('cheveron');
const sections = [...document.querySelectorAll("section")];
const nav = [...document.querySelectorAll(".navs")];

const presunderline = document.querySelectorAll('.presunderline');



let sectionsPosition;

function positionCalculation(){ //function that allows to have the top point of a section
	sectionsPosition = sections.map(section => section.offsetTop)
}
positionCalculation()


window.addEventListener("load", ()=>{//when the page is load
	document.querySelector('body').classList.remove('noscroll');//remove scroll block from the body
	document.getElementById('loader').style.display='none';//turn off the loader

	document.querySelector('.logo-top').classList.add('logo-a'); //launches the logo animation
	document.querySelector('.logo-bot').classList.add('logo-a'); //launches the logo animation
	document.querySelector('.full-logo').classList.add('logo-b'); //launches the logo animation

	scroll(1,0) //trigger scroll event on load
	scroll(-1,0) //trigger scroll event on load

	if(window.location.toString().includes("?res=err") || window.location.toString().includes("?res=ok")){
		ScrollS(4);//scroll to the section contact if the url contains element that refers to the contact form
	}
});

let current = 0; //mostly visible section
let oldCurrent =0;//old mostly visible section
window.addEventListener('scroll', ()=>{

	sections.forEach(sec=>{ //determines which section is the most visible
		if(isInViewport(sec)){
			current = sections.indexOf(sec);
		}
	})

	if(current!=oldCurrent){//updtate navbar dots
		nav[current].classList.add('onpage');
		nav[oldCurrent].classList.remove('onpage');
		oldCurrent=current;
	}

	if(current == 0){
		document.querySelector('nav').classList.add('none');//hides the navbar if the current section is the welcome section
	}else document.querySelector('nav').classList.remove('none');//show the navbar if the current section is not the welcome section

	if(isInViewport(document.getElementById('heart'))){//launches the heart animation if the heart is in the viewport
		document.getElementById('heart').classList.add('animheart');
	}
	
	presunderline.forEach(e => { //launches the underlines animation if the underline is in the viewport
		if(isInViewport(e)){
			e.classList.add('presunderline-anim');
		}
	});
})

cheveron.addEventListener("click", ()=>{ScrollS(1)}); //Scroll down to the section about me if the cheveron is clicked.

nav.forEach(link => {//Scrolls to the section that corresponds to the dot on the navbar that you clicked.
	link.addEventListener("click", ()=>{
		ScrollS(nav.indexOf(link));
	})
})


window.addEventListener("resize", positionCalculation)//recalculates the top point of the sections when the window is resized

function ScrollS(index){//scrolls smoothly through the pages to the given section 
	window.scrollTo({
		top: sectionsPosition[index],
		behavior: "smooth"
	})
}



function isInViewport(section){//calculates if an element is predominantly in the viewport and returns a boolean
	let clientHeight = document.documentElement.clientHeight;
	let sectionY = section.getBoundingClientRect().y;
	let sectionH = section.getBoundingClientRect().height;
	if (clientHeight > sectionY + (sectionH * 2) / 3.5){
		return true
	}return false
}
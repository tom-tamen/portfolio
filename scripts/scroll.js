const cheveron = document.getElementById('cheveron');
const sections = [...document.querySelectorAll("section")];
const nav = [...document.querySelectorAll(".navs")];

let sectionsPosition;

function positionCalculation(){
	sectionsPosition = sections.map(section => section.offsetTop)
}
positionCalculation()



let current = 0;
let oldCurrent =0;
window.addEventListener('scroll', ()=>{
	sections.forEach(sec=>{
		if(isInViewport(sec)){
			current = sections.indexOf(sec);
		}
	})
	if(current!=oldCurrent){
		nav[current].classList.add('onpage');
		nav[oldCurrent].classList.remove('onpage');
		oldCurrent=current;
	}
	if(current == 0){
		document.querySelector('nav').classList.add('none')
	}else document.querySelector('nav').classList.remove('none') 
})

cheveron.addEventListener("click", ()=>{ScrollS(1)})

nav.forEach(link => {
	link.addEventListener("click", ()=>{
		ScrollS(nav.indexOf(link));
	})
})


window.addEventListener("resize", positionCalculation)

function ScrollS(index){
	window.scrollTo({
		top: sectionsPosition[index],
		behavior: "smooth"
	})
}


function isInViewport(section){
	let clientHeight = document.documentElement.clientHeight;
	let sectionY = section.getBoundingClientRect().y;
	let sectionH = section.getBoundingClientRect().height;
	if (clientHeight > sectionY + (sectionH * 2) / 3.5){
		return true
	}return false
}
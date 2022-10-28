if(isInViewport(document.getElementById('heart'))){
    document.getElementById('heart').classList.add('animheart')
}

function isInViewport(elem){
	let clientHeight = document.documentElement.clientHeight;
	let sectionY = elem.getBoundingClientRect().y;
	let sectionH = elem.getBoundingClientRect().height;
	if (clientHeight > sectionY + (sectionH)){
		return true
	}return false
}
const projects = [...document.querySelectorAll(".card-project")];
const details = document.querySelectorAll(".detail");
const exit = document.querySelector('.exit');
const body = document.querySelector('body');

projects.forEach(projet=>{
    projet.addEventListener('click', ()=>{
        body.style.overflow = "hidden";
        details[projects.indexOf(projet)].style.display ="block";
        exit.style.display ="block";
    })
})

exit.addEventListener('click',()=>{
    details.forEach(detail =>{
        detail.style.display ='none';
        exit.style.display='none'
        body.style.overflow = "scroll";
    })
})
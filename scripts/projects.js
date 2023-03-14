//creation of variables corresponding to elements of the DOM
const projects = [...document.querySelectorAll(".card-project")];
const details = document.querySelectorAll(".detail");
const exit = document.querySelector('.exit');
const body = document.querySelector('body');

projects.forEach(projet=>{//opens the details of a project if it is clicked
    projet.addEventListener('click', ()=>{
        body.style.overflow = "hidden";
        details[projects.indexOf(projet)].style.display ="block";
        exit.style.display ="block";
    })
})


exit.addEventListener('click',()=>{//exit the details if the exit button is pressed
    details.forEach(detail =>{
        detail.style.display ='none';
        exit.style.display='none'
        body.style.overflow = "scroll";
    })
})
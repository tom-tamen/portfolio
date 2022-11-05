//THE THREE.JS LIBRARY IS USED HERE !
const home = document.getElementById("galaxy"); //where our scene will be displayed
const scene = new THREE.Scene();//init the scene

//init the camera
const camera = new THREE.PerspectiveCamera(75, home.clientHeight / home.clientHeight, 0.01, 1000 ); 
camera.position.z = 1.5;
scene.add(camera); //add the camera to the scene

const textureloader = new THREE.TextureLoader(); //init texture loader 
const texture = textureloader.load("../img/galaxy/star.png");//init texture purple
const textureb = textureloader.load("../img/galaxy/stara.png");//init texture blue
textures =[texture,textureb];//put in an array to randomize later

let nbstars = 600; //number of stars in the scene
if (window.innerWidth <= 600 ){//number of stars divided by 4 if the user is on mobile
    nbstars /=4; 
}


//--------------------------------------------------------------------------------------------------------

//creation of a black box which will move at the same time as the camera to have the impression that the stars appear.
//without this box all the stars would be directly visible

const geometry = new THREE.BoxGeometry( 100, 100, 0 );//create the box
const materialCache = new THREE.MeshBasicMaterial( { color: 0x000000 } ); //create the box texture
const cube = new THREE.Mesh( geometry, materialCache );//put the two together
cube.position.z -= 4;//place away from the camera
scene.add( cube );// add it to the scene

//--------------------------------------------------------------------------------------------------------

//PURPLE STARS

//determines the x,y,z coordinates of the stars
const pointsL = new Float32Array(nbstars*3);
for(let i=0; i<pointsL.length; i++){
    pointsL[i]=THREE.MathUtils.randFloatSpread(4);
}

const Geo = new THREE.BufferGeometry();//create the environment for the stars
Geo.setAttribute("position", new THREE.Float32BufferAttribute(pointsL,3));//add the stars in this environement
const material = new THREE.PointsMaterial({//give texture to the stars
    map: texture,
    size: 0.03,
    alphaTest: 0.01,
    transparent: true
})

const pointsO = new THREE.Points(Geo, material);//combine both

const group = new THREE.Group();//create a group
group.add(pointsO);//add the points to the group
scene.add(group);//display group on scene

//--------------------------------------------------------------------------------------------------------DRY=FALSE :')

//BLUE STARS

//determines the x,y,z coordinates of the stars
const pointsL2 = new Float32Array(nbstars*3);
for(let i=0; i<pointsL2.length; i++){
    pointsL2[i]=THREE.MathUtils.randFloatSpread(4);
}

const Geo2 = new THREE.BufferGeometry();//create the environment for the stars
Geo2.setAttribute("position", new THREE.Float32BufferAttribute(pointsL2,3));//add the stars in this environement
const material2 = new THREE.PointsMaterial({//give texture to the stars
    map: textureb,
    size: 0.03,
    alphaTest: 0.01,
    transparent: true
})

const pointsO2 = new THREE.Points(Geo2, material2);//combine both

const group2 = new THREE.Group();//create a group
group2.add(pointsO2);//add the points to the group
group.add(group2);//display group on scene

//--------------------------------------------------------------------------------------------------------

//renderer settings
const renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});
renderer.setSize(home.clientWidth, home.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
home.appendChild(renderer.domElement);
renderer.render(scene, camera);

window.addEventListener('resize', ()=>{
    renderer.setSize(home.clientWidth, home.clientHeight);
});

//function to recreate groups
function createGroup(n, toClone){
    //How does it work?
    //As you have probably understood, a star group is composed of two subgroups. 
    //A blue star subgroup and a purple star subgroup. This function will copy and reverse a given group. 
    //It takes in parameter the number of group to create and a group (composed of two subgroups) of origin to copy.
    //the function returns a list of group objects.
    const clones = [toClone];
    let dynvar = [];
    for(let i=0; i<n; i++){
        dynvar[group+i]=toClone.clone();
        if(i%2==0){
            dynvar[group+i].rotation.y=180;
        }
        dynvar[group+i].position.z= -i-1;
        scene.add(dynvar[group+i]);
        allgroup.add(dynvar[group+i]);
        clones.push(dynvar[group+i]);
    }
    return clones;
}

const allgroup = new THREE.Group();
allgroup.add(group);
scene.add(allgroup);

createGroup(4, group); //create more groups


//--------------------------------------------------------------------------------------------------------

//this part determines if the Galaxy is visible enough for the user to be allowed to move it with his mouse.
let canMove = Boolean;
const firstsec=document.getElementById('first');
const clientHeight = document.documentElement.clientHeight;

window.addEventListener('scroll', () => {
    let firstsecY = firstsec.getBoundingClientRect().y;
    let firstsecH = firstsec.getBoundingClientRect().height;
    if (clientHeight/2.5 <= firstsecY + (firstsecH * 2) / 2){
        canMove = true;
    }else{
        canMove = false;
    }
});

//--------------------------------------------------------------------------------------------------------

let mouseX= 0;
let mouseY= 0;
window.addEventListener('mousemove', e=>{//get the coordinates of the mouse
    mouseX = e.clientX;
    mouseY = e.clientY;
})

let speedCam = 0.0005 //determinate the speed of the camera
let speed = 2; //determine the horizontal speed of the star's motion
let counter = 0;//incremented at each tick
let which = 0; //determines the position of the camera on the z axis (change every 4000 ticks)
function tick(){ //animation function
    renderer.render(scene, camera);
    requestAnimationFrame(tick);//this make animation functional (Look )
    
    if(canMove){
        const ratioX = (mouseX / window.innerWidth - 0.5)*speed //calculates the ratio in x
        const ratioY = (mouseY / window.innerHeight- 0.5*speed) //calculates the ratio in y
        allgroup.rotation.y = ratioX * Math.PI*0.02; //y rotate allgroup 
        allgroup.rotation.x = ratioY * Math.PI*0.02; //x rotate allgroup
    }
    
    if(which%2==0){//moves forward
        camera.position.z -= speedCam;
        cube.position.z -= speedCam
    }else{//moves backward
        camera.position.z += speedCam
        cube.position.z += speedCam
    }
    if(counter == 4000){//reset counter every 4000 ticks
        counter = 0;
        which++;
    }
    counter++;//counter increment
}

tick();

//fix on resize
window.addEventListener('resize', () =>{
    camera.aspect =  window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})
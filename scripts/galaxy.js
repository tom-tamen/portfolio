const home = document.getElementById("galaxy");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, home.clientHeight / home.clientHeight, 0.01, 1000 );
camera.position.z = 1.5;
scene.add(camera);

const textureloader = new THREE.TextureLoader();
const texture = textureloader.load("../img/star.png");
const textureb = textureloader.load("../img/stara.png");
textures =[texture,textureb];

let nbstars = 600;
if (window.innerWidth <= 600 ){
    nbstars /=4; 
}


//--------------------------------------------------------------------------------------------------------

const pointsL = new Float32Array(nbstars*3);
for(let i=0; i<pointsL.length; i++){
    pointsL[i]=THREE.MathUtils.randFloatSpread(4);
}

const geometry = new THREE.BoxGeometry( 100, 100, 0 );
const materialCache = new THREE.MeshBasicMaterial( { color: 0x000000 } );
const cube = new THREE.Mesh( geometry, materialCache );
cube.position.z -= 4;
scene.add( cube );

const Geo = new THREE.BufferGeometry();
Geo.setAttribute("position", new THREE.Float32BufferAttribute(pointsL,3));
const material = new THREE.PointsMaterial({
    map: texture,
    size: 0.03,
    alphaTest: 0.01,
    transparent: true
})

const pointsO = new THREE.Points(Geo, material);

const group = new THREE.Group();
group.add(pointsO);
scene.add(group);

//--------------------------------------------------------------------------------------------------------DRY=FALSE :')

const pointsL2 = new Float32Array(nbstars*3);
for(let i=0; i<pointsL2.length; i++){
    pointsL2[i]=THREE.MathUtils.randFloatSpread(4);
}

const Geo2 = new THREE.BufferGeometry();
Geo2.setAttribute("position", new THREE.Float32BufferAttribute(pointsL2,3));
const material2 = new THREE.PointsMaterial({
    map: textureb,
    size: 0.03,
    alphaTest: 0.01,
    transparent: true
})

const pointsO2 = new THREE.Points(Geo2, material2);

const group2 = new THREE.Group();
group2.add(pointsO2);
group.add(group2);

//--------------------------------------------------------------------------------------------------------

const renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});
renderer.setSize(home.clientWidth, home.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
home.appendChild(renderer.domElement);
renderer.render(scene, camera);

window.addEventListener('resize', e=>{
    renderer.setSize(home.clientWidth, home.clientHeight);
});

function createGroup(n, toClone){
    const clones = [];
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

const groupsList = createGroup(4, group);
groupsList.unshift(group);

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

let mouseX= 0;
let mouseY= 0;
window.addEventListener('mousemove', e=>{
    mouseX = e.clientX;
    mouseY = e.clientY;
})

let speedCam = 0.0005 //0.0005
let speed = 2;
let counter = 0;
let which = 0;
function tick(){
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
    
    if(canMove){
        const ratioX = (mouseX / window.innerWidth - 0.5)*speed
        const ratioY = (mouseY / window.innerHeight- 0.5*speed)
        allgroup.rotation.y = ratioX * Math.PI*0.02;
        allgroup.rotation.x = ratioY * Math.PI*0.02;
    }
    
    if(which%2==0){
        camera.position.z -= speedCam;
        cube.position.z -= speedCam
    }else{
        camera.position.z += speedCam
        cube.position.z += speedCam
    }
    if(counter == 4000){// 6300
        counter = 0;
        which++;
    }
    counter+=1;
}

tick();

window.addEventListener('reszie', () =>{
    camera.aspect =  window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})
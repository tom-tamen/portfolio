const home = document.getElementById("galaxy");
const scene = new THREE.Scene();

// scene.add(new THREE.AxesHelper());

const camera = new THREE.PerspectiveCamera(75, home.clientHeight / home.clientHeight, 0.01, 1000 );
camera.position.z = 1.5;
camera.position.y = 0;
camera.position.x = 0;
scene.add(camera);


const textureloader = new THREE.TextureLoader();
const texture = textureloader.load("../img/star.png");
const textureb = textureloader.load("../img/stara.png");
textures =[texture,textureb];
// function getRandomFloat(min, max, decimals) {
//     const str = (Math.random() * (max - min) + min).toFixed(decimals);
//     return parseFloat(str);
// }

const pointsL = new Float32Array(500*3);
for(let i=0; i<pointsL.length; i++){
    pointsL[i]=THREE.MathUtils.randFloatSpread(4);
}


const geometry = new THREE.BoxGeometry( 100, 100, 0 );
const materialCache = new THREE.MeshBasicMaterial( { color: 0xf05122D } );
const cube = new THREE.Mesh( geometry, materialCache );
cube.position.z -= 4;
scene.add( cube );


const Geo = new THREE.BufferGeometry();
Geo.setAttribute("position", new THREE.Float32BufferAttribute(pointsL,3));
const material = new THREE.PointsMaterial({
    // map: textures[Math.floor(Math.random()*textures.length)],
    map: texture,
    size: 0.03,
    alphaTest: 0.01,
    transparent: true
})


const pointsO = new THREE.Points(Geo, material);


const group = new THREE.Group();
group.add(pointsO);
// group.position.z=-9
scene.add(group);

//--------------------------------------------------------------------------------------------------------

const pointsL2 = new Float32Array(500*3);
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
// group.position.z=-9
// scene.add(group2);

//--------------------------------------------------------------------------------------------------------




const renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});
renderer.setSize(home.clientWidth, home.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
home.appendChild(renderer.domElement);
renderer.render(scene, camera);

window.addEventListener('resize', e=>{
    renderer.setSize(home.clientWidth, home.clientHeight);
    // group.scale=1;
});


// const controls = new OrbitControls(camera, renderer.domElement);


let mouseX= 0;
let mouseY= 0;
window.addEventListener('mousemove', e=>{
    mouseX = e.clientX;
    mouseY = e.clientY;
})
// window.addEventListener('touchmove', e=>{
//     mouseX = e.clientX;
//     mouseY = e.clientY;
// })


// const groupTwo = group.clone();
// groupTwo.position.z=-1;
// groupTwo.rotation.y=180;
// scene.add(groupTwo)
// const groupTree = group.clone();
// groupTree.position.z=-2;
// scene.add(groupTree);

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
scene.add(allgroup)

const groupsList = createGroup(6, group);
groupsList.unshift(group);
console.log(groupsList)

const dlight = new THREE.DirectionalLight(0x198CFF);
dlight.position.set(0,0,1);
scene.add(dlight)

const smoke = textureloader.load("../img/smoke.png");
const cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
const matcloud = new THREE.MeshLambertMaterial({
    map: smoke,
    transparent: true,
    alphaTest: 0.0001
})

let allclouds = []

for(let i=0; i<3; i++){
    let cloud = new THREE.Mesh(cloudGeo, matcloud);
    cloud.position.set(Math.random()*800 -400,0, Math.random()*500-500);
    cloud.rotation.x = 1.16;
    cloud.rotation.y = -0.12;
    cloud.rotation.z = 2;
    cloud.material.opacity = 0.55;
    // scene.add(cloud);
    allclouds.push(cloud);

}

let counter = 0;
let which = 0;
function tick(){
    renderer.render(scene, camera);
    // controls.update();
    requestAnimationFrame(tick);
    


    const ratioX = (mouseX / window.innerWidth - 0.5)*2
    const ratioY = (mouseY / window.innerHeight- 0.5*2)
    allgroup.rotation.y = ratioX * Math.PI*0.02;
    allgroup.rotation.x = ratioY * Math.PI*0.02;
    
    allclouds.forEach(e=>{
        e.rotation.z-=0.0002;
    })
    camera.position.z -= 0.0005;
    cube.position.z -= 0.0005;
    if(counter == 6300){
        counter = 0;
        groupsList[which].position.z=camera.position.z-8;
        which++;
        if(which>=groupsList.length) which=0; 
    }
    counter+=1;
    console.log(which)
}


tick();

window.addEventListener('reszie', () =>{
    camera.aspect =  window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})
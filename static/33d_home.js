console.log("AI Smart Home 3D Loaded");

// ==========================
// Scene
// ==========================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd9ff);

// ==========================
// Camera
// ==========================
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// ==========================
// Renderer
// ==========================
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

// ==========================
// Lights
// ==========================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
sunLight.position.set(15, 20, 10);
sunLight.castShadow = true;

sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;

scene.add(sunLight);

// ==========================
// Orbit Controls
// ==========================
const controls = new THREE.OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;
controls.enablePan = true;
controls.enableZoom = true;

// ==========================
// Floor
// ==========================
const floor = new THREE.Mesh(
    new THREE.BoxGeometry(20, 0.2, 20),
    new THREE.MeshStandardMaterial({
        color: 0x999999
    })
);

floor.position.y = -0.1;
floor.receiveShadow = true;
scene.add(floor);

// ==========================
// Label Function
// ==========================
function createLabel(text, x, y, z) {

    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 100;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.fillRect(0, 0, 400, 100);

    ctx.fillStyle = "white";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 200, 50);

    const texture = new THREE.CanvasTexture(canvas);

    const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: texture,
            transparent: true
        })
    );

    sprite.position.set(x, y, z);
    sprite.scale.set(2, 0.5, 1);

    scene.add(sprite);
}

// ==========================
// Room Function
// ==========================
function createRoom(name, x, z, width, depth, color) {

    const room = new THREE.Mesh(

        new THREE.BoxGeometry(width, 0.3, depth),

        new THREE.MeshStandardMaterial({
            color: color
        })

    );

    room.position.set(x, 0.15, z);
    room.castShadow = true;
    room.receiveShadow = true;

    scene.add(room);

    createLabel(name, x, 1, z);
}

// ==========================
// Living Room
// ==========================

createRoom(
    "Living Room",
    0,
    3,
    5,
    4,
    0x90caf9
);

// Sofa
const sofa = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 0.5, 0.8),
    new THREE.MeshStandardMaterial({
        color: 0x8B4513
    })
);

sofa.position.set(0, 0.4, 3.5);
scene.add(sofa);

// Center Table
const centerTable = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.2, 0.8),
    new THREE.MeshStandardMaterial({
        color: 0xD2691E
    })
);

centerTable.position.set(0, 0.2, 2.4);
scene.add(centerTable);

// TV Table
const tvTable = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.4, 0.5),
    new THREE.MeshStandardMaterial({
        color: 0x444444
    })
);

tvTable.position.set(0, 0.3, 1.2);
scene.add(tvTable);

// TV
const tv = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1, 0.08),
    new THREE.MeshStandardMaterial({
        color: 0x111111
    })
);

tv.position.set(0, 1.1, 0.9);
scene.add(tv);


// ==========================
// Bedrooms
// ==========================

const totalBedrooms =
typeof bedrooms !== "undefined"
? Number(bedrooms)
: 2;

function createBedroom(number, x, z){

    createRoom(
        "Bedroom " + number,
        x,
        z,
        3,
        3,
        0xffccbc
    );

    // Bed
    const bed = new THREE.Mesh(
        new THREE.BoxGeometry(2,0.4,1.5),
        new THREE.MeshStandardMaterial({
            color:0xff69b4
        })
    );

    bed.position.set(x,0.3,z);
    scene.add(bed);

    // Pillow
    const pillow = new THREE.Mesh(
        new THREE.BoxGeometry(0.7,0.2,0.6),
        new THREE.MeshStandardMaterial({
            color:0xffffff
        })
    );

    pillow.position.set(x,0.6,z-0.4);
    scene.add(pillow);

    // Wardrobe
    const wardrobe = new THREE.Mesh(
        new THREE.BoxGeometry(0.8,2,0.5),
        new THREE.MeshStandardMaterial({
            color:0x654321
        })
    );

    wardrobe.position.set(x+1.2,1,z);
    scene.add(wardrobe);
}

for(let i=0;i<totalBedrooms;i++){

    let x = (i % 2 === 0) ? -4 : 4;

    let z = -2 - Math.floor(i/2)*4;

    createBedroom(
        i+1,
        x,
        z
    );
}


// ==========================
// Kitchen
// ==========================

createRoom(
    "Kitchen",
    0,
    -3,
    3,
    2,
    0xfff59d
);

// Kitchen Counter
const counter = new THREE.Mesh(
    new THREE.BoxGeometry(2,0.8,0.6),
    new THREE.MeshStandardMaterial({
        color:0x8B4513
    })
);

counter.position.set(0,0.4,-3);
scene.add(counter);

// Kitchen Top
const kitchenTop = new THREE.Mesh(
    new THREE.BoxGeometry(2.1,0.1,0.7),
    new THREE.MeshStandardMaterial({
        color:0xeeeeee
    })
);

kitchenTop.position.set(0,0.85,-3);
scene.add(kitchenTop);

// Stove
const stove = new THREE.Mesh(
    new THREE.BoxGeometry(0.6,0.08,0.6),
    new THREE.MeshStandardMaterial({
        color:0x000000
    })
);

stove.position.set(0,0.95,-3);
scene.add(stove);

// ==========================
// Bathroom
// ==========================

createRoom(
    "Bathroom",
    5,
    3,
    2,
    2,
    0xd1c4e9
);

// Wash Basin
const basin = new THREE.Mesh(
    new THREE.BoxGeometry(0.6,0.5,0.4),
    new THREE.MeshStandardMaterial({
        color:0xffffff
    })
);

basin.position.set(5,0.4,3);
scene.add(basin);

// Shower
const shower = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08,0.08,1.8,16),
    new THREE.MeshStandardMaterial({
        color:0x00bcd4
    })
);

shower.position.set(5.6,0.9,3);
scene.add(shower);


// ==========================
// Garden
// ==========================

const garden = new THREE.Mesh(

    new THREE.BoxGeometry(
        6,
        0.1,
        4
    ),

    new THREE.MeshStandardMaterial({
        color:0x2e8b57
    })

);

garden.position.set(
    0,
    0,
    8
);

scene.add(garden);

createLabel(
    "Garden",
    0,
    1,
    8
);


// ==========================
// Trees
// ==========================

function createTree(x,z){

    const trunk = new THREE.Mesh(

        new THREE.CylinderGeometry(
            0.15,
            0.2,
            1
        ),

        new THREE.MeshStandardMaterial({
            color:0x8b4513
        })

    );

    trunk.position.set(
        x,
        0.5,
        z
    );

    scene.add(trunk);

    const leaves = new THREE.Mesh(

        new THREE.SphereGeometry(
            0.6,
            24,
            24
        ),

        new THREE.MeshStandardMaterial({
            color:0x228b22
        })

    );

    leaves.position.set(
        x,
        1.4,
        z
    );

    scene.add(leaves);

}

createTree(-2,8);
createTree(2,8);
createTree(-5,7);
createTree(5,7);


// ==========================
// Parking
// ==========================

const parking = new THREE.Mesh(

    new THREE.BoxGeometry(
        3,
        0.1,
        4
    ),

    new THREE.MeshStandardMaterial({
        color:0x555555
    })

);

parking.position.set(
    -7,
    0,
    6
);

scene.add(parking);

createLabel(
    "Parking",
    -7,
    1,
    6
);


// ==========================
// Car
// ==========================

const carBody = new THREE.Mesh(

    new THREE.BoxGeometry(
        2,
        0.6,
        1
    ),

    new THREE.MeshStandardMaterial({
        color:0xff0000
    })

);

carBody.position.set(
    -7,
    0.5,
    6
);

scene.add(carBody);

const carTop = new THREE.Mesh(

    new THREE.BoxGeometry(
        1.2,
        0.5,
        0.8
    ),

    new THREE.MeshStandardMaterial({
        color:0xffffff
    })

);

carTop.position.set(
    -7,
    1,
    6
);

scene.add(carTop);

// ==========================
// Main Door
// ==========================

const door = new THREE.Mesh(

    new THREE.BoxGeometry(
        1,
        2,
        0.15
    ),

    new THREE.MeshStandardMaterial({
        color:0x8B4513
    })

);

door.position.set(
    0,
    1,
    0.8
);

scene.add(door);


// ==========================
// Windows
// ==========================

function createWindow(x,z){

    const glass = new THREE.Mesh(

        new THREE.BoxGeometry(
            1.2,
            0.8,
            0.1
        ),

        new THREE.MeshStandardMaterial({
            color:0x87CEFA,
            transparent:true,
            opacity:0.7
        })

    );

    glass.position.set(
        x,
        1.5,
        z
    );

    scene.add(glass);

}

createWindow(-4,1);
createWindow(4,1);
createWindow(-4,-3);
createWindow(4,-3);


// ==========================
// Compound Wall
// ==========================

const compound = new THREE.Mesh(

    new THREE.BoxGeometry(
        18,
        1.5,
        18
    ),

    new THREE.MeshStandardMaterial({
        color:0xdddddd,
        wireframe:true
    })

);

compound.position.y = 0.75;

scene.add(compound);


// ==========================
// Roof
// ==========================

const roof = new THREE.Mesh(

    new THREE.BoxGeometry(
        10,
        0.25,
        8
    ),

    new THREE.MeshStandardMaterial({
        color:0xB22222
    })

);

roof.position.set(
    0,
    2.2,
    0
);

scene.add(roof);


// ==========================
// Stairs
// ==========================

for(let i=0;i<5;i++){

    const step = new THREE.Mesh(

        new THREE.BoxGeometry(
            1,
            0.2,
            0.5
        ),

        new THREE.MeshStandardMaterial({
            color:0x888888
        })

    );

    step.position.set(
        -2,
        0.1 + i*0.2,
        -5 + i*0.5
    );

    scene.add(step);

}

// ======================================
// Enable Shadows
// ======================================

scene.traverse(function(obj){

    if(obj.isMesh){

        obj.castShadow = true;
        obj.receiveShadow = true;

    }

});

// ======================================
// Camera Position
// ======================================

camera.position.set(
    14,
    12,
    16
);

camera.lookAt(
    0,
    0,
    0
);

// ======================================
// Animation
// ======================================

function animate(){

    requestAnimationFrame(animate);

    if(controls){

        controls.update();

    }

    renderer.render(
        scene,
        camera
    );

}

animate();

// ======================================
// Resize
// ======================================

window.addEventListener("resize",()=>{

    camera.aspect =
    window.innerWidth /
    window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});

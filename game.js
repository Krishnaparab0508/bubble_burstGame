function createClouds() {
    const cloudTemplate = document.getElementById("cloudTemplate");
    const cloudCount = 16;

    for (let i = 0; i < cloudCount; i++) {
        const cloud = cloudTemplate.cloneNode(true);
        cloud.style.display = "block";
        cloud.className = "cloud";
        cloud.style.width = `${Math.random() * 100 + 50}px`;
        cloud.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
        cloud.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
        document.body.appendChild(cloud);
    }
}

window.onload = createClouds;

document.getElementById("pumpPress").addEventListener("click", function () {
    console.log("Pump Press Clicked!");

    const pumpBlow = document.getElementById("pumpBlow");
    const pump = document.querySelector(".pump");
    const pumpPress = document.querySelector(".pump_press");


    pump.style.transform = "scale(1.1, 0.95)";


    pumpBlow.style.transform = "scaleY(0.95)";


    pumpPress.style.transform = "translateY(25px)";


    setTimeout(() => {
        pump.style.transform = "scale(1, 1)";
        pumpBlow.style.transform = "scaleY(1)";
        pumpPress.style.transform = "translateY(0)";
    }, 200);
});

const pumpBlowElement = document.getElementById("pumpBlow");
const pumpPressElement = document.getElementById("pumpPress");

const balloonImages = [
    "Graphics/balloon_1.png",
    "Graphics/balloon_2.png",
    "Graphics/balloon_3.png",
    "Graphics/balloon_4.png",
    "Graphics/balloon_5.png",
    "Graphics/balloon_6.png",
    "Graphics/balloon_7.png",
    "Graphics/balloon_8.png",
    "Graphics/balloon_9.png",
    "Graphics/balloon_10.png"
];

const alphabetImages = [
    "Graphics/A.png",
    "Graphics/B.png",
    "Graphics/C.png",
    "Graphics/D.png",
    "Graphics/E.png",
    "Graphics/F.png",
    "Graphics/G.png",
    "Graphics/H.png",
    "Graphics/I.png",
    "Graphics/J.png",
    "Graphics/K.png",
    "Graphics/L.png",
    "Graphics/M.png",
    "Graphics/N.png",
    "Graphics/O.png",
    "Graphics/P.png",
    "Graphics/Q.png",
    "Graphics/R.png",
    "Graphics/S.png",
    "Graphics/T.png",
    "Graphics/U.png",
    "Graphics/V.png",
    "Graphics/W.png",
    "Graphics/X.png",
    "Graphics/Y.png",
    "Graphics/Z.png"
    
];


let pumpPressCount = 0; 
let activeBalloonIndex = 0;
const allBalloons = []; 



function createBalloon(balloonSrc, alphabetSrc, index) {
    const balloonContainer = document.createElement("div"); 
    balloonContainer.classList.add("balloon-container");
    balloonContainer.style.display = "none"; 

    const balloonImage = document.createElement("img");
    balloonImage.src = balloonSrc; 
    balloonImage.alt = "Balloon";
    balloonImage.classList.add("balloon-image");

    const alphabetImage = document.createElement("img");
    alphabetImage.src = alphabetSrc; 
    alphabetImage.alt = "Alphabet";
    alphabetImage.classList.add("alphabet-image");

    const threadImage = document.createElement("img");
    threadImage.src = "Graphics/thread.png"
    threadImage.alt = "thread"
    threadImage.classList.add("thread-image"); 

    balloonContainer.appendChild(balloonImage);
    balloonContainer.appendChild(alphabetImage);

    balloonContainer.style.position = "absolute"; 
    balloonContainer.style.left = "0";
    balloonContainer.style.top = "0";

    document.getElementById("balloon-container").appendChild(balloonContainer);

    return balloonContainer;
}


balloonImages.forEach((balloonSrc, index) => {
    const alphabetSrc = alphabetImages[index % alphabetImages.length];
    allBalloons.push(createBalloon(balloonSrc, alphabetSrc, index));
});


function floatBalloon(balloon, pathIndex) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const paths = [
        { startX: viewportWidth - 230, startY: viewportHeight - 200, endX: viewportWidth - 500, endY: viewportHeight - 100 }, 
        { startX: viewportWidth - 230, startY: viewportHeight - 200, endX: viewportWidth - 400, endY: 100 },             
        { startX: viewportWidth - 230, startY: viewportHeight - 200, endX: viewportWidth - 300, endY: viewportHeight - 200 }, 
        { startX: viewportWidth - 230, startY: viewportHeight - 200, endX: viewportWidth - 350, endY: 250 },             
        { startX: viewportWidth - 230, startY: viewportHeight - 200, endX: viewportWidth - 450, endY: 150 },             
        { startX: viewportWidth - 230, startY: viewportHeight - 200, endX: viewportWidth - 550, endY: viewportHeight - 50 }, 
        { startX: viewportWidth - 230, startY: viewportHeight - 200, endX: viewportWidth - 600, endY: viewportHeight - 150 }, 
        { startX: viewportWidth - 230, startY: viewportHeight - 200, endX: viewportWidth - 650, endY: 300 },             
        { startX: viewportWidth - 230, startY: viewportHeight - 200, endX: viewportWidth - 700, endY: 50 },             
        { startX: viewportWidth - 230, startY: viewportHeight - 200, endX: viewportWidth - 750, endY: viewportHeight - 200 }
    ];

    const path = paths[pathIndex];


    balloon.style.position = "absolute";
    balloon.style.left = `${path.startX}px`;
    balloon.style.top = `${path.startY}px`;


    setTimeout(() => {
        balloon.style.transition = "transform 12s ease-in-out"; 
        balloon.style.transform = `translate(${path.endX - path.startX}px, ${path.endY - path.startY}px)`;
    }, 200); 
}

pumpPressElement.addEventListener("click", function () {
    console.log("Pump Press Clicked!");

    if (activeBalloonIndex >= allBalloons.length) {
        console.log("No more balloons available!");
        return;
    }

    const activeBalloon = allBalloons[activeBalloonIndex];

    if (pumpPressCount === 0) {
        const pumpBlowRect = pumpBlowElement.getBoundingClientRect();
        activeBalloon.style.display = "flex"; 
        activeBalloon.style.left = `${pumpBlowRect.left + pumpBlowElement.offsetWidth / 2 - 60}px`;
        activeBalloon.style.top = `${pumpBlowRect.top - 50}px`;
    }

    pumpPressCount++;
    activeBalloon.style.transform = `scale(${1 + pumpPressCount * 0.3})`;
    if (pumpPressCount === 3) {
        activeBalloon.style.transition = "bottom 0.5s ease-out";
        activeBalloon.style.pointerEvents = "auto"

        activeBalloon.style.bottom = `${window.innerHeight + 100}px`;

        
        setTimeout(() => {
            activeBalloon.style.transition = "none";
            floatBalloon(activeBalloon, activeBalloonIndex); 
        }, 500);

        addBurstEffect(activeBalloon);
        pumpPressCount = 0;
        activeBalloonIndex++;
        
    }
});


function addBurstEffect(balloon) {
    balloon.addEventListener("click", function () {
        console.log("Balloon clicked! Bursting...");

        balloon.style.transition = "transform 0.1s ease-out"; 
        
        setTimeout(() => {
            balloon.remove(); 
        }, 100); 
    });
}





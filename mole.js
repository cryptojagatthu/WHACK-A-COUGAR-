let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;


window.onload = function () {
    document.getElementById("startButton").addEventListener("click", startGame);
};

function startGame() {
    // Hide the Start button
    document.getElementById("startButton").style.display = "none";

    // Initialize the game
    setGame();
}
function setGame() {
    // Set up the grid in HTML
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000); // Call setMole every 1 second
    setInterval(setPlant, 2000); // Call setPlant every 2 seconds

    // Set up the Share button click event
    document.getElementById("shareButton").addEventListener("click", shareOnX);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id === num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id === num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this === currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = "Score: " + score; // Update score
    } else if (this === currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score; // Update score
        gameOver = true;

        // Show the Share button
        document.getElementById("shareButton").style.display = "block";
    }
}

function shareOnX() {
    const tweetText = `I have officially become a racoonist by scoring ${score} points in Whack-a-cougar! 🎯 Can you beat my score? send screenshot📸 in comments.Portal for becoming racoonist : `;
    const gameURL = "https://example.com"; // Replace with your actual game URL
    const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(gameURL)}`;
    window.open(twitterURL, "_blank");
}

var score = 0;
var object = document.getElementById("object")
const container = document.getElementById("container")
const containerWidth = container.clientWidth
const containerHeight = container.clientHeight
const error = document.getElementById("errorText")
var interval
const hearts = document.getElementsByClassName("hearts");
var x = Math.floor(Math.random() * 256);
var y = Math.floor(Math.random() * 256);
var z = Math.floor(Math.random() * 256);
var bgColor = "rgb(" + x + "," + y + "," + z + ")";

function start() {
    const startbtn = document.getElementById("startbtn");
    startbtn.style["display"] = "none";

    game()

}



function game() {
    object.style["display"] = "unset";

    object.addEventListener("click", clickedObject);
    object.addEventListener('click', pop);



}

function addPoints() {

    document.getElementById("score").innerHTML = score += 100

}

function getRandomPosition(min, max) {

    return Math.random() * (max - min) + min;

}

function clickedObject() {

    randomTop = getRandomPosition(100, 700);
    randomLeft = getRandomPosition(200, 700);


    // update top and left position
    object.style.top = randomTop + "px";
    object.style.left = randomLeft + "px";
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    object.style.background = bgColor;
    object.style.border = bgColor;


}

function correctText() {
    error.style["display"] = "block"
    const wordsArray = ["Nice", "Amazing Skill", "Look at you", "OKEY NICE ONE", "Oh you are the boss", "HOLY SHIT", "You got it!", "Super", "One more!", "Hole in one!!!", "Easy", "GG", "Nice played", "Essa", "HUUURAYY"]
    var word = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    error.innerHTML = word
}

function ErrorText() {
    error.style["display"] = "block"
    error.style["color"] = "red"
    const wordsArray = ["Nice", "Amazing Skill", "Look at you", "OKEY NICE ONE", "Oh you are the boss", "HOLY SHIT", "You got it!", "Super", "One more!", "Hole in one!!!", "Easy", "GG", "Nice played", "Essa", "HUUURAYY"]
    var word = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    error.innerHTML = word
}




function changeColorToRed() {
    object.style["display"] = "none"
    clearInterval()

}








function pop(e) {
    // Quick check if user clicked the button using a keyboard
    if (e.clientX === 0 && e.clientY === 0) {
        const bbox = document.querySelector('#button').getBoundingClientRect();
        const x = bbox.left + bbox.width / 2;
        const y = bbox.top + bbox.height / 2;
        for (let i = 0; i < 30; i++) {
            // We call the function createParticle 30 times
            // We pass the coordinates of the button for x & y values
            createParticle(x, y);
        }
    } else {
        for (let i = 0; i < 30; i++) {
            // We call the function createParticle 30 times
            // As we need the coordinates of the mouse, we pass them as arguments
            createParticle(e.clientX, e.clientY);
        }
    }
}





function createParticle(x, y) {
    const particle = document.createElement('particle');
    document.body.appendChild(particle);

    // Calculate a random size from 5px to 25px
    const size = Math.floor(Math.random() * 20 + 5);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    // Generate a random color in a blue/purple palette
    particle.style.background = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;

    // Generate a random x & y destination within a distance of 75px from the mouse
    const destinationX = x + (Math.random() - 0.5) * 2 * 75;
    const destinationY = y + (Math.random() - 0.5) * 2 * 75;

    // Store the animation in a variable as we will need it later
    const animation = particle.animate([{
            // Set the origin position of the particle
            // We offset the particle with half its size to center it around the mouse
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
            opacity: 1
        },
        {
            // We define the final coordinates as the second keyframe
            transform: `translate(${destinationX}px, ${destinationY}px)`,
            opacity: 0
        }
    ], {
        // Set a random duration from 500 to 1500ms
        duration: Math.random() * 1500 + 500,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        // Delay every particle with a random value of 200ms
        delay: Math.random() * 100
    });

    // When the animation is complete, remove the element from the DOM
    animation.onfinish = () => {
        particle.remove();
    };
}





var c = document.getElementById("c");
var ctx = c.getContext("2d");

//making the canvas full screen
c.height = 890;
c.width = 1250;

//chinese characters - taken from the unicode charset
var matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
//converting the string into an array of single characters
matrix = matrix.split("");

var font_size = 10;
var columns = c.width / font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for (var x = 0; x < columns; x++)
    drops[x] = 1;

//drawing the characters
function draw() {
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#32a838"; //green text
    ctx.font = font_size + "px arial";
    //looping over drops
    for (var i = 0; i < drops.length; i++) {
        //a random chinese character to print
        var text = matrix[Math.floor(Math.random() * matrix.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * font_size > c.height && Math.random() > 0.900)
            drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
    }
}

setInterval(draw, 35);
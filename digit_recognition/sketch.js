
let userInput = [];
let digitArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let userY;
let userX;
let mouse_x;
let mouse_y;
let pixelSize = 10;
let outputPrediction;
let angle = 0;
let r = 100;
let a = 0;
var resetButton = document.getElementById('reset');


let input = function (sketch) {


    let rows = 28;
    let columns = 28;
    let tensor_userInput;

    // creating two-dimensional array
    for (let i = 0; i < rows; i++) {
        userInput[i] = [];
        for (let j = 0; j < columns; j++) {
            userInput[i][j] = 0;
        }
    }




    sketch.setup = function () {
        spinnerColor = sketch.color(33, 150, 243);
        sketch.createCanvas(28 * pixelSize, 28 * pixelSize);
        sketch.textSize(32);
        sketch.background(0);
        sketch.noStroke();
        preparation();

    }

    sketch.draw = function () {
        
        if(trainingDone ){
            sketch.background(0);
            for (x = 0; x < rows; x++) {
            for (y = 0; y < columns; y++) {
                sketch.fill(userInput[x][y] * 255);
                sketch.rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            }
        }
        }else{
            sketch.background(0);
            sketch.textSize(17);
            sketch.textFont('Helvetica');
            sketch.fill(255);
            sketch.text("Training Data", sketch.width/2 - 50, sketch.height/2);
            sketch.text("please wait", sketch.width / 2 - 45, sketch.height / 2 + 25);
            loadingAnimation();
        }
        
        
    }


    sketch.mouseDragged = function () {
        mouse_x = sketch.round(sketch.mouseX / (1.0 * pixelSize));
        mouse_y = sketch.round(sketch.mouseY / (1.0 * pixelSize));
        // Check if the mouse coordinates are within the canvas
        if (mouse_x >= 0 && mouse_x < rows && mouse_y >= 0 && mouse_y < columns) {
            userInput[mouse_x][mouse_y] = 1; // Set the pixel value to 1 at the current coordinates
        }
    }

    sketch.mouseReleased = function () {
        getPredictionwithUserInput(userInput);
    }

    loadingAnimation = function (){
        sketch.push();
        sketch.translate(sketch.width / 2, sketch.height / 2);
        for (var i = 0; i < 9; i++) {
            x = sketch.sin(sketch.radians(a - (i * 45))) * r;
            y = sketch.cos(sketch.radians(a - (i * 45))) * r;
            sketch.fill(33, 150, 243, 200 - i * 20);
            const d = sketch.map(sketch.sin(angle), -1, 1, 20 - i * 2, 50 - i * 2);
            sketch.circle(x, y, d);
        }
        sketch.pop();
        angle += 0.05;
        a += 3;
    }

    reset = function () {
        for (let i = 0; i < rows; i++) {
            userInput[i] = [];
            for (let j = 0; j < columns; j++) {
                userInput[i][j] = 0;
            }
        }
        sketch.background(0);
    }

    resetButton.addEventListener('click', function () {
        reset();
    });
    
    sketch.keyPressed = function () {
        if (sketch.keyCode === 82 ) {  //R
            reset();
        }
       
    }

}

let prediction = function (sketch) {
    sketch.setup = function () {
        sketch.createCanvas(28 * pixelSize, 28 * pixelSize);
        sketch.textSize(32);
        sketch.background(0);
        sketch.noStroke();
    }

    sketch.draw = function () {
        sketch.background(0);
        outputPrediction = digitArray[topPrediction];
        sketch.fill(255);
        sketch.textSize(240);
        sketch.textFont('Helvetica');
        sketch.text(outputPrediction, 60, 220);


    }

}

new p5(input, 'input');
new p5(prediction, 'prediction');



let pixelsize = 2.5;
let allmyWeights;
let contrast = 2.5;
let title;
let weightArray;



let weights = function (sketch) {

    sketch.setup = function () {
        sketch.createCanvas(560, 605);
        sketch.background(255);
        sketch.noStroke();
   

    }

    sketch.draw = function () {
        sketch.background(255);
        allmyWeights = getWeights();
        let cnt = 1;
        sketch.push();
        for (let i = 0; i < 36; i++) {
            sketch.drawWeights(i);
            sketch.translate(90, 0);
            if(cnt == 6){
                sketch.translate(-90*cnt +1, 100);
                cnt = 0;
            }
            cnt++;
        }
        sketch.pop();
    }

    sketch.drawWeights = function (digit) {

        let minAndMax = sketch.minAndmaxArray(allmyWeights, digit);
        title = digitArray[digit];
        sketch.fill(0);
        sketch.textSize(10);
        sketch.text(title, 20, 12);
        let counter = digit;
        for (let y = 0; y < 28; y++) {
            for (let x = 0; x < 28; x++) {
                let alpha = allmyWeights[counter];
                let mappedAlpha = sketch.map(alpha, minAndMax.min, minAndMax.max, 100, 0);
                sketch.fill(0, mappedAlpha*contrast);
                sketch.square(20 + x * pixelsize, 20 + y * pixelsize, pixelsize);
                counter += 36;
            }
        }

    }

    sketch.minAndmaxArray = function (array, digit) {
        let minAndMaxarray = [];
        weightArray = [];
        for (let i = digit; i < array.length; i = i + 36) {
            weightArray.push(array[i]);
        }
        minAndMaxarray['min'] = sketch.min(weightArray);
        minAndMaxarray['max'] = sketch.max(weightArray);
        return minAndMaxarray;
        console.log(minAndMaxarray);
    }


}

new p5(weights, 'weights');
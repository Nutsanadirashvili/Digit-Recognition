
let model;
let singleLayer;
let x;
let y;
let mnistData;
let num_test_samples = 100;
let num_train_samples = 5000;
let allWeights;
let topPrediction;
let testTensor;
let testTensor_y;
let trainingDone = false;
let loading;
let tensor_userInput;
const keys = document.querySelectorAll('.key');
let label;
let letterTensor;
const num_letters = 26;

singleLayer = tf.layers.dense({
  units: 36,
  inputShape: [784,],
  activation: 'sigmoid',
  useBias: false
});

function preparation() {
  model = tf.sequential({ layers: [singleLayer] });
  model.compile({
    optimizer: tf.train.sgd(5),
    loss: 'meanSquaredError'
  });
  mnistData = new MnistData();
  mnistData.load(num_train_samples, num_test_samples).then(res => training());
  model.summary();
  //checkLoading();
}

function training() {
  [x, y] = mnistData.getTrainData();
  x = x.reshape([num_train_samples, 784]);
  const letterLabels = tf.zeros([num_train_samples, num_letters]);
  console.log('letter labels');
  letterLabels.print(true);
  const combinedY = tf.concat([y, letterLabels], 1);
  model.fit(x, combinedY, { batchsize: 32, epochs: 10 }).then(res => testing());

}
function usertrain(correctDigit, label) {
  tensor_userInput.print(true);
  tensor_userInput = tensor_userInput.reshape([1, 784]);
  label = label.reshape([1, 36]);
  model.fit(tensor_userInput, label, { batchSize: 64, epochs: 10 }).then(() => {
    console.log('Training done for digit:', correctDigit);
  }).catch(err => {
    console.error('Training failed:', err);
  });
  weights;
}

function testing() {
  [xtest, ytest] = mnistData.getTestData(num_test_samples);
  xtest = xtest.reshape([num_test_samples, 784]);
  y_predict = model.predict(xtest);
  y_predict.print();
  modelRecognitionRate();
  trainingDone = true;
  console.log("training is done");
}

function modelRecognitionRate() {
  maxValueFromTest = ytest.transpose().argMax();
  maxValueFromPrediction = y_predict.transpose().argMax();
  compareResults = maxValueFromTest.equal(maxValueFromPrediction).sum().dataSync()[0];
  recognitionPercent = (compareResults / num_test_samples) * 100;
  console.log('Recognition: ' + recognitionPercent + ' %');
}

function getWeights() {
  for (let i = 0; i < model.getWeights().length; i++) {
    return model.getWeights()[i].dataSync();
  }
}

function getPredictionwithUserInput(userInput) {
  tensor_userInput = tf.tensor(userInput);
  tensor_userInput = tensor_userInput.transpose();
  tensor_userInput = tensor_userInput.reshape([1, 784]);
  prediction = model.predict(tensor_userInput);
  predictionArray = prediction.dataSync();
  prediction.print(true);
  topPrediction = predictionArray.indexOf(Math.max(...predictionArray));
  console.log(topPrediction);
}



keys.forEach(key => {
  key.addEventListener('click', () => {
    const digit = digitArray.indexOf(key.textContent); // Get the number from the key's text content
    label = tf.oneHot(tf.tensor1d([digit], 'int32'), 36); // Create the label tensor for the number
    usertrain(digit, label);
  });
});


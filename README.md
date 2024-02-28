# Digit Recognition

page: https://students.pages.coco.study/ss22/aai/team-1/digit_recognition/

### **Description**

This is a simple digit recognition program built using TensorFlow.js and P5.js. It allows users to draw a digit from 0 to 9 or letter from latin alphabet on a canvas using their mouse. The program then uses a neural network model, specifically a single-layer perceptron, which is built using TensorFlow.js, to recognize the drawn digit and display the predicted number. The perceptron is a fundamental type of neural network known for its simplicity and early contributions to the field of machine learning. <br><br>
The neural network model is trained on the MNIST dataset, a large collection of hand-drawn digits. The MNIST dataset consists of 28x28 pixel images, each representing a single digit from 0 to 9. By training the neural network on this dataset, it learns to recognize patterns and features that distinguish each digit. For letters program have no data set, but users can train the model themselves by clicking on the corresponding buttons for each digit. <br> <br>
Also we see weight module in interface. It displays the weights associated with each digit as a 28x28 grid of squares on a canvas. The shade of each square corresponds to the magnitude of the weight, where lighter shades represent higher weights and darker shades represent lower weights. This dynamic visualization allows users to observe how the model learns to recognize different patterns for each digit during the training process.


The program recognizes only one digit:

    Numbers - 0 to 9 
    Letters - Latin Alphabet

****
<br>

### **Technical Configuration of Model**
* The neural network consists of a single dense layer, which is a fully connected layer. It means each neuron in this layer is connected to all the neurons in the previous layer (input layer).
* The input shape of the dense layer is [784,]. In the context of this model, the input shape represents the number of input features. Since the MNIST dataset contains images of size 28x28 pixels, each image is flattened into a 1-dimensional array of 784 values (28*28=784).
* The activation function used in this dense layer is the sigmoid function. The sigmoid function maps the output of each neuron to a value between 0 and 1, which is often used for binary classification tasks. In this case, it helps in predicting the probability of each digit class.
* The optimizer used is SGD with a learning rate of 2. 
* The loss function used is mean squared error (MSE).

<br>

*Note:* The program does not use a database and does not store trained data. This means that you will have to retrain the program everytime after restarting / refreshing.

****
<br>

### **How to Use** 
  * Wait until the input canvas will be loaded.
  * Draw the desired digit on the upper canvas using your mouse or touch input. 
  * Once you finish drawing, the program will predict the digit you drew and display it on the lower canvas.
  * If the prediction is wrong, you can train the model yourself.
  * To train the model, click on the buttons with the correct digits on the keyboard. Training can take several seconds.You can do it several times, until model displays the right prediction.
  * To reset the canvas for new drawing, press the **'R'** key in your keyboard.

    
****
<br>

### **Files**

    index.html: The HTML file that sets up the user interface and loads the required JavaScript files.

    script.js: Contains the main logic of the digit recognition program, including model training, prediction, and user interactions.

    sketch.js: Handles the drawing functionality on the canvas and captures user input.

    weights.js: Renders the weights of the neural network as visual representations on a separate canvas.

    mnist_data.js: Provides functions to load and prepare the MNIST dataset for training and testing.
****
<br>

**Useful links**

[TensorFlow.js](https://www.tensorflow.org/js)<br>
[MNIST Dataset](http://yann.lecun.com/exdb/mnist/)<br>
[p5.js](https://p5js.org/libraries/)



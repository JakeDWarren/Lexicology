
// Global Variables
  // Canvas Setup
  var canvas;
  var w = document.getElementById('sketchContainer').clientWidth;
  var h = document.getElementById('sketchContainer').clientHeight

  // Text state (Swipe language or Latin-derived)
  let swipeLang = true;

  // Theme colours
  const lexiBlue = "#00ffff";
  const lexiDarkBlue = "#0b141a";
  const lexiDarkerBlue = "#040e12";
  const lexiRed = "#ff0000";

  // Swipe Language Mapping Area
  let swipeWidth = 805;
  let swipeHeight = 335;

  // Audio variables
  let playPause = false;
  let swipeFreqs = [];
  let freqI = 0;

  //Swipe language handling
  let letterPoints = [];
  let currentWord = [];
  let thisSentance = '';
  let r;
  let g;
  let b;
  let table;
  let selectedLetter;
  let thisWord = '';
  let thisLetterCount;
  let selectedLetterX;
  let selectedLetterY;
  let lastPointX;
  let lastPointY;
  let osc;
  let noRows;
  let noCols;
  let wordX = 0;
  let wordY = 0;
  let swipeWords = [];

// Change width and height based on device
if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
  ) {

  //If above devices found then change width and height variables to match size
  w = window.screen.width;
  h = window.screen.height*0.9;

}

// Function to refresh page on resize (To resize sketch too)
$(window).resize(function(){location.reload();});

// Function triggered when language toggle changed
function languageChange(e) {
  if (e.target.checked) {
      swipeLang = true;
      console.log("Swipe Mode");
    } else {
      swipeLang = false;
      console.log("Text Mode");
    }
}

// Add event listener for Play/Pause change
const playPauseButton = document.getElementById('playPauseButton');
playPauseButton.addEventListener('click', (e)=>{
  e.target.classList.toggle('pause');
  playPause = !playPause;
  console.log("Playing State: " + playPause);

  if(playPause == true) {
    playSwipeSound();
  } else {
    stopSwipeSound();
  }
})


// Setup Sketch
function setup() {

  // Create canvas wize of window
  canvas = createCanvas(w,h);
  canvas.parent("sketchContainer");

  // Setup Oscillator for text sound
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.amp(0.5);

}

// Draw Sketch
function draw() {

  // Type area
  fill(lexiDarkBlue);
  rect(w*0.01, h*0.02, w*0.98, h*0.65, 5);
  rectMode(CORNER);
  rect((w-400)/2, h*0.69, 400, h*0.28, 5);

  // Calculate number of words in a row and number of rows
  noRows = Math.floor((w*0.98)/170)
  noCols = Math.floor((h*0.65)/70)

  // Display as Latin-text or Swipe language depenging on swipeLang toggle
  if(swipeLang == true) {

    // Generate Swipe language of user input

      //Create main point for letter press using class constructor
      push();
      translate((w-400)/2, (h/2)+(h/5));
      scale(0.5);
      for (let i = 0; i < letterPoints.length; i++) {

        r = map(i, 0, letterPoints.length - 1, 255, 0);
        g = map(i, 0, letterPoints.length - 1, 0, 255);
        b = map(i, 0, letterPoints.length - 1, 0, 255);
        noFill();
        stroke(r, g, b);
        strokeWeight(3.5);
        letterPoints[i].display();
      }
      pop();

      //Create and translate the words already typed
      for (let i = 1; i <= currentWord.length; i++) {

        swipeWords.push(new swipeWord());
        swipeWords[i-1].display(i-1);

        // Change coordinate values
        if (wordX < noRows-1) {
          wordX++
        } else if (wordX == noRows-1){
          wordX = 0;
          wordY++;
        } else {

        }

      }

  } else {

    // Generate Latin language of user input

      // Draw over any Swipe input
      fill(lexiDarkBlue);
      rect(w*0.01, h*0.02, w*0.98, h*0.65, 5);
      console.log(swipeLang)

      // Add text
      fill(lexiBlue);
      textSize(50);
      text(thisSentance,w*0.05, h*0.08,w*0.94,h*0.59);

      // Create main point for letter press using class constructor
      push();
      translate((w-400)/2, (h/2)+(h/5));
      scale(0.5);
      for (let i = 0; i < letterPoints.length; i++) {

        r = map(i, 0, letterPoints.length - 1, 255, 0);
        g = map(i, 0, letterPoints.length - 1, 0, 255);
        b = map(i, 0, letterPoints.length - 1, 0, 255);
        noFill();
        stroke(r, g, b);
        strokeWeight(3.5);
        letterPoints[i].display();
      }
      pop();
  }

}

// Function called when play button pressed
function playSwipeSound() {

  // Loop created as function due to setTimeout limitations
  myLoop();

  // Always start loop at 0
  freqI = 0;

  // Execute Loop function to interate through each frequency in swipeFreqs
  function myLoop() {

    setTimeout(function() {

      // Start and set the frequency and log corresponding details
      osc.start();
      osc.freq(swipeFreqs[freqI]);
      console.log(swipeFreqs[freqI]);
      console.log(thisSentance.charAt(freqI));

      // Now add to I to iterate through the loop
      freqI++;

      // While I is a value of swipeFreqs keep looping else stopSwipeSound()
      if (freqI < swipeFreqs.length) {

        myLoop();

      } else {

        stopSwipeSound();

      }

    }, 150)

  }

}

// Function executed at end of sound or when playPauseButton event set to pause
function stopSwipeSound() {

    // Stop any current sound by setting i outside loop range and trigger reset
    freqI = swipeFreqs.length;
    osc.stop();
    playPause = false;
    playPauseButton.classList.toggle('pause');
}

// For every key pressed record, store and execute actions
function keyPressed() {

  //If space bar pressed, store object that makes word in array otherwise create as new point in current word
  if (key === ' ') {

    //Setup variables to track current letter, word and number of times current letter appears in word.
    selectedLetter = key;
    thisWord = thisWord + key;
    thisLetterCount = thisWord.split(key).length - 1;
    thisSentance = thisSentance + key;

    // Create as new word
    currentWord.push(letterPoints);
    letterPoints = [];
    thisWord = '';

    //Push a frequency of 0 to swipeFreqs array
    swipeFreqs.push(0);

  } else if (table.findRow(key, 'LowerLetter') != null) {

    //Setup variables to track current letter, word and number of times current letter appears in word.
    selectedLetter = key;
    thisWord = thisWord + key;
    thisLetterCount = thisWord.split(key).length - 1;
    thisSentance = thisSentance + key;

    // Retrieve row from CSV
    let row = table.findRow(key, 'LowerLetter');

    // Assign allocated x and y to this letter
    selectedLetterX = row.get("x");
    selectedLetterY = row.get("y");

    // For this letter map and push the associated frequency to swipeFreqs
    let initFreq = row.get("LetterFrequency");
    let mappedFreq = map(initFreq, 0.07,12.02,125,8000);
    swipeFreqs.push(mappedFreq);

    // Create a new point with the current letter variables
    letterPoints.push(new letterPoint());

  } else if (table.findRow(key, 'UpperLetter') != null) {

    //Setup variables to track current letter, word and number of times current letter appears in word.
    selectedLetter = key;
    thisWord = thisWord + key;
    thisLetterCount = thisWord.split(key).length - 1;
    thisSentance = thisSentance + key;

    // Retrieve row from CSV
    let row = table.findRow(key, 'UpperLetter');

    // Assign allocated x and y to this letter
    selectedLetterX = row.get("x");
    selectedLetterY = row.get("y");

    // For this letter map and push the associated frequency to swipeFreqs
    let initFreq = row.get("LetterFrequency");
    let mappedFreq = map(initFreq, 0.07,12.02,125,8000);
    swipeFreqs.push(mappedFreq);

    // Create a new point with the current letter variables
    letterPoints.push(new letterPoint());

  } else {

    // To avoid error, else captures any characters not in CSV
    console.log("Invalid Character")
  }

}

// Class to hold contruction data for each swipe word
class swipeWord {

  constructor(){
    this.x = (w*0.03)+(wordX*155);
    this.y = (h*0.07)+(wordY*55);
  }

  display (i){

    push();
     translate(this.x, this.y);
     scale(0.2);
     for (let a = 0; a < currentWord[i].length; a++) {
       stroke(255, 0, 0);
       strokeWeight(5);
       currentWord[i][a].display();
     }
     pop();
  }
}

// Class to hold contruction data for each point and line in a word
class letterPoint {

  // Set-up details created and retrieved from global variables
  constructor() {

    // Uses global variables set for current letter via keyPressed();
    this.x = selectedLetterX;
    this.y = selectedLetterY;
    this.size = (10 * thisLetterCount);

    if (letterPoints.length >= 1) {
      this.lastX = letterPoints[letterPoints.length - 1].x;
      this.lastY = letterPoints[letterPoints.length - 1].y;
    }

  }

  //  Function called in draw to create the point
  display() {


    for (let i = 0; i < letterPoints.length; i++) {

      ellipse(this.x, this.y, this.size, this.size);

      if (letterPoints.length >= 0) {
        line(this.x, this.y, this.lastX, this.lastY);
      }

    }

  }

}

//Preload a CSV file containing coordinates for character points & frequencies
function preload() {

  table = loadTable('Assets/Lexicology-Values.csv', 'csv', 'header');

}

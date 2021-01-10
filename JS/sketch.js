
// Global Variables
var canvas;
var w = window.innerWidth;
var h = window.innerHeight*0.9;


let user =  "JakeDWarren"
let userIDResult;
let twitterResult;
// let TWITTER_BEARER_TOKEN = secrets.Twitter_Bearer_Token;
let result;


let swipeLang = true;

const lexiBlue = "#00b0f0";
const lexiDarkBlue = "#0b141a";
const lexiDarkerBlue = "#040e12";
const lexiRed = "#ff0000";


function preload() {

// let url = "https://twitter.com/search?f=realtime&q=(%23lexicology)&src=typed_query";
//  result = loadJSON(url);//The URL is sent to the loadJSON that returns the data to the result variable
//  console.log(result);

  // console.log(TWITTER_BEARER_TOKEN);
  //
  // const TwitterIDSettings = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + user,
  //   "method": "GET",
  //   "headers": {
  //     "Authorization": "Bearer " + TWITTER_BEARER_TOKEN,
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  //     "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  //   }
  // };
  //
  // $.ajax(TwitterIDSettings).done(function (response) {
  //   userIDResult = response;
  //   console.log(response);
  // });

}

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

// Setup Sketch
function setup() {

  // Create canvas wize of window
  canvas = createCanvas(w,h);
  canvas.parent("sketchContainer");


}

// Draw Sketch
function draw() {

    // Social Card
     fill(lexiDarkBlue);
     rectMode(CENTER);
     rect(w/2, h/2, w*0.98, h*0.95, 5);




}

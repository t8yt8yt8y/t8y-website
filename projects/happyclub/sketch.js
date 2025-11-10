// Happy Club - Smile Detection App
let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };
let happiness = 0;

// DOM Elements
let welcomeScreen;
let smileScreen;
let thankYouScreen;
let startButton;
let messageContainer;
let timerDisplay;
let emailForm;
let restartButton;
let canvasContainer;
let cameraFeed;
let moodSmiley;
let smileyPatternOverlay;

// App state
let tracking = false;
let smileStartTime = 0;
let targetTime = 3; // 3 seconds smiling target for testing
let happinessScores = []; // Array to store happiness scores over time
let lastScoreTime = 0; // Track when we last recorded a score

function preload() {
  // Load the faceMesh model with lighter options for better performance
  faceMesh = ml5.faceMesh({
    maxFaces: 1, 
    refineLandmarks: false, 
    flipHorizontal: false,
    runtime: 'mediapipe',
    modelType: 'short'
  });
}

function setup() {
  // Get DOM elements
  welcomeScreen = document.getElementById('welcome-screen');
  smileScreen = document.getElementById('smile-screen');
  thankYouScreen = document.getElementById('thank-you-screen');
  startButton = document.getElementById('start-button');
  messageContainer = document.getElementById('message-container');
  timerDisplay = document.getElementById('timer');
  emailForm = document.getElementById('email-form');
  restartButton = document.getElementById('restart-button');
  canvasContainer = document.getElementById('canvas-container');
  cameraFeed = document.getElementById('camera-feed');
  moodSmiley = document.getElementById('mood-smiley');
  smileyPatternOverlay = document.getElementById('smiley-pattern-overlay');
  
  
  // Create a responsive canvas
  let canvasWidth = canvasContainer.offsetWidth;
  let canvasHeight = canvasWidth * 9/16; // 16:9 aspect ratio
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(canvasContainer);
  
  // Make sure canvas doesn't cover the video
  canvas.style.position = 'absolute';
  canvas.style.zIndex = '7'; // Higher than video (z-index: 6) so face indicators show on top
  canvas.style.pointerEvents = 'none'; // Allow clicks to go through to video
  
  // We'll use the HTML video element for both display and face detection
  video = null; // We'll set this up when we start tracking
  
  // Setup event listeners
  startButton.addEventListener('click', function() {
    startTracking();
  });
  restartButton.addEventListener('click', restartApp);
  
  // Add window resize handler
  window.addEventListener('resize', windowResized);
}

function windowResized() {
  // Update canvas size when window is resized
  let canvasWidth = canvasContainer.offsetWidth;
  let canvasHeight = canvasWidth * 9/16; // 16:9 aspect ratio
  resizeCanvas(canvasWidth, canvasHeight);
}

function startTracking() {
  // Helper to set video element size to match canvas
  function syncVideoSize() {
    const containerWidth = canvasContainer.offsetWidth;
    const containerHeight = canvasContainer.offsetHeight;
    
    cameraFeed.style.width = `${containerWidth}px`;
    cameraFeed.style.height = `${containerHeight}px`;
  }

  // Try main constraints first
  const desktopConstraints = {
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 },
      facingMode: { ideal: "user" }
    }
  };
  // Mobile fallback: lower res, stricter facingMode
  const mobileConstraints = {
    video: {
      width: { ideal: 640, max: 640 },
      height: { ideal: 480, max: 480 },
      facingMode: { exact: "user" }
    }
  };

  function handleStream(stream) {
    cameraFeed.srcObject = stream;
    
    // Make sure video element is visible
    cameraFeed.style.display = 'block';
    cameraFeed.style.visibility = 'visible';
    cameraFeed.style.opacity = '1';
    
    cameraFeed.onloadedmetadata = function() {
      cameraFeed.play().then(() => {
        // Wait a bit for the container to be properly sized, then sync
        setTimeout(() => {
          syncVideoSize();
          // Also trigger a manual resize to ensure proper sizing
          window.dispatchEvent(new Event('resize'));
        }, 100);
        
        window.addEventListener('resize', syncVideoSize);
        
        // Set up the video element for ml5 face detection
        video = cameraFeed;
        
        // Start detecting faces from the webcam video
        faceMesh.detectStart(video, gotFaces);
        
        tracking = true;
        smileStartTime = millis();
        welcomeScreen.classList.add('hidden');
        smileScreen.classList.remove('hidden');
        smileScreen.classList.add('not-smiling');
        smileScreen.classList.remove('smiling');
        updateMessage("Start smiling!");
      }).catch(err => {
        console.error("Error playing video:", err);
      });
    };
    
    cameraFeed.onerror = function(err) {
      console.error("Video error:", err);
    };
  }

  function handleError(err) {
    // Try mobile fallback if not already tried
    if (!startTracking.triedMobile) {
      startTracking.triedMobile = true;
      navigator.mediaDevices.getUserMedia(mobileConstraints)
        .then(handleStream)
        .catch(function(err2) {
          console.error("Camera error (mobile fallback): ", err2);
          alert("Please allow camera access to use this app!");
        });
    } else {
      console.error("Camera error: ", err);
      alert("Please allow camera access to use this app!");
    }
  }

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(desktopConstraints)
      .then(handleStream)
      .catch(handleError);
  } else {
    alert("Sorry, your browser doesn't support camera access!");
  }
}

function draw() {
  if (!tracking) {
    clear();
    return;
  }
  
  // We're using the direct video element, so just clear the canvas for drawing indicators
  clear();
  
  let smiling = false;
  
  // Process facial data if available
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    let leftMouth = face.keypoints[61];
    let rightMouth = face.keypoints[291];
    let upperLip = face.keypoints[13];
    let lowerLip = face.keypoints[14];
    let leftCheek = face.keypoints[234];
    let rightCheek = face.keypoints[454];
    let forehead = face.keypoints[10];
    let chin = face.keypoints[152];
    
    if (leftMouth && rightMouth && upperLip && lowerLip && leftCheek && rightCheek && forehead && chin) {
      let faceWidth = dist(leftCheek.x, leftCheek.y, rightCheek.x, rightCheek.y);
      let faceHeight = dist(forehead.x, forehead.y, chin.x, chin.y);
      let mouthWidth = dist(leftMouth.x, leftMouth.y, rightMouth.x, rightMouth.y) / faceWidth;
      let mouthHeight = dist(upperLip.x, upperLip.y, lowerLip.x, lowerLip.y) / faceHeight;
      
      // Calculate happiness score using the parameters from your example
      let minMouthWidth = 0.25, maxMouthWidth = 0.5;
      let widthScore = map(mouthWidth, minMouthWidth, maxMouthWidth, 0, 100);
      widthScore = constrain(widthScore, 0, 100);
      
      let minMouthHeight = 0.02, maxMouthHeight = 0.15;
      let heightScore = map(mouthHeight, minMouthHeight, maxMouthHeight, 0, 100);
      heightScore = constrain(heightScore, 0, 100);
      
      happiness = (widthScore * 0.7) + (heightScore * 0.3);
      happiness = constrain(happiness, 0, 100);
      
      // Record happiness score every 100ms to avoid too much data
      if (millis() - lastScoreTime > 100) {
        happinessScores.push(happiness);
        lastScoreTime = millis();
      }
      
      // Check if smiling using the threshold from your example
      smiling = happiness > 50;
      
      // Draw smile indicators
      drawSmileIndicators(face);
    }
  }
  
  // Handle timer based on smile state
  if (!smiling) {
    // Only reset timer when not smiling AND email form is not visible (timer is still running)
    if (emailForm.classList.contains('hidden')) {
      smileStartTime = millis();
    }
    // Only show message if email form is not visible
    if (!emailForm.classList.contains('hidden')) {
      updateMessage("");
    } else {
      updateMessage("Do you consider this a smile?\nYou are not worthy of our club.");
    }
    // Let the CSS handle the background color
    smileScreen.classList.add('not-smiling');
    smileScreen.classList.remove('smiling');
    // Update mood smiley image
    moodSmiley.src = "./Smiley_Unhappy.png";
  } else {
    // Only show message if email form is not visible
    if (!emailForm.classList.contains('hidden')) {
      updateMessage("");
    } else {
      updateMessage("There you go! Just keep smiling\nand join us on the happy side");
    }
    // Let the CSS handle the background color
    smileScreen.classList.remove('not-smiling');
    smileScreen.classList.add('smiling');
    // Update mood smiley image
    moodSmiley.src = "./Smiley_Happy.png";
  }
  
  // Calculate seconds smiling - only count time when actually smiling
  let secondsSmiling = 0;
  if (smiling) {
    secondsSmiling = (millis() - smileStartTime) / 1000;
  }
  
  // Show remaining time (countdown instead of counting up)
  let secondsRemaining = targetTime - secondsSmiling;
  
  // Format and display timer
  if (secondsRemaining <= 0) {
    secondsRemaining = 0;
    timerDisplay.textContent = "00:00";
    
    // Show download form when time is up
    if (!emailForm.classList.contains('hidden')) {
      // Already showing
      return;
    }
    
    // Calculate and display average happiness score
    if (happinessScores.length > 0) {
      const averageHappiness = happinessScores.reduce((sum, score) => sum + score, 0) / happinessScores.length;
      console.log(`Average happiness: ${averageHappiness.toFixed(1)}%`);
    }
    
    // Create smiley pattern before showing download form
    createSmileyPattern();
    smileyPatternOverlay.classList.remove('hidden');
    
    // Show the download form and hide any smile-related feedback
    emailForm.classList.remove('hidden');
    updateMessage("");
    
    // Hide the timer
    timerDisplay.classList.add('hidden');
    
    // Continue to display face annotations
    // The drawn yellow outlines will remain
  } else {
    // Format as MM:SS (showing minutes and seconds without milliseconds)
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = Math.floor(secondsRemaining % 60);
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}

function drawSmileIndicators(face) {
  if (!face) return;
  
  // Get key facial landmarks
  let leftEye = face.keypoints[33];
  let rightEye = face.keypoints[263];
  let leftMouth = face.keypoints[61];
  let rightMouth = face.keypoints[291];
  
  if (!leftEye || !rightEye || !leftMouth || !rightMouth) return;
  
  // Scale coordinates to fit canvas
  let scaleX = width / video.videoWidth;
  let scaleY = height / video.videoHeight;
  let lx = leftMouth.x * scaleX;
  let ly = leftMouth.y * scaleY;
  let rx = rightMouth.x * scaleX;
  let ry = rightMouth.y * scaleY;
  let cx = (lx + rx) / 2;
  let cy = (ly + ry) / 2;
  let eyeLX = leftEye.x * scaleX;
  let eyeLY = leftEye.y * scaleY;
  let eyeRX = rightEye.x * scaleX;
  let eyeRY = rightEye.y * scaleY;
  
  // Draw the yellow indicators
  stroke('#FFD700'); // Yellow color
  strokeWeight(6);
  
  // Eyes - simple vertical lines
  line(eyeLX, eyeLY - 15, eyeLX, eyeLY + 15);
  line(eyeRX, eyeRY - 15, eyeRX, eyeRY + 15);
  
  let mouthWidth = dist(lx, ly, rx, ry);
  
  // Draw different mouth shapes based on smiling state
  noFill();
  if (happiness <= 50) {
    // Not smiling - frowning mouth (upside-down hexagonal shape)
    beginShape();
    vertex(lx, ly); // left corner
    vertex(lx + mouthWidth * 0.1, ly + mouthWidth * 0.15); // left down
    vertex(lx + mouthWidth * 0.3, ly + mouthWidth * 0.2); // left center
    vertex(rx - mouthWidth * 0.3, ry + mouthWidth * 0.2); // right center
    vertex(rx - mouthWidth * 0.1, ry + mouthWidth * 0.15); // right down
    vertex(rx, ry); // right corner
    endShape();
  } else {
    // Smiling - upward hexagonal shape
    beginShape();
    vertex(lx, ly); // left corner
    vertex(lx + mouthWidth * 0.15, ly - mouthWidth * 0.15); // left up
    vertex(cx - mouthWidth * 0.2, cy - mouthWidth * 0.2); // left center
    vertex(cx + mouthWidth * 0.2, cy - mouthWidth * 0.2); // right center
    vertex(rx - mouthWidth * 0.15, ry - mouthWidth * 0.15); // right up
    vertex(rx, ry); // right corner
    endShape();
  }
}

function restartApp() {
  // Stop any active camera stream
  if (cameraFeed.srcObject) {
    let stream = cameraFeed.srcObject;
    if (stream) {
      let tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    cameraFeed.srcObject = null;
  }
  
  emailForm.classList.add('hidden');
  thankYouScreen.classList.add('hidden');
  welcomeScreen.classList.remove('hidden');
  tracking = false;
  updateMessage("");
  timerDisplay.textContent = "00:03";
  
  // Reset happiness tracking
  happinessScores = [];
  lastScoreTime = 0;
  
  // Reset and show the smiley indicator
  document.getElementById('smiley-indicator').style.display = 'block';
  moodSmiley.src = "./Smiley_Unhappy.png";
  
  // Hide smiley pattern
  smileyPatternOverlay.classList.add('hidden');
  smileyPatternOverlay.innerHTML = '';
}

function gotFaces(results) {
  faces = results;
}

function updateMessage(message) {
  messageContainer.textContent = message;
}

// Function to create smiley pattern
function createSmileyPattern() {
  // Clear any existing pattern
  smileyPatternOverlay.innerHTML = '';
  
  // Calculate number of smileys based on screen size
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;
  const smileySize = 40; // Base size for smileys
  const numSmileys = Math.floor(containerWidth * containerHeight / (smileySize * smileySize) / 8); // Adjust density
  
  // Create smiley faces with random positions
  for (let i = 0; i < numSmileys; i++) {
    const smiley = document.createElement('img');
    smiley.src = './Smiley_Happy.png';
    smiley.className = 'pattern-smiley';
    smiley.alt = '';
    
    // Random position
    const xPos = Math.random() * 100; // percentage
    const yPos = Math.random() * 100; // percentage
    
    // Random size variation (60% to 140% of the base size)
    const sizeVariation = 60 + Math.random() * 80;
    const size = (smileySize * sizeVariation / 100);
    
    // Random animation delay
    const delay = Math.random() * 5;
    
    // Style the smiley
    smiley.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${xPos}%;
      top: ${yPos}%;
      background-color: transparent;
      opacity: ${0.6 + Math.random() * 0.4}; /* Random opacity for depth effect */
      --delay: ${delay}; /* Custom property for animation delay */
    `;
    
    // Add to the pattern overlay
    smileyPatternOverlay.appendChild(smiley);
  }
}
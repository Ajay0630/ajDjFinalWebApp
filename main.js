let cam;
var moosic;
var rightWristX;
var rightWristY;
var leftWristX;
var leftWristY;
var scoreLeftWrist;
var scoreRightWrist;

function setup() {
    createCanvas(800, 600).center();
    cam = createCapture(VIDEO);
    cam.hide();
    posenet = ml5.poseNet(cam, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is loaded! is loaded! loaded! !")
}

function draw() {
    image(cam, 0, 0, 800, 600);
    if (scoreLeftWrist > 0.2) {
    circle(leftWristX + 70, leftWristY, 30);
    fill("red");
    stroke("red");
    numbervolume = Number(leftWristY);
    nodecimalnumbers = floor(numbervolume);
    volume = nodecimalnumbers/600;
    numericalvolume = floor(volume*100);
    moosic.setVolume(volume);
    console.error(volume);
    document.getElementById("volume").innerHTML = "Volume - " + numericalvolume;
    }
    if (scoreRightWrist > 0.3) {
        circle(rightWristX, rightWristY, 30);
        fill("red");
        stroke("red");
        if (rightWristY >= 0 && rightWristY <= 120) {
            moosic.rate(0.5);
            document.getElementById("speed").innerHTML = "Speed - 0.5x";
        } else if (rightWristY > 120 && rightWristY <= 240) {
            moosic.rate(1);
            document.getElementById("speed").innerHTML = "Speed - 1x";
        } else if (rightWristY > 240 && rightWristY <= 360) {
            moosic.rate(1.5);
            document.getElementById("speed").innerHTML = "Speed - 1.5x";
        } else if (rightWristY > 360 && rightWristY <= 480) {
            moosic.rate(2);
            document.getElementById("speed").innerHTML = "Speed - 2x";
        } else if (rightWristY > 480 && rightWristY <= 600) {
            moosic.rate(2.5);
            document.getElementById("speed").innerHTML = "Speed - AAAH";
        }
    }
}

function playplayplay() {
    moosic.play();
    moosic.setVolume(1);
    moosic.rate(1);
}

function preload() {
    moosic = loadSound('/music.mp3');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Right wrist x & y: " + rightWristX + ", " + rightWristY);
        console.log("Left wrist x & y: " + leftWristX + ", " + leftWristY);
    }
}

song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;
score_rightWrist = 0;
status_song1 = "";
status_song2 = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded!");
}

function draw() {
    image(video, 0, 0, 600, 500);

    status_song1 = song1.isPlaying();
    status_song2 = song2.isPlaying();

    fill('#42f5b9');
    stroke('#42f5b9');

    if (score_leftWrist > 0.2) {

        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if (status_song1 == false) {
            song1.play();
            document.getElementById("song_name").innerHTML = "Playing DJ Song";
        }
    }

    if (score_rightWrist > 0.2) {

        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if (status_song2 == false) {
            song2.play();
            document.getElementById("song_name").innerHTML = "Playing Peter Pan Song";
        }
    }
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X: " + leftWristX);
        console.log("Left Wrist Y: " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X: " + rightWristX);
        console.log("Right Wrist Y: " + rightWristY);
        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;

        console.log("Left Wrist Score: " + score_leftWrist);
        console.log("Right Wrist Score: " + score_rightWrist);
    }
}
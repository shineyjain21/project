status="";
objects=[];
song="";

function preload(){
    song=loadSound("beautiful_crazy.mp3"); 
}
function setup(){
    canvas=createCanvas(300,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectdetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status :Detecting  Objects";
}
function draw(){
    image(video,0,0,380,380); 
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        document.getElementById("status").innerHTML="Status:Object Detected"
        document.getElementById("numebr_of_objects").innerHTML='Number of objects detected are:-'+ objects.length;
        fill(r,g,b)
        objectdetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
                percent=floor(objects[i].confidence*100);
                text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
                noFill();
                stroke('r,g,b');

                rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
                if(objects[i].label=="person"){
                 document.getElementById("number_of_objects").innerHTML="Baby found";
                 song.stop();
                }
                 else{
                    document.getElementById("number_of_objects").innerHTML="Baby not found";
                    song.play();   
                 }
               
        }
    } 
}
function modelLoaded(){
   console.log("model loaded");
    status=true;
    objectdetector.detect(video,gotResult);
}
function gotResult(error,Results){
    if(error){
    console.log(error);
    } 
  else{
  console.log(Results);  
  objects=Results;
  
  }
}
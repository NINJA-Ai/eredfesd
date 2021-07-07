video="";
objects = [];
status = "";

function preload()
{
    video = createVideo('video.mp4');
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();
    video.hide();
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}
function modelLoaded()
{
    console.log("Model is Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error , results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw()
{
    image(video , 0, 0, 600, 500);
    
    if (status != "")
    {
        objectDetector.detect(video, gotResult);
        for ( i = 0 ; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects are " +objects.length;
            
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15,objects[i].y + 15 );
            nofill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }

    }

}



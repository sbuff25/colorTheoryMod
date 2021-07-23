var red = "rgba(255,0,0,1)";
var green = "rgba(0,255,0,1";
var blue = "rgba(0,0,255,1";
var circleArray = [];
var colorArray = [red,green,blue];
let x;
let y;
var mouse = {
    x: undefined,
    y: undefined
}
function getDistance(x1,y1,x2,y2)
{
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance,2))
}

var maxRadius = 100;
var minRadius = 50;
var mouseDown = false;
window.addEventListener("mousemove",function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    
});
window.addEventListener("mousedown",function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    mouseDown = true;
    collisionOn = false
  
    
})
window.addEventListener("mouseup",function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    mouseDown = false;
    collisionOn = true;

})
class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.mass = 1;
       
        this.velocity = {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2

        };
        this.color = colorArray.splice([Math.floor(Math.random() * colorArray.length)],1);
      

        this.radius = radius;


        this.draw = function () {
            
            c.beginPath();
            c.fillStyle = this.color;
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fill();
        };
        this.update = circleArray => {
            this.draw();

            for (let i = 0; i < circleArray.length; i++) {
                if (this === circleArray[i]) continue;
                if (collisionOn == true && getDistance(this.x,this.y,circleArray[i].x,circleArray[i].y) - this.radius * 2 < 0)
                {
                    console.log(collisionOn);
                    var area = intersectionArea(this,circleArray[i]);
                    console.log(area);
                    // when collision occurs
                    // resolveCollision(this,circleArray[i])
                    
                    if (this.radius >= maxRadius) {
                        this.radius = minRadius;
                    }
                    else if (this.radius = 5) {
                        this.radius = minRadius;
                    }
                    // this.color = colorArray[i] *2;   
                    
                    
                }

                this.x += this.velocity.x;
                this.y += this.velocity.y;
                    
            
            }
            if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
                this.velocity.x = -this.velocity.x;
            }

            if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
                this.velocity.y = -this.velocity.y;

            }

            

            //Interactivity
            // Hover over Circle
            if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                console.log("hover");
                this.velocity = {
                    x: 0,
                    y: 0

                }
                
                if (this.radius < maxRadius) {
                    this.radius += 5;
                    
                    
                }
                
                
            }
            // Not Hovering over Circle
            else if (this.radius > minRadius) {
                    this.radius -= 5;
                    this.velocity = {
                    x: (Math.random() - 0.5) * 5,
                    y: (Math.random() - 0.5) * 5
                }
            }
            
            // Drag circle
            if (mouseDown == true) {
                console.log("Dragging Circle");
                if(mouse.x >= this.x - this.radius && mouse.x <= this.x + this.radius && mouse.y >= this.y - this.radius && mouse.y <= this.y + this.radius)
                {
                    this.x = mouse.x;
                    this.y = mouse.y;
                }
            }
            
            
        };
    }
}
function setup(){
    createCanvas(window.innerWidth,window.innerHeight)
    blendMode(SCREEN);

    // for (let i = 0; i < 3; i++) {
    //    var x = random(width);
    //    var y = random(height);
    //    var radius = 50;
    //    fill(red,green,blue);
    //     ellipse(x,y,radius*2,radius*2);
        
    // }
        //Spawn Three Circles
   
    for (let i = 0; i < 3; i++) {
        radius = random(100);
        
        x = Math.random() * (window.innerWidth - radius * 2) + radius;
        y = Math.random() * (window.innerHeight - radius * 2) + radius;
        if (mouseDown == true) {
            circle.x = mouse.x;
            circle.y = mouse.y;
            circleArray.push(new Circle(x,y,radius))
        }
        // Prevents circles from spawning on each other
        if (i !== 0) {
            for (let j = 0; j < circleArray.length; j++) {
                if (getDistance(x,y,circleArray[j].x,circleArray[j].y) - circleArray.radius * 2 < 0) {
                     circleArray.x = Math.random() * (window.innerWidth - circleArray.radius * 2) + circleArray.radius;
                     circleArray.y = Math.random() * (window.innerHeight - circleArray.radius * 2) + circleArray.radius;
    
                     j = -1;
                }
                
            }
        }
        circleArray.push(new Circle(x,y, radius));
        console.log(circleArray);  
        fill(random(255),random(255),random(255));
    circle(x,y,radius);
    }
    
}




function draw() {
   
   circleArray.update();
    
    

}
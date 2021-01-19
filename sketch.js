/* VERSION AVEC PLUSIEURS OBJETS */
let slider
let val
var bubble
var bubble2
var allBubble = []

class Bubble {
  
    constructor(x, y) {
        this.x = x
        this.y = y
        this.radius = 48
        this.col = color(random(255))
        this.size = this.radius * 2
        this.collision = false
    }

    changeColor() {
        this.col = color(random(255), random(255), random(255))
        noStroke()
        fill(this.col)
    }

    createBubble(arrayBubble) {
        if (this.collision == false && arrayBubble.length < 10) {
            arrayBubble.push(new Bubble(random(1, width), random(1, height)))
        }
    }

    intersect(b2) {
        for (var i = 0; i < b2.length - 1; i++) {
            var intersection = dist(this.x, this.y, b2[i + 1].x, b2[i + 1].y)
            if (intersection < b2[i].radius + this.radius && intersection != 0) {
                this.createBubble(b2)
                this.collision = true
                this.changeColor()
                b2[i + 1].changeColor()
            }
        }
    }

    moveShape() {
        this.x = this.x + random(-10, 10)
        this.y = this.y + random(-10, 10)

        if (this.x >= width) {
            this.x -= random(1, 10)
        } else if(this.x <= 0) {
            this.x += random(1, 10)
        } else if(this.y <= 0) {
            this.y += random(1, 10)
        } else if(this.y >= height) {
            this.y -= random(1, 10)
        }
    }

    show() {
        noStroke()
        fill(this.col)
        ellipse(this.x, this.y, this.size, this.size)
    }
}

function setup() { 
    createCanvas(800, 600)

    for (var i = 0; i < 2; i++) {
        allBubble.push(new Bubble(random(1, width), random(1, height)))
    }
} 

function draw() { 
    background(0)
    
    for(var i = 0; i < allBubble.length; i++) {
        allBubble[i].show()
        allBubble[i].moveShape()
        allBubble[i].intersect(allBubble)
    }
}

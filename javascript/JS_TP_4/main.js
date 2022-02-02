class Dot {
    constructor(color, canvas) {
      this.color = color;
      this.canvas = canvas;
      this.canvas2dContext=this.canvas.getContext("2d");
      this.worker = new Worker("worker.js");
    }
    
    draw(x,y) {
        console.log(x,y);
        this.canvas2dContext.beginPath();
        this.canvas2dContext.arc(x,y,5,0,2*Math.PI,false);
        this.canvas2dContext.fillStyle = this.color;
        this.canvas2dContext.fill();
		}
    }

function drawRandom(colors, canvas){
    //this function is to handle a list of colors, make a list of dots out of those colors,
    //and call the dedicated worker of each dot for coordinates, then plot each dot
    let dots =[];
    colors.forEach( (color) => dots.push(new Dot(color, canvas)) );

    dots.forEach(d => {
        d.worker.postMessage([canvas.width,canvas.height]); //so that our coordinates are within the canvas
        d.worker.addEventListener('message', (e) => {console.log(e.data);
                                                    d.draw(e.data.x, e.data.y)});
    });

    /*worker.onmessage = function(e) {
            console.log('Message received from worker');
            console.log(e.data);
            dot.draw(e.data.x, e.data.y)
          }*/

}

function getColors(nb_colors){
    //This function creates an array of colors of the given size nb_colors
    var colors = [];
    while (colors.length < nb_colors) {
        //do {
        var color = Math.floor((Math.random()*100000)+1); //sample random number
        //} while (colors.indexOf(color) >= 0);
        colors.push("#" + ("000000" + color.toString(16)).slice(-6)); //to go from number to a #05g89d color code
    }
    return colors;
}

function init() {
    if (window.Worker) {
        //for the first one

        //set the canvas
        canvas = document.getElementById("arena");
		canvas.setAttribute("width",500);
		canvas.setAttribute("height",200);

        //create a dot
        let dot = new Dot("red", canvas);

        //start the setInterval loop
        let interval;
        //for the stop it button
        document.getElementById("stop_workers").addEventListener("click", ()=>{clearInterval(interval)});
        
        //go ask the worker every second for new coordinates, then plot them
        interval = setInterval( () => {dot.worker.postMessage([canvas.width,canvas.height]); //so that our coordinates are within the canvas
                                        dot.worker.addEventListener('message', 
                                                                    (e) => dot.draw(e.data.x, e.data.y));
                                        },1);

        


        //for the second one

        //setup the canvas
        canvas2 = document.getElementById("arena2");
		canvas2.setAttribute("width",500);
		canvas2.setAttribute("height",200);

        //for the input number of workers 
        //get the input element from the html
        const num_colors_el = document.getElementById("num_colors");
        function reload(){
            canvas2.getContext('2d').clearRect(0, 0, canvas2.width, canvas2.height);
            colors = getColors(num_colors_el.value);
            //let interval = setInterval(drawRandom, 1, colors, canvas);
            drawRandom(colors, canvas2);
        }
        //if the input "number of workers" changes, then we call reload
        num_colors_el.onchange = reload;

        //if we hit the restart button, then reload too
        //I defined the reload function so that both onchange and the event listener for a click on the "draw again" button have the exact same function
        const restart_button_mult = document.getElementById("restart_multiple");
        restart_button_mult.addEventListener("click", reload)

    } else {
        console.log('Your browser doesn\'t support web workers.');
    }
}

window.onload = init();
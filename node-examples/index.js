var rect = require("./rectangle");

function solveReact(x,y){
    console.log("Received parameters");
    console.log("Perimeter is: "+rect.perimeter(x,y));
    console.log("Area is: "+rect.area(x,y));
}

solveReact(10,2);
solveReact(34,2);
solveReact(90,12);
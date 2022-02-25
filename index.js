
var vistas = []

window.addEventListener("DOMContentLoaded", getVistas);

function getVistas(){
    let text
    for(let i=1;i<=4;i++){
        text = "Vista-"+i
        vistas.push(document.getElementById(text))
        if(i!=1){
            vistas[i-1].classList.add("hidden");
        }
    }
    //setTimeout(function(){ alert("After 5 seconds!"); }, 2000);
}

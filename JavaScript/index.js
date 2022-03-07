
var vistas = [];
var body;
var blankView;

window.addEventListener("DOMContentLoaded", getVistas);

function getVistas(){
    let parent = document.getElementsByTagName("body")[0];
    body = parent;
    let childrens = parent.children;
    vistas = childrens;
    blankView = vistas[1];
    let childrensAmount = childrens.length;
    for(i = 1;i<childrensAmount;i++){
        childrens[i].classList.add("hidden");
    }
    setTimeout(function(){ changeViewAnimation("Vista-Registro"); }, 2000);
}

function changeViewAnimation(objective,method){
    let vistasAmount = vistas.length;
    for(i = 2;i<vistasAmount;i++){
        if(vistas[i].getAttribute('id') == objective){
            let change = vistas[i];
            let actual = vistas[0];
            if(method==1){
                if(localStorage.getItem('last')==null){
                    localStorage.setItem('last', JSON.stringify([]))
                }
                try{
                    JSON.parse(localStorage.getItem('last'))
                }catch{
                    localStorage.setItem('last', JSON.stringify([]))
                }

                let historial = JSON.parse(localStorage.getItem('last'))
                historial.push(actual.getAttribute("id"))
                localStorage.setItem('last', JSON.stringify(historial));
            }else if(method == 2){
                localStorage.setItem('last', JSON.stringify([]))
            }
            vistas[1].classList.remove("hidden");
            vistas[1].classList.add("appeared");
            setTimeout(() => {
                actual.classList.add("hidden");
                body.removeChild(actual);
                body.removeChild(change);
                body.insertBefore(change,blankView);
                body.insertBefore(actual,blankView.nextSibling);
                change.classList.remove("hidden");
                blankView.classList.remove("appeared");
                blankView.classList.add("desappeared");
                setTimeout(() => {
                    blankView.classList.remove("desappeared");
                    blankView.classList.add("hidden");              
                }, 1000);
            }, 1000);
            
        }
    }
}


function verifyData(){
    changeViewAnimation("Vista-Carga");
    setTimeout(function(){ changeViewAnimation("Vista-Menu"); }, 3000);
}

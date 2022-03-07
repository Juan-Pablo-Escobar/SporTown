
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
    let user = document.getElementById("email").value
    let password = document.getElementById("password").value
    let users = JSON.parse(localStorage.getItem('users'))
    if(users!= null){
        for(i = 0;i<users.length;i++){
            if(users[i].user == user && users[i].password == password){
                localStorage.setItem("user",i)
                document.getElementById("email").value=""
                document.getElementById("password").value=""
                loadname()
                changeViewAnimation("Vista-Carga");
                setTimeout(function(){ changeViewAnimation("Vista-Menu",0); }, 3000);
                return;
            }
        }
    }

    alert("Correo o Contraseña erroneo o vacio")
}

function regresar(){
    changeViewAnimation(JSON.parse(localStorage.getItem('last')).pop(),0)
    let historial = JSON.parse(localStorage.getItem('last'))
    historial.pop()
    localStorage.setItem('last', JSON.stringify(historial));
}

function verifyregister(){
    if(document.getElementById("emailreg").value.trim() == "" || document.getElementById("passwordreg").value.trim() == "" || document.getElementById("verifpasswordreg").value.trim() == ""){
        alert("Algun campo vacio")
    }else if(document.getElementById("passwordreg").value== document.getElementById("verifpasswordreg").value){
        user = document.getElementById("emailreg").value
        password = document.getElementById("passwordreg").value

        try{
            local = JSON.parse(localStorage.getItem("users"))
        }catch{
            users = []
            users.push({"user":user,"password":password})
            localStorage.setItem("users",JSON.stringify(users))
            changeViewAnimation("Vista-Datos-Personales",2)
            document.getElementById("emailreg").value=null;
            document.getElementById("passwordreg").value=null;
            document.getElementById("verifpasswordreg").value=null;
            return;
        }

        if(localStorage.getItem("users") == null){
            users = []
            users.push({"user":user,"password":password})
            localStorage.setItem("users",JSON.stringify(users))
            document.getElementById("emailreg").value=null;
            document.getElementById("passwordreg").value=null;
            document.getElementById("verifpasswordreg").value=null;
            changeViewAnimation("Vista-Datos-Personales",2)
            return;
        }else{
            users = JSON.parse(localStorage.getItem("users"))
            for(i=0;i<users.length;i++){
                if(users[i].user == user){
                    alert("El usuario ya existe")
                    return;
                }
            }
            users.push({"user":user,"password":password})
            localStorage.setItem("users",JSON.stringify(users))
            changeViewAnimation("Vista-Datos-Personales",2)
            document.getElementById("emailreg").value=null;
            document.getElementById("passwordreg").value=null;
            document.getElementById("verifpasswordreg").value=null;
            return;
        }
    }else{
        alert("Contraseña de verificacion diferente")
    }
}

function savedata(){
    users = JSON.parse(localStorage.getItem("users"))
    nombre = document.getElementById("nombrecompleto").value.trim()
    edad = document.getElementById("edad").value.trim()
    altura = document.getElementById("altura").value.trim()
    radios = document.getElementsByName("factoresderiesgo")
    riesgo = ""
    for(i=0;i<radios.length;i++){
        if(radios[i].checked == true){
            riesgo = radios[i]
        }
    }
    if(altura == "" || edad == "" || nombre == "" || riesgo == ""){
        alert("Algun campo vacio")
    }else{
        
        document.getElementById("nombrecompleto").value = ""
        document.getElementById("edad").value = ""
        document.getElementById("altura").value = ""
        riesgo.checked = false
        riesgo = riesgo.value

        users[users.length-1].name = nombre
        users[users.length-1].age = edad
        users[users.length-1].height = altura
        users[users.length-1].risk = riesgo
        localStorage.setItem("users",JSON.stringify(users))
        changeViewAnimation("Vista-Registro-Exitoso");
        setTimeout(function(){ changeViewAnimation("Vista-Ingreso",2); }, 3000);
    }
    
}

function cerrarSesion(){
    localStorage.setItem("user",-1)
    localStorage.setItem("last",[])
    changeViewAnimation("Vista-Ingreso",0)
}

function loadname(){
    username = document.getElementsByName("username")
    usernamevalue = JSON.parse(localStorage.getItem("users"))[localStorage.getItem("user")]
    for(i = 0;i<username.length;i++){
        username[i].innerHTML = usernamevalue.name
    }
}
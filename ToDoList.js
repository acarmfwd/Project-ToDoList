//Sign up page code

let correoE=document.getElementById("correoE");
let paswrd=document.getElementById("contra");

//Declaring obj User
let user={
    Correo:"",
    contraseña:"",
    esAdmin:"",
}

//Loading and reseting data from Local Storage
let Users=[];
let alreadyUser=JSON.parse(localStorage.getItem("alreadyUser"));


function resetData() {
    if (alreadyUser.length==0 || alreadyUser==undefined){
        localStorage.setItem("alreadyUser", JSON.stringify(Users));
    }
} 

resetData();


// Verifica si el usuario ya existe
function verificar() {
    let correo=correoE.value;
    for (let i = 0; i < alreadyUser.length; i++) {
        if (alreadyUser[i].Correo==correo) {
            return true
        }  
    }   
}

//Signing up function 
function registrar() {
    if (verificar()) {
        return alert ("El usuario ya existe")
    }
    let correo=correoE.value;
    let contra=paswrd.value;
    if (correo=="" || contra=="") {
        return alert("Faltan datos que agregar")
    }
    let usuario={...user};
    usuario.Correo=correo;
    usuario.contraseña=contra;
    usuario.esAdmin=true;
    alreadyUser.push(usuario);
    localStorage.setItem("alreadyUser", JSON.stringify(alreadyUser)); 
    alert ("Usuario ha sido registrado")
    window.location.href="login.html";
}  

//-----------------------------------------------------------------------------------//

//Login page code

//Obtencion de valores de los inputs por ID
let currentCorreo=document.getElementById("CorreoLogin");
let currentPaswrd=document.getElementById("contra");


/*Funcion que verificar si el los valores del input ya estan registrados (Existe el usuario)
en el local storage, si no alerta que el correo o contraseña son inccorrectos*/
function login() {
    let correo=currentCorreo.value;
    let contra=currentPaswrd.value;
    for (let i = 0; i < alreadyUser.length; i++) {
       if (alreadyUser[i].Correo==correo & alreadyUser[i].contraseña==contra) {
            return window.location.href="ToDoList.html";
       }
       else return alert ("Correo o contraseña incorrectas");
    }
}

//------------------------------------Eventos---------------------------------------//

//Crea el objeto event
let eventoNuevo = {
    title:"",
    date:"",
    priority:""
}

let eventos=[];
let eventosExistentes=JSON.parse(localStorage.getItem("eventos"));


function resetEventos() {
    if (eventosExistentes.length==0 || eventosExistentes==undefined){
        localStorage.setItem("eventos", JSON.stringify(eventos));
    }
} 

resetEventos();

//Trae las variables del HTML
let newEvent=document.getElementById("eventoCrear");
let newtarea=document.getElementById("tareaCrear");
let eventCont=document.getElementById("eventosCont");


//Editar Eventos
function editEvent(tituloE) {
    let newDescrip=prompt("Ingrese el nombre del evento");
    let newDate=prompt("Ingrese la fecha del evento");
    let newPrio=prompt("Ingrese la prioridad, Alta, Media, Baja");
    for (let i = 0< eventosExistentes.length; i++;) {   
        if (eventosExistentes[i].title==tituloE) {
            eventosExistentes[i].title=newDescrip;
            eventosExistentes[i].date=newDate;
            eventosExistentes[i].priority=newPrio;
        }
    }
}

//Crear evento
function nuevaEvento() {
    let newEvent={...eventoNuevo};
    let evento=prompt("Ingrese el nombre del evento");
    let fecha= prompt("Ingrese la fecha del evento");
    let prioridad=prompt("Prioridad? Alta, Media, Baja");
    let tareaDiv=document.createElement("div");

    //Datos del evento
    let descripcionEvento=document.createElement("p");
    let fechaEvento=document.createElement("p");
    let prioridadE=document.createElement("p");
    descripcionEvento.innerHTML=evento;
    fechaEvento.innerHTML=fecha;
    prioridadE.innerHTML=prioridad;

    //Creacion de botones
    let eliminarBtn=document.createElement("button");
    eliminarBtn.innerHTML=("Eliminar");
    let editarBtn=document.createElement("button");
    editarBtn.innerHTML=("Editar");
    editarBtn.onclick= function () {
            let newDescrip=prompt("Ingrese el nombre del evento");
            let newDate=prompt("Ingrese la fecha del evento");
            let newPrio=prompt("Ingrese la prioridad, Alta, Media, Baja");
            for (let i = 0< eventosExistentes.length; i++;) {   
                if (eventosExistentes[i].title = evento) {
                    eventosExistentes[i].title=newDescrip;
                    eventosExistentes[i].date=newDate;
                    eventosExistentes[i].priority=newPrio;
                    //-------//
                    descripcionEvento.innerHTML=newDescrip;
                    fechaEvento.innerHTML=newDate;
                    prioridadE.innerHTML=newPrio;
                }
            } 
        }

    //Añade los datos a sus contenedores
    tareaDiv.appendChild(descripcionEvento);
    tareaDiv.appendChild(fechaEvento);
    tareaDiv.appendChild(prioridadE);
    tareaDiv.appendChild(eliminarBtn);
    tareaDiv.appendChild(editarBtn);
    eventCont.appendChild(tareaDiv);

    //Cambia los datos del obj
    newEvent.title=evento;
    newEvent.date=fecha;
    newEvent.priority=prioridad;
    eventosExistentes.push(newEvent);
    localStorage.setItem("eventos", JSON.stringify(eventosExistentes));
}

function loadEvents() {
    let tareaDiv=document.createElement("div");
    for (let i = 0; i < eventosExistentes.length; i++) {
        //Carga los datos del obj Evento en el vector del local storage
        let Titulo= eventosExistentes[i].title;
        let fecha=eventosExistentes[i].date;
        let prioridad=eventosExistentes[i].priority;
        
        //Datos del evento
        let descripcionEvento=document.createElement("p");
        let fechaEvento=document.createElement("p");
        let prioridadE=document.createElement("p");
        descripcionEvento.innerHTML=Titulo;
        fechaEvento.innerHTML=fecha;
        prioridadE.innerHTML=prioridad;

        //Creacion de botones
        let eliminarBtn=document.createElement("button");
        eliminarBtn.innerHTML=("Eliminar");
        let editarBtn=document.createElement("button");
        editarBtn.innerHTML=("Editar");
        editarBtn.onclick= function () {
            let newDescrip=prompt("Ingrese el nombre del evento");
            let newDate=prompt("Ingrese la fecha del evento");
            let newPrio=prompt("Ingrese la prioridad, Alta, Media, Baja");
            for (let i = 0; i< eventosExistentes.length; i++) {   
                if (eventosExistentes[i].title = Titulo) {
                    eventosExistentes[i].title=newDescrip;
                    eventosExistentes[i].date=newDate;
                    eventosExistentes[i].priority=newPrio;
                    localStorage.setItem("eventos", JSON.stringify(eventosExistentes));

                }
            } 
        }
    
        //Añade los datos a sus contenedores
        tareaDiv.appendChild(descripcionEvento);
        tareaDiv.appendChild(fechaEvento);
        tareaDiv.appendChild(prioridadE);
        tareaDiv.appendChild(eliminarBtn);
        tareaDiv.appendChild(editarBtn);
        eventCont.appendChild(tareaDiv);
    }
}

loadEvents();
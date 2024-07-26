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
    let eventoDiv=document.createElement("div");

    //Datos del evento
    let descripcionEvento=document.createElement("p");
    let fechaEvento=document.createElement("p");
    let prioridadE=document.createElement("p");
    descripcionEvento.innerHTML= "Descripcion del evento: "+evento;
    fechaEvento.innerHTML="Fecha del evento: "+fecha;
    prioridadE.innerHTML="Prioridad: "+prioridad;

    //Creacion de botones
    let eliminarBtn=document.createElement("button");
    eliminarBtn.innerHTML=("Eliminar");
    //Eliminar Evento
    eliminarBtn.onclick= function () {
        for (let i = 0; i < eventosExistentes.length; i++) {
                if (eventosExistentes[i].title==evento) {
                    eventosExistentes.splice(i,1);
                    localStorage.setItem("eventos", JSON.stringify(eventosExistentes));
                    eventoDiv.remove(this);
                }
            }
        }
    let editarBtn=document.createElement("button");
    editarBtn.innerHTML=("Editar");
    //Editar Evento
    editarBtn.onclick= function () {
            let newDescrip=prompt("Ingrese el nombre del evento");
            let newDate=prompt("Ingrese la fecha del evento");
            let newPrio=prompt("Ingrese la prioridad, Alta, Media, Baja");
            for (let i = 0; i< eventosExistentes.length; i++) {   
                if (eventosExistentes[i].title == evento) {
                    evento=newDescrip;
                    eventosExistentes[i].title=newDescrip;
                    eventosExistentes[i].date=newDate;
                    eventosExistentes[i].priority=newPrio;
                    localStorage.setItem("eventos", JSON.stringify(eventosExistentes));
                    descripcionEvento.innerHTML= "Descripcion del evento: "+ newDescrip;
                    fechaEvento.innerHTML="Fecha del evento: "+ newDate;
                    prioridadE.innerHTML="Prioridad: "+ newPrio;
                }
            } 
        }

    //Añade los datos a sus contenedores
    eventoDiv.appendChild(descripcionEvento);
    eventoDiv.appendChild(fechaEvento);
    eventoDiv.appendChild(prioridadE);
    eventoDiv.appendChild(eliminarBtn);
    eventoDiv.appendChild(editarBtn);
    eventCont.appendChild(eventoDiv);

    //Cambia los datos del obj
    newEvent.title=evento;
    newEvent.date=fecha;
    newEvent.priority=prioridad;
    eventosExistentes.push(newEvent);
    localStorage.setItem("eventos", JSON.stringify(eventosExistentes));
}

//funcion para cargar los elementos por primera vez
function loadEvents() {
    for (let i = 0; i < eventosExistentes.length; i++) {
        let eventoDiv=document.createElement("div");
        //Carga los datos del obj Evento en el vector del local storage
        let Titulo= eventosExistentes[i].title;
        let fecha=eventosExistentes[i].date;
        let prioridad=eventosExistentes[i].priority;
        
        //Datos del evento
        let descripcionEvento=document.createElement("p");
        let fechaEvento=document.createElement("p");
        let prioridadE=document.createElement("p");
        descripcionEvento.innerHTML= "Descripcion del evento: "+Titulo;
        fechaEvento.innerHTML="Fecha del evento: "+fecha;
        prioridadE.innerHTML="Prioridad: "+prioridad;

        //Creacion de botones

        let eliminarBtn=document.createElement("button");
        eliminarBtn.innerHTML=("Eliminar");
        //Eliminar Evento
        eliminarBtn.onclick= function () {
            for (let i = 0; i < eventosExistentes.length; i++) {
                    if (eventosExistentes[i].title == Titulo) {
                        eventosExistentes.splice(i,1);
                        localStorage.setItem("eventos", JSON.stringify(eventosExistentes));
                        eventoDiv.remove(this);
                }
            }
        }
        let editarBtn=document.createElement("button");
        editarBtn.innerHTML=("Editar");
        //Editar Evento
        editarBtn.onclick= function () {
            let newDescrip=prompt("Ingrese el nombre del evento");
            let newDate=prompt("Ingrese la fecha del evento");
            let newPrio=prompt("Ingrese la prioridad, Alta, Media, Baja");
            for (let i = 0; i< eventosExistentes.length; i++) {   
                if (eventosExistentes[i].title == Titulo) {
                    Titulo=newDescrip;
                    eventosExistentes[i].title=newDescrip;
                    eventosExistentes[i].date=newDate;
                    eventosExistentes[i].priority=newPrio;
                    localStorage.setItem("eventos", JSON.stringify(eventosExistentes));
                    descripcionEvento.innerHTML= "Descripcion del evento: "+ newDescrip;
                    fechaEvento.innerHTML="Fecha del evento: "+ newDate;
                    prioridadE.innerHTML="Prioridad: "+ newPrio;
                }
            } 
        }
    
        //Añade los datos a sus contenedores
        eventoDiv.appendChild(descripcionEvento);
        eventoDiv.appendChild(fechaEvento);
        eventoDiv.appendChild(prioridadE);
        eventoDiv.appendChild(eliminarBtn);
        eventoDiv.appendChild(editarBtn);
        eventCont.appendChild(eventoDiv);
    }
}

loadEvents();


//--------------------------------------Tareas----------------------------------------//

//Se declara el objeto tarea
let tarea={
    Nombre:"",
    Prio:""
}


//Se cargan las tareas del Local Storage
let tareas=[];
let tareasExistentes=JSON.parse(localStorage.getItem("tareas"));

//Resetea las tareas de ser necesario 
function resetTareas() {
    if (tareasExistentes.length==0 || tareasExistentes==undefined){
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }
} 

resetTareas();

//Trae las variables del HTML
let newtarea=document.getElementById("tareaCrear");
let tareaCont=document.getElementById("tareasCont");


//Crear tarea
function nuevaTarea() {
    let newTask={...tarea};
    let task=prompt("Ingrese el nombre de la tarea");
    let Prio=prompt("Prioridad? Alta, Media, Baja");
    let tareaDiv=document.createElement("div");

    //Datos de la tarea
    let descripcionTarea=document.createElement("p");
    let prioridadT=document.createElement("p");
    descripcionTarea.innerHTML= "Descripcion de la tarea "+task;
    prioridadT.innerHTML="Prioridad: "+Prio;

    //Creacion de botones
    let eliminarTBtn=document.createElement("button");
    eliminarTBtn.innerHTML=("Eliminar");
    //Eliminar Tarea
    eliminarTBtn.onclick= function () {
        for (let i = 0; i < tareasExistentes.length; i++) {
                if (tareasExistentes[i].Nombre==task) {
                    tareasExistentes.splice(i,1);
                    localStorage.setItem("tareas", JSON.stringify(tareasExistentes));
                    tareaDiv.remove(this);
                }
            }
        }
    let editarTBtn=document.createElement("button");
    editarTBtn.innerHTML=("Editar");
    //Editar Tarea
    editarTBtn.onclick= function () {
            let newDescrip=prompt("Ingrese el nombre de la Tarea");
            let newPrio=prompt("Ingrese la prioridad, Alta, Media, Baja");
            for (let i = 0; i< tareasExistentes.length; i++) {   
                if (tareasExistentes[i].Nombre == task) {
                    task=newDescrip;
                    tareasExistentes[i].Nombre=newDescrip;
                    tareasExistentes[i].Prio=newPrio;
                    localStorage.setItem("tareas", JSON.stringify(tareasExistentes));
                    descripcionTarea.innerHTML= "Descripcion de la Tarea: "+ newDescrip;
                    prioridadT.innerHTML="Prioridad: "+ newPrio;
                }
            } 
        }

    //Añade los datos a sus contenedores
    tareaDiv.appendChild(descripcionTarea);
    tareaDiv.appendChild(prioridadT);
    tareaDiv.appendChild(eliminarTBtn);
    tareaDiv.appendChild(editarTBtn);
    tareaCont.appendChild(tareaDiv);

    //Cambia los datos del obj
    newTask.Nombre=task
    newTask.Prio=Prio;
    tareasExistentes.push(newTask);
    localStorage.setItem("tareas", JSON.stringify(tareasExistentes));
}

//Funcion para cargar las tareas
function loadTasks() {
    for (let i = 0; i < tareasExistentes.length; i++) {
        let tareaDiv=document.createElement("div");
        //Carga los datos del obj Evento en el vector del local storage
        let task= tareasExistentes[i].Nombre;
        let Prio=tareasExistentes[i].Prio;

        //Datos de la tarea
        let descripcionTarea=document.createElement("p");
        let prioridadT=document.createElement("p");
        descripcionTarea.innerHTML= "Descripcion de la tarea "+task;
        prioridadT.innerHTML="Prioridad: "+Prio;

        //Creacion de botones
        let eliminarTBtn=document.createElement("button");
        eliminarTBtn.innerHTML=("Eliminar");
        //Eliminar Tarea
        eliminarTBtn.onclick= function () {
            for (let i = 0; i < tareasExistentes.length; i++) {
                    if (tareasExistentes[i].Nombre==task) {
                        tareasExistentes.splice(i,1);
                        localStorage.setItem("tareas", JSON.stringify(tareasExistentes));
                        tareaDiv.remove(this);
                    }
                }
            }

        let editarTBtn=document.createElement("button");
        editarTBtn.innerHTML=("Editar");
        //Editar Tarea
        editarTBtn.onclick= function () {
                let newDescrip=prompt("Ingrese el nombre de la Tarea");
                let newPrio=prompt("Ingrese la prioridad, Alta, Media, Baja");
                for (let i = 0; i< tareasExistentes.length; i++) {   
                    if (tareasExistentes[i].Nombre == task) {
                        task=newDescrip;
                        tareasExistentes[i].Nombre=newDescrip;
                        tareasExistentes[i].Prio=newPrio;
                        localStorage.setItem("tareas", JSON.stringify(tareasExistentes));
                        descripcionTarea.innerHTML= "Descripcion de la Tarea: "+ newDescrip;
                        prioridadT.innerHTML="Prioridad: "+ newPrio;
                    }
                } 
            }

        //Añade los datos a sus contenedores
        tareaDiv.appendChild(descripcionTarea);
        tareaDiv.appendChild(prioridadT);
        tareaDiv.appendChild(eliminarTBtn);
        tareaDiv.appendChild(editarTBtn);
        tareaCont.appendChild(tareaDiv);
    }
}

loadTasks();
const btnLimpiar = document.getElementById("limpiar"); //boton Limpiar
const input = document.getElementById("item"); //campo de texto
const btnAgregar = document.getElementById("agregar");//boton agregar
const contenedor = document.getElementById("contenedor");//contenedor


/* LocalStorage */ 
const LS_KEY = "listadoItems";
let items = []; 


const normalizar = (str) => (str || "").replace(/\s+/g, " ").trim();

function guardar() {  
    localStorage.setItem(LS_KEY, JSON.stringify(items)); 
}

function cargar() {
    try {
        const data = JSON.parse(localStorage.getItem(LS_KEY));
        if (Array.isArray(data)) items = data;
    } catch {
        items = [];
    }
}
     
function render() {
   contenedor.innerHTML = "";

   if (!items.length) {
       const vacio = document.createElement("li");
       vacio.className = "list-group-item text-muted fst-italic";
       vacio.textContent = "No hay elementos en el listado";
       contenedor.appendChild(vacio);    
       return;
   }

   items.forEach((texto, idx) => { 
       const li = document.createElement("li");
       li.className = "list-group-item d-flex justify-content-between align-items-center";

       const span = document.createElement("span");
       span.className = "list-item-text";
       span.textContent = texto;

       const borrar = document.createElement("button");
       borrar.className = "btn btn-outline-danger btn-sm";
       borrar.textContent = "Borrar";

       borrar.addEventListener("click", () => {
           items.splice(idx, 1);
           guardar();
           render();
       });

       li.append(span, borrar);
       contenedor.appendChild(li);
   });
}

function agregarItem () {
    const valor  = normalizar(input.value);
    if (!valor) return;
    
    items.push(valor);
    input.value = "";
    guardar();
    render();
}

function limpiarTodo() {
    if (!items.length) return;
    if (confirm("¿Vaciar todo el listado?")) {
        items = [];
        guardar();
        render();
    }
}

btnAgregar.addEventListener("click", agregarItem);
btnLimpiar.addEventListener("click", limpiarTodo);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        agregarItem();
    }
})

cargar();
render();


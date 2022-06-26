import Citas from './Classes/Citas.js'
import UI from './Classes/UI.js'

import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario, contenedorCitas } from './selectores.js'


//Instanciando Objetos

const ui = new UI();
const administrarCitas = new Citas();
let editando;

//// OBJETO CON LA INFORMACIÓN DE LA CITA

const citaObj = {
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: "",
}

//// FUNCIONES

//Agrega datos al objeto de cita

export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;  //Interesa acceder a las propiedades, en este caso, name.
}

//Valida y agrega una nueva cita a la clase de citas

export function nuevaCita(e) {
    e.preventDefault();


    //Extraer la información del objeto de cita

    const {mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    //Validar

    if (mascota==="" || propietario==="" || telefono==="" || fecha==="" || hora==="" || sintomas==="" ) {
        ui.imprimirAlerta("Todos los campos son obligatorios", "error")

        return;
    }

    //Verifica si el formulario se está editando

    if (editando) {
        ui.imprimirAlerta('Editado correctamente');

        //Pasar el objeto de la cita a edición
        administrarCitas.editarCita({...citaObj})


        //Regresar el texto del botón a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        //Quitar modo edición
        editando= false;
    }else{
    //Generar un ID único en el objeto citaObj

    citaObj.id = Date.now() //Simulando un id con este método


    //Creando una nueva cita

    administrarCitas.AgregarCita({...citaObj});

    //Mensaje de agregando correctamente

    ui.imprimirAlerta('Se agregó correctamente');
    }

    //Reiniciando el objeto para la validación

    reiniciarObjeto();

    //Reiniciar el formulario
    formulario.reset();

    //Mostrar el HTML de las citas

    ui.imprimirCitas(administrarCitas);
}   

//Además de reiniciar el formulario, también necesitamos reiniciar el objeto para que la cita anterior no se siga pegando. 

export function reiniciarObjeto() {
    citaObj.mascota=""
    citaObj.propietario=""
    citaObj.telefono=""
    citaObj.fecha=""
    citaObj.hora=""
    citaObj.sintomas=""
}

//Función de reinicio del HTML

export function limpiarHTML() {
    contenedorCitas.innerHTML="";
}

export function eliminarCita(id) {
    
    //Elimina la cita 

    administrarCitas.eliminarCita(id)

    //Muestra un mensaje

    ui.imprimirAlerta("Se eliminó correctamente");

    //Refrescar la citas

    ui.imprimirCitas(administrarCitas)

}

//Carga los datos y el modo edición para editar la cita

export function cargarEdicion(cita) {
    const {mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    //Llenar los inputs

    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar el objeto

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //Cambiar el texto del botón "Agregar cita" a "Guardar Cambios"

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;  //Ayuda a salir del modo edición en el condicional
}
    
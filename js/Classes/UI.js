import { eliminarCita, cargarEdicion, limpiarHTML} from '../funciones.js'
import { contenedorCitas } from '../selectores.js'

class UI {
    imprimirAlerta(mensaje, tipo){

        const alerta = document.querySelector(".alerta")

        if (!alerta) { //Si no hay una alerta previa, muestra alerta

            //Crear el DIV
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center", "alert", "d-block", "col-12", "alerta");

        //Agregar clase en base al tipo de error

        if (tipo === "error") {
            divMensaje.classList.add("alert-danger");
        } else{
            divMensaje.classList.add("alert-success");
        }

        //Mensaje de error

        divMensaje.textContent = mensaje;

        //Agregar al DOM

        document.querySelector("#contenido").insertBefore(divMensaje, document.querySelector(".agregar-cita"));

        //Quitar del DOM después de 5 segundos

        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
        }
    }

    imprimirCitas({citas}){

        //Limpia el HTML

        limpiarHTML();
        
        //Imprime la cita en el HTML
        
        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement("div");
            divCita.classList.add("cita", "p-3");
            divCita.dataset.id = id;

            //Scripting de la cita

            const mascotaParrafo = document.createElement("h2")
            mascotaParrafo.classList.add("card-title","font-weight-bolder");
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement("p")
            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario} `;

            const telefonoParrafo = document.createElement("p")
            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${telefono} `;

            const fechaParrafo = document.createElement("p")
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha} `;

            const horaParrafo = document.createElement("p")
            horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora} `;

            const sintomasParrafo = document.createElement("p")
            sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Sintomas: </span> ${sintomas} `;

            //Botón para eliminar esta cita

            const btnEliminar = document.createElement("button");
            btnEliminar.classList.add("btn", "btn-danger", "mr-2")
            btnEliminar.innerHTML = 'Eliminar <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
            btnEliminar.onclick = () => {
                eliminarCita(id);
            }

            //Botón para editar la cita

            const btnEditar = document.createElement("button");
            btnEditar.classList.add("btn", "btn-info");
            btnEditar.innerHTML = 'Editar <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>'

            btnEditar.onclick = () => cargarEdicion(cita);

            //Agregar los parrafos al divCita

            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            //Agregar divCita al HTML

            contenedorCitas.appendChild(divCita);
        })
    }
}

export default UI;
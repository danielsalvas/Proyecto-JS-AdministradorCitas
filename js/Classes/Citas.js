//Classes
class Citas {
    constructor() {
        this.citas = [];

    }

    AgregarCita(cita){
        this.citas = [...this.citas, cita];

    }

    eliminarCita(id){
        this.citas = this.citas.filter( cita => cita.id != id )   //Este código se encanrga de eliminar las citas
    }

    editarCita(citaActualizada) { //.map crea un nuevo arreglo, a diferencia de forEach, ,ecesitamos reeescribir todo el objeto
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita)
    }
}

export default Citas;


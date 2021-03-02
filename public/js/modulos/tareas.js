import axios from 'axios';
import Swal from 'sweetalert2';
import {actualizarAvance} from '../funciones/avance';
const tarea = document.querySelector('.listado-pendientes');

if(tarea){
    tarea.addEventListener('click', e=>{
        if(e.target.classList.contains('fa-check-circle')){
            const lista = e.target.parentElement.parentElement;
            const tareaId = lista.dataset.tarea;

            const url = `${location.origin}/tareas/${tareaId}`;

            axios.patch(url, {tareaId})
                .then(resp => {
                    if(resp.status === 200){
                        e.target.classList.toggle('completo');
                        actualizarAvance();
                    }
                })
                .catch(e => console.log(e))
        }

        if(e.target.classList.contains('fa-trash')){
            const lista = e.target.parentElement.parentElement;
            const tareaId = lista.dataset.tarea;

            Swal.fire({
                title: 'Deseas borrar esta tarea?',
                text: "Una tarea eliminada no se puede recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar',
                cancelButtonText: 'No, cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                    const url = `${location.origin}/tareas/${tareaId}`;
                    axios.delete(url, {params: tareaId})
                            .then(resp => {
                                if(resp.status === 200){
                                    const listaPadre = lista.parentElement;
                                    listaPadre.removeChild(lista);

                                    Swal.fire('Tarea eliminada', resp.data, 'success');
                                    actualizarAvance();
                                }
                            })
                            .catch(e=>console.log(e))
                }
            })
        }
    })
}
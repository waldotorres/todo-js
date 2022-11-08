//referencias

import { todoList } from "..";
import { Todo } from "../classes";

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


export const crearTodoHtml = (todo) =>{
    const htmlTodo = `<li class="${ todo.completado ? 'completed': '' }" data-id="${todo.id} ">
                            <div class="view">
                                <input class="toggle" type="checkbox" ${ todo.completado ?'checked':'' }>
                                <label>${ todo.tarea}</label>
                                <button class="destroy"></button>
                            </div>
                            <input class="edit" value="Create a TodoMVC template">
                        </li>`;


    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    //
    
    return div.firstElementChild;

}


txtInput.addEventListener('keyup', (event)=>{

    //console.log(event)

    if( event.keyCode ===13 && txtInput.value.length > 0 ){
        const newTodo = new Todo( txtInput.value.trim() );
        todoList.nuevoTodo( newTodo );


        //console.log(todoList);
        crearTodoHtml( newTodo);
        txtInput.value ='';
    }

});

divTodoList.addEventListener ( 'click', ( event )=>{
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    //
    //console.log(todoList);
    if(nombreElemento.includes('input')){ //completado
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }
    else if(nombreElemento.includes('button')){ //borrar
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    } 
});



btnBorrar.addEventListener( 'click' ,(event) =>{

    todoList.eliminarCompletados();
    for(let i = divTodoList.children.length -1; i >= 0 ; i--){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed') ){
            divTodoList.removeChild(elemento);
        }
    }
    
});

ulFiltros.addEventListener('click', (event)=>{

    //console.log(event.target.text)

    const filtro = event.target.text;
    if( !filtro ){
        return;
    }

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for( const elem of divTodoList.children ){
            elem.classList.remove('hidden');
            const completado = elem.classList.contains('completed') ;

            switch (filtro) {
                case 'Pendientes':
                    if( completado ){
                        elem.classList.add('hidden');
                    }
                    break;
                case 'Completados':
                    if( !completado ){
                        elem.classList.add('hidden');
                    }
                    break;
                    break;                    
                default:
                    break;
            }
             
    }
});



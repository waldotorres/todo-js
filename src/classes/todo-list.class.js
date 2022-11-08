import { Todo } from "./todo.class";

export class TodoList {

    constructor(){
       this.cargarLocalStorage();
    }

    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocacalStorage();
    }

    eliminarTodo(id){
       this.todos = this.todos.filter( elem => elem.id != id );
       this.guardarLocacalStorage();
    }

    marcarCompletado(id){
        for(const todo of this.todos ){
            if(todo.id == id  ){
                todo.completado = !todo.completado;
                break;
            }
        }
        this.guardarLocacalStorage();
    }

    eliminarCompletados(){
        this.todos = this.todos.filter( elem => !elem.completado );
        this.guardarLocacalStorage();
    }

    guardarLocacalStorage(){
        localStorage.setItem('todos', JSON.stringify( this.todos) );
    }
    cargarLocalStorage(){

        this.todos=  localStorage.getItem('todos') 
                    ? JSON.parse( localStorage.getItem('todos')) 
                    : [];

        this.todos = this.todos.map( elem => Todo.fromJSON(elem) )
        
    }
} 


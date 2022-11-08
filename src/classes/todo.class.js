export class Todo {

    static fromJSON ({id, tarea, completado, creado}){
        const tempTodo = new Todo();
        //
        tempTodo.id = id;
        tempTodo.tarea = tarea;
        tempTodo.creado = creado;
        tempTodo.completado = completado;

        return tempTodo;

    }

    constructor(tarea){
        this.tarea = tarea;
        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();
    }

  

}
import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";

const todos = [
    {id: 1, text:'Buy Milk', completedAt: new Date()},
    {id: 2, text:'Buy Bread', completedAt: new Date()},
    {id: 3, text:'Buy Butter', completedAt: new Date()},
];

export class TodosController {

    constructor(){}


    public getTodos = async (req:Request, res: Response) => {
        const todo = await prisma.todo.findMany();
        res.json(todo);
    }

    public getTodoById = async (req: Request, res: Response) => {
        //console.log('entro')
        const id = +req.params.id;
        console.log(id)
        const todo = await prisma.todo.findMany({
            where:{
                id: id
            }
        })
        /* if ( isNaN(id)) {
            res.status(400).json({error: ` ${id} is not a number`})
        } */

        console.log(todo)
        if (todo) {
            res.json(todo)
        }else{
            res.status(404).json({error: `TODO with id ${id} not found`})
        }
    }

    public  createTodo = async (req: Request, res: Response) => {

        
       const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) res.status(400).json({error: error});

        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        res.json(todo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create(req.body);

        if ( error ) res.status(400).json({error: error});

        const todo = await prisma.todo.updateMany({
            where: {
                id: updateTodoDto?.id
            },
            data: updateTodoDto!.values
        })
        res.json(todo)
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id
        const todo = await prisma.todo.delete({
            where:{
                id:id
            }
        })
        res.json(todo)
    }
}


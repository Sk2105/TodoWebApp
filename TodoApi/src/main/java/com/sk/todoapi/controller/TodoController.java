package com.sk.todoapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sk.todoapi.entities.Todo;
import com.sk.todoapi.models.TodoDTO;
import com.sk.todoapi.services.TodoServices;

@RestController
@RequestMapping("/todo")
@CrossOrigin(origins = "http://localhost:5173/")
public class TodoController {

    @Autowired
    private TodoServices todoService;

    @GetMapping
    public Iterable<Todo> getTodo(){
        return todoService.getTodos();
    }

    @PostMapping
    public Todo addTodo(@RequestBody TodoDTO todo){
        return todoService.addTodo(todo);
    }


    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable int id, @RequestBody TodoDTO todo){
        return todoService.updateTodo(id,todo);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable int id){
        todoService.deleteTodo(id);
    }
}

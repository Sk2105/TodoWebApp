package com.sk.todoapi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sk.todoapi.entities.Todo;
import com.sk.todoapi.models.TodoDTO;
import com.sk.todoapi.repo.TodoRepo;

@Service
public class TodoServices {

    @Autowired
    private TodoRepo todoRepo;

    public Todo addTodo(TodoDTO todo) {
        Todo t = toTodo(todo);
        return todoRepo.save(t);
    }

    private Todo toTodo(TodoDTO todo) {
        Todo t = new Todo();
        t.setTitle(todo.title());
        t.setDescription(todo.description());
        t.setCompleted(false);
        return t;
    }

    public Iterable<Todo> getTodos() {
        return todoRepo.findAll();
    }

    public void deleteTodo(int id) {
        todoRepo.deleteById(id);
    }

    public Todo updateTodo(int id, TodoDTO todo) {
        Todo t = todoRepo.findById(id).get();
        t.setTitle(todo.title());
        t.setDescription(todo.description());
        t.setCompleted(todo.completed());
        return todoRepo.save(t);
    }



}

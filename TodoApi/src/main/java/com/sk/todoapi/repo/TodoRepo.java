package com.sk.todoapi.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sk.todoapi.entities.Todo;

public interface TodoRepo extends JpaRepository<Todo, Integer> {

}

package org.ford.demo.controller;

import org.ford.demo.entity.User;
import org.ford.demo.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private IUserService userService;

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        logger.info("Received request to create user: {}", user);
        try {
            User savedUser = userService.createUser(user);
            logger.info("Address created successfully with ID: {}", savedUser.getId());
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error creating address: {}", e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

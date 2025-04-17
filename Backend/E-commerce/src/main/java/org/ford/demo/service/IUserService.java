package org.ford.demo.service;

import org.ford.demo.entity.User;

public interface IUserService {
    User createUser(User user);

    User getUserById(Long id);
}

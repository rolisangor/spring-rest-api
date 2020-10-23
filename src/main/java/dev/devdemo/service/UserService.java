package dev.devdemo.service;

import dev.devdemo.entity.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {
    UserDetails findUserByUsername(String username);
    User findUserById(Long id);
    void deleteUserById(Long id);
    Iterable<User> findAllUsers();
    void save(User user);
}

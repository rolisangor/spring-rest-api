package dev.devdemo.service;

import dev.devdemo.entity.User;
import dev.devdemo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImp implements UserService{

    private final UserRepository userRepo;

    @Autowired
    public UserServiceImp(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Transactional(readOnly = true)
    @Override
    public UserDetails findUserByUsername(String username) {
        return userRepo.findUserByUsername(username);
    }

    @Transactional(readOnly = true)
    @Override
    public User findUserById(Long id) {
        return userRepo.findById(id).orElseThrow();
    }

    @Transactional
    @Override
    public void deleteUserById(Long id) {
        userRepo.deleteById(id);
    }

    @Transactional(readOnly = true)
    @Override
    public Iterable<User> findAllUsers() {
        return userRepo.findAll();
    }

    @Transactional
    @Override
    public void save(User user) {
        userRepo.save(user);
    }
}

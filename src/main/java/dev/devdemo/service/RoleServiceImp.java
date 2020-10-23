package dev.devdemo.service;

import dev.devdemo.entity.Role;
import dev.devdemo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImp implements RoleService{

    private final RoleRepository roleRepo;

    @Autowired
    public RoleServiceImp(RoleRepository roleRepo) {
        this.roleRepo = roleRepo;
    }

    @Override
    public Iterable<Role> findAll() {
        return roleRepo.findAll();
    }
}

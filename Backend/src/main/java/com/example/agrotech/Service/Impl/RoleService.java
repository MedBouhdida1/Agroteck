package com.example.agrotech.Service.Impl;


import com.example.agrotech.Models.Role;
import com.example.agrotech.Repos.RoleDAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {



    @Autowired
    private RoleDAO roleDAO;
    public Role createNewRole(Role role) {
        return roleDAO.save(role);
    }
}

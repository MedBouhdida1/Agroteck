package com.example.agrotech.Controllers;


import com.example.agrotech.Models.Role;
import com.example.agrotech.Service.Impl.RoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoleController {


    @Autowired
    private RoleService roleService;

    @PostMapping("/createNewRole")
    public Role createNewRole(@RequestBody Role role) {

        return roleService.createNewRole(role);
    }
}

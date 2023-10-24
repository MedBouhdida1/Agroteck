package com.example.agrotech.Service.Impl;


import com.example.agrotech.Models.Role;
import com.example.agrotech.Models.User;
import com.example.agrotech.Repos.RoleDAO;
import com.example.agrotech.Repos.UserDAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserDAO userDAO;
    @Autowired
    private RoleDAO roleDAO;

    @Autowired
    private PasswordEncoder passwordEncoder;
//    public ResponseEntity<?> createNewUser(User user) {
//        // Check if the username  is already taken
//        if (userDAO.findByUserName(user.getUserName()) != null) {
//            return ResponseEntity
//                    .status(HttpStatus.BAD_REQUEST)
//                    .body("Username is already taken.");
//        }
//
//        Role role = roleDAO.findById("User").get();
//        Set<Role> roles = new HashSet<>();
//        roles.add(role);
//        user.setRole(roles);
//
//        user.setUserPassword(getEncodedPassword(user.getUserPassword()));
//
//        User savedUser = userDAO.save(user);
//
//        return ResponseEntity
//                .status(HttpStatus.CREATED)
//                .body(savedUser);
//    }

    public void initRolesAndUser(){
        Role roleAdmin=new Role();
        roleAdmin.setRoleName("Admin");
        roleAdmin.setRoleDescription("Admin role");
        roleDAO.save(roleAdmin);

//        Role roleUser=new Role();
//        roleUser.setRoleName("User");
//        roleUser.setRoleDescription("User role");
//        roleDAO.save(roleUser);


        User admin=new User();
        admin.setUserName("admin123");
        admin.setUserLastName("admin");
        admin.setUserFirstName("admin");
        admin.setUserPassword(getEncodedPassword("admin@pass"));
        Set<Role> rolesAdmin=new HashSet<>();
        rolesAdmin.add(roleAdmin);
        admin.setRole(rolesAdmin);
        userDAO.save(admin);

//        User user=new User();
//        user.setUserName("user123");
//        user.setUserLastName("user");
//        user.setUserFirstName("user");
//        user.setUserPassword(getEncodedPassword("user@pass"));
//        Set<Role> rolesUser=new HashSet<>();
//        rolesUser.add(roleUser);
//        user.setRoles(rolesUser);
//        userDAO.save(user);

    }

    public String getEncodedPassword(String password){
        return passwordEncoder.encode(password);
    }
}

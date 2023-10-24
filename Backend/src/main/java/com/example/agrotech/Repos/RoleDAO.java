package com.example.agrotech.Repos;

import com.example.agrotech.Models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoleDAO extends MongoRepository<Role, String> {


}

package com.example.agrotech.Repos;

import com.example.agrotech.Models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserDAO extends MongoRepository<User, String>{
    User findByUserName(String userName);
}

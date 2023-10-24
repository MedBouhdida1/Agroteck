package com.example.agrotech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;



@ComponentScan(basePackages = {"com.example.agrotech.Controllers","com.example.agrotech.Service","com.example.agrotech.Repos","com.example.agrotech.Config","com.example.agrotech.Util"})
@SpringBootApplication
public class AgrotechApplication {

    public static void main(String[] args) {
        SpringApplication.run(AgrotechApplication.class, args);
    }

}

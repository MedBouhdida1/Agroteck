package com.example.agrotech.Models;

public class JwtRequest {

    private String userName;
    private String userPassword;


    public String getUsername() {
        return userName;
    }

    public void setUsername(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public JwtRequest(String userName, String userPassword) {
        this.userName = userName;
        this.userPassword = userPassword;
    }
}

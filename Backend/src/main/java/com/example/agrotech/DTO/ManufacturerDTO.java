package com.example.agrotech.DTO;


import lombok.Data;

@Data
public class ManufacturerDTO {

    private String id;
    private String manufacturerName;
    private String manufacturerCode;
    private boolean active;
    private String notes;
}

package com.example.agrotech.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class AirportDTO implements Serializable {


    private String id;
    private String airportCode;
    private String airportName;
    private boolean active;
    private String notes;

}
package com.example.agrotech.Repos;

import com.example.agrotech.Models.Airport;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AirportRepo extends MongoRepository<Airport, String> {

    boolean existsByAirportCode(String airportCode);
    List<Airport>findAirportByAirportNameContainingIgnoreCaseAndActiveTrue(String airportName);
    List<Airport>findAirportByAirportNameContainingIgnoreCaseAndActiveFalse(String airportName);

    Airport findAirportByAirportCode(String airportCode);
    List<Airport>findAirportByActiveTrue();
    List<Airport>findAirportByActiveFalse();
}

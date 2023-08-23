package com.example.agrotech.Service;

import com.example.agrotech.Models.Airport;
import com.example.agrotech.Models.Seaport;

import java.util.List;
import java.util.Optional;

public interface AirportService {


    Airport ajouterAirport(Airport airport);
    Airport modifierAirport(Airport airport);
    List<Airport> getActiveTrueAirports();
    void supprimerById(String id);
    boolean airportExists(String id);
    boolean airportCodeExists(String airportCode);
    List<Airport>SearchAirportByNameAndActive(String airportName);
    List<Airport>SearchAirportByNameAndArchived(String airportName);

    Airport getAirportById(String id);
    Airport getAirportByAirportCode(String airportCode);
    List<Airport> getArchivedAirports();

}

package com.example.agrotech.Service.Impl;

import com.example.agrotech.Models.Airport;
import com.example.agrotech.Models.Seaport;
import com.example.agrotech.Repos.AirportRepo;
import com.example.agrotech.Service.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AirportServiceImpl implements AirportService {


    @Autowired
    AirportRepo airportRepository;
    @Override
    public Airport ajouterAirport(Airport airport) {
        return airportRepository.save(airport);
    }

    @Override
    public Airport modifierAirport(Airport airport) {
        return airportRepository.save(airport);
    }

    @Override
    public List<Airport> getActiveTrueAirports() {
        return airportRepository.findAirportByActiveTrue();
    }

    @Override
    public void supprimerById(String id) {
        airportRepository.deleteById(id);
    }

    @Override
    public boolean airportExists(String id) {
        return airportRepository.existsById(id);

    }

    @Override
    public boolean airportCodeExists(String airportCode) {
        return airportRepository.existsByAirportCode(airportCode);
    }

    @Override
    public List<Airport> SearchAirportByNameAndActive(String airportName) {
        return airportRepository.findAirportByAirportNameContainingIgnoreCaseAndActiveTrue(airportName);
    }

    @Override
    public List<Airport> SearchAirportByNameAndArchived(String airportName) {
        return airportRepository.findAirportByAirportNameContainingIgnoreCaseAndActiveFalse(airportName);
    }

    @Override
    public Airport getAirportById(String id) {
        return airportRepository.findById(id).get();
    }

    @Override
    public Airport getAirportByAirportCode(String airportCode) {
        return airportRepository.findAirportByAirportCode(airportCode);
    }

    @Override
    public List<Airport> getArchivedAirports() {
        return airportRepository.findAirportByActiveFalse();
    }
}

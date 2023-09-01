package com.example.agrotech.Controllers;


import com.example.agrotech.DTO.AirportDTO;
import com.example.agrotech.Models.Airport;
import com.example.agrotech.Service.AirportService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/airport")
public class AirportController {


    private AirportService airportService;

    private ModelMapper modelMapper ;
    @Autowired
    public AirportController(AirportService airportService, ModelMapper modelMapper) {
        this.airportService = airportService;
        this.modelMapper = modelMapper;
    }

    @PostMapping(value = "")
    public ResponseEntity<?> addAirport(@RequestBody @Validated Airport airport) {
        if (airportService.airportCodeExists(airport.getAirportCode())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Airport code is already exist.");
        }
        Airport airport1=airportService.ajouterAirport(airport);
//        AirportDTO newAirport = modelMapper.map(airportService.ajouterAirport(airport), AirportDTO.class);
        return new ResponseEntity<>(airport1, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<Void> deleteAirport(@PathVariable String id) {
        if (airportService.airportExists(id)) {
            airportService.supprimerById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(value = "{id}")
    public ResponseEntity<?> updateAirport(@PathVariable String id, @RequestBody @Validated Airport airport) {
        if (!airportService.airportExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Check if the airport code already exists for another airport (excluding the one being updated)
        String updatedAirportCode = airport.getAirportCode();
        Airport existingAirportWithCode = airportService.getAirportByAirportCode(updatedAirportCode);
        if (existingAirportWithCode != null && !existingAirportWithCode.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Airport code is already in use by another airport.");
        }

        airport.setId(id);
//        AirportDTO updatedAirport = modelMapper.map(airportService.modifierAirport(airport), AirportDTO.class);
        Airport airport1=airportService.modifierAirport(airport);
        return new ResponseEntity<>(airport1, HttpStatus.OK);
    }
    @PatchMapping("deactivate/{id}")
    public ResponseEntity<?> deactivateAirport(@PathVariable String id) {
        if (!airportService.airportExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Airport airport = airportService.getAirportById(id);
        airport.setActive(false);
        airportService.ajouterAirport(airport);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PatchMapping("activate/{id}")
    public ResponseEntity<?> activateAirport(@PathVariable String id) {
        if (!airportService.airportExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Airport airport = airportService.getAirportById(id);
        airport.setActive(true);
        airportService.ajouterAirport(airport);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping(value = "active")
    public ResponseEntity<List<Airport>> getActiveTrueAirports() {
        List<Airport>airports=airportService.getActiveTrueAirports();
//        List<AirportDTO> airports = airportService.getActiveTrueAirports().stream().map(airport -> modelMapper.map(airport, AirportDTO.class)).collect(Collectors.toList());
        return new ResponseEntity<>(airports, HttpStatus.OK);
    }
    @GetMapping(value = "archived")
    public ResponseEntity<List<Airport>> getArchivedAirports() {
        List<Airport>airports=airportService.getArchivedAirports();
//        List<AirportDTO> airports = airportService.getArchivedAirports().stream().map(airport -> modelMapper.map(airport, AirportDTO.class)).collect(Collectors.toList());
        return new ResponseEntity<>(airports, HttpStatus.OK);
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<Airport> getAirportById(@PathVariable String id) {
        if (airportService.airportExists(id)) {
            Airport airport = airportService.getAirportById(id);
//            AirportDTO airport = modelMapper.map(airportService.getAirportById(id), AirportDTO.class);
            return new ResponseEntity<>(airport, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping(value = "/searchactive")
    public ResponseEntity<List<Airport>> searchAirportByNameAndActive(@RequestParam String airportName) {
        List<Airport>airports=airportService.SearchAirportByNameAndActive(airportName);
//        List<AirportDTO> airports = airportService.SearchAirportByNameAndActive(airportName).stream().map(airport -> modelMapper.map(airport, AirportDTO.class)).collect(Collectors.toList());
        return new ResponseEntity<>(airports, HttpStatus.OK);
    }
    @GetMapping(value = "/searcharchived")
    public ResponseEntity<List<Airport>> searchAirportByNameAndArchived(@RequestParam String airportName) {
        List<Airport>airports=airportService.SearchAirportByNameAndArchived(airportName);
//        List<AirportDTO> airports = airportService.SearchAirportByNameAndArchived(airportName).stream().map(airport -> modelMapper.map(airport, AirportDTO.class)).collect(Collectors.toList());
        return new ResponseEntity<>(airports, HttpStatus.OK);
    }



}

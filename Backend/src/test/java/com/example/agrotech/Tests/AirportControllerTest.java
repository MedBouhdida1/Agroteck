package com.example.agrotech.Tests;

import com.example.agrotech.Controllers.AirportController;
import com.example.agrotech.DTO.AirportDTO;
import com.example.agrotech.Models.Airport;
import com.example.agrotech.Service.AirportService;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static junit.framework.TestCase.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class AirportControllerTest {



    @Mock
    private AirportService airportService;

    @InjectMocks
    private AirportController airportController;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddAirportSuccess() {
        Airport airport = new Airport("1","XYZ", "Airport XYZ", true, "Notes");
        when(airportService.airportCodeExists(airport.getAirportCode())).thenReturn(false);
        when(airportService.ajouterAirport(airport)).thenReturn(airport);

        ResponseEntity<?> responseEntity = airportController.addAirport(airport);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(airport, responseEntity.getBody());
    }

    @Test
    public void testAddAirportConflict() {
        Airport airport = new Airport("1","XYZ", "Airport XYZ", true, "Notes");
        when(airportService.airportCodeExists(airport.getAirportCode())).thenReturn(true);

        ResponseEntity<?> responseEntity = airportController.addAirport(airport);

        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
        assertEquals("Airport code is already exist.", responseEntity.getBody());
    }

    @Test
    public void testDeleteAirportSuccess() {
        String airportId = "1";
        when(airportService.airportExists(airportId)).thenReturn(true);

        ResponseEntity<Void> responseEntity = airportController.deleteAirport(airportId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        verify(airportService).supprimerById(airportId); // Ensure the service method is called
    }

    @Test
    public void testDeleteAirportNotFound() {
        String airportId = "1";
        when(airportService.airportExists(airportId)).thenReturn(false);

        ResponseEntity<Void> responseEntity = airportController.deleteAirport(airportId);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        verify(airportService, never()).supprimerById(any()); // Ensure the service method is not called
    }
    @Test
    public void testUpdateAirportSuccess() {
        String airportId = "1";
        Airport updatedAirport = new Airport(); // Create a new Airport instance with updated values
        when(airportService.airportExists(airportId)).thenReturn(true);
        when(airportService.getAirportByAirportCode(updatedAirport.getAirportCode())).thenReturn(null);
        when(airportService.modifierAirport(updatedAirport)).thenReturn(updatedAirport);

        ResponseEntity<?> responseEntity = airportController.updateAirport(airportId, updatedAirport);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        verify(airportService).modifierAirport(updatedAirport); // Ensure the service method is called
    }

    @Test
    public void testUpdateAirportNotFound() {
        String airportId = "1";
        Airport updatedAirport = new Airport(); // Create a new Airport instance with updated values
        when(airportService.airportExists(airportId)).thenReturn(false);

        ResponseEntity<?> responseEntity = airportController.updateAirport(airportId, updatedAirport);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        verify(airportService, never()).modifierAirport(any()); // Ensure the service method is not called
    }

    @Test
    public void testUpdateAirportConflict() {
        String airportId = "1";
        Airport updatedAirport = new Airport(); // Create a new Airport instance with updated values
        when(airportService.airportExists(airportId)).thenReturn(true);

        // Mock the behavior of getAirportByAirportCode to return an Airport with a non-null id
        Airport existingAirportWithCode = new Airport();
        existingAirportWithCode.setId("existingId");
        when(airportService.getAirportByAirportCode(updatedAirport.getAirportCode())).thenReturn(existingAirportWithCode);
        ResponseEntity<?> responseEntity = airportController.updateAirport(airportId, updatedAirport);

        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
        verify(airportService, never()).modifierAirport(any()); // Ensure the service method is not called
    }

    @Test
    public void testDeactivateAirportSuccess() {
        String airportId = "1";
        Airport existingAirport = new Airport(); // Create an existing Airport instance
        existingAirport.setId(airportId);
        existingAirport.setActive(true);
        when(airportService.airportExists(airportId)).thenReturn(true);
        when(airportService.getAirportById(airportId)).thenReturn(existingAirport);

        ResponseEntity<?> responseEntity = airportController.deactivateAirport(airportId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        verify(airportService).ajouterAirport(existingAirport); // Ensure the service method is called
        assertFalse(existingAirport.isActive()); // Ensure that the airport's active status is set to false
    }

    @Test
    public void testDeactivateAirportNotFound() {
        String airportId = "1";
        when(airportService.airportExists(airportId)).thenReturn(false);

        ResponseEntity<?> responseEntity = airportController.deactivateAirport(airportId);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        verify(airportService, never()).ajouterAirport(any()); // Ensure the service method is not called
    }
    @Test
    public void testActivateAirportSuccess() {
        String airportId = "1";
        Airport existingAirport = new Airport(); // Create an existing Airport instance
        existingAirport.setId(airportId);
        existingAirport.setActive(false); // Initially set as inactive
        when(airportService.airportExists(airportId)).thenReturn(true);
        when(airportService.getAirportById(airportId)).thenReturn(existingAirport);

        ResponseEntity<?> responseEntity = airportController.activateAirport(airportId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        verify(airportService).ajouterAirport(existingAirport); // Ensure the service method is called
        assertTrue(existingAirport.isActive()); // Ensure that the airport's active status is set to true
    }

    @Test
    public void testActivateAirportNotFound() {
        String airportId = "1";
        when(airportService.airportExists(airportId)).thenReturn(false);

        ResponseEntity<?> responseEntity = airportController.activateAirport(airportId);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        verify(airportService, never()).ajouterAirport(any()); // Ensure the service method is not called
    }

    @Test
    public void testGetActiveTrueAirportsSuccess() {
        // Create a list of sample active airports
        List<Airport> activeAirports = Arrays.asList(
                new Airport("1", "ABC", "Airport ABC", true, "Notes"),
                new Airport("2", "XYZ", "Airport XYZ", true, "Notes")
        );

        // Mock the behavior of airportService.getActiveTrueAirports() to return the sample list
        when(airportService.getActiveTrueAirports()).thenReturn(activeAirports);

        ResponseEntity<List<Airport>> responseEntity = airportController.getActiveTrueAirports();

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        List<Airport> airports = responseEntity.getBody();
        assertEquals(activeAirports.size(), airports.size()); // Ensure the size of the returned list is as expected
        // You can further assert the contents of the 'airports' list if needed
    }

    @Test
    public void testGetArchivedAirportsSuccess() {
        // Create a list of sample archived airports
        List<Airport> archivedAirports = Arrays.asList(
                new Airport("1", "ABC", "Airport ABC", false, "Notes"),
                new Airport("2", "XYZ", "Airport XYZ", false, "Notes")
        );

        // Mock the behavior of airportService.getArchivedAirports() to return the sample list
        when(airportService.getArchivedAirports()).thenReturn(archivedAirports);

        ResponseEntity<List<Airport>> responseEntity = airportController.getArchivedAirports();

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        List<Airport> airports = responseEntity.getBody();
        assertEquals(archivedAirports.size(), airports.size()); // Ensure the size of the returned list is as expected
        // You can further assert the contents of the 'airports' list if needed
    }

    @Test
    public void testGetAirportByIdSuccess() {
        String airportId = "1";
        Airport airport = new Airport(airportId, "ABC", "Airport ABC", true, "Notes");

        // Mock the behavior of airportService.airportExists and airportService.getAirportById
        when(airportService.airportExists(airportId)).thenReturn(true);
        when(airportService.getAirportById(airportId)).thenReturn(airport);

        ResponseEntity<Airport> responseEntity = airportController.getAirportById(airportId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(airport, responseEntity.getBody()); // Ensure the returned airport matches the expected airport
    }

    @Test
    public void testGetAirportByIdNotFound() {
        String airportId = "1";

        // Mock the behavior of airportService.airportExists to indicate that the airport does not exist
        when(airportService.airportExists(airportId)).thenReturn(false);

        ResponseEntity<Airport> responseEntity = airportController.getAirportById(airportId);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    public void testSearchAirportByNameAndActiveSuccess() {
        String airportName = "ABC";
        // Create a list of sample active airports with matching names
        List<Airport> activeAirports = Arrays.asList(
                new Airport("1", "ABC", "Airport ABC", true, "Notes"),
                new Airport("2", "ABCD", "Airport ABCD", true, "Notes")
        );

        // Mock the behavior of airportService.SearchAirportByNameAndActive() to return the sample list
        when(airportService.SearchAirportByNameAndActive(airportName)).thenReturn(activeAirports);

        ResponseEntity<List<Airport>> responseEntity = airportController.searchAirportByNameAndActive(airportName);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        List<Airport> airports = responseEntity.getBody();
        assertEquals(activeAirports.size(), airports.size()); // Ensure the size of the returned list is as expected
        // You can further assert the contents of the 'airports' list if needed
    }

    @Test
    public void testSearchAirportByNameAndActiveNoMatch() {
        String airportName = "XYZ";
        // Mock the behavior of airportService.SearchAirportByNameAndActive() to return an empty list
        when(airportService.SearchAirportByNameAndActive(airportName)).thenReturn(Arrays.asList());

        ResponseEntity<List<Airport>> responseEntity = airportController.searchAirportByNameAndActive(airportName);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        List<Airport> airports = responseEntity.getBody();
        assertEquals(0, airports.size()); // Ensure the returned list is empty
    }

    @Test
    public void testSearchAirportByNameAndArchivedSuccess() {
        String airportName = "XYZ";
        // Create a list of sample archived airports with matching names
        List<Airport> archivedAirports = Arrays.asList(
                new Airport("1", "XYZ", "Airport XYZ", false, "Notes"),
                new Airport("2", "XYZA", "Airport XYZA", false, "Notes")
        );

        // Mock the behavior of airportService.SearchAirportByNameAndArchived() to return the sample list
        when(airportService.SearchAirportByNameAndArchived(airportName)).thenReturn(archivedAirports);

        ResponseEntity<List<Airport>> responseEntity = airportController.searchAirportByNameAndArchived(airportName);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        List<Airport> airports = responseEntity.getBody();
        assertEquals(archivedAirports.size(), airports.size()); // Ensure the size of the returned list is as expected
        // You can further assert the contents of the 'airports' list if needed
    }

    @Test
    public void testSearchAirportByNameAndArchivedNoMatch() {
        String airportName = "ABC";
        // Mock the behavior of airportService.SearchAirportByNameAndArchived() to return an empty list
        when(airportService.SearchAirportByNameAndArchived(airportName)).thenReturn(Arrays.asList());

        ResponseEntity<List<Airport>> responseEntity = airportController.searchAirportByNameAndArchived(airportName);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        List<Airport> airports = responseEntity.getBody();
        assertEquals(0, airports.size()); // Ensure the returned list is empty
    }


}

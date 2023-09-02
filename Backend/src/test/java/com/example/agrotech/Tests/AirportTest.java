package com.example.agrotech.Tests;

import com.example.agrotech.Models.Airport;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static junit.framework.TestCase.*;

public class AirportTest {

    @Mock
    private Airport mockAirport;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockAirport = new Airport();
    }

    @Test
    public void testAirportNotNull() {
        assertNotNull(mockAirport);
    }

    @Test
    public void testAirportCode() {
        String airportCode = "ABC";
        mockAirport.setAirportCode(airportCode);
        assertEquals(airportCode, mockAirport.getAirportCode());
    }

    @Test
    public void testAirportName() {
        String airportName = "Airport Name";
        mockAirport.setAirportName(airportName);
        assertEquals(airportName, mockAirport.getAirportName());
    }

    @Test
    public void testActive() {
        assertTrue(mockAirport.isActive()); // By default, active should be true
        mockAirport.setActive(false);
        assertFalse(mockAirport.isActive());
    }

    @Test
    public void testNotes() {
        String notes = "Some notes";
        mockAirport.setNotes(notes);
        assertEquals(notes, mockAirport.getNotes());
    }
}

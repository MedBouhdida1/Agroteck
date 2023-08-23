package com.example.agrotech.Repos;

import com.example.agrotech.Models.Manufacturer;
import com.example.agrotech.Models.Reason;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ManufacturerRepo extends MongoRepository<Manufacturer, String> {

    boolean existsByManufacturerCode(String manufacturerCode);
    Manufacturer findByManufacturerCode(String manufacturerCode);
    List<Manufacturer> findManufacturerByManufacturerNameContainingIgnoreCaseAndActiveTrue(String manufacturerName);

    List<Manufacturer> findManufacturerByManufacturerNameContainingIgnoreCaseAndActiveFalse(String manufacturerName);
    List<Manufacturer>findManufacturerByActiveTrue();
    List<Manufacturer>findManufacturerByActiveFalse();
}

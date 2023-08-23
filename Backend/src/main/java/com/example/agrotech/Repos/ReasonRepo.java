package com.example.agrotech.Repos;

import com.example.agrotech.Models.Reason;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReasonRepo extends MongoRepository<Reason, String> {
    boolean existsByReasonCode(String reasonCode);
    Reason findByReasonCode(String reasonCode);
    List<Reason>findReasonByReasonNameContainingIgnoreCaseAndActiveTrue(String reasonName);
    List<Reason>findReasonByReasonNameContainingIgnoreCaseAndActiveFalse(String reasonName);

    List<Reason>findReasonByActiveTrue();
    List<Reason>findReasonByActiveFalse();

}

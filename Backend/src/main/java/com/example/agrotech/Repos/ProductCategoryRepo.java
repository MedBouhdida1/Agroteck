package com.example.agrotech.Repos;

import com.example.agrotech.Models.ProductCategory;
import com.example.agrotech.Models.Reason;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductCategoryRepo extends MongoRepository<ProductCategory, String> {

    boolean existsByProductCategoryCode(String productCategoryCode);
    ProductCategory findByProductCategoryCode(String productCategoryCode);
    List<ProductCategory>findProductCategoryByProductCategoryNameContainingIgnoreCaseAndActiveTrue(String reasonName);
    List<ProductCategory>findProductCategoryByProductCategoryNameContainingIgnoreCaseAndActiveFalse(String reasonName);

    List<ProductCategory>findProductCategoryByActiveTrue();
    List<ProductCategory>findProductCategoryByActiveFalse();
}

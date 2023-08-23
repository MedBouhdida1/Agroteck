package com.example.agrotech.DTO;


import lombok.Data;

@Data
public class ProductCategoryDTO {
    private String id;
    private String productCategoryType;
    private String productCategoryName;
    private String productCategoryCode;
    private boolean active=true;
    private String notes;


}

package com.example.agrotech.Service.Impl;

import com.example.agrotech.Models.ProductCategory;
import com.example.agrotech.Repos.ProductCategoryRepo;
import com.example.agrotech.Service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {

    @Autowired
    ProductCategoryRepo productCategoryRepository;
    @Override
    public ProductCategory ajouterProductCategory(ProductCategory productCategory) {
        return productCategoryRepository.save(productCategory);
    }

    @Override
    public ProductCategory modifierProductCategory(ProductCategory productCategory) {
        return productCategoryRepository.save(productCategory);
    }

    @Override
    public List<ProductCategory> getActiveTrueProductCategory() {
        return productCategoryRepository.findProductCategoryByActiveTrue();
    }

    @Override
    public void supprimerById(String id) {
        productCategoryRepository.deleteById(id);
    }

    @Override
    public boolean productCategoryExists(String id) {
        return productCategoryRepository.existsById(id);

    }

    @Override
    public boolean productCategoryCodeExists(String productCategoryCode) {
        return productCategoryRepository.existsByProductCategoryCode(productCategoryCode);
    }

    @Override
    public List<ProductCategory> SearchProductCategoryByNameAndActive(String productCategoryName) {
        return productCategoryRepository.findProductCategoryByProductCategoryNameContainingIgnoreCaseAndActiveTrue(productCategoryName);
    }

    @Override
    public List<ProductCategory> SearchProductCategoryByNameAndArchived(String productCategoryName) {
        return productCategoryRepository.findProductCategoryByProductCategoryNameContainingIgnoreCaseAndActiveFalse(productCategoryName);
    }

    @Override
    public ProductCategory getProductCategoryById(String id) {
        return productCategoryRepository.findById(id).get();
    }

    @Override
    public ProductCategory getProductCategoryByProductCategoryCode(String productCategoryCode) {
        return productCategoryRepository.findByProductCategoryCode(productCategoryCode);
    }

    @Override
    public List<ProductCategory> getArchivedProductCategory() {
        return productCategoryRepository.findProductCategoryByActiveFalse();
    }
}

package com.nike.store.service;

import com.nike.store.exception.ResourceNotFoundException;
import com.nike.store.model.Product;
import com.nike.store.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAllProducts(String category, String sort) {
        return productRepository.findAllWithFilters(category, sort);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);
        
        product.setName(productDetails.getName());
        product.setSubtitle(productDetails.getSubtitle());
        product.setCategory(productDetails.getCategory());
        product.setPrice(productDetails.getPrice());
        product.setOriginalPrice(productDetails.getOriginalPrice());
        product.setImage(productDetails.getImage());
        product.setColors(productDetails.getColors());
        product.setSizes(productDetails.getSizes());
        product.setBadge(productDetails.getBadge());
        product.setDescription(productDetails.getDescription());
        product.setInStock(productDetails.getInStock());
        
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }
}

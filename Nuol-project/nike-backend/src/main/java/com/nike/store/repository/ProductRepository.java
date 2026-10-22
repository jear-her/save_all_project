package com.nike.store.repository;

import com.nike.store.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    
    @Query("SELECT p FROM Product p WHERE " +
           "(:category IS NULL OR p.category = :category) " +
           "ORDER BY " +
           "CASE WHEN :sort = 'price-low' THEN p.price END ASC, " +
           "CASE WHEN :sort = 'price-high' THEN p.price END DESC, " +
           "CASE WHEN :sort = 'rating' THEN p.rating END DESC, " +
           "p.id ASC")
    List<Product> findAllWithFilters(@Param("category") String category, @Param("sort") String sort);
}

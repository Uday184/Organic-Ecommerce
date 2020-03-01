package com.spring.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.spring.model.Product;

@Repository
@Transactional
public interface ProductRepository extends JpaRepository<Product, Long> {
	
	public static final String FIND_CATEGORIES = "SELECT category from Product";

	public Product findByProductid(int productid);

	public void deleteByProductid(int productid);
	
	@Query(value = FIND_CATEGORIES, nativeQuery = true)
	public Set<String> findCategories();
}

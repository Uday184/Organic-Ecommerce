package com.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.spring.model.PlaceOrder;

@Repository
@Transactional
public interface OrderRepository extends JpaRepository<PlaceOrder, Long> {

	public PlaceOrder findByOrderId(int orderId);

	public List<PlaceOrder> findAll();
	
	public List<PlaceOrder> findByEmail(String email);

}

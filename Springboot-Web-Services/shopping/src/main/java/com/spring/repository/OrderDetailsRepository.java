package com.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.model.OrderDetail;

public interface OrderDetailsRepository extends JpaRepository<OrderDetail, Integer> {
	
	public List<OrderDetail> findByOrderId(int orderId);

}

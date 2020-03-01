package com.spring.response;

import java.util.ArrayList;
import java.util.List;

import com.spring.model.OrderDetail;

public class order {
	private int orderId;
	private String orderBy;
	private String orderStatus;
	private List<OrderDetail> products = new ArrayList<>();

	public List<OrderDetail> getProducts() {
		return products;
	}

	public void setProducts(List<OrderDetail> products) {
		this.products = products;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public String getOrderBy() {
		return orderBy;
	}

	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

}
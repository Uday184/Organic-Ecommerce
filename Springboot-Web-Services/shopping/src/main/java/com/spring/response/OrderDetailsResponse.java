package com.spring.response;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.spring.model.OrderDetail;

public class OrderDetailsResponse {
	
	private String status;
	private String message;
	private String AUTH_TOKEN;
	private Map<Integer, List<OrderDetail>> orderDetails;
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getAUTH_TOKEN() {
		return AUTH_TOKEN;
	}
	public void setAUTH_TOKEN(String aUTH_TOKEN) {
		AUTH_TOKEN = aUTH_TOKEN;
	}
	
	public Map<Integer, List<OrderDetail>> getOrderDetails() {
		if (orderDetails == null) {
			return new HashMap<Integer, List<OrderDetail>>();
		}
		return orderDetails;
	}
	public void setOrderDetails(Map<Integer, List<OrderDetail>> orderDetails) {
		this.orderDetails = orderDetails;
	}
}

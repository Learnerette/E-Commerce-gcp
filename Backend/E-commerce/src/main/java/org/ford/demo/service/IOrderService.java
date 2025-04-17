package org.ford.demo.service;

import org.ford.demo.entity.Order;

public interface IOrderService {
    Order createOrder(Order order); // Create and save the order

    Order getOrderByOrderId(String orderId); // Get order by ID

    Order getOrderById(Long id);


}

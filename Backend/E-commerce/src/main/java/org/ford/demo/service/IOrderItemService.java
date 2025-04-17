package org.ford.demo.service;

import org.ford.demo.entity.OrderItem;

import java.util.List;

public interface IOrderItemService {
    List<OrderItem> getOrderItemsByOrderId(Long orderId);

    void createOrderItem(OrderItem orderItem);
}

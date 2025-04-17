package org.ford.demo.repository;

import org.ford.demo.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderRepository extends JpaRepository<Order, Long> {
    Order findByOrderId(String orderId);
}

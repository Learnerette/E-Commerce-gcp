package org.ford.demo.service;

import org.ford.demo.entity.OrderItem;
import org.ford.demo.repository.IOrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemServiceImpl implements IOrderItemService {

    @Autowired
    private IOrderItemRepository orderItemRepository;

    @Override
    public List<OrderItem> getOrderItemsByOrderId(Long orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }

    @Override
    public void createOrderItem(OrderItem orderItem) {
        
    }
}

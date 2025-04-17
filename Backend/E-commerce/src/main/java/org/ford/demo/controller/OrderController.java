package org.ford.demo.controller;

import org.ford.demo.entity.*;
import org.ford.demo.service.ICartItemService;
import org.ford.demo.service.IOrderItemService;
import org.ford.demo.service.IOrderService;
import org.ford.demo.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private IOrderService orderService;

    @Autowired
    private ICartItemService cartService; // Use the interface

    @Autowired
    private IUserService userService; // Inject AddressService

    @Autowired
    private IOrderItemService orderItemService;

    @PostMapping("/placeOrder")
    public ResponseEntity<Order> placeOrder(@RequestBody User user) { // Receive Address directly
        logger.info("Checkout request received with address: {}", user);
        try {
            // 1. Get the cart items
            List<CartItem> cartItems = cartService.getCartItems(); // Assuming cart is associated with the current session

            if (cartItems == null || cartItems.isEmpty()) {
                logger.warn("Cart is empty");
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Or return a message
            }

            // 2. Save the Address (before creating the order)
            User savedUser = userService.createUser(user); // Save the address to the database

            // 3. Create the Order
            Order order = new Order();
            order.setOrderId(UUID.randomUUID().toString()); // Generate unique order ID
            order.setUserId(savedUser.getId()); // Set the Address ID
            order.setTotalPrice(calculateTotalPrice(cartItems));

            // 3. Save the Order
            order = orderService.createOrder(order); // Save the order and get the persisted Order object

            // Convert CartItems to OrderItems
            Order finalOrder = order;
            List<OrderItem> orderItemsList = cartItems.stream()
                    .map(cartItem -> {
                        OrderItem orderItem = new OrderItem();
                        orderItem.setOrderId(finalOrder.getId());
                        orderItem.setProductId(cartItem.getProduct().getId()); // Set the product id
                        orderItem.setQuantity(cartItem.getQuantity());
                        orderItem.setPrice(cartItem.getProduct().getPrice()); // Use product price at the time of order
                        return orderItem;
                    })
                    .collect(Collectors.toList());

            if (orderItemsList == null) {
                logger.error("Failed to convert cart items to order items");
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

            // Save order items
            for (OrderItem orderItem : orderItemsList) {
                orderItemService.createOrderItem(orderItem);
            }

            // 4. Clear the cart
            cartService.clearCart(); // Clear the cart after successful order placement
            logger.info("Cart cleared");

            return new ResponseEntity<>(order, HttpStatus.CREATED); // Return the created order

        } catch (DataAccessException e) {
            logger.error("Database error during checkout: {}", e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            logger.error("An unexpected error occurred during checkout: {}", e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<OrderResponse> getOrderDetails(@PathVariable Long id) {
        logger.info("Get order details request received for order ID: {}", id);
        try {
            Order order = orderService.getOrderById(id);

            if (order != null) {
                // Fetch the address
                User user = userService.getUserById(order.getUserId());

                // Fetch the order items
                List<OrderItem> orderItems = orderItemService.getOrderItemsByOrderId(order.getId());

                // Create the OrderResponse DTO
                OrderResponse orderResponse = new OrderResponse();
                orderResponse.setId(order.getId());
                orderResponse.setOrderId(order.getOrderId());
                orderResponse.setTotalPrice(order.getTotalPrice());
                orderResponse.setUser(user);
                orderResponse.setOrderItems(orderItems);

                logger.info("Order details found for order ID: {}", id);
                return ResponseEntity.ok(orderResponse);
            } else {
                logger.warn("Order not found for order ID: {}", id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("An error occurred while retrieving order details for order ID {}: {}", id, e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private double calculateTotalPrice(List<CartItem> cartItems) {
        double totalPrice = 0;
        for (CartItem item : cartItems) {
            totalPrice += item.getProduct().getPrice() * item.getQuantity();
        }
        return totalPrice;
    }
}

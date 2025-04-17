package org.ford.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "orders")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderId;
    private Long userId;

    private double totalPrice;
}


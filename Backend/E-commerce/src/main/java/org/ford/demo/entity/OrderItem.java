// OrderItem.java
package org.ford.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "order_items")
@Data
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long orderId; // Foreign key to Order table
    private Long productId; // Foreign key to Product table
    private int quantity;
    private double price; // Price at the time of order
}

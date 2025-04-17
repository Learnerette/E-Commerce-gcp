package org.ford.demo.service;

import org.ford.demo.entity.CartItem;

import java.util.List;

public interface ICartItemService {
    CartItem addToCart(Long productId, int quantity);

    List<CartItem> getCartItems();

    void clearCart();
}

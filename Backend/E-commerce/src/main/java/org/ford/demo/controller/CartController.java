package org.ford.demo.controller;

import org.ford.demo.entity.CartItem;
import org.ford.demo.entity.Product;
import org.ford.demo.service.ICartItemService;
import org.ford.demo.service.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class CartController {

    @Autowired
    private ICartItemService cartItemService;

    @Autowired
    private ProductServiceImpl productService;


    @PostMapping("/manage-cart")
    public ResponseEntity<CartItem> addToCart(@RequestParam Long productId, @RequestParam int quantity) {
        try {
            CartItem cartItem = cartItemService.addToCart(productId, quantity);
            return new ResponseEntity<>(cartItem, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Product not found
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);  // Not enough stock
        }
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> listProducts() {
        List<Product> products = productService.listProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/cart-items")
    public ResponseEntity<List<CartItem>> getCartItems() {
        return new ResponseEntity<>(cartItemService.getCartItems(), HttpStatus.OK);
    }
}



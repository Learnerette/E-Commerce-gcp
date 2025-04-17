package org.ford.demo.service;

import org.ford.demo.entity.Product;

import java.util.List;
import java.util.Optional;

public interface IProductService {

    Product addProduct(Product product);

    List<Product> listProducts();

    Optional<Product> getProductById(Long id);

    Product updateProduct(Long id, Product product);

    void deleteProduct(Long id);
}

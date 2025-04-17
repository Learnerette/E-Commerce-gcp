package org.ford.demo.repository;

import org.ford.demo.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByProductId(Long productId);
}


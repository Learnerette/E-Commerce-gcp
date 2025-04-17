package org.ford.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CategoryController {

    @GetMapping("/categories")
    public List<String> getCategories() {
        return Arrays.asList("All", "Apparel", "Clothing", "Electronics", "Home & Kitchen", "Books", "Beauty & Personal Care", "Sports & Outdoors", "Toys & Games", "Automotive", "Health & Household", "Jewelry"); // Replace with actual data source
    }
}

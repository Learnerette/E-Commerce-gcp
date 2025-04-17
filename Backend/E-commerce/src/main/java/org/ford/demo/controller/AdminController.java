package org.ford.demo.controller;

import org.ford.demo.entity.Admin;
import org.ford.demo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admin/auth")
public class AdminController {

    @Autowired
    private AdminService adminService;

    //    @CrossOrigin("http://localhost:4200/auth/signup")
    @PostMapping("/signup")
    public Map<String, Object> signup(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        Admin admin = adminService.signup(email, password);
        return Map.of("adminId", admin.getId(), "email", admin.getEmail());
    }

    //    @CrossOrigin("http://localhost:4200/auth/login")
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        Optional<Admin> admin = adminService.login(email, password);
        if (admin.isPresent()) {
            return Map.of("adminId", admin.get().getId(), "email", admin.get().getEmail());
        } else {
            return null;
        }
    }
}


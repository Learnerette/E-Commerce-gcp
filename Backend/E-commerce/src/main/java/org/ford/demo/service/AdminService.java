package org.ford.demo.service;

import org.ford.demo.entity.Admin;
import org.ford.demo.repository.IAdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private IAdminRepository adminRepository;

    public Admin signup(String email, String password) {
        Admin admin = new Admin();
        admin.setEmail(email);
        admin.setPassword(password);
        return adminRepository.save(admin);
    }

    public Optional<Admin> login(String email, String password) {
        Optional<Admin> admin = adminRepository.findByEmail(email);
        if (admin.isPresent() && admin.get().getPassword().equals(password)) {
            return admin;
        }
        return Optional.empty();
    }
}

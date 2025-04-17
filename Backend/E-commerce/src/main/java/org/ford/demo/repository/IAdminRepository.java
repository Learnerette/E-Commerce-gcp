package org.ford.demo.repository;

import org.ford.demo.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IAdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);
}

package com.example.quanlynhatro.repository;

import com.example.quanlynhatro.entity.TaiKhoan;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TaiKhoanRepository extends CrudRepository<TaiKhoan, Integer> {

    Optional<TaiKhoan> findByEmail(String email);


}

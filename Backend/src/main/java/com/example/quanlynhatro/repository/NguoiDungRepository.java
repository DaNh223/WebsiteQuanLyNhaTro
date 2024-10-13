package com.example.quanlynhatro.repository;

import com.example.quanlynhatro.entity.NguoiDung;
import com.example.quanlynhatro.entity.TaiKhoan;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface NguoiDungRepository extends CrudRepository<NguoiDung, Integer> {
    Optional<NguoiDung> findById(Integer id);

    Optional<Object> findByTaiKhoan(TaiKhoan foundTaiKhoan);
}

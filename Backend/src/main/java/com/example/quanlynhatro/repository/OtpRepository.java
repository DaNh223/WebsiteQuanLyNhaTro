package com.example.quanlynhatro.repository;

import com.example.quanlynhatro.entity.Otp;
import org.springframework.data.repository.CrudRepository;

public interface OtpRepository extends CrudRepository<Otp, Long> {
    Otp findByEmailAndOtpCode(String email, String otpCode);
}
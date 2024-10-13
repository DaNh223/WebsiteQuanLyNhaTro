package com.example.quanlynhatro.controller;

import com.example.quanlynhatro.entity.LoaiND;
import com.example.quanlynhatro.entity.TaiKhoan;
import com.example.quanlynhatro.repository.LoaiNDRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/loaind")
public class LoaiNDController {
    private final LoaiNDRepository loaiNDRepository;

    public LoaiNDController(LoaiNDRepository loaiNDRepository) {
        this.loaiNDRepository = loaiNDRepository;
    }

    @GetMapping(path = "/getAllLoaiND")
    public @ResponseBody Iterable<LoaiND> getAllLoaiND() {
        return loaiNDRepository.findAll();
    }
}

package com.example.quanlynhatro.controller;

import com.example.quanlynhatro.entity.HinhAnh;
import com.example.quanlynhatro.entity.NguoiDung;
import com.example.quanlynhatro.repository.HinhAnhRepository;
import com.example.quanlynhatro.repository.NguoiDungRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/hinhanh")

public class HinhAnhController {
    private final HinhAnhRepository hinhAnhRepository;

    public HinhAnhController(HinhAnhRepository hinhAnhRepository) {
        this.hinhAnhRepository = hinhAnhRepository;
    }

    @GetMapping(path = "/getAllHinhAnh")
    public @ResponseBody Iterable<HinhAnh> getAllHinhAnh() {
        return hinhAnhRepository.findAll();
    }
}

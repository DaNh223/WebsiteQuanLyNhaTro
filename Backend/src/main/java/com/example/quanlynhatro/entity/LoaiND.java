package com.example.quanlynhatro.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "loaind")
public class LoaiND {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "maloai")
    private Integer maLoai;

    @Column(name = "tenloai", length = 100)
    private String tenLoai;

    public Integer getMaLoai() {
        return maLoai;
    }

    public void setMaTK(Integer maLoai) {
        this.maLoai = maLoai;
    }

    public String getTenloai() {
        return tenLoai;
    }

    public void setTenLoai(String tenLoai) {
        this.tenLoai = tenLoai;
    }

}

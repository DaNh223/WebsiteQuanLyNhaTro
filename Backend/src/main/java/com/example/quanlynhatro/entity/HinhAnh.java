package com.example.quanlynhatro.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "hinhanh")
public class HinhAnh {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "maha")
    private Integer maHA;

    @Column(name = "url", length = 200)
    private String url;

    @ManyToOne
    @JoinColumn(name = "mant")
    private NhaTro nhaTro;

    // Getters and Setters
    public Integer getMaHA() {
        return maHA;
    }

    public void setMaHA(Integer maHA) {
        this.maHA = maHA;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public NhaTro getNhaTro() {
        return nhaTro;
    }

    public void setNhaTro(NhaTro nhaTro) {
        this.nhaTro = nhaTro;
    }
}
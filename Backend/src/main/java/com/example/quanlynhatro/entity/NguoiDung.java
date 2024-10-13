package com.example.quanlynhatro.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "nguoidung")
public class NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mand")
    private Integer maND;

    @Column(name = "tennd", length = 100)
    private String tenND;

    @Column(name = "ngaysinh")
    @Temporal(TemporalType.DATE)
    private Date ngaySinh;

    @Column(name = "sdt", length = 50)
    private String sdt;

    @Column(name = "hinhnd", length = 100)
    private String hinhND;

    @Column(name = "diachi", length = 200)
    private String diaChi;

    @Column(name = "zalo", length = 200)
    private String zalo;

    @Column(name = "facebook", length = 200)
    private String facebook;

    @ManyToOne
    @JoinColumn(name = "maloai")
    private LoaiND loaiND;

    @ManyToOne
    @JoinColumn(name = "matk")
    private TaiKhoan taiKhoan;

    // Getters and Setters
    public Integer getMaND() {
        return maND;
    }

    public void setMaND(Integer maND) {
        this.maND = maND;
    }

    public String getTenND() {
        return tenND;
    }

    public void setTenND(String tenND) {
        this.tenND = tenND;
    }

    public Date getNgaySinh() {
        return ngaySinh;
    }

    public void setNgaySinh(Date ngaySinh) {
        this.ngaySinh = ngaySinh;
    }

    public String getSdt() {
        return sdt;
    }

    public void setSdt(String sdt) {
        this.sdt = sdt;
    }

    public String getHinhND() {
        return hinhND;
    }

    public void setHinhND(String hinhND) {
        this.hinhND = hinhND;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public String getZalo() {
        return zalo;
    }

    public void setZalo(String zalo) {
        this.zalo = zalo;
    }

    public String getFacebook() {
        return facebook;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public LoaiND getLoaiND() {
        return loaiND;
    }

    public void setLoaiND(LoaiND loaiND) {
        this.loaiND = loaiND;
    }

    public TaiKhoan getTaiKhoan() {
        return taiKhoan;
    }

    public void setTaiKhoan(TaiKhoan taiKhoan) {
        this.taiKhoan = taiKhoan;
    }
}

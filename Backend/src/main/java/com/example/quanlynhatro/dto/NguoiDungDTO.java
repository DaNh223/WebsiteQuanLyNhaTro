package com.example.quanlynhatro.dto;

import com.example.quanlynhatro.entity.LoaiND;
import com.example.quanlynhatro.entity.TaiKhoan;

import java.util.Date;

public class NguoiDungDTO {
    private Integer maND;
    private String tenND;
    private Date ngaySinh;
    private String sdt;
    private String hinhND;
    private String diaChi;
    private String zalo;
    private String facebook;
    private LoaiND loaiND;
    private TaiKhoan taiKhoan;
    private long soLuongNhaTro;

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

    public long getSoLuongNhaTro() {
        return soLuongNhaTro;
    }

    public void setSoLuongNhaTro(long soLuongNhaTro) {
        this.soLuongNhaTro = soLuongNhaTro;
    }
}

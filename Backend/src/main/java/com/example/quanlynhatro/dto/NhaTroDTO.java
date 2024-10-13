package com.example.quanlynhatro.dto;

import com.example.quanlynhatro.entity.HinhAnh;
import com.example.quanlynhatro.entity.NguoiDung;

import java.util.List;

public class NhaTroDTO {
    private Integer maNT;
    private String tenTro;
    private String diaChi;
    private Float dienTich;
    private Double giaPhong;
    private Double giaDien;
    private Double giaNuoc;
    private String moTa;
    private String tienIch;
    private String trangThai;
    private String trangThaiDuyet;
    private String lng;
    private String lat;
    private String tinh;
    private String quan;
    private String phuong;
    private NguoiDung nguoiDung;
    private List<HinhAnh> hinhAnh;

    public Integer getMaNT() {
        return maNT;
    }

    public void setMaNT(Integer maNT) {
        this.maNT = maNT;
    }

    public String getTenTro() {
        return tenTro;
    }

    public void setTenTro(String tenTro) {
        this.tenTro = tenTro;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public Float getDienTich() {
        return dienTich;
    }

    public void setDienTich(Float dienTich) {
        this.dienTich = dienTich;
    }

    public Double getGiaPhong() {
        return giaPhong;
    }

    public void setGiaPhong(Double giaPhong) {
        this.giaPhong = giaPhong;
    }

    public Double getGiaDien() {
        return giaDien;
    }

    public void setGiaDien(Double giaDien) {
        this.giaDien = giaDien;
    }

    public Double getGiaNuoc() {
        return giaNuoc;
    }

    public void setGiaNuoc(Double giaNuoc) {
        this.giaNuoc = giaNuoc;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public String getTienIch() {
        return tienIch;
    }

    public void setTienIch(String tienIch) {
        this.tienIch = tienIch;
    }

    public String getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public String getTrangThaiDuyet() {
        return trangThaiDuyet;
    }

    public void setTrangThaiDuyet(String trangThaiDuyet) {
        this.trangThaiDuyet = trangThaiDuyet;
    }

    public String getLng() {
        return lng;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getTinh() {
        return tinh;
    }

    public void setTinh(String tinh) {
        this.tinh = tinh;
    }

    public String getQuan() {
        return quan;
    }

    public void setQuan(String quan) {
        this.quan = quan;
    }

    public String getPhuong() {
        return phuong;
    }

    public void setPhuong(String phuong) {
        this.phuong = phuong;
    }

    public NguoiDung getNguoiDung() {
        return nguoiDung;
    }

    public void setNguoiDung(NguoiDung nguoiDung) {
        this.nguoiDung = nguoiDung;
    }

    public List<HinhAnh> getHinhAnh() {
        return hinhAnh;
    }

    public void setHinhAnh(List<HinhAnh> hinhAnh) {
        this.hinhAnh = hinhAnh;
    }

}

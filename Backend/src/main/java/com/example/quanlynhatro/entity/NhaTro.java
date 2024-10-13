package com.example.quanlynhatro.entity;
import jakarta.persistence.*;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "nhatro")
public class NhaTro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mant")
    private Integer maNT;

    @Column(name = "tentro", length = 100)
    private String tenTro;

    @Column(name = "diachi", length = 200)
    private String diaChi;

    @Column(name = "dientich")
    private Float dienTich;

    @Column(name = "giaphong")
    private Double giaPhong;

    @Column(name = "giadien")
    private Double giaDien;

    @Column(name = "gianuoc")
    private Double giaNuoc;

    @Column(name = "mota", length = 200)
    private String moTa;

    @Column(name = "tienich", length = 200)
    private String tienIch;

    @Column(name = "trangthai", length = 50)
    private String trangThai;

    @Column(name = "trangthaiduyet", length = 20)
    private String trangThaiDuyet;

    @Column(name = "lng", length = 100)
    private String lng;

    @Column(name = "lat", length = 100)
    private String lat;

    @Column(name = "tinh", length = 100)
    private String tinh;

    @Column(name = "quan", length = 100)
    private String quan;

    @Column(name = "phuong", length = 100)
    private String phuong;

    @OneToOne
    @JoinColumn(name = "mand")
    private NguoiDung nguoiDung;

    // Getters and Setters
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

}

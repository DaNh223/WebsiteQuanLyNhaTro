package com.example.quanlynhatro.dto;

public class LoginResponse {
    private Integer maND;
    private Integer maTK;
    private String hinhND;
    private String loaiND;

    public LoginResponse(Integer maND, Integer maTK, String hinhND,  String loaiND) {
        this.maND = maND;
        this.maTK = maTK;
        this.hinhND = hinhND;
        this.loaiND = loaiND;
    }

    public Integer getMaND() {
        return maND;
    }

    public void setMaND(Integer maND) {
        this.maND = maND;
    }

    public Integer getMaTK() {
        return maTK;
    }

    public void setMaTK(Integer maTK) {
        this.maTK = maTK;
    }

    public String getHinhND() {
        return hinhND;
    }

    public void setHinhND(String hinhND) {
        this.hinhND = hinhND;
    }

    public String getLoaiND() {
        return loaiND;
    }

    public void setLoaiND(String loaiND) {
        this.loaiND = loaiND;
    }
}

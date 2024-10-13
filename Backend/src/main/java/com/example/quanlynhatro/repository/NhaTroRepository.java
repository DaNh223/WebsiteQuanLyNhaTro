package com.example.quanlynhatro.repository;

import com.example.quanlynhatro.entity.NhaTro;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface NhaTroRepository extends CrudRepository<NhaTro, Integer> {
    Collection<NhaTro> findByTenTroContainingIgnoreCase(String tenTro);

    Collection<NhaTro> findByDiaChiContainingIgnoreCase(String diaChi);

    Collection<NhaTro> findByDienTich(Float dienTich);

    Collection<NhaTro> findByGiaPhong(Double giaPhong);

    Collection<NhaTro> findByTrangThaiDuyet(String trangThaiDuyet);

    List<NhaTro> findByNguoiDung_MaND(int maND);
}

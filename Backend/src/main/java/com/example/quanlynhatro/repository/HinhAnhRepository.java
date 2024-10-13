package com.example.quanlynhatro.repository;

import com.example.quanlynhatro.entity.HinhAnh;
import com.example.quanlynhatro.entity.NhaTro;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface HinhAnhRepository extends CrudRepository<HinhAnh, Integer> {
    List<HinhAnh> findByNhaTro(NhaTro nhaTro);

    @Transactional
    void deleteByUrl(String url);

    List<HinhAnh> findByNhaTroMaNT(int maNT);

}

package com.example.quanlynhatro.controller;

import com.example.quanlynhatro.dto.LoginResponse;
import com.example.quanlynhatro.entity.TaiKhoan;
import com.example.quanlynhatro.entity.NguoiDung;
import com.example.quanlynhatro.repository.NguoiDungRepository;
import com.example.quanlynhatro.repository.TaiKhoanRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path = "/taikhoan")
@CrossOrigin(origins = "http://localhost:3000")
public class TaiKhoanController {
    private final TaiKhoanRepository taiKhoanRepository;
    private final NguoiDungRepository nguoiDungRepository;

    public TaiKhoanController(TaiKhoanRepository taiKhoanRepository, NguoiDungRepository nguoiDungRepository) {
        this.taiKhoanRepository = taiKhoanRepository;
        this.nguoiDungRepository = nguoiDungRepository;
    }

    @GetMapping(path = "/getAllTaiKhoan")
    public @ResponseBody Iterable<TaiKhoan> getAllTaiKhoan() {
        return taiKhoanRepository.findAll();
    }

    @PostMapping(path = "/addTaiKhoan")
    public @ResponseBody TaiKhoan addTaiKhoan(@RequestBody TaiKhoan taiKhoan) {
        taiKhoanRepository.save(taiKhoan);
        return taiKhoan;
    }

    @PutMapping(path = "/updateTaiKhoan")
    public @ResponseBody TaiKhoan updateTaiKhoan(@RequestBody TaiKhoan taiKhoan) {
        TaiKhoan taiKhoanSua = this.taiKhoanRepository.findById(taiKhoan.getMaTK())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tài khoản không tồn tại"));
        taiKhoanSua.setEmail(taiKhoan.getEmail());
        taiKhoanSua.setPassword(taiKhoan.getPassword());
        this.taiKhoanRepository.save(taiKhoanSua);
        return taiKhoanSua;
    }


    @PostMapping(path = "/login")
    public @ResponseBody LoginResponse Login(@RequestBody TaiKhoan taiKhoan) {
        TaiKhoan foundTaiKhoan = this.taiKhoanRepository.findByEmail(taiKhoan.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tài khoản không tồn tại"));

        if (!foundTaiKhoan.getPassword().equals(taiKhoan.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Mật khẩu không chính xác");
        }

        NguoiDung nguoiDung = (NguoiDung) this.nguoiDungRepository.findByTaiKhoan(foundTaiKhoan)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Người dùng không tồn tại"));

        return new LoginResponse(nguoiDung.getMaND(), foundTaiKhoan.getMaTK(), nguoiDung.getHinhND(), nguoiDung.getLoaiND().getTenloai());
    }


    @PostMapping(path = "/changePass")
    public ResponseEntity<String> changePass(@RequestBody Map<String, Object> payload) {
        int maTK;
        try {
            maTK = Integer.parseInt(payload.get("maTK").toString());
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid maTK value.");
        }

        String curPass = (String) payload.get("curPass");
        String newPass = (String) payload.get("newPass");

        Optional<TaiKhoan> optionalUser = taiKhoanRepository.findById(maTK);
        if (optionalUser.isPresent()) {
            TaiKhoan user = optionalUser.get();

            if (!user.getPassword().equals(curPass)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mật khẩu hiện tại không đúng.");
            }

            user.setPassword(newPass);
            taiKhoanRepository.save(user);

            return ResponseEntity.ok("Mật khẩu đã được thay đổi thành công.");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Người dùng không tồn tại.");
    }




}

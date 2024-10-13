package com.example.quanlynhatro.controller;

import com.example.quanlynhatro.dto.NguoiDungDTO;
import com.example.quanlynhatro.entity.HinhAnh;
import com.example.quanlynhatro.entity.NguoiDung;
import com.example.quanlynhatro.entity.NhaTro;
import com.example.quanlynhatro.entity.TaiKhoan;
import com.example.quanlynhatro.repository.HinhAnhRepository;
import com.example.quanlynhatro.repository.NguoiDungRepository;
import com.example.quanlynhatro.repository.NhaTroRepository;

import com.example.quanlynhatro.repository.TaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping(path = "/nguoidung")
@CrossOrigin(origins = "http://localhost:3000")
public class NguoiDungController {
    private final NguoiDungRepository nguoiDungRepository;
    private final NhaTroRepository nhaTroRepository;
    private final TaiKhoanRepository taiKhoanRepository;
    private final HinhAnhRepository hinhAnhRepository;
    @Autowired
    private JavaMailSender mailSender; // Thêm JavaMailSender

    public NguoiDungController(NguoiDungRepository nguoiDungRepository, NhaTroRepository nhaTroRepository, TaiKhoanRepository taiKhoanRepository, HinhAnhRepository hinhAnhRepository) {
        this.nguoiDungRepository = nguoiDungRepository;
        this.nhaTroRepository = nhaTroRepository;
        this.taiKhoanRepository = taiKhoanRepository;
        this.hinhAnhRepository = hinhAnhRepository;
    }

    @GetMapping(path = "/getAllNguoiDung")
    public @ResponseBody Iterable<NguoiDungDTO> getAllNguoiDung() {
//        return nguoiDungRepository.findAll();
        List<NguoiDung> nguoiDungList = (List<NguoiDung>) nguoiDungRepository.findAll();
        List<NguoiDungDTO> nguoiDungDTOList = new ArrayList<>();

        for (NguoiDung nguoiDung : nguoiDungList) {
            NguoiDungDTO nguoiDungDTO = new NguoiDungDTO();
            nguoiDungDTO.setMaND(nguoiDung.getMaND());
            nguoiDungDTO.setTenND(nguoiDung.getTenND());
            nguoiDungDTO.setNgaySinh(nguoiDung.getNgaySinh());
            nguoiDungDTO.setSdt(nguoiDung.getSdt());
            nguoiDungDTO.setHinhND(nguoiDung.getHinhND());
            nguoiDungDTO.setDiaChi(nguoiDung.getDiaChi());
            nguoiDungDTO.setZalo(nguoiDung.getZalo());
            nguoiDungDTO.setFacebook(nguoiDung.getFacebook());
            nguoiDungDTO.setLoaiND(nguoiDung.getLoaiND());
            nguoiDungDTO.setTaiKhoan(nguoiDung.getTaiKhoan());

            // Lấy số lượng nhà trọ cho người dùng này
            long soLuongNhaTro = nhaTroRepository.findByNguoiDung_MaND(nguoiDung.getMaND()).size();
            nguoiDungDTO.setSoLuongNhaTro(soLuongNhaTro);
            nguoiDungDTOList.add(nguoiDungDTO);
        }

        return nguoiDungDTOList;

    }

    @GetMapping("/{id}")
    public ResponseEntity<NguoiDung> getDetails(@PathVariable int id) {
        Optional<NguoiDung> nguoidung = nguoiDungRepository.findById(id);
        if (nguoidung.isPresent()) {
            return ResponseEntity.ok(nguoidung.get());
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(path = "/editNguoiDung")
    public ResponseEntity<String> editNguoiDung(
            @RequestParam("maND") String maNDStr, // ID người dùng
            @RequestParam("name") String name,
            @RequestParam("birth") String birth,
            @RequestParam("phone") String phone,
            @RequestParam("address") String address,
            @RequestParam("zalo") String zalo,
            @RequestParam("facebook") String facebook,
            @RequestParam("email") String email,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        int maND;

        // Chuyển từ String sang int và kiểm tra ngoại lệ
        try {
            maND = Integer.parseInt(maNDStr);
        } catch (NumberFormatException e) {
            return ResponseEntity.status(400).body("ID người dùng không hợp lệ.");
        }

        // Tìm người dùng theo ID
        NguoiDung nguoiDung = nguoiDungRepository.findById(maND).orElse(null);
        if (nguoiDung == null) {
            return ResponseEntity.status(404).body("Người dùng không tồn tại.");
        }

        // Cập nhật thông tin người dùng
        if (name != null) {
            nguoiDung.setTenND(name);
        }
        if (birth != null) {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            try {
                Date birthDate = dateFormat.parse(birth);
                nguoiDung.setNgaySinh(birthDate);
            } catch (ParseException e) {
                return ResponseEntity.status(400).body("Ngày sinh không hợp lệ.");
            }
        }
        if (phone != null) {
            nguoiDung.setSdt(phone);
        }
        if (address != null) {
            nguoiDung.setDiaChi(address);
        }
        if (zalo != null) {
            nguoiDung.setZalo(zalo);
        }
        if (facebook != null) {
            nguoiDung.setFacebook(facebook);
        }
        if (email != null) {
            nguoiDung.getTaiKhoan().setEmail(email);
        }

        String uploadDir = "src/main/resources/static/img/";
        File uploadFolder = new File(uploadDir);
        if (!uploadFolder.exists()) {
            uploadFolder.mkdirs();
        }

        if (image != null && !image.isEmpty()) {
            // Lấy tên tệp gốc và phần mở rộng
            String originalFilename = image.getOriginalFilename();
            String fileExtension = "";

            if (originalFilename != null && originalFilename.lastIndexOf('.') != -1) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf('.'));
            }

            // Đặt tên tệp với định dạng phù hợp
            String fileName = "user_" + maND + fileExtension; // Tên tệp mới với phần mở rộng
            File oldFile = new File(uploadDir + fileName);
            if (oldFile.exists() && oldFile.delete()) {
                System.out.println("Old file deleted successfully.");
            }

            Path newFilePath = Paths.get(uploadDir, fileName);
            try {
                Files.copy(image.getInputStream(), newFilePath, StandardCopyOption.REPLACE_EXISTING);
                nguoiDung.setHinhND(fileName);
            } catch (IOException e) {
                return ResponseEntity.status(500).body("Lỗi khi lưu hình ảnh: " + e.getMessage());
            }
        }

        nguoiDungRepository.save(nguoiDung);

        return ResponseEntity.ok("Cập nhật thông tin người dùng và hình ảnh thành công.");
    }


    @PostMapping(path = "/deleteNguoiDung")
    public ResponseEntity<String> deleteNguoiDung(@RequestParam("maND") int maND) {
        try {
            Optional<NguoiDung> optionalNguoiDung = nguoiDungRepository.findById(maND);
            if (!optionalNguoiDung.isPresent()) {
                return ResponseEntity.status(404).body("{\"message\": \"Không tìm thấy người dùng với mã này\"}");
            }

            NguoiDung nguoiDung = optionalNguoiDung.get();
            int maTK = nguoiDung.getTaiKhoan().getMaTK();


            String userImagesToDelete = nguoiDung.getHinhND();
            try {
                Path userImagePath = Paths.get("src/main/resources/static/img/" + userImagesToDelete);
                Files.deleteIfExists(userImagePath);
            } catch (IOException e) {
                e.printStackTrace();
            }

            List<NhaTro> nhaTroList = nhaTroRepository.findByNguoiDung_MaND(maND);
            for (NhaTro nhaTro : nhaTroList) {
                int maNT = nhaTro.getMaNT();

                List<HinhAnh> imagesToDelete = hinhAnhRepository.findByNhaTroMaNT(maNT);

                for (HinhAnh image : imagesToDelete) {
                    try {
                        Path filePath = Paths.get("src/main/resources/static/img/" + image.getUrl());
                        Files.deleteIfExists(filePath); // Xóa tệp trên hệ thống
                        hinhAnhRepository.delete(image); // Xóa khỏi database
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }

                nhaTroRepository.delete(nhaTro);
            }

            nguoiDungRepository.delete(nguoiDung);

            Optional<TaiKhoan> optionalTaiKhoan = taiKhoanRepository.findById(maTK);
            if (optionalTaiKhoan.isPresent()) {
                taiKhoanRepository.delete(optionalTaiKhoan.get());
            }

            return ResponseEntity.ok("{\"message\": \"Người dùng và các liên kết đã được xóa\"}");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @PostMapping(path = "/setDefaultPassword")
    public ResponseEntity<String> setDefaultPassword(@RequestParam("maND") int maND) {
        Optional<NguoiDung> optionalNguoiDung = nguoiDungRepository.findById(maND);
        if (!optionalNguoiDung.isPresent()) {
            return ResponseEntity.status(404).body("{\"message\": \"Không tìm thấy người dùng với mã này\"}");
        }
        NguoiDung nguoiDung = optionalNguoiDung.get();
        String email = nguoiDung.getTaiKhoan().getEmail(); // Giả sử tài khoản chứa email
        if (email == null || email.isEmpty()) {
            return ResponseEntity.status(400).body("{\"message\": \"Người dùng không có email\"}");
        }
        String newPassword = generateRandomPassword(8);

        nguoiDung.getTaiKhoan().setPassword(newPassword);

        nguoiDungRepository.save(nguoiDung);

        try {
            sendEmail(email, newPassword);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"message\": \"Có lỗi xảy ra khi gửi email\"}");
        }
        return ResponseEntity.ok("{\"message\": \"Mật khẩu mặc định đã được gửi qua email\"}");
    }

    private String generateRandomPassword(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder password = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            password.append(chars.charAt(random.nextInt(chars.length())));
        }
        return password.toString();
    }

    private void sendEmail(String email, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Mật khẩu khôi phục của bạn");
        message.setText("Mật khẩu khôi phục của bạn là: " + password + ". Vui lòng đổi mật khẩu sau khi đăng nhập");

        // Gửi email
        mailSender.send(message);
    }

}

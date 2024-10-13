package com.example.quanlynhatro.controller;

import com.example.quanlynhatro.entity.LoaiND;
import com.example.quanlynhatro.entity.NguoiDung;
import com.example.quanlynhatro.entity.Otp;
import com.example.quanlynhatro.entity.TaiKhoan;
import com.example.quanlynhatro.repository.LoaiNDRepository;
import com.example.quanlynhatro.repository.NguoiDungRepository;
import com.example.quanlynhatro.repository.OtpRepository;
import com.example.quanlynhatro.repository.TaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/otp")
@CrossOrigin(origins = "http://localhost:3000")

public class OtpController {

    @Autowired
    private OtpRepository otpRepository; // Repository để tương tác với bảng otp
    @Autowired
    private TaiKhoanRepository taiKhoanRepository; // Repository để tương tác với bảng TaiKhoan
    @Autowired
    private NguoiDungRepository nguoiDungRepository; // Repository để tương tác với bảng NguoiDung
    @Autowired
    private JavaMailSender mailSender; // Thêm JavaMailSender
    @Autowired
    private LoaiNDRepository loaiNDRepository;

//    @PostMapping("/sendOtp")
//    public String sendOtp(@RequestParam String email) {
//
//        // Tạo mã OTP
//        String otpCode = String.valueOf(new Random().nextInt(9000) + 1000); // Mã OTP 6 chữ số
//        LocalDateTime expiresAt = LocalDateTime.now().plus(5, ChronoUnit.MINUTES);
//
//        // Lưu mã OTP vào cơ sở dữ liệu
//        Otp otp = new Otp();
//        otp.setEmail(email);
//        otp.setOtpCode(otpCode);
//        otp.setExpiresAt(expiresAt);
//        otp.setVerified(false); // Đánh dấu OTP chưa được xác minh
//        otpRepository.save(otp);
//
//        // Gửi mã OTP qua email (thực hiện logic gửi email ở đây)
//        sendOtpEmail(email, otpCode);
//
//        return "OTP đã được gửi đến email của bạn.";
//    }
    @PostMapping("/sendOtp")
    public ResponseEntity<String> sendOtp(@RequestParam String email) {
        // Kiểm tra xem email đã tồn tại trong bảng TaiKhoan chưa
        Optional<TaiKhoan> existingAccount = taiKhoanRepository.findByEmail(email);
        if (existingAccount.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email đã tồn tại, tài khoản đã được đăng ký.");
        }

        // Nếu email chưa tồn tại, tạo mã OTP
        String otpCode = String.valueOf(new Random().nextInt(9000) + 1000); // Mã OTP 6 chữ số
        LocalDateTime expiresAt = LocalDateTime.now().plus(5, ChronoUnit.MINUTES);

        // Lưu mã OTP vào cơ sở dữ liệu
        Otp otp = new Otp();
        otp.setEmail(email);
        otp.setOtpCode(otpCode);
        otp.setExpiresAt(expiresAt);
        otp.setVerified(false); // Đánh dấu OTP chưa được xác minh
        otpRepository.save(otp);

        // Gửi mã OTP qua email (thực hiện logic gửi email ở đây)
        sendOtpEmail(email, otpCode);

        return ResponseEntity.ok("OTP đã được gửi đến email của bạn.");
    }


    @PostMapping("/verifyOtp")
    public ResponseEntity<String> verifyOtp(
            @RequestParam String email,
            @RequestParam String otpCode,
            @RequestParam String userName,
            @RequestParam String dateOfBirth,
            @RequestParam String phoneNumber,
            @RequestParam String address,
            @RequestParam String password) {

        // Kiểm tra mã OTP trong cơ sở dữ liệu
        Otp otp = otpRepository.findByEmailAndOtpCode(email, otpCode);
        if (otp != null && !otp.getVerified() && otp.getExpiresAt().isAfter(LocalDateTime.now())) {
            otp.setVerified(true);
            otpRepository.save(otp);

            // Lưu thông tin người dùng vào bảng NguoiDung
            TaiKhoan taiKhoan = new TaiKhoan();
            taiKhoan.setEmail(email);
            taiKhoan.setPassword(password); // Lưu mật khẩu, có thể mã hóa trước khi lưu
            taiKhoan = taiKhoanRepository.save(taiKhoan); // Lưu và nhận lại tài khoản đã lưu

            NguoiDung nguoiDung = new NguoiDung();
            nguoiDung.setTenND(userName);

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd"); // Định dạng ngày
            try {
                Date birthDate = dateFormat.parse(dateOfBirth); // Chuyển đổi chuỗi thành Date
                nguoiDung.setNgaySinh(birthDate); // Cập nhật ngày sinh
            } catch (ParseException e) { // Bắt ngoại lệ ParseException
                return ResponseEntity.status(400).body("Ngày sinh không hợp lệ.");
            }
            nguoiDung.setSdt(phoneNumber);
            nguoiDung.setDiaChi(address);

            Optional<LoaiND> loaiNDOptional = loaiNDRepository.findById(2);
            nguoiDung.setLoaiND(loaiNDOptional.get());

            nguoiDung.setTaiKhoan(taiKhoan);
            nguoiDungRepository.save(nguoiDung);

            return ResponseEntity.ok("Xác minh mã OTP thành công và thông tin người dùng đã được lưu!");
        }
        return ResponseEntity.status(400).body("Mã OTP không hợp lệ hoặc đã hết hạn.");
    }

    private void sendOtpEmail(String email, String otpCode) {
        // Sử dụng SimpleMailMessage để gửi email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Mã xác minh OTP của bạn");
        message.setText("Mã OTP của bạn là: " + otpCode + ". Mã này sẽ hết hạn sau 5 phút.");

        // Gửi email
        mailSender.send(message);
    }
}

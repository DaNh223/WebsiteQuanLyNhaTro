    package com.example.quanlynhatro.controller;


    import com.example.quanlynhatro.dto.NhaTroDTO;
    import com.example.quanlynhatro.entity.HinhAnh;
    import com.example.quanlynhatro.entity.NguoiDung;
    import com.example.quanlynhatro.entity.NhaTro;
    import com.example.quanlynhatro.repository.HinhAnhRepository;
    import com.example.quanlynhatro.repository.NguoiDungRepository;
    import com.example.quanlynhatro.repository.NhaTroRepository;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    import org.springframework.web.multipart.MultipartFile;

    import java.io.File;
    import java.io.IOException;
    import java.nio.file.Files;
    import java.nio.file.Path;
    import java.nio.file.Paths;
    import java.nio.file.StandardCopyOption;
    import java.util.*;
    import java.util.stream.Collectors;

    @RestController
    @RequestMapping(path = "/nhatro")
    @CrossOrigin(origins = "http://localhost:3000")
    public class NhaTroController {
        private final NhaTroRepository nhaTroRepository;
        private final HinhAnhRepository hinhAnhRepository;
        private final NguoiDungRepository nguoiDungRepository;

        public NhaTroController(NhaTroRepository nhaTroRepository, HinhAnhRepository hinhAnhRepository, NguoiDungRepository nguoiDungRepository) {
            this.nhaTroRepository = nhaTroRepository;
            this.hinhAnhRepository = hinhAnhRepository;
            this.nguoiDungRepository = nguoiDungRepository;
        }

        @GetMapping(path = "/getAllNhaTro")
        public @ResponseBody List<NhaTroDTO> getAllNhaTro() {
            List<NhaTro> nhaTroList = (List<NhaTro>) nhaTroRepository.findAll();

            // Sắp xếp danh sách theo maNT giảm dần
            return nhaTroList.stream()
                    .sorted(Comparator.comparingInt(NhaTro::getMaNT).reversed())
                    .map(nhaTro -> {
                        NhaTroDTO dto = new NhaTroDTO();

                        // Ánh xạ toàn bộ thông tin từ NhaTro sang NhaTroDTO
                        dto.setMaNT(nhaTro.getMaNT());
                        dto.setTenTro(nhaTro.getTenTro());
                        dto.setDiaChi(nhaTro.getDiaChi());
                        dto.setDienTich(nhaTro.getDienTich());
                        dto.setGiaPhong(nhaTro.getGiaPhong());
                        dto.setGiaDien(nhaTro.getGiaDien());
                        dto.setGiaNuoc(nhaTro.getGiaNuoc());
                        dto.setMoTa(nhaTro.getMoTa());
                        dto.setTienIch(nhaTro.getTienIch());
                        dto.setTrangThai(nhaTro.getTrangThai());
                        dto.setTrangThaiDuyet(nhaTro.getTrangThaiDuyet());
                        dto.setLng(nhaTro.getLng());
                        dto.setLat(nhaTro.getLat());
                        dto.setTinh(nhaTro.getTinh());
                        dto.setQuan(nhaTro.getQuan());
                        dto.setPhuong(nhaTro.getPhuong());
                        dto.setNguoiDung(nhaTro.getNguoiDung()); // Giả sử bạn muốn lấy luôn thông tin người dùng

                        // Lấy danh sách hình ảnh
                        List<HinhAnh> hinhAnhs = hinhAnhRepository.findByNhaTro(nhaTro);
                        dto.setHinhAnh(hinhAnhs);

                        return dto;
                    })
                    .collect(Collectors.toList());
        }

        @GetMapping(path = "/getNhaTroByChuTro/{id}")
        public @ResponseBody List<NhaTroDTO> getNhaTroByChuTro(@PathVariable int id) {
            List<NhaTro> nhaTroList = nhaTroRepository.findByNguoiDung_MaND(id);
            return nhaTroList.stream()
                    .sorted(Comparator.comparingInt(NhaTro::getMaNT).reversed())
                    .map(nhaTro -> {
                        NhaTroDTO dto = new NhaTroDTO();

                        // Ánh xạ toàn bộ thông tin từ NhaTro sang NhaTroDTO
                        dto.setMaNT(nhaTro.getMaNT());
                        dto.setTenTro(nhaTro.getTenTro());
                        dto.setDiaChi(nhaTro.getDiaChi());
                        dto.setDienTich(nhaTro.getDienTich());
                        dto.setGiaPhong(nhaTro.getGiaPhong());
                        dto.setGiaDien(nhaTro.getGiaDien());
                        dto.setGiaNuoc(nhaTro.getGiaNuoc());
                        dto.setMoTa(nhaTro.getMoTa());
                        dto.setTienIch(nhaTro.getTienIch());
                        dto.setTrangThai(nhaTro.getTrangThai());
                        dto.setTrangThaiDuyet(nhaTro.getTrangThaiDuyet());
                        dto.setLng(nhaTro.getLng());
                        dto.setLat(nhaTro.getLat());
                        dto.setTinh(nhaTro.getTinh());
                        dto.setQuan(nhaTro.getQuan());
                        dto.setPhuong(nhaTro.getPhuong());
                        dto.setNguoiDung(nhaTro.getNguoiDung()); // Giả sử bạn muốn lấy luôn thông tin người dùng

                        // Lấy danh sách hình ảnh
                        List<HinhAnh> hinhAnhs = hinhAnhRepository.findByNhaTro(nhaTro);
                        dto.setHinhAnh(hinhAnhs);

                        return dto;
                    })
                    .collect(Collectors.toList());
        }



        @GetMapping(path = "/getActiveNhaTro")
        public @ResponseBody List<NhaTroDTO> getActiveNhaTro() {
            List<NhaTro> nhaTroList = (List<NhaTro>) nhaTroRepository.findByTrangThaiDuyet("Đã duyệt");

            // Sắp xếp danh sách theo maNT giảm dần
            return nhaTroList.stream()
                    .sorted(Comparator.comparingInt(NhaTro::getMaNT).reversed())
                    .map(nhaTro -> {
                        NhaTroDTO dto = new NhaTroDTO();
                        dto.setMaNT(nhaTro.getMaNT());
                        dto.setTenTro(nhaTro.getTenTro());
                        dto.setDiaChi(nhaTro.getDiaChi());
                        dto.setDienTich(nhaTro.getDienTich());
                        dto.setGiaPhong(nhaTro.getGiaPhong());
                        dto.setTinh(nhaTro.getTinh());
                        dto.setQuan(nhaTro.getQuan());
                        dto.setPhuong(nhaTro.getPhuong());

                        // Lấy danh sách hình ảnh
                        List<HinhAnh> hinhAnhs = hinhAnhRepository.findByNhaTro(nhaTro);
                        dto.setHinhAnh(hinhAnhs);
                        return dto;
                    })
                    .collect(Collectors.toList());
        }


        @GetMapping("/{id}")
        public ResponseEntity<NhaTroDTO> getDetails(@PathVariable int id) {
            Optional<NhaTro> houseOptional = nhaTroRepository.findById(id);
            if (houseOptional.isPresent()) {
                NhaTro house = houseOptional.get();
                NhaTroDTO dto = new NhaTroDTO();
                dto.setMaNT(house.getMaNT());
                dto.setTenTro(house.getTenTro());
                dto.setDiaChi(house.getDiaChi());
                dto.setDienTich(house.getDienTich());
                dto.setGiaPhong(house.getGiaPhong());
                dto.setTinh(house.getTinh());
                dto.setQuan(house.getQuan());
                dto.setPhuong(house.getPhuong());
                dto.setGiaDien(house.getGiaDien());
                dto.setGiaNuoc(house.getGiaNuoc());
                dto.setMoTa(house.getMoTa());
                dto.setTienIch(house.getTienIch());
                dto.setTrangThai(house.getTrangThai());
                dto.setTrangThaiDuyet(house.getTrangThaiDuyet());
                dto.setLng(house.getLng());
                dto.setLat(house.getLat());

                dto.setNguoiDung(house.getNguoiDung());

                List<HinhAnh> hinhAnhs = hinhAnhRepository.findByNhaTro(house);
                dto.setHinhAnh(hinhAnhs);

                return ResponseEntity.ok(dto);
            } else {
                return ResponseEntity.notFound().build();
            }
        }

//        @PostMapping(path = "/addNhaTro")
//        public ResponseEntity<String> addNhaTro(
//                @RequestParam("diachi") String diachi,
//                @RequestParam("tentro") String tentro,
//                @RequestParam("dientich") float dientich,
//                @RequestParam("trangthai") String trangthai,
//                @RequestParam("giaphong") double giaphong,
//                @RequestParam("giadien") double giadien,
//                @RequestParam("gianuoc") double gianuoc,
//                @RequestParam("tienich") String tienich,
//                @RequestParam("mota") String mota,
//                @RequestParam("tinh") String tinh,
//                @RequestParam("quan") String quan,
//                @RequestParam("phuong") String phuong,
//                @RequestParam("latitude") double latitude,
//                @RequestParam("longitude") double longitude,
//                @RequestParam("userID") int userID,
//                @RequestParam("images") List<MultipartFile> images) {
//
//            try {
//                // Tạo mới đối tượng NhaTro
//                NhaTro newNhaTro = new NhaTro();
//                newNhaTro.setDiaChi(diachi);
//                newNhaTro.setTenTro(tentro);
//                newNhaTro.setDienTich(dientich);
//                newNhaTro.setTrangThai(trangthai);
//                newNhaTro.setGiaPhong(giaphong);
//                newNhaTro.setGiaDien(giadien);
//                newNhaTro.setGiaNuoc(gianuoc);
//                newNhaTro.setTienIch(tienich);
//                newNhaTro.setMoTa(mota);
//                newNhaTro.setTinh(tinh);
//                newNhaTro.setQuan(quan);
//                newNhaTro.setPhuong(phuong);
//                newNhaTro.setLat(String.valueOf(latitude));
//                newNhaTro.setLng(String.valueOf(longitude));
//                newNhaTro.setTrangThaiDuyet("Chờ duyệt");
//
//                // Lấy người dùng theo userID
//                Optional<NguoiDung> optionalNguoiDung = nguoiDungRepository.findById(userID);
//                if (optionalNguoiDung.isPresent()) {
//                    newNhaTro.setNguoiDung(optionalNguoiDung.get());
//                } else {
//                    return ResponseEntity.status(404).body("{\"error\": \"Người dùng không tồn tại!\"}");
//                }
//
//                nhaTroRepository.save(newNhaTro);
//
//                // Tạo thư mục để lưu ảnh nếu chưa có
//                String uploadDir = "src/main/resources/static/img/";
//                File uploadFolder = new File(uploadDir);
//                if (!uploadFolder.exists()) {
//                    uploadFolder.mkdirs();
//                }
//
//                // Duyệt qua danh sách file ảnh
//                for (MultipartFile image : images) {
//                    // Tạo đối tượng HinhAnh và lưu để có ID
//                    HinhAnh hinhAnh = new HinhAnh();
//                    hinhAnh.setNhaTro(newNhaTro);
//                    hinhAnhRepository.save(hinhAnh); // Lưu để lấy ID
//
//                    // Lấy ID của HinhAnh
//                    int hinhAnhId = hinhAnh.getMaHA();
//
//                    // Lấy phần mở rộng của file ảnh
//                    String fileExtension = Objects.requireNonNull(image.getOriginalFilename()).substring(image.getOriginalFilename().lastIndexOf("."));
//
//                    // Tạo tên file dựa trên ID của HinhAnh
//                    String fileName = "img" + hinhAnhId + fileExtension;
//
//                    // Tạo đường dẫn tuyệt đối
//                    Path filePath = Paths.get(uploadDir, fileName);
//
//                    // Lưu file vào thư mục
//                    try {
//                        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
//                    } catch (IOException e) {
//                        e.printStackTrace();
//                        return ResponseEntity.status(500).body(e.getMessage());
//                    }
//
//                    // Cập nhật lại URL ảnh trong cơ sở dữ liệu
//                    hinhAnh.setUrl(fileName);  // Lưu đường dẫn ảnh (relative path)
//                    hinhAnhRepository.save(hinhAnh);  // Cập nhật lại HinhAnh sau khi có tên file
//                }
//
//                return ResponseEntity.ok("{\"message\": \"Nhà trọ đã được thêm thành công!\"}");
//
//            } catch (Exception e) {
//                e.printStackTrace();
//                return ResponseEntity.status(500).body(e.getMessage());
//            }
//        }

        @PostMapping(path = "/addNhaTro")
        public ResponseEntity<String> addNhaTro(
                @RequestParam Map<String, String> params,
                @RequestParam("images") List<MultipartFile> images) {

            try {
                // Tạo mới đối tượng NhaTro
                NhaTro newNhaTro = new NhaTro();
                newNhaTro.setDiaChi(params.get("diachi"));
                newNhaTro.setTenTro(params.get("tentro"));
                newNhaTro.setDienTich(Float.parseFloat(params.get("dientich")));
                newNhaTro.setTrangThai(params.get("trangthai"));
                newNhaTro.setGiaPhong(Double.parseDouble(params.get("giaphong")));
                newNhaTro.setGiaDien(Double.parseDouble(params.get("giadien")));
                newNhaTro.setGiaNuoc(Double.parseDouble(params.get("gianuoc")));
                newNhaTro.setTienIch(params.get("tienich"));
                newNhaTro.setMoTa(params.get("mota"));
                newNhaTro.setTinh(params.get("tinh"));
                newNhaTro.setQuan(params.get("quan"));
                newNhaTro.setPhuong(params.get("phuong"));
                newNhaTro.setLat(params.get("latitude"));
                newNhaTro.setLng(params.get("longitude"));
                newNhaTro.setTrangThaiDuyet("Chờ duyệt");

                // Lấy người dùng theo userID
                int userID = Integer.parseInt(params.get("userID"));
                Optional<NguoiDung> optionalNguoiDung = nguoiDungRepository.findById(userID);
                if (optionalNguoiDung.isPresent()) {
                    newNhaTro.setNguoiDung(optionalNguoiDung.get());
                } else {
                    return ResponseEntity.status(404).body("{\"error\": \"Người dùng không tồn tại!\"}");
                }

                nhaTroRepository.save(newNhaTro);
                // Tạo thư mục để lưu ảnh nếu chưa có
                String uploadDir = "src/main/resources/static/img/";
                File uploadFolder = new File(uploadDir);
                if (!uploadFolder.exists()) {
                    uploadFolder.mkdirs();
                }

                // Duyệt qua danh sách file ảnh
                for (MultipartFile image : images) {
                    // Tạo đối tượng HinhAnh và lưu để có ID
                    HinhAnh hinhAnh = new HinhAnh();
                    hinhAnh.setNhaTro(newNhaTro);
                    hinhAnhRepository.save(hinhAnh); // Lưu để lấy ID

                    // Lấy ID của HinhAnh
                    int hinhAnhId = hinhAnh.getMaHA();

                    // Lấy phần mở rộng của file ảnh
                    String fileExtension = Objects.requireNonNull(image.getOriginalFilename()).substring(image.getOriginalFilename().lastIndexOf("."));

                    // Tạo tên file dựa trên ID của HinhAnh
                    String fileName = "img" + hinhAnhId + fileExtension;

                    // Tạo đường dẫn tuyệt đối
                    Path filePath = Paths.get(uploadDir, fileName);

                    // Lưu file vào thư mục
                    try {
                        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                    } catch (IOException e) {
                        e.printStackTrace();
                        return ResponseEntity.status(500).body(e.getMessage());
                    }

                    // Cập nhật lại URL ảnh trong cơ sở dữ liệu
                    hinhAnh.setUrl(fileName);  // Lưu đường dẫn ảnh (relative path)
                    hinhAnhRepository.save(hinhAnh);  // Cập nhật lại HinhAnh sau khi có tên file
                }

                return ResponseEntity.ok("{\"message\": \"Nhà trọ đã được thêm thành công!\"}");

            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body(e.getMessage());
            }
        }

        @PostMapping(path = "/editNhaTro")
        public ResponseEntity<String> editNhaTro(
                @RequestParam(value = "images", required = false) List<MultipartFile> images,
                @RequestParam("deletedImages") List<String> deletedImages,
                @RequestParam Map<String, String> params
        )
        {
            try {
                // Lấy ID của nhà trọ từ params
                int maNT = Integer.parseInt(params.get("maNT"));

                // Tìm nhà trọ theo ID
                Optional<NhaTro> optionalNhaTro = nhaTroRepository.findById(maNT);
                if (optionalNhaTro.isPresent()) {
                    NhaTro existingNhaTro = optionalNhaTro.get();

                    // Cập nhật thông tin nhà trọ từ params
                    existingNhaTro.setDiaChi(params.get("diachi"));
                    existingNhaTro.setTenTro(params.get("tentro"));
                    existingNhaTro.setDienTich(Float.parseFloat(params.get("dientich")));
                    existingNhaTro.setTrangThai(params.get("trangthai"));
                    existingNhaTro.setTrangThaiDuyet("Chờ duyệt");
                    existingNhaTro.setGiaPhong(Double.parseDouble(params.get("giaphong")));
                    existingNhaTro.setGiaDien(Double.parseDouble(params.get("giadien")));
                    existingNhaTro.setGiaNuoc(Double.parseDouble(params.get("gianuoc")));
                    existingNhaTro.setTienIch(params.get("tienich"));
                    existingNhaTro.setMoTa(params.get("mota"));
                    existingNhaTro.setTinh(params.get("tinh"));
                    existingNhaTro.setQuan(params.get("quan"));
                    existingNhaTro.setPhuong(params.get("phuong"));
                    existingNhaTro.setLat(params.get("latitude"));
                    existingNhaTro.setLng(params.get("longitude"));

                    nhaTroRepository.save(existingNhaTro); // Lưu thay đổi


                    // Xử lý ảnh: xóa ảnh cũ (nếu cần) và lưu ảnh mới
                    String uploadDir = "src/main/resources/static/img/";
                    File uploadFolder = new File(uploadDir);
                    if (!uploadFolder.exists()) {
                        uploadFolder.mkdirs();
                    }

                    if (images != null && !images.isEmpty()) {
                        for (MultipartFile image : images) {
                            if (image.isEmpty()) {
                                continue;
                            }

                            HinhAnh hinhAnh = new HinhAnh();
                            hinhAnh.setNhaTro(existingNhaTro);
                            hinhAnhRepository.save(hinhAnh);
                            int hinhAnhId = hinhAnh.getMaHA();

                            String fileExtension = Objects.requireNonNull(image.getOriginalFilename()).substring(image.getOriginalFilename().lastIndexOf("."));
                            String fileName = "img" + hinhAnhId + fileExtension;
                            Path filePath = Paths.get(uploadDir, fileName);

                            try {
                                Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                            } catch (IOException e) {
                                e.printStackTrace();
                                return ResponseEntity.status(500).body(e.getMessage());
                            }

                            hinhAnh.setUrl(fileName);
                            hinhAnhRepository.save(hinhAnh);
                        }
                    }

                    if (!deletedImages.isEmpty()) {
                        for (String imageUrl : deletedImages) {
                            File fileToDelete = new File(uploadDir + imageUrl);
                            if (fileToDelete.exists()) {
                                fileToDelete.delete();
                            }
                            hinhAnhRepository.deleteByUrl(imageUrl);

                        }
                    }

                    return ResponseEntity.ok("{\"message\": \"Nhà trọ đã được sửa thành công!\"}");

                } else {
                    return ResponseEntity.status(404).body("{\"error\": \"Nhà trọ không tồn tại!\"}");
                }

            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body(e.getMessage());
            }
        }


        @PostMapping(path = "/deleteNhaTro")
        public ResponseEntity<String> deleteNhaTro(@RequestParam("maNT") int maNT){
            try{

                // Lấy danh sách hình ảnh liên quan
                List<HinhAnh> imagesToDelete = hinhAnhRepository.findByNhaTroMaNT(maNT);

                // Xóa các hình ảnh và tệp tương ứng
                for (HinhAnh image : imagesToDelete) {
                    try {
                        Path filePath = Paths.get("src/main/resources/static/img/" + image.getUrl());
                        Files.deleteIfExists(filePath);
                        hinhAnhRepository.delete(image); // Xóa hình ảnh khỏi cơ sở dữ liệu
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }

                Optional<NhaTro> deleteNhaTro = nhaTroRepository.findById(maNT);
                if (deleteNhaTro.isPresent()) {
                    nhaTroRepository.delete(deleteNhaTro.get());
                    return ResponseEntity.ok("{\"message\": \"Nhà trọ đã được xóa\"}");
                } else {
                    return ResponseEntity.status(404).body("{\"message\": \"Không tìm thấy nhà trọ với mã này\"}");
                }
            }
            catch (Exception e){
                e.printStackTrace();
                return ResponseEntity.status(500).body("{\"error\": \"" + e.getMessage() + "\"}");
            }
        }

        @PostMapping(path = "/approveNhaTro")
        public ResponseEntity<String> approveNhaTro(@RequestParam("maNT") int maNT) {
            try {
                Optional<NhaTro> nhaTroOptional = nhaTroRepository.findById(maNT);
                if (nhaTroOptional.isPresent()) {
                    NhaTro nhaTro = nhaTroOptional.get();

                    nhaTro.setTrangThaiDuyet("Đã duyệt");

                    nhaTroRepository.save(nhaTro);

                    return ResponseEntity.ok("{\"message\": \"Nhà trọ đã được duyệt\"}");
                } else {
                    return ResponseEntity.status(404).body("{\"message\": \"Không tìm thấy nhà trọ với mã này\"}");
                }
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("{\"error\": \"" + e.getMessage() + "\"}");
            }
        }

        @PostMapping(path = "/unapproveNhaTro")
        public ResponseEntity<String> unapproveNhaTro(@RequestParam("maNT") int maNT) {
            try {
                Optional<NhaTro> nhaTroOptional = nhaTroRepository.findById(maNT);
                if (nhaTroOptional.isPresent()) {
                    NhaTro nhaTro = nhaTroOptional.get();

                    nhaTro.setTrangThaiDuyet("Không duyệt");

                    nhaTroRepository.save(nhaTro);

                    return ResponseEntity.ok("{\"message\": \"Đã không duyệt nhà trọ\"}");
                } else {
                    return ResponseEntity.status(404).body("{\"message\": \"Không tìm thấy nhà trọ với mã này\"}");
                }
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("{\"error\": \"" + e.getMessage() + "\"}");
            }
        }
//        @PostMapping(path = "/searchNhaTro")
//        public @ResponseBody List<NhaTroDTO> searchNhaTro(@RequestBody Map<String, String> criteria) {
//            Collection<NhaTro> dsNhaTro = nhaTroRepository.findByTrangThaiDuyet("Đã duyệt");
//
//            // Lấy tiêu chí tìm kiếm từ Map
//            String ten = criteria.get("ten");
//            String phuong = criteria.get("phuong");
//            String gia = criteria.get("gia");
//
//            // Kiểm tra tiêu chí tên
//            if (ten != null && !ten.isEmpty()) {
//                dsNhaTro = dsNhaTro.stream()
//                        .filter(nt -> nt.getTenTro().toLowerCase().contains(ten.toLowerCase()))
//                        .collect(Collectors.toList());
//            }
//
//            // Kiểm tra tiêu chí phường
//            if (phuong != null && !phuong.equals("Phường/Xã")) {
//                dsNhaTro = dsNhaTro.stream()
//                        .filter(nt -> nt.getPhuong().toLowerCase().contains(phuong.toLowerCase()))
//                        .collect(Collectors.toList());
//            }
//
//            // Kiểm tra tiêu chí giá
//            if (gia != null) {
//                int giaInt = Integer.parseInt(gia);
//                switch (giaInt) {
//                    case 1:
//                        dsNhaTro = dsNhaTro.stream()
//                                .filter(nt -> nt.getGiaPhong() < 1000000)
//                                .collect(Collectors.toList());
//                        break;
//                    case 2:
//                        dsNhaTro = dsNhaTro.stream()
//                                .filter(nt -> nt.getGiaPhong() >= 1000000 && nt.getGiaPhong() < 2000000)
//                                .collect(Collectors.toList());
//                        break;
//                    case 3:
//                        dsNhaTro = dsNhaTro.stream()
//                                .filter(nt -> nt.getGiaPhong() >= 2000000)
//                                .collect(Collectors.toList());
//                        break;
//                }
//            }
//
//            // Chuyển đổi sang DTO và sắp xếp theo maNT giảm dần
//            return dsNhaTro.stream()
//                    .sorted(Comparator.comparingInt(NhaTro::getMaNT).reversed())
//                    .map(nt -> {
//                        NhaTroDTO dto = new NhaTroDTO();
//                        dto.setMaNT(nt.getMaNT());
//                        dto.setTenTro(nt.getTenTro());
//                        dto.setDiaChi(nt.getDiaChi());
//                        dto.setDienTich(nt.getDienTich());
//                        dto.setGiaPhong(nt.getGiaPhong());
//                        dto.setTinh(nt.getTinh());
//                        dto.setQuan(nt.getQuan());
//                        dto.setPhuong(nt.getPhuong());
//
//                        List<HinhAnh> hinhAnhs = hinhAnhRepository.findByNhaTro(nt);
//                        dto.setHinhAnh(hinhAnhs);
//                        return dto;
//                    })
//                    .collect(Collectors.toList());
//        }
    }

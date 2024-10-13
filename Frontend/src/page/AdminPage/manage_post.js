import { useState, useEffect } from 'react';
import style from './style.module.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';

import { Autoplay, Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules'; // Thêm Thumbs
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

function ManagePostPage() {


    const navigate = useNavigate();

    useEffect(() => {
        const maND = sessionStorage.getItem('maND');

        if (!maND) {
            navigate('/login');
        }
    }, []);

    const [danhSachNhaTro, setDanhSachNhaTro] = useState([])
    const [editHostel, setEditHostel] = useState(null);
    const [deleteHostel, setDeleteHostel] = useState(null);

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);



    const [searchKeyword, setSearchKeyword] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [roomStatus, setRoomStatus] = useState("");
    const [sortBy, setSortBy] = useState("maNT");


    const filteredDanhSachNhaTro = danhSachNhaTro.filter(nt => {
        const matchesKeyword = nt.tenTro.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            nt.nguoiDung.tenND.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            nt.diaChi.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            nt.phuong.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            nt.quan.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            nt.tinh.toLowerCase().includes(searchKeyword.toLowerCase());

        const matchesPrice = priceRange === "under1" ? nt.giaPhong < 1000000 :
            priceRange === "1to2" ? nt.giaPhong >= 1000000 && nt.giaPhong <= 2000000 :
                priceRange === "over2" ? nt.giaPhong > 2000000 :
                    true;

        const matchesStatus = statusFilter ? nt.trangThaiDuyet === statusFilter : true;

        const matchesRoomStatus = roomStatus ? nt.trangThai === roomStatus : true;

        return matchesKeyword && matchesPrice && matchesStatus && matchesRoomStatus;
    }).sort((a, b) => {
        if (sortBy === "maNT") return a.maNT - b.maNT;
        if (sortBy === "dienTich") return a.dienTich - b.dienTich;
        if (sortBy === "giaPhong") return a.giaPhong - b.giaPhong;
        return 0;
    });



    const fetchDataNhaTro = () => {

        fetch(`http://localhost:8080/nhatro/getAllNhaTro?timestamp=${new Date().getTime()}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const sortedData = data.sort((a, b) => {
                        // Ưu tiên "Chờ duyệt" trước
                        if (a.trangThaiDuyet === 'Chờ duyệt' && b.trangThaiDuyet !== 'Chờ duyệt') {
                            return -1;
                        }
                        if (a.trangThaiDuyet !== 'Chờ duyệt' && b.trangThaiDuyet === 'Chờ duyệt') {
                            return 1;
                        }
                        // Đưa "Không duyệt" xuống cuối
                        if (a.trangThaiDuyet === 'Không duyệt' && b.trangThaiDuyet !== 'Không duyệt') {
                            return 1;
                        }
                        if (a.trangThaiDuyet !== 'Không duyệt' && b.trangThaiDuyet === 'Không duyệt') {
                            return -1;
                        }
                        // Sắp xếp theo maNT
                        return a.maNT - b.maNT;
                    });
                    setDanhSachNhaTro(sortedData);
                }
            })
            .catch(error => {
                console.error('Error fetching houses:', error);
            });
    };

    useEffect(() => {
        fetchDataNhaTro();
    }, [editHostel, deleteHostel]);



    const handleShowApproveModal = (nt) => {
        setEditHostel(nt);
        setShowEdit(true)
    };

    const handleCloseApproveModal = () => {
        setEditHostel();
        setShowEdit(false);
        setThumbsSwiper();
        // setSelectedTinh();
        // setSelectedQuan();
        // setSelectedPhuong();
    }

    const handleShowDeleteModal = (nt) => {
        setDeleteHostel(nt);
        setShowDelete(true)
    };

    const handleCloseDeleteModal = () => {
        setDeleteHostel();
        setShowDelete(false);

    }

    const handleApprove = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/nhatro/approveNhaTro?maNT=${editHostel.maNT}`, {
                method: 'POST'
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                handleCloseApproveModal();
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Đã xảy ra lỗi!");

            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Đã xảy ra lỗi khi xóa nhà trọ");

        }
    };

    const handleUnapprove = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/nhatro/unapproveNhaTro?maNT=${editHostel.maNT}`, {
                method: 'POST'
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                handleCloseApproveModal();
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Đã xảy ra lỗi!");

            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Đã xảy ra lỗi khi xóa nhà trọ");

        }
    };



    const handleDeleteHostel = async () => {
        try {
            const response = await fetch(`http://localhost:8080/nhatro/deleteNhaTro?maNT=${deleteHostel}`, {
                method: 'POST'
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                handleCloseDeleteModal();
            } else {
                const errorData = await response.json();
                // alert(errorData.message || "Đã xảy ra lỗi!"); // Hiển thị lỗi nếu có
                toast.error(errorData.message || "Đã xảy ra lỗi!");

            }
        } catch (error) {
            console.error("Error:", error);
            // alert("Đã xảy ra lỗi khi xóa nhà trọ");
            toast.error("Đã xảy ra lỗi khi xóa nhà trọ");

        }
    }

    return (
        <>
            <div className={style.content_container}>
                <h1>Quản lý bài đăng</h1>
                <hr />

                <div className={style.filter_section}>
                    <input
                        type="text"
                        placeholder="Nhập thông tin..."
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className={style.search_input}
                    />

                    <select onChange={(e) => setPriceRange(e.target.value)} className={style.filter_input}>
                        <option value="">Chọn tầm giá</option>
                        <option value="under1">Dưới 1 triệu</option>
                        <option value="1to2">Từ 1 - 2 triệu</option>
                        <option value="over2">Trên 2 triệu</option>
                    </select>

                    <select onChange={(e) => setStatusFilter(e.target.value)} className={style.filter_input}>
                        <option value="">Chọn trạng thái duyệt</option>
                        <option value="Chờ duyệt">Chờ duyệt</option>
                        <option value="Đã duyệt">Đã duyệt</option>
                        <option value="Không duyệt">Không duyệt</option>
                    </select>

                    <select onChange={(e) => setRoomStatus(e.target.value)} className={style.filter_input}>
                        <option value="">Chọn trạng thái phòng</option>
                        <option value="Còn phòng">Còn phòng</option>
                        <option value="Hết phòng">Hết phòng</option>
                    </select>

                    <select onChange={(e) => setSortBy(e.target.value)} className={style.sort_input}>
                        <option value="maNT">Sắp xếp mặc định</option>
                        <option value="dienTich">Sắp xếp theo diện tích</option>
                        <option value="giaPhong">Sắp xếp theo giá</option>
                    </select>
                </div>



                <table className={style.table_nt}>
                    <thead>
                        <tr className={style.table_header}>
                            {/* <th>ID</th> */}
                            <th>Người đăng</th>
                            <th>Tên trọ</th>
                            <th>Địa chỉ</th>
                            <th>Diện tích</th>
                            <th>Giá cho thuê</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody className={style.table_body}>

                        {filteredDanhSachNhaTro.map(nt => (
                            <tr key={nt.maNT} className={style.table_row}>
                                <td className={style.table_column} id={style.col1}>
                                    <div className={style.user_box}>
                                        <div>
                                            {/* <img alt='Ảnh người dùng' src={`http://localhost:8080/img/${nt.nguoiDung.hinhND}`} className={style.user_box_img}></img> */}
                                            <img alt='Ảnh người dùng' src={`http://localhost:8080/img/${nt.nguoiDung.hinhND}`} className={style.user_box_img}
                                                onError={(e) => { e.target.src = require('../../Assets/img/user_img.png'); }}
                                            ></img>
                                        </div>
                                        <div className={style.user_box_info}>
                                            <span className={style.user_box_info_name} title={nt.nguoiDung.tenND}>{nt.nguoiDung.tenND}</span>
                                            <span>{nt.nguoiDung.sdt}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className={style.table_column} id={style.col2}>
                                    {nt.tenTro}
                                </td>
                                <td className={style.table_column} id={style.col3} title={`${nt.diaChi}, ${nt.phuong}, ${nt.quan}, ${nt.tinh}`}>
                                    {`${nt.diaChi}, ${nt.phuong}, ${nt.quan}, ${nt.tinh}`}
                                </td>
                                <td className={style.table_column} id={style.col4}>
                                    {nt.dienTich} m²
                                </td>
                                <td className={style.table_column} id={style.col5}>
                                    {nt.giaPhong.toLocaleString('vi-VN')} VND
                                </td>
                                <td className={style.table_column} id={style.col6}>
                                    {nt.trangThaiDuyet === "Chờ duyệt" ? (
                                        <p className={style.pending}>{nt.trangThaiDuyet}</p>
                                    ) : nt.trangThaiDuyet === "Không duyệt" ? (
                                        <p className={style.unapprove}>{nt.trangThaiDuyet}</p>
                                    )
                                        : nt.trangThai === "Còn phòng" ? (
                                            <p className={style.available}>{nt.trangThai}</p>
                                        ) : (
                                            <p className={style.unavailable}>{nt.trangThai}</p>
                                        )}
                                </td>
                                <td className={style.table_column} id={style.col7}>
                                    <div className={style.check_button}>
                                        <i className={`bi bi-check-square-fill ${nt.trangThaiDuyet !== 'Chờ duyệt' ? style.disabled : ''}`}
                                            onClick={() => handleShowApproveModal(nt)}
                                        ></i>

                                    </div>
                                    <div className={style.delete_button}
                                        onClick={() => handleShowDeleteModal(nt.maNT)}
                                    >
                                        <i className="bi bi-trash-fill"></i>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showEdit && editHostel && (
                <div className={style.approve_modal}>
                    <div className={style.modal_container}>

                        <div className={style.image_content}>
                            <div className="card-wrapper">
                                <div className="card" >
                                    <Swiper
                                        thumbs={{ swiper: thumbsSwiper }}
                                        loop={true}
                                        spaceBetween={10}
                                        navigation={true}
                                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                                        modules={[FreeMode, Autoplay, Pagination, Navigation, Thumbs]}
                                        className="mySwiper2"
                                    >
                                        {editHostel.hinhAnh && editHostel.hinhAnh.map((hinh, index) => (
                                            <SwiperSlide key={index} style={{ height: '350px', paddingTop: '10px' }}>
                                                <img className="image-fit" src={`http://localhost:8080/img/${hinh.url}`} alt={`Slide ${index}`} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        spaceBetween={10}
                                        slidesPerView={5}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        pagination={{ clickable: true }}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="mySwiper"
                                    >
                                        {editHostel.hinhAnh && editHostel.hinhAnh.map((hinh, index) => (
                                            <SwiperSlide key={index} className={style.img_item}>
                                                <img src={`http://localhost:8080/img/${hinh.url}`} alt={`Thumbnail ${index}`} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>

                        <div className={style.close_btn}
                            onClick={handleCloseApproveModal}
                        >
                            <i className="bi bi-x-lg"></i>
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <h4>Địa chỉ:</h4>
                            <input className={style.info} type="text" name="diachi"
                                // ref={diaChiRef}
                                value={`${editHostel.diaChi}, ${editHostel.phuong}, ${editHostel.quan}, ${editHostel.tinh}`}
                                disabled />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '30px' }}>
                            <div style={{ width: '100%' }}>
                                <h4>Tên trọ:</h4>
                                <input className={style.info} type="text" name="diachi"
                                    // ref={diaChiRef}
                                    value={editHostel.tenTro}
                                    disabled />
                            </div>
                            <div style={{ width: '100%' }}>
                                <h4>Diện tích (m²):</h4>
                                <input className={style.info} type="text" name="diachi"
                                    // ref={diaChiRef}
                                    value={editHostel.dienTich}
                                    disabled />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '30px' }}>
                            <div style={{ width: '100%' }}>
                                <h4>Trạng thái phòng:</h4>
                                <input className={style.info} type="text" name="diachi"
                                    // ref={diaChiRef}
                                    value={editHostel.trangThai}
                                    disabled />
                            </div>
                            <div style={{ width: '100%' }}>
                                <h4>Giá phòng (VND):</h4>
                                <input className={style.info} type="text" name="diachi"
                                    // ref={diaChiRef}
                                    value={editHostel.giaPhong}
                                    disabled />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '30px' }}>
                            <div style={{ width: '100%' }}>
                                <h4>Giá điện (VND):</h4>
                                <input className={style.info} type="text" name="diachi"
                                    // ref={diaChiRef}
                                    value={editHostel.giaDien}
                                    disabled />
                            </div>
                            <div style={{ width: '100%' }}>
                                <h4>Giá nước (VND):</h4>
                                <input className={style.info} type="text" name="diachi"
                                    // ref={diaChiRef}
                                    value={editHostel.giaNuoc}
                                    disabled />
                            </div>
                        </div>

                        <div>
                            <h4>Tiện ích:</h4>
                            <textarea className={style.info} type="text" name="diachi" style={{ minHeight: '100px', resize: 'vertical' }}
                                // ref={diaChiRef}
                                value={editHostel.tienIch}
                                disabled />
                        </div>
                        <div>
                            <h4>Mô tả:</h4>
                            <textarea className={style.info} type="text" name="diachi" style={{ minHeight: '100px', resize: 'vertical' }}
                                // ref={diaChiRef}
                                value={editHostel.moTa}
                                disabled />
                        </div>


                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '30px' }}>
                            <button type="submit" className={style.approve_button} onClick={handleApprove}>
                                Duyệt
                            </button>

                            <button type="submit" className={style.unapproved_button}
                                onClick={handleUnapprove}
                            >
                                Không duyệt
                            </button>
                        </div>
                    </div>
                </div >
            )
            }
            {showDelete && deleteHostel && (
                <div className={style.modal_confirm}>
                    <div className={style.modal_confirm_container}>
                        <i className={`bi bi-x-lg ${style.closeIcon}`}
                            onClick={handleCloseDeleteModal}
                        ></i>
                        <h2 className={style.modal_header}>Thông báo</h2>
                        <h3 className={style.modal_msg}>Bạn muốn xóa nhà trọ?</h3>
                        <div className={style.btn_box}>
                            <div className={style.modal_btn} id={style.btn_confirm}
                                onClick={handleDeleteHostel}
                            >
                                Xóa
                            </div>
                            <div className={style.modal_btn} id={style.btn_close}
                                onClick={handleCloseDeleteModal}
                            >
                                Thoát
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ManagePostPage;

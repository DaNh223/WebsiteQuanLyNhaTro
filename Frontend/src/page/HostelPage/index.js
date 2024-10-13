import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.css'

function HostelPage() {
    const [tinhThanh, setTinhThanh] = useState([]);
    const [quanHuyen, setQuanHuyen] = useState([]);
    const [phuongXa, setPhuongXa] = useState([]);
    const [selectedTinh, setSelectedTinh] = useState(null);
    const [selectedQuan, setSelectedQuan] = useState(null);
    const [selectedPhuong, setSelectedPhuong] = useState(0);
    const [danhSachNhaTro, setDanhSachNhaTro] = useState([]);
    const [filteredNhaTro, setFilteredNhaTro] = useState(danhSachNhaTro);
    const [tenTro, setTenTro] = useState('');
    const [gia, setGia] = useState(0);
    const [hoveredItem, setHoveredItem] = useState(null);

    const phuongRef = useRef();

    // Lấy dữ liệu tỉnh thành
    useEffect(() => {
        fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then(response => response.json())
            .then(data => {
                if (data.error === 0) {
                    setTinhThanh(data.data);
                    const defaultTinh = data.data.find(tinh => tinh.full_name === 'Tỉnh Đồng Tháp');
                    setSelectedTinh(defaultTinh ? defaultTinh.id : null);
                }
            })
            .catch(error => {
                console.error('Error fetching provinces:', error);
            });
    }, []);

    // Lấy dữ liệu quận khi tỉnh thay đổi
    useEffect(() => {
        if (selectedTinh) {
            fetch(`https://esgoo.net/api-tinhthanh/2/${selectedTinh}.htm`)
                .then(response => response.json())
                .then(data => {
                    if (data.error === 0) {
                        setQuanHuyen(data.data);
                        const defaultQuan = data.data.find(quan => quan.full_name === "Thành phố Cao Lãnh");
                        setSelectedQuan(defaultQuan ? defaultQuan.id : null);
                        setPhuongXa([]); // Reset phường khi tỉnh thay đổi
                    }
                })
                .catch(error => {
                    console.error('Error fetching districts:', error);
                });
        }
    }, [selectedTinh]);

    // Lấy dữ liệu phường khi quận thay đổi
    useEffect(() => {
        if (selectedQuan) {
            fetch(`https://esgoo.net/api-tinhthanh/3/${selectedQuan}.htm`)
                .then(response => response.json())
                .then(data => {
                    if (data.error === 0) {
                        setPhuongXa(data.data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching wards:', error);
                });
        }
    }, [selectedQuan]);

    // Lấy dữ liệu nhà trọ
    useEffect(() => {
        fetch('http://localhost:8080/nhatro/getActiveNhaTro', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setDanhSachNhaTro(data);
                    setFilteredNhaTro(data);
                }
            })
            .catch(error => {
                console.error('Error fetching houses:', error);
            });
    }, []);

    const handleSearch = () => {
        const phuong = phuongRef.current.options[phuongRef.current.selectedIndex].text;

        // Lọc danh sách nhà trọ dựa trên các tiêu chí
        const newFilteredNhaTro = danhSachNhaTro.filter(nt => {
            // Kiểm tra tiêu chí tên trọ
            const tenMatch = tenTro ? nt.tenTro.toLowerCase().includes(tenTro.toLowerCase()) : true;

            // Kiểm tra tiêu chí phường
            const phuongMatch = phuong && phuong !== "Phường/Xã" ? nt.phuong.toLowerCase().includes(phuong.toLowerCase()) : true;

            // Kiểm tra tiêu chí giá
            let giaMatch = true;
            if (gia === "1") {
                giaMatch = nt.giaPhong < 1000000;
            } else if (gia === "2") {
                giaMatch = nt.giaPhong >= 1000000 && nt.giaPhong < 2000000;
            } else if (gia === "3") {
                giaMatch = nt.giaPhong >= 2000000;
            }

            // Trả về kết quả sau khi lọc
            return tenMatch && phuongMatch && giaMatch;
        });

        console.log(danhSachNhaTro);
        console.log(newFilteredNhaTro);
        // Cập nhật danh sách nhà trọ đã lọc
        setFilteredNhaTro(newFilteredNhaTro);
    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'tenTro') {
            setTenTro(value);
        }
    };

    const handleTinhChange = (event) => {
        setSelectedTinh(event.target.value);
    };

    const handleQuanChange = (event) => {
        setSelectedQuan(event.target.value);
    };

    const handlePhuongChange = (event) => {
        setSelectedPhuong(event.target.value);
    };

    const handleGiaChange = (event) => {
        setGia(event.target.value);
    };

    return (
        <div className={style.browser}>
            <div className={style.browser_container}>
                <div className={style.search_form}>
                    <div className={style.search_block}>
                        <label htmlFor="tenTro">Nhập tên trọ</label>
                        <input
                            type="text"
                            name="tenTro"
                            id="tenTro"
                            value={tenTro}
                            onChange={handleInputChange}
                        />
                        <div
                            className={style.search_button}
                            onClick={handleSearch}
                        >
                            <p>TÌM KIẾM</p>
                        </div>
                    </div>
                    <div className={style.search_condition}>
                        <select name="tinh" id="tinh" className={style.select_TP} value={selectedTinh || ""} onChange={handleTinhChange} disabled>
                            <option value="">Chọn tỉnh</option>
                            {tinhThanh.map(tinh => (
                                <option key={tinh.id} value={tinh.id}>
                                    {tinh.full_name}
                                </option>
                            ))}
                        </select>

                        <select name="quan" id="quan" className={style.select_QH} value={selectedQuan || ""} onChange={handleQuanChange} disabled>
                            <option value="">Chọn quận/huyện</option>
                            {quanHuyen.map(quan => (
                                <option key={quan.id} value={quan.id}>
                                    {quan.full_name}
                                </option>
                            ))}
                        </select>

                        <select name="phuong" id="phuong" ref={phuongRef} value={selectedPhuong} className={style.select_PX} onChange={handlePhuongChange}>
                            <option value={0}>Phường/Xã</option>
                            {phuongXa.map(phuong => (
                                <option key={phuong.id} value={phuong.id}>
                                    {phuong.full_name}
                                </option>
                            ))}
                        </select>

                        <select name="gia" id="gia" className={style.select_Gia} onChange={handleGiaChange}>
                            <option value="0">Giá</option>
                            <option value="1">Dưới 1 triệu</option>
                            <option value="2">Từ 1 - 2 triệu</option>
                            <option value="3">Trên 2 triệu</option>
                        </select>
                    </div>
                </div>

                <div className={style.list_form}>
                    <div className={style.list_header}>
                        <h1>Thông tin nhà trọ</h1>
                    </div>

                    <div className={style.list_content}>
                        {filteredNhaTro.map(nt => (
                            // <div className={style.list_item} key={nt.maNT}>
                            <div className={`${style.list_item} ${hoveredItem === nt.maNT ? style.hovered : ''}`} key={nt.maNT}>
                                <input type="hidden" name="" />
                                {/* <a href="#" className={style.item}> */}
                                <Link to={`/detail/${nt.maNT}`} className={style.item}>
                                    <div className={style.item_img}>
                                        <img src={`http://localhost:8080/img/${nt.hinhAnh[0]?.url}`} alt="" />
                                    </div>
                                    <div className={style.item_info}>
                                        <h3>{nt.tenTro}</h3>
                                        <p>
                                            {nt.diaChi}, {nt.phuong}, {nt.quan}, {nt.tinh}
                                        </p>
                                        <div className={style.price_detail}>
                                            <h3>Giá từ: <span>{nt.giaPhong.toLocaleString('vi-VN')} VNĐ</span></h3>
                                            <h3>{nt.dienTich.toLocaleString('vi-VN')} m²</h3>
                                        </div>
                                    </div>
                                </Link>

                                <div className={style.more_detail}>

                                    <div className={style.detail_button}
                                        onMouseEnter={() => setHoveredItem(nt.maNT)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                    >
                                        <Link to={`/detail/${nt.maNT}`}>Xem chi tiết</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default HostelPage
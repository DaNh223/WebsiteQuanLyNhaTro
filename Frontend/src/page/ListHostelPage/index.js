import { useEffect, useState, useRef } from 'react';
import style from './style.module.css';
import { useNavigate } from 'react-router-dom';

import MapComponent from '../../component/MapComponent';
import { toast } from 'react-toastify';


function ListHostelPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const maND = sessionStorage.getItem('maND');

        if (!maND) {
            navigate('/login');
        }
    }, []);

    const [danhSachNhaTro, setDanhSachNhaTro] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [editHostel, setEditHostel] = useState(null);
    const [deleteHostel, setDeleteHostel] = useState(null);

    const [tinhThanh, setTinhThanh] = useState([]);
    const [quanHuyen, setQuanHuyen] = useState([]);
    const [phuongXa, setPhuongXa] = useState([]);
    const [selectedTinh, setSelectedTinh] = useState(null);
    const [selectedQuan, setSelectedQuan] = useState(null);
    const [selectedPhuong, setSelectedPhuong] = useState(0);
    const [mapLat, setMapLat] = useState(null);
    const [mapLon, setMapLon] = useState(null);
    const [mapPhuong, setMapPhuong] = useState('');
    const [mapDiachi, setMapDiachi] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [deletedFiles, setDeletedFiles] = useState([]);
    // const [formData, setFormData] = useState(new FormData());

    const tinhRef = useRef();
    const quanRef = useRef();
    const phuongRef = useRef();
    const diaChiRef = useRef();
    const tenTroRef = useRef();
    const dienTichRef = useRef();
    const trangThaiRef = useRef();
    const giaPhongRef = useRef();
    const giaDienRef = useRef();
    const giaNuocRef = useRef();
    const tienIchRef = useRef();
    const moTaRef = useRef();
    const fileRef = useRef();


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

    useEffect(() => {
        if (selectedPhuong) {
            fetch(`https://esgoo.net/api-tinhthanh/3/${selectedQuan}.htm`)
                .then(response => response.json())
                .then(dataPhuong => {
                    if (dataPhuong.error === 0) {
                        const phuong = dataPhuong.data.find(phuong => phuong.id === selectedPhuong);
                        if (phuong) {
                            let lat = parseFloat(phuong.latitude);
                            let lon = parseFloat(phuong.longitude);

                            if (!isNaN(lat) && !isNaN(lon)) {
                                setMapLat(lat);        // Cập nhật tọa độ lat cho bản đồ
                                setMapLon(lon);        // Cập nhật tọa độ lon cho bản đồ
                                setMapPhuong(phuong.full_name); // Cập nhật tên phường
                                setMapDiachi(diaChiRef.current.value); // Cập nhật địa chỉ

                            } else {
                                toast.error("Không có thông tin về vị trí của phường/xã.");
                            }
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching wards:', error);
                });
        }

    }, [selectedPhuong, selectedQuan]);



    // Thêm hàm fetchDataNhaTro
    const fetchDataNhaTro = () => {
        const maND = sessionStorage.getItem("maND")

        fetch(`http://localhost:8080/nhatro/getNhaTroByChuTro/${maND}?timestamp=${new Date().getTime()}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const sortedData = data.sort((a, b) => a.maNT - b.maNT);
                    setDanhSachNhaTro(sortedData);
                }
            })
            .catch(error => {
                console.error('Error fetching houses:', error);
            });
    };

    // Lấy dữ liệu nhà trọ và sắp xếp theo mã trọ tăng dần
    useEffect(() => {
        fetchDataNhaTro();
    }, []);

    // Show and hide the Edit Modal
    const handleShowEditModal = (nt) => {
        setEditHostel(nt);
        setShowEdit(true)
    };
    const handleCloseEditModal = () => {
        setEditHostel();
        setShowEdit(false);
        setSelectedTinh();
        setSelectedQuan();
        setSelectedPhuong();
    }

    // Show and hide the Delete Modal
    const handleShowDeleteModal = (maNT) => {
        setShowDelete(true);
        setDeleteHostel(maNT);
    };
    const handleCloseDeleteModal = () => {
        fetchDataNhaTro();
        setShowDelete(false);

    }


    const handleTinhChange = (event) => {
        setSelectedTinh(event.target.value);
    };

    const handleQuanChange = (event) => {
        setSelectedQuan(event.target.value);
    };

    const handlePhuongChange = (event) => {
        setSelectedPhuong(event.target.value);
    };

    const displaySelectedImages = () => {
        return selectedFiles.map((fileObject, index) => (
            <div key={index} className={style.image_container}>
                <img className={style.preview_image} src={fileObject.url} alt={`Preview ${index}`}
                    onClick={() => handleDeleteImage(index)}
                />
                <i
                    className={`bi bi-trash3-fill ${style.delete_icon}`}
                    onClick={() => handleDeleteImage(index)}
                ></i>
            </div>
        ));
    };

    const handleDeleteImage = (index) => {
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        const deletedFiles = selectedFiles[index].url.split('/').pop(); // Lưu thông tin ảnh đã xóa
        setSelectedFiles(updatedFiles);
        setDeletedFiles(prev => [...prev, deletedFiles]); // Hoặc dùng ID nếu có
        checkImg(updatedFiles);
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (selectedFiles.length + files.length > 5) {
            toast.error("Bạn chỉ có thể chọn tối đa 5 ảnh.");
            return;
        }

        const newFiles = files.map(file => {
            if (['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(file.type)) {
                return {
                    file,
                    url: URL.createObjectURL(file),
                    isEdited: true,
                };
            } else {
                toast.error("Vui lòng chỉ chọn file PNG, JPEG, JPG, hoặc GIF.");
                return null;
            }
        }).filter(fileObject => fileObject !== null);

        setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
        checkImg([...selectedFiles, ...newFiles]);
        event.target.value = null;
    };

    const checkImg = (files) => {
        if (files.length >= 5) {
            fileRef.current.style.backgroundColor = 'var(--gray_color)';
            fileRef.current.style.cursor = 'default';
            fileRef.current.style.pointerEvents = 'none';
        } else {
            fileRef.current.style.backgroundColor = 'var(--blue_color)';
            fileRef.current.style.cursor = 'pointer';
            fileRef.current.style.pointerEvents = 'all';
        }
    };



    useEffect(() => {
        if (editHostel) {
            diaChiRef.current.value = editHostel.diaChi;

            const selectedTinhText = editHostel.tinh;
            const selectedQuanText = editHostel.quan;
            const selectedPhuongText = editHostel.phuong;

            const selectedTinhOption = tinhThanh.find(tinh => tinh.full_name === selectedTinhText);
            if (selectedTinhOption) {
                tinhRef.current.value = selectedTinhOption.id;
                setSelectedTinh(selectedTinhOption.id)
            }

            const selectedQuanOption = quanHuyen.find(quan => quan.full_name === selectedQuanText);
            if (selectedQuanOption) {
                quanRef.current.value = selectedQuanOption.id;
                setSelectedQuan(selectedQuanOption.id)
            }

            const selectedPhuongOption = phuongXa.find(phuong => phuong.full_name === selectedPhuongText);
            if (selectedPhuongOption) {
                phuongRef.current.value = selectedPhuongOption.id;
                setSelectedPhuong(selectedPhuongOption.id)
            }

            const selectedTrangThaiOption = Array.from(trangThaiRef.current.options).find(option => option.text === editHostel.trangThai);
            if (selectedTrangThaiOption) {
                trangThaiRef.current.value = selectedTrangThaiOption.value;
            }

            tenTroRef.current.value = editHostel.tenTro;
            dienTichRef.current.value = editHostel.dienTich;
            giaPhongRef.current.value = editHostel.giaPhong;
            giaDienRef.current.value = editHostel.giaDien;
            giaNuocRef.current.value = editHostel.giaNuoc;
            tienIchRef.current.value = editHostel.tienIch;
            moTaRef.current.value = editHostel.moTa;

            const images = editHostel.hinhAnh.map(image => ({
                url: `http://localhost:8080/img/${image.url}`,
                file: null
            }));
            setSelectedFiles(images);
            checkImg(images);

            setMapLat(editHostel.latitude); // Assuming latitude is a field in editHostel
            setMapLon(editHostel.longitude); // Ass uming longitude is a field in editHostel

        }
    }, [editHostel, phuongXa, quanHuyen, tinhThanh]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (selectedPhuong === 0) {
            toast.error("Vui lòng chọn Phường/Xã");
            phuongRef.current.focus();
            return;
        }
        if (trangThaiRef.current.value === "0") {
            toast.error("Vui lòng chọn trạng thái");

            trangThaiRef.current.focus();
            return;
        }
        if (selectedFiles.length <= 0) {
            toast.error("Vui lòng thêm ảnh");
            fileRef.current.focus();
            return;
        }

        const trangThai = trangThaiRef.current.options[trangThaiRef.current.selectedIndex].text;
        const tinh = tinhRef.current.options[tinhRef.current.selectedIndex].text;
        const quan = quanRef.current.options[quanRef.current.selectedIndex].text;
        const phuong = phuongRef.current.options[phuongRef.current.selectedIndex].text;

        const maNT = editHostel.maNT;

        const formData = new FormData();
        formData.append('maNT', maNT);
        formData.append('diachi', diaChiRef.current.value);
        formData.append('tentro', tenTroRef.current.value);
        formData.append('dientich', dienTichRef.current.value);
        formData.append('trangthai', trangThai);
        formData.append('giaphong', giaPhongRef.current.value);
        formData.append('giadien', giaDienRef.current.value);
        formData.append('gianuoc', giaNuocRef.current.value);
        formData.append('tienich', tienIchRef.current.value);
        formData.append('mota', moTaRef.current.value);
        formData.append('tinh', tinh);
        formData.append('quan', quan);
        formData.append('phuong', phuong);
        formData.append('latitude', mapLat);
        formData.append('longitude', mapLon);

        formData.append('userID', 1)

        selectedFiles.forEach((fileObject, index) => {
            if (fileObject.isEdited) {
                formData.append('images', fileObject.file);
            }
            else {
                formData.append('images', new Blob());
            }
        });

        if (deletedFiles.length > 0) {
            deletedFiles.forEach(deletedUrl => {
                formData.append('deletedImages', deletedUrl);
            });
        } else {
            formData.append('deletedImages', null);
        }

        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}: ${value.name}, ${value.type}, ${value.size} bytes`);
            } else {
                console.log(`${key}: ${value}`);
            }
        }

        try {
            const response = await fetch(`http://localhost:8080/nhatro/editNhaTro`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                toast.success("Đăng tin thành công!");
                fetchDataNhaTro();
                setEditHostel();
                handleCloseEditModal(); // Đóng modal sau khi cập nhật


            } else {
                toast.error("Có lỗi xảy ra khi đăng tin. Vui lòng thử lại.");

                console.log(response);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // alert('Có lỗi xảy ra. Vui lòng thử lại.');
            toast.error("Có lỗi xảy ra. Vui lòng thử lại.");

        }
    };

    const handleDeleteHostel = async () => {
        try {
            const response = await fetch(`http://localhost:8080/nhatro/deleteNhaTro?maNT=${deleteHostel}`, {
                method: 'POST'
            });

            if (response.ok) {
                const data = await response.json();
                // alert(data.message);
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
                <h1>Danh sách nhà trọ</h1>
                <hr />
                <table className={style.table_nt}>
                    <thead>
                        <tr className={style.table_header}>
                            <th>Mã trọ</th>
                            <th>Tên trọ</th>
                            <th>Địa chỉ</th>
                            <th>Diện tích</th>
                            <th>Giá cho thuê</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody className={style.table_body}>
                        {danhSachNhaTro.map(nt => (
                            <tr key={nt.maNT} className={style.table_row}>
                                <td className={style.table_column} id={style.col1}>
                                    {nt.maNT}
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
                                    <div className={style.edit_button} onClick={() => handleShowEditModal(nt)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </div>
                                    <div className={style.delete_button} onClick={() => handleShowDeleteModal(nt.maNT)}>
                                        <i className="bi bi-trash-fill"></i>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showEdit && editHostel && (
                <div className={style.edit_modal}>
                    <div className={style.modal_container}>
                        <div className={style.close_btn} onClick={handleCloseEditModal}>
                            <i className="bi bi-x-lg"></i>
                        </div>
                        <h1>CHỈNH SỬA THÔNG TIN</h1>
                        <form name="formEdit" id="formEdit" className={style.info_form} onSubmit={handleSubmit}>

                            <div className={style.address_group}>
                                <h3>Địa chỉ cho thuê</h3>
                                <div className={style.address_box}>
                                    <div className={style.address_input}>
                                        <h4>Số nhà - Tên đường: <span className={`${style.msg} ${style.msg_diachi}`} style={{ color: 'red' }}></span></h4>
                                        <input className={style.info} type="text" name="diachi" id="diachi" ref={diaChiRef} required />
                                    </div>
                                    <div className={style.address_select}>
                                        <div className={style.address_choice}>
                                            <h4>Tỉnh/Thành phố:</h4>
                                            <select name="tinh" id="tinh" ref={tinhRef} className={style.info} value={selectedTinh || ""} onChange={handleTinhChange} disabled>
                                                <option value="">Chọn tỉnh</option>
                                                {tinhThanh.map(tinh => (
                                                    <option key={tinh.id} value={tinh.id}>
                                                        {tinh.full_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className={style.address_choice}>
                                            <h4>Quận/Huyện:</h4>
                                            <select name="quan" id="quan" ref={quanRef} className={style.info} value={selectedQuan || ""} onChange={handleQuanChange} disabled>
                                                <option value="">Chọn quận/huyện</option>
                                                {quanHuyen.map(quan => (
                                                    <option key={quan.id} value={quan.id}>
                                                        {quan.full_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className={style.address_choice}>
                                            <h4>Phường/Xã: <span className={`${style.msg} ${style.msg_phuong}`} style={{ color: 'red' }}></span></h4>
                                            <select name="phuong" id="phuong" ref={phuongRef} className={style.info} value={selectedPhuong || 0} onChange={handlePhuongChange}>
                                                <option value={0}>Phường/Xã</option>
                                                {phuongXa.map(phuong => (
                                                    <option key={phuong.id} value={phuong.id}>
                                                        {phuong.full_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div id={style.map}>
                                        <MapComponent lat={mapLat} lon={mapLon} diachi={mapDiachi} phuong={mapPhuong} />
                                    </div>
                                </div>
                            </div>

                            <div className={style.desc_group}>
                                <h3>Thông tin nhà trọ</h3>

                                <div className={style.desc_row}>
                                    <div className={style.desc_info}>
                                        <h4>Tên trọ: <span className={`${style.msg} ${style.msg_tentro}`} style={{ color: 'red' }}></span></h4>
                                        <input ref={tenTroRef} className={style.info} type="text" name="ten_tro" id="ten_tro" required />
                                    </div>
                                    <div className={style.desc_info}>
                                        <h4>Diện tích (m2): </h4>
                                        {/* <input ref={dienTichRef} className={style.info} type="number" name="dien_tich" id="dien_tich" required /> */}
                                        <input
                                            ref={dienTichRef}
                                            className={style.info}
                                            type="number"
                                            name="dien_tich"
                                            id="dien_tich"
                                            required
                                            min="1" // Chỉ cho phép số lớn hơn 0
                                            pattern="[1-9][0-9]*" // Chỉ chấp nhận số lớn hơn 0
                                            title="Diện tích phải là số dương lớn hơn 0"
                                        />
                                    </div>
                                </div>

                                <div className={style.desc_row}>
                                    <div className={style.desc_info}>
                                        <h4>Trạng thái phòng: <span className={`${style.msg} ${style.msg_trangthai}`} style={{ color: 'red' }}></span></h4>
                                        <select ref={trangThaiRef} className={style.info} name="trang_thai" id="trang_thai" defaultValue={0} required>
                                            <option value={0}>Vui lòng chọn</option>
                                            <option value={1}>Còn phòng</option>
                                            <option value={2}>Hết phòng</option>
                                        </select>
                                    </div>
                                    <div className={style.desc_info}>
                                        <h4>Giá phòng (VNĐ): </h4>
                                        <input
                                            ref={giaPhongRef}
                                            className={`${style.info} ${style.gia}`}
                                            type="number" name="gia_phong"
                                            id="gia_phong"
                                            min="1" // Chỉ cho phép số lớn hơn 0
                                            pattern="[1-9][0-9]*" // Chỉ chấp nhận số lớn hơn 0
                                            required />
                                    </div>
                                </div>

                                <div className={style.desc_row}>
                                    <div className={style.desc_info}>
                                        <h4>Giá điện (VNĐ): </h4>
                                        <input
                                            ref={giaDienRef}
                                            className={`${style.info} ${style.gia}`}
                                            type="number"
                                            name="gia_dien"
                                            id="gia_dien"
                                            min="1" // Chỉ cho phép số lớn hơn 0
                                            pattern="[1-9][0-9]*" // Chỉ chấp nhận số lớn hơn 0
                                            required />
                                    </div>
                                    <div className={style.desc_info}>
                                        <h4>Giá nước (VNĐ): </h4>
                                        <input
                                            ref={giaNuocRef}
                                            className={`${style.info} ${style.gia}`}
                                            type="number"
                                            name="gia_nuoc"
                                            id="gia_nuoc"
                                            min="1" // Chỉ cho phép số lớn hơn 0
                                            pattern="[1-9][0-9]*" // Chỉ chấp nhận số lớn hơn 0
                                            required />
                                    </div>
                                </div>

                                <div className={style.desc_row}>
                                    <div className={style.desc_info}>
                                        <h4>Tiện ích: <span className={`${style.msg} ${style.msg_tienich}`} style={{ color: 'red' }}></span></h4>
                                        <textarea ref={tienIchRef} className={style.info} name="tien_ich" id="tien_ich" required></textarea>
                                    </div>
                                </div>

                                <div className={style.desc_row}>
                                    <div className={style.desc_info}>
                                        <h4>Thông tin mô tả: <span className={`${style.msg} ${style.msg_mota}`} style={{ color: 'red' }}></span></h4>
                                        <textarea ref={moTaRef} className={style.info} name="mo_ta" id="mo_ta" required></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className={style.image_group}>
                                <h3>Hình ảnh <span tabIndex="0" className={`${style.msg} ${style.msg_hinhanh}`} style={{ color: 'red' }}></span></h3>
                                <p>Chọn ảnh về nhà trọ của bạn</p>
                                <label ref={fileRef} htmlFor="imageInput" className={style.input_img_btn} tabIndex="0"><i className="bi bi-camera-fill"></i>Tải ảnh lên</label>
                                <input type="file" name="imageInput" id="imageInput" style={{ display: 'none' }} accept=".jpg, .jpeg, .png, .gif" multiple onChange={handleFileChange} />
                                <p>Ảnh đã chọn</p>
                                <div className={style.imagePreview}>
                                    {/* {selectedFiles != null ?? displaySelectedImages()} */}
                                    {selectedFiles && selectedFiles.length > 0 && displaySelectedImages()}

                                </div>
                            </div>


                            <button type="submit" className={style.upload_button}>
                                Đăng tải
                            </button>
                        </form>
                    </div>
                </div>)
            }

            {showDelete && (
                <div className={style.modal_confirm}>
                    <div className={style.modal_confirm_container}>
                        <i className={`bi bi-x-lg ${style.closeIcon}`} onClick={handleCloseDeleteModal}></i>
                        <h2 className={style.modal_header}>Thông báo</h2>
                        <h3 className={style.modal_msg}>Bạn muốn xóa nhà trọ?</h3>
                        <div className={style.btn_box}>
                            <div className={style.modal_btn} id={style.btn_confirm} onClick={handleDeleteHostel}>
                                Xóa
                            </div>
                            <div className={style.modal_btn} id={style.btn_close} onClick={handleCloseDeleteModal}>
                                Thoát
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </>

    );
}

export default ListHostelPage;

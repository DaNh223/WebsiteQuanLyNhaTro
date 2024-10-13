import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './style.module.css';
import MapComponent from '../../component/MapComponent';
import { toast } from 'react-toastify';

function UploadPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const maND = sessionStorage.getItem('maND');

        if (!maND) {
            navigate('/login');
        }
    }, []);

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
                            console.log(lat, lon);

                            if (!isNaN(lat) && !isNaN(lon)) {
                                setMapLat(lat);
                                setMapLon(lon);
                                setMapPhuong(phuong.full_name);
                                setMapDiachi(diaChiRef.current.value);

                                // console.log(phuong.full_name, diaChiRef.current.value);
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
        // console.log(selectedPhuong);

    }, [selectedPhuong, selectedQuan]);


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
        setSelectedFiles(updatedFiles);
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
                };
            } else {
                toast.error("Vui lòng chỉ chọn file PNG, JPEG, JPG, hoặc GIF.");
                return null; // Return null for invalid files
            }
        }).filter(fileObject => fileObject !== null); // Filter out invalid files

        setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
        checkImg([...selectedFiles, ...newFiles]);
        event.target.value = null; // Reset file input
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


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Kiểm tra nếu chưa chọn phường
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


        // Tạo FormData để gửi lên API
        const formData = new FormData();
        formData.append('diachi', diaChiRef.current.value);
        formData.append('tentro', tenTroRef.current.value);
        formData.append('dientich', dienTichRef.current.value);
        // formData.append('trangthai', trangThaiRef.current.value);
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

        // UserID
        const maND = sessionStorage.getItem("maND");
        formData.append('userID', maND)

        // Đính kèm các file ảnh
        selectedFiles.forEach((fileObject, index) => {
            formData.append('images', fileObject.file);
        });


        try {
            const response = await fetch('http://localhost:8080/nhatro/addNhaTro', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                toast.success('Đăng tin thành công!');
                console.log(result);

                // Reset trang về mặc định
                diaChiRef.current.value = "";
                tenTroRef.current.value = "";
                dienTichRef.current.value = "";
                giaPhongRef.current.value = "";
                giaDienRef.current.value = "";
                giaNuocRef.current.value = "";
                tienIchRef.current.value = "";
                moTaRef.current.value = "";
                trangThaiRef.current.selectedIndex = 0;

                phuongRef.current.value = "0";
                setSelectedPhuong();
                setMapLat();
                setMapLon();
                fileRef.current.value = [];
                setSelectedFiles([]);
                console.log(selectedFiles);
                console.log(fileRef.current.value);
                checkImg(fileRef.current.value);

            } else {
                toast.error('Có lỗi xảy ra khi đăng tin. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };



    return (
        <div className={style.content_container}>
            <h1>Đăng tin nhà trọ</h1>
            <hr />
            <form action="" name="formDangTro" id="formDangTro" className={style.info_form} onSubmit={handleSubmit}>
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
                                {/* <select className={style.info} name="tinh" id="tinh" disabled>
                                    <option value="0">Tỉnh Thành</option>
                                </select> */}
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
                                {/* <select className={style.info} name="quan" id="quan" disabled>
                                    <option value="0">Quận/Huyện</option>
                                </select> */}
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
                                <select name="phuong" id="phuong" ref={phuongRef} className={style.info} defaultValue={selectedPhuong || 0} onChange={handlePhuongChange}>
                                    <option value={0}>Phường/Xã</option>
                                    {phuongXa.map(phuong => (
                                        <option key={phuong.id} value={phuong.id}>
                                            {phuong.full_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* <div id={style.map}>
                            <MapComponent lat={mapLat} lon={mapLon} diachi={mapDiachi} phuong={mapPhuong} />
                        </div> */}
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
                        {/* {displaySelectedImages()} */}
                        {selectedFiles && selectedFiles.length > 0 && displaySelectedImages()}
                    </div>
                </div>

                <button type="submit" className={style.upload_button}>
                    Đăng tải
                </button>
            </form>
        </div>
    );
}

export default UploadPage;

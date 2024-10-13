import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

import style from './style.module.css'
function ManageAccountPage() {


    const navigate = useNavigate();

    useEffect(() => {
        const maND = sessionStorage.getItem('maND');

        if (!maND) {
            navigate('/login');
        }
    }, []);


    const [isLoading, setIsLoading] = useState(false);

    const [danhsachNguoiDung, setDanhSachNguoiDung] = useState([])

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [imagePreview, setImagePreview] = useState(null); // Trạng thái cho hình ảnh
    const [userDetails, setUserDetails] = useState({
        tenND: '',
        ngaySinh: '',
        sdt: '',
        hinhND: null,
        diaChi: '',
        zalo: '',
        facebook: '',
        taiKhoan: {
            email: ''
        }
    });

    const [deleteUser, setDeleteUser] = useState(null);

    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortBy, setSortBy] = useState('maND');

    const fileRef = useRef();
    const nameRef = useRef();
    const birthRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();
    const zaloRef = useRef();
    const facebookRef = useRef();


    const filteredDanhSachNguoiDung = danhsachNguoiDung.filter(nd => {
        const matchesKeyword =
            nd.tenND.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            nd.diaChi.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            nd.ngaySinh.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            nd.sdt.toLowerCase().includes(searchKeyword.toLowerCase());
        return matchesKeyword;
    }).sort((a, b) => {
        if (sortBy === "maND") return a.maND - b.maND;
        if (sortBy === "tenND_ASC") return a.tenND.localeCompare(b.tenND);
        if (sortBy === "tenND_DESC") return b.tenND.localeCompare(a.tenND);
        if (sortBy === "soLuongNhaTro_DESC") return b.soLuongNhaTro - a.soLuongNhaTro;
        if (sortBy === "soLuongNhaTro_ASC") return a.soLuongNhaTro - b.soLuongNhaTro;
        return 0;
    });



    const fetchDataNguoiDung = () => {

        fetch(`http://localhost:8080/nguoidung/getAllNguoiDung?timestamp=${new Date().getTime()}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setDanhSachNguoiDung(data);
                }
            })
            .catch(error => {
                console.error('Error fetching houses:', error);
            });
    };

    useEffect(() => {
        fetchDataNguoiDung();
    }, []);


    // Show and hide the Edit Modal
    const handleShowEditModal = (nd) => {
        setUserDetails(nd);
        setImagePreview(nd.hinhND ? `http://localhost:8080/img/${nd.hinhND}` : null);
        setShowEdit(true);
    };
    const handleCloseEditModal = () => {
        setUserDetails();
        setShowEdit(false);
        fetchDataNguoiDung()
    }

    const handleShowDeleteModal = (maNT) => {
        setShowDelete(true);
        setDeleteUser(maNT);
    };
    const handleCloseDeleteModal = () => {
        setShowDelete(false);
        fetchDataNguoiDung();
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const validFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

        if (file && validFileTypes.includes(file.type)) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            }
            reader.readAsDataURL(file);
        } else {
            toast.error('Chỉ chấp nhận các tệp hình ảnh có đuôi png, jpg, jpeg, và gif.');
            e.target.value = '';
        }
    }

    const handleEdit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        const maND = userDetails.maND;

        if (fileRef.current.files[0]) {
            formData.append('image', fileRef.current.files[0]);
        } else {
            formData.append('image', new Blob(), 'empty.jpg');
        }


        formData.append('name', nameRef.current.value || null);
        formData.append('birth', birthRef.current.value || null);
        formData.append('phone', phoneRef.current.value || null);
        formData.append('address', addressRef.current.value || null);
        formData.append('zalo', zaloRef.current.value || null);
        formData.append('facebook', facebookRef.current.value || null);
        formData.append('email', emailRef.current.value || null);

        formData.append('maND', maND);

        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}: ${value.name}, ${value.type}, ${value.size} bytes`);
            } else {
                console.log(`${key}: ${value}`);
            }
        }
        try {
            const response = await fetch('http://localhost:8080/nguoidung/editNguoiDung', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                console.log(response);
                throw new Error('Đã xảy ra lỗi khi gửi dữ liệu.');
            } else {
                console.log(response);
                handleCloseEditModal();
                toast.success("Sửa thông tin thành công");
            }

        } catch (error) {
            console.error('Lỗi:', error);
        }
    }


    const handleDeleteUser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/nguoidung/deleteNguoiDung?maND=${deleteUser}`, {
                method: 'POST'
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                handleCloseDeleteModal();
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Đã xảy ra lỗi!");

            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Đã xảy ra lỗi khi xóa nhà trọ");
        }
    }


    const handleSetDefaultPassword = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/nguoidung/setDefaultPassword?maND=${userDetails.maND}`, {
                method: 'POST'
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                // handleCloseEditModal();
                setIsLoading(false)
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Đã xảy ra lỗi!");

            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Đã xảy ra lỗi khi xóa nhà trọ");
        }
    }

    return (
        <>
            <div className={style.content_container}>
                <h1>Quản lý tài khoản</h1>
                <hr />
                <div className={style.filter_section}>
                    <input
                        type="text"
                        placeholder="Nhập thông tin..."
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className={style.search_input}
                    />

                    <select
                        onChange={(e) => setSortBy(e.target.value)}
                        className={style.sort_input}
                    >
                        <option value="maND">Sắp xếp mặc định</option>
                        <option value="tenND_ASC">Sắp xếp theo tên người dùng (Tăng dần)</option>
                        <option value="tenND_DESC">Sắp xếp theo tên người dùng (Giảm dần)</option>
                        <option value="soLuongNhaTro_ASC">Sắp xếp theo số lượng bài đăng (Tăng dần)</option>
                        <option value="soLuongNhaTro_DESC">Sắp xếp theo số lượng bài đăng (Giảm dần)</option>
                    </select>
                </div>


                <table className={style.table_nt}>
                    <thead>
                        <tr className={style.table_header} style={{ fontSize: '1.2rem' }}>
                            {/* <th>ID</th> */}
                            <th>Họ và tên</th>
                            <th>Năm sinh</th>
                            <th>Địa chỉ</th>
                            <th>SĐT</th>
                            <th>Số lượng bài đăng</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody className={style.table_body} style={{ fontSize: '1.1rem' }}>
                        {filteredDanhSachNguoiDung && filteredDanhSachNguoiDung.map(nd => (
                            <tr key={nd.maND} className={style.table_row}>
                                <td className={style.table_column} id={style.col1}>
                                    <div className={style.user_box}>
                                        <div>
                                            <img alt='Ảnh người dùng' src={`http://localhost:8080/img/${nd.hinhND}`} className={style.user_box_img}
                                                onError={(e) => { e.target.src = require('../../Assets/img/user_img.png'); }}
                                            ></img>
                                        </div>
                                        <div className={style.user_box_info}>
                                            <span className={style.user_box_info_name} title={nd.tenND}>{nd.tenND}</span>
                                            <span>{nd.sdt}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className={style.table_column} id={style.col2}>
                                    {nd.ngaySinh}
                                </td>
                                <td className={style.table_column} id={style.col3}
                                    title={`${nd.diaChi}`}
                                >
                                    {`${nd.diaChi}`}
                                </td>
                                <td className={style.table_column} id={style.col4}>
                                    {nd.sdt}
                                </td>
                                <td className={style.table_column} id={style.col5}>
                                    {nd.soLuongNhaTro}
                                </td>
                                <td className={style.table_column} id={style.col7}>
                                    <div className={style.edit_button}
                                        onClick={() => handleShowEditModal(nd)}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </div>
                                    <div className={style.delete_button}

                                    >
                                        <i className={`bi bi-trash-fill ${nd.loaiND.tenloai === 'admin' ? style.disabled : ''}`} onClick={() => handleShowDeleteModal(nd.maND)}></i>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >


            {userDetails && showEdit && (
                <div className={style.edit_modal}>
                    <div className={style.modal_container}>
                        <div className={style.close_btn}
                            onClick={handleCloseEditModal}
                        >
                            <i className="bi bi-x-lg"></i>
                        </div>

                        <form id={style.info_form}
                            onSubmit={handleEdit}
                        >
                            <div className={style.img_box}>
                                <div className={style.img_container}>
                                    <img
                                        src={imagePreview || require("../../Assets/img/user_img.png")}
                                        id={style.user_img} alt="" />
                                </div>
                                <label htmlFor="imageInput" className={style.input_img_btn}>
                                    <i className="bi bi-camera-fill"></i>Tải ảnh lên
                                </label>
                                <input
                                    type="file"
                                    accept=".jpg, .jpeg, .png, .gif"
                                    name="imageInput"
                                    id="imageInput"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                    ref={fileRef}
                                />
                            </div>

                            <div className={style.info_box}>
                                <div className={style.info_row}>
                                    <div className={style.info_item}>
                                        <h4>Họ tên chủ trọ <span className={`${style.msg} msg_ten`}></span></h4>
                                        <input
                                            type="text"
                                            name="hoten"
                                            defaultValue={userDetails.tenND || ''}
                                            id="hoten"
                                            onChange={handleInputChange}
                                            required
                                            ref={nameRef}
                                        />
                                    </div>
                                    <div className={style.info_item}>
                                        <h4>Năm sinh <span className={`${style.msg} msg_namsinh`}></span></h4>
                                        <input
                                            type="date"
                                            name="namsinh"
                                            defaultValue={userDetails.ngaySinh || ''}
                                            id="namsinh"
                                            onChange={handleInputChange}
                                            required
                                            ref={birthRef}
                                        />
                                    </div>
                                </div>

                                <div className={style.info_row}>
                                    <div className={style.info_item}>
                                        <h4>Số điện thoại <span className={`${style.msg} msg_sdt`}></span></h4>
                                        <input
                                            minLength="10"
                                            type="number"
                                            name="sdt"
                                            defaultValue={userDetails.sdt || ''}
                                            id="sdt"
                                            onChange={handleInputChange}
                                            required
                                            ref={phoneRef}

                                        />
                                    </div>
                                    <div className={style.info_item}>
                                        <h4>Email <span className={`${style.msg} msg_email`}></span></h4>
                                        <input
                                            type="email"
                                            name="email"
                                            defaultValue={userDetails.taiKhoan?.email || ''}
                                            id="email"
                                            required
                                            ref={emailRef}
                                        />
                                    </div>
                                </div>

                                <div className={style.info_row}>
                                    <div className={style.info_item}>
                                        <h4>Địa chỉ <span className={`${style.msg} msg_diachi`}></span></h4>
                                        <input
                                            type="text"
                                            name="diachi"
                                            defaultValue={userDetails.diaChi || ''}
                                            id="diachi"
                                            onChange={handleInputChange}
                                            required
                                            ref={addressRef}

                                        />
                                    </div>
                                </div>
                                <div className={style.info_row}>
                                    <div className={style.info_item}>
                                        <h4>Liên kết Zalo <span className={`${style.msg} msg_zalo`}></span></h4>
                                        <input
                                            type="text"
                                            name="zalo"
                                            defaultValue={userDetails.zalo || ''}
                                            id="zalo"
                                            onChange={handleInputChange}
                                            ref={zaloRef}

                                        />
                                    </div>
                                </div>
                                <div className={style.info_row}>
                                    <div className={style.info_item}>
                                        <h4>Liên kết Facebook <span className={`${style.msg} msg_facebook`}></span></h4>
                                        <input
                                            type="text"
                                            name="facebook"
                                            defaultValue={userDetails.facebook || ''}
                                            id="facebook"
                                            onChange={handleInputChange}
                                            ref={facebookRef}
                                        />
                                    </div>
                                </div>

                                <div className={style.buttonBox}>
                                    <div className={style.setPassButton} onClick={handleSetDefaultPassword}>
                                        Đặt lại mật khẩu
                                    </div>
                                    <button type="submit" className={style.save_button}>Lưu thông tin</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            )}

            {showDelete && (
                <div className={style.modal_confirm}>
                    <div className={style.modal_confirm_container}>
                        <i className={`bi bi-x-lg ${style.closeIcon}`} onClick={handleCloseDeleteModal}></i>
                        <h2 className={style.modal_header}>Thông báo</h2>
                        <h3 className={style.modal_msg}>Bạn muốn xóa người dùng này?</h3>
                        <div className={style.btn_box}>
                            <div className={style.modal_btn} id={style.btn_confirm}
                                onClick={handleDeleteUser}
                            >
                                Xóa
                            </div>
                            <div className={style.modal_btn} id={style.btn_close} onClick={handleCloseDeleteModal}>
                                Thoát
                            </div>
                        </div>
                    </div>
                </div>)
            }

            {isLoading && (
                <div className={style.loadingOverlay}>
                    <div className={style.loader}></div>
                </div>
            )}

        </>

    )
}

export default ManageAccountPage
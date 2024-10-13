import { useState, useEffect, useRef } from 'react';
import styles from './style.module.css';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../../context/UserContext';


function UserPage() {


    // const navigate = useNavigate();

    // useEffect(() => {
    //     const maND = sessionStorage.getItem('maND');

    //     if (!maND) {
    //         navigate('/login');
    //     }
    // }, []);




    const { setUserImg } = useUserContext();

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

    const [imagePreview, setImagePreview] = useState(null); // Trạng thái cho hình ảnh

    const fileRef = useRef();
    const nameRef = useRef();
    const birthRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();
    const zaloRef = useRef();
    const facebookRef = useRef();


    const fetchUser = async () => {
        try {
            const userID = sessionStorage.getItem('maND'); // Bạn có thể thay đổi userID tùy theo nhu cầu
            const response = await fetch(`http://localhost:8080/nguoidung/${userID}`);
            if (!response.ok) {
                throw new Error(response);
            }
            const data = await response.json();
            setUserDetails(data);
            setImagePreview(data.hinhND ? `http://localhost:8080/img/${data.hinhND}` : null);
            // console.log(JSON.stringify(data));
        } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
        }
    }

    useEffect(() => {
        fetchUser(); // Gọi hàm fetchUser khi component mount
    }, []); // Chỉ chạy một lần khi component mount

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
                setImagePreview(event.target.result); // Cập nhật trạng thái hình ảnh
            }
            reader.readAsDataURL(file);
        } else {
            toast.error('Chỉ chấp nhận các tệp hình ảnh có đuôi png, jpg, jpeg, và gif.');
            e.target.value = ''; // Reset file input
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        const maND = sessionStorage.getItem('maND');

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

                if (fileRef.current.file) {
                    const newUserImg = `user_${maND}.${fileRef.current.files[0].name.split('.').pop().toLowerCase()}`;
                    sessionStorage.setItem('userImg', newUserImg);

                }

                toast.success("Sửa thông tin thành công");
                setUserImg();
            }

        } catch (error) {
            console.error('Lỗi:', error);
        }
    }

    return (
        <div className={styles.content_container}>

            <h1>Thông tin cá nhân</h1>
            <hr />
            <form id={styles.info_form} onSubmit={handleSubmit}>
                <div className={styles.img_box}>
                    <div className={styles.img_container}>
                        <img
                            // src={userDetails.hinhND ? `http://localhost:8080/img/${userDetails.hinhND}` : require("../../Assets/img/user_img.png")}
                            src={imagePreview || require("../../Assets/img/user_img.png")}
                            id={styles.user_img} alt="" />
                    </div>
                    <label htmlFor="imageInput" className={styles.input_img_btn}>
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

                <div className={styles.info_box}>
                    <div className={styles.info_row}>
                        <div className={styles.info_item}>
                            <h4>Họ tên chủ trọ <span className={`${styles.msg} msg_ten`}></span></h4>
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
                        <div className={styles.info_item}>
                            <h4>Năm sinh <span className={`${styles.msg} msg_namsinh`}></span></h4>
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

                    <div className={styles.info_row}>
                        <div className={styles.info_item}>
                            <h4>Số điện thoại <span className={`${styles.msg} msg_sdt`}></span></h4>
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
                        <div className={styles.info_item}>
                            <h4>Email <span className={`${styles.msg} msg_email`}></span></h4>
                            <input
                                type="email"
                                name="email"
                                defaultValue={userDetails.taiKhoan?.email || ''}
                                id="email"
                                disabled
                                required
                                ref={emailRef}
                            />
                        </div>
                    </div>

                    <div className={styles.info_row}>
                        <div className={styles.info_item}>
                            <h4>Địa chỉ <span className={`${styles.msg} msg_diachi`}></span></h4>
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
                    <div className={styles.info_row}>
                        <div className={styles.info_item}>
                            <h4>Liên kết Zalo <span className={`${styles.msg} msg_zalo`}></span></h4>
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
                    <div className={styles.info_row}>
                        <div className={styles.info_item}>
                            <h4>Liên kết Facebook <span className={`${styles.msg} msg_facebook`}></span></h4>
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

                    <button type="submit" className={styles.save_button}>Lưu thông tin</button>
                </div>
            </form>
        </div>
    );
}

export default UserPage;

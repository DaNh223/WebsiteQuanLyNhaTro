import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import style from './style.module.css';

function RegisterPage() {
    const navigate = useNavigate();

    const today = new Date().toISOString().split('T')[0]


    const inputRefs = useRef([]);
    const infoRefs = useRef({
        userName: null,
        dateOfBirth: null,
        phoneNumber: null,
        address: null,
        email: null,
        password: null,
        confirmPassword: null
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [registerData, setRegisterData] = useState({});

    useEffect(() => {
        const inputs = inputRefs.current;
        inputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                const val = e.target.value;
                if (isNaN(val)) {
                    e.target.value = '';
                    return;
                }
                if (val !== '') {
                    const nextInput = inputs[index + 1];
                    if (nextInput) {
                        nextInput.focus();
                    }
                }
            });

            input.addEventListener('keyup', (e) => {
                const key = e.key.toLowerCase();
                if (key === 'backspace' || key === 'delete') {
                    e.target.value = '';
                    const prevInput = inputs[index - 1];
                    if (prevInput) {
                        prevInput.focus();
                    }
                }
            });
        });
    })


    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        if (infoRefs.current.userName.value.trim() === '') {
            infoRefs.current.userName.value = '';
            infoRefs.current.userName.focus();
            toast.error('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        if (infoRefs.current.phoneNumber.value.trim() === '') {
            infoRefs.current.phoneNumber.focus();
            toast.error('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        if (infoRefs.current.phoneNumber.value.trim().length < 10) {
            infoRefs.current.phoneNumber.focus();
            toast.error('Số điện thoại phải từ 10 số');
            return;
        }
        if (infoRefs.current.address.value.trim() === '') {
            infoRefs.current.address.focus();
            infoRefs.current.address.value = '';
            toast.error('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        if (infoRefs.current.email.value.trim() === '') {
            infoRefs.current.email.focus();
            toast.error('Vui lòng nhập đầy đủ thông tin');

            return;
        }
        if (infoRefs.current.password.value.trim() === '') {
            infoRefs.current.password.focus();
            toast.error('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        if (infoRefs.current.password.value.trim().length < 8) {
            infoRefs.current.password.focus();
            toast.error('Mật khẩu phải hơn 8 ký tự');
            return;
        }
        if (infoRefs.current.confirmPassword.value.trim() === '') {
            infoRefs.current.confirmPassword.focus();
            toast.error('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        if (infoRefs.current.password.value !== infoRefs.current.confirmPassword.value) {
            infoRefs.current.password.focus();
            toast.error('Mật khẩu không trùng khớp');
            return;
        }

        setIsLoading(true);
        const formData = new FormData(event.target);
        const data = {
            email: formData.get('email'),
            userName: formData.get('userName'),
            dateOfBirth: formData.get('dateOfBirth'),
            phoneNumber: formData.get('phoneNumber'),
            address: formData.get('address'),
            password: formData.get('password'),
        };

        setRegisterData(data);

        // try {
        //     const response = await fetch('http://localhost:8080/otp/sendOtp', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //         },
        //         body: new URLSearchParams({ email: data.email }) // chỉ gửi email để nhận OTP
        //     });

        //     const result = await response.text();
        //     if (response.ok) {
        //         // alert('OTP đã được gửi về email. Vui lòng kiểm tra.');
        //         // Hiển thị modal nhập OTP
        //         setShowOTP(true);
        //     } else {
        //         alert('Gửi OTP thất bại: ' + result);
        //     }
        // } catch (error) {
        //     console.error('Có lỗi xảy ra:', error);
        // }
        // finally {
        //     setIsLoading(false);  // Kết thúc loading
        // }
        try {
            const response = await fetch('http://localhost:8080/otp/sendOtp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ email: data.email }) // chỉ gửi email để nhận OTP
            });

            const result = await response.text();
            if (response.ok) {
                // Hiển thị modal nhập OTP nếu email chưa tồn tại
                setShowOTP(true);
            } else if (response.status === 409) { // 409 là mã trạng thái HTTP cho Conflict (trùng lặp)
                toast.error(result); // Hiển thị thông báo lỗi email đã tồn tại
            } else {
                toast.error('Gửi OTP thất bại: ' + result);
            }
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
        }
        finally {
            setIsLoading(false);  // Kết thúc loading
        }
    };

    const handleOtpSubmit = async (event) => {
        event.preventDefault();

        const otp = inputRefs.current.map(input => input.value).join('');
        const { email, userName, dateOfBirth, phoneNumber, address, password } = registerData; // Lấy dữ liệu từ registerData

        const data = {
            email,
            otpCode: otp,
            userName,
            dateOfBirth,
            phoneNumber,
            address,
            password
        };

        try {
            const response = await fetch('http://localhost:8080/otp/verifyOtp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(data)
            });

            const result = await response.text();
            if (response.ok) {
                toast.success("Đăng ký tài khoản thành công");
                navigate('/login');
            } else {
                alert('Xác minh OTP thất bại: ' + result);

            }
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
        }
    };



    return (
        <>
            <div className={style.content}>
                <form className={style.register_form} onSubmit={handleRegisterSubmit}>
                    <h1 className={style.register_header}>ĐĂNG KÝ</h1>
                    <div className={`${style.input_box} ${style.name_input}`}>
                        <h3>Họ và tên: <span></span></h3>
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            placeholder="Nhập họ và tên"
                            required
                            ref={(el) => (infoRefs.current.userName = el)}
                        />
                    </div>
                    <div className={`${style.input_box} ${style.date_input}`}>
                        <h3>Ngày/tháng/năm sinh: <span></span></h3>
                        <input
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"
                            required
                            max={today}
                            ref={(el) => (infoRefs.current.dateOfBirth = el)}
                        />
                    </div>
                    <div className={`${style.input_box} ${style.phone_input}`}>
                        <h3>Số điện thoại: <span></span></h3>
                        <input
                            type="number"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="Nhập số điện thoại"
                            required
                            ref={(el) => (infoRefs.current.phoneNumber = el)}
                        />
                    </div>
                    <div className={`${style.input_box} ${style.address_input}`}>
                        <h3>Địa chỉ: <span></span></h3>
                        <input
                            type="tel"
                            name="address"
                            id="address"
                            placeholder="Nhập địa chỉ"
                            required
                            ref={(el) => (infoRefs.current.address = el)}
                        />
                    </div>
                    <div className={`${style.input_box} ${style.email_input}`}>
                        <h3>Email: <span></span></h3>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Nhập email"
                            required
                            ref={(el) => (infoRefs.current.email = el)}
                        />
                    </div>
                    <div className={`${style.input_box} ${style.pass_input}`}>
                        <h3>Mật khẩu: <span></span></h3>
                        <div className={style.group_input}>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Nhập mật khẩu"
                                required
                                ref={(el) => (infoRefs.current.password = el)}
                            />
                            <div className={style.eye_btn} id="eye" onClick={() => {
                                const password = document.getElementById("password");
                                if (password.type === 'text') password.type = 'password';
                                else password.type = 'text';
                            }}>
                                <i className="bi bi-eye"></i>
                            </div>
                        </div>
                    </div>
                    <div className={`${style.input_box} ${style.confirm_pass_input}`}>
                        <h3>Nhập lại mật khẩu: <span></span></h3>
                        <div className={style.group_input}>
                            <input
                                type="password"
                                name="confirm_password"
                                id="confirm_password"
                                placeholder="Nhập lại mật khẩu"
                                required
                                ref={(el) => (infoRefs.current.confirmPassword = el)}
                            />
                            <div className={style.eye_btn} id="eye" onClick={() => {
                                const confirmPassword = document.getElementById("confirm_password");
                                if (confirmPassword.type === 'text') confirmPassword.type = 'password';
                                else confirmPassword.type = 'text';
                            }}>
                                <i className="bi bi-eye"></i>
                            </div>
                        </div>
                    </div>
                    <button className={style.register_btn}>
                        <p>Đăng ký</p>
                    </button>

                    <Link to={'/login'} className={style.to_register}>Đã có tài khoản? <span>Đăng nhập</span></Link>

                </form>
            </div>


            {showOTP && (
                <div>
                    <div id={style.check_email_modal} className={style.modal}>
                        <div className={`${style.modal_container} ${style.autoAnimation}`}>
                            {/* <div className={style.close_btn}>
                            <i className="bi bi-x-lg"></i>
                        </div> */}
                            <h1 className={style.modal_title}>Kiểm tra Email</h1>
                            <h3 className={`${style.modal_title} ${style.messageOTP}`}>
                                Vui lòng nhập mã OTP được gửi về mail của bạn
                            </h3>
                            <form id="check_mail_otp_form" className={style.otp_form} onSubmit={handleOtpSubmit}>
                                <input type="hidden" name="action" value="check_mail" />

                                <div id="input_otp" className={style.input_number}>
                                    {[1, 2, 3, 4].map((_, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            name={`otp${index + 1}`}
                                            className={style.input}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength="1"
                                        />
                                    ))}
                                </div>
                                <p className={style.resend}>Gửi lại</p>
                                <div className={style.btns}>
                                    <button type="submit" className={style.submit_btn}>Kiểm tra</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {isLoading && (
                <div className={style.loadingOverlay}>
                    <div className={style.loader}></div>
                </div>
            )}
        </>
    );
}

export default RegisterPage;

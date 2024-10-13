import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';


function LoginPage() {

    const navigate = useNavigate();

    const { setUserImg } = useUserContext();


    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = event.target.input_email.value;
        const password = event.target.input_password.value;

        try {
            const response = await fetch('http://localhost:8080/taikhoan/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message || "Có lỗi xảy ra!");
                return;
            }

            const data = await response.json();
            console.log(data);

            sessionStorage.setItem('maND', data.maND);
            sessionStorage.setItem('maTK', data.maTK);
            sessionStorage.setItem('userImg', data.hinhND);
            setUserImg(data.hinhND);

            if (data.loaiND === "chutro") {
                navigate('/upload');
            }
            else if (data.loaiND === "admin") {
                navigate('/managePost');
            }

        } catch (error) {
            toast.error("Có lỗi xảy ra trong quá trình đăng nhập!");
            console.error(error);
        }
    };

    return (
        <div className={style.content}>
            <form className={style.login_form} onSubmit={handleSubmit}>
                <h1 className={style.login_header}>ĐĂNG NHẬP</h1>
                {/* <h4 className={style.messageError}></h4> */}
                <div className={style.input_box}>
                    <h3 style={{ textAlign: 'start' }}>Email:</h3>
                    <input type="text" name="input_email" id="input_email" placeholder="Nhập email" required />
                </div>

                <div className={style.input_box}>
                    <h3 style={{ textAlign: 'start' }}>Mật khẩu:</h3>
                    <div className={style.group_input}>
                        <input type="password" name="input_password" id="input_password" placeholder="Nhập mật khẩu" required />
                        <div className={style.eye_btn} id="eye" onClick={() => {
                            const inputPassword = document.getElementById('input_password');
                            inputPassword.type = inputPassword.type === 'text' ? 'password' : 'text';
                        }}>
                            <i className="bi bi-eye"></i>
                        </div>
                    </div>
                </div>

                {/* <div className={style.pass_box}>
                    <div className={style.remember_box}>
                        <label htmlFor="remember">Nhớ mật khẩu</label>
                        <input type="checkbox" name="remember" id="remember" />
                    </div>

                    <div className={`${style.forget_box} ${style.loss_pass}`}>
                        <p>Quên mật khẩu?</p>
                    </div>
                </div> */}

                <button type="submit" className={style.login_btn}>
                    <p>Đăng nhập</p>
                </button>

                <Link to={'/register'} className={style.to_register}>Chưa có tài khoản? <span>Đăng ký</span></Link>
            </form>
        </div>
    );
}

export default LoginPage;

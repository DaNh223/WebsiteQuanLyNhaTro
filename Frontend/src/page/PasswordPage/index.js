import { useState, useEffect } from 'react';
import style from './style.module.css';
import { useNavigate } from 'react-router-dom';

function PasswordPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const maND = sessionStorage.getItem('maND');

        if (!maND) {
            navigate('/login');
        }
    }, []);




    const [curPassType, setCurPassType] = useState('password');
    const [newPassType, setNewPassType] = useState('password');
    const [confirmPassType, setConfirmPassType] = useState('password');

    const [curPass, setCurPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const togglePasswordVisibility = (setPassType, passType) => {
        setPassType(passType === 'password' ? 'text' : 'password');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        // Kiểm tra xác nhận mật khẩu
        if (newPass !== confirmPass) {
            setErrorMessage('Mật khẩu mới và nhập lại không khớp.');
            return;
        }

        try {
            const maTK = sessionStorage.getItem('maTK')

            const response = await fetch('http://localhost:8080/taikhoan/changePass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    curPass,
                    newPass,
                    maTK
                }),
            });

            if (response.ok) {
                const result = await response.text();
                setSuccessMessage(result);
            } else if (response.status === 404) {
                const result = await response.text();
                setErrorMessage(result); // Thông báo khi mật khẩu cũ không chính xác
            } else {
                setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại.');
            }
        } catch (error) {
            setErrorMessage('Lỗi kết nối. Vui lòng thử lại.');
        }
    };

    return (
        <div className={style.content_container}>
            <h1>Đổi mật khẩu</h1>
            <hr />
            <form className={style.info_box} id="changePassForm" onSubmit={handleSubmit}>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                <div className={style.info_row}>
                    <div className={style.info_item}>
                        <h4>Mật khẩu hiện tại</h4>
                        <div className={style.group_input}>
                            <input
                                type={curPassType}
                                name="curPass"
                                id="curPass"
                                placeholder="Nhập mật khẩu hiện tại"
                                value={curPass}
                                onChange={(e) => setCurPass(e.target.value)}
                                required
                            />
                            <div className={style.eye_btn} onClick={() => togglePasswordVisibility(setCurPassType, curPassType)}>
                                <i className="bi bi-eye"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.info_row}>
                    <div className={style.info_item}>
                        <h4>Mật khẩu mới</h4>
                        <div className={style.group_input}>
                            <input
                                type={newPassType}
                                name="newPass"
                                id="newPass"
                                placeholder="Nhập mật khẩu mới"
                                value={newPass}
                                onChange={(e) => setNewPass(e.target.value)}
                                required
                            />
                            <div className={style.eye_btn} onClick={() => togglePasswordVisibility(setNewPassType, newPassType)}>
                                <i className="bi bi-eye"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.info_row}>
                    <div className={style.info_item}>
                        <h4>Nhập lại mật khẩu</h4>
                        <div className={style.group_input}>
                            <input
                                type={confirmPassType}
                                name="confirmPass"
                                id="confirmPass"
                                placeholder="Nhập lại mật khẩu mới"
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                required
                            />
                            <div className={style.eye_btn} onClick={() => togglePasswordVisibility(setConfirmPassType, confirmPassType)}>
                                <i className="bi bi-eye"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit" className={style.save_button}>Lưu thông tin</button>
            </form>
        </div>
    );
}

export default PasswordPage;

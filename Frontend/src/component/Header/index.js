import { useEffect, useState } from 'react';
import style from './style.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useUserContext } from '../../context/UserContext';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    // const { userImg, setUserImg } = useUserContext();

    useEffect(() => {
        const storedImg = sessionStorage.getItem('userImg');
        if (storedImg) {
            setUserImg(storedImg);
        }
    });

    const { userImg, setUserImg } = useUserContext();

    useEffect(() => {
        const storedImg = sessionStorage.getItem('userImg');
        if (storedImg) {
            setUserImg(storedImg);
        }
    }, [setUserImg, userImg]); // Thêm dependency setUserImg để tránh cảnh báo



    const [isSubnavVisible, setIsSubnavVisible] = useState(false);

    const toggleSubnav = () => {
        setIsSubnavVisible(!isSubnavVisible);
    };


    const LogOut = () => {
        sessionStorage.removeItem('maND');
        sessionStorage.removeItem('maTK');
        sessionStorage.removeItem('userImg');
        setUserImg();
        navigate('/upload');
    }

    return (
        <header className={style.header}>
            <div className={style.header_container}>
                <div className={style.header_left}>
                    <div className={style.header_logo}>
                        <img src={require('../../Assets/img/logoDthu.png')} alt="Logo ĐH Đồng Tháp" />
                    </div>
                    <div className={style.header_desc}>
                        <h1 className={style.h1}>TRƯỜNG ĐẠI HỌC ĐỒNG THÁP</h1>
                        <p className={style.p}>Hệ thống giới thiệu nhà trọ</p>
                    </div>
                </div>

                <div className={style.header_right}>
                    <ul className={style.nav_list}>
                        <li className={style.nav_item}>
                            <Link to="/" className={location.pathname === "/" ? 'activePage' : ""}>Trang chủ</Link>
                        </li>
                        <li className={style.nav_item}>
                            <Link to="/introduce" className={location.pathname === "/introduce" ? 'activePage' : ""}>Giới thiệu</Link>
                        </li>
                        <li className={style.nav_item}>
                            <Link
                                to="/hostel"
                                className={location.pathname === "/hostel" || location.pathname.startsWith("/detail") ? 'activePage' : ""}>
                                Nhà trọ
                            </Link>
                        </li>
                        <li className={style.nav_item}>
                            <Link to="/guide" className={location.pathname === "/guide" ? 'activePage' : ""}>Hướng dẫn</Link>
                        </li>


                        <li className={style.nav_item}>
                            {userImg ? (
                                <div className={style.account_btn}>
                                    <div className={style.account_setting} onClick={toggleSubnav}>
                                        <img
                                            src={`http://localhost:8080/img/${userImg}`} // Đường dẫn tới ảnh người dùng
                                            alt="Ảnh người dùng"
                                            className={style.user_image}
                                            onError={(e) => { e.target.src = require('../../Assets/img/user_img.png'); }} // Hình ảnh dự phòng
                                        />
                                        <i style={{ transitionDuration: '.3s' }} className={`bi bi-chevron-down ${isSubnavVisible ? style.spin : ''}`}></i>
                                    </div>
                                    <ul className={`${style.account_subnav} ${isSubnavVisible ? '' : style.disappear}`}>
                                        <li className={style.subnav_item}><Link to={'/upload'}>Quản lý nhà trọ & tài khoản</Link></li>
                                        <li className={style.subnav_item}>
                                            <Link to={'/'} name="logout_btn" className={style.logout_btn} onClick={LogOut} >Đăng xuất</Link>
                                        </li>
                                    </ul>
                                </div>

                            ) : (
                                <div className={style.login_button}>
                                    <Link to="/login">Đăng nhập</Link>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </header >
    )
}

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer_left}>
                <div className={styles.logo_group}>
                    <div className={styles.footer_logo}>
                        <img src={require("../../Assets/img/logoDthu.png")} alt="Logo Dthu" />
                    </div>
                    <div className={styles.footer_desc}>
                        <h1>TRƯỜNG ĐẠI HỌC ĐỒNG THÁP</h1>
                        <p>Hệ thống giới thiệu nhà trọ</p>
                    </div>
                </div>
                <div className={styles.info_group}>
                    <div className={styles.info}>
                        <i className="bi bi-geo-alt-fill"></i>
                        <p>783, Phạm Hữu Lầu, P.6, Tp.Cao Lãnh, Đồng Tháp</p>
                    </div>
                    <div className={styles.info}>
                        <i className="bi bi-telephone-fill"></i>
                        <p>Điện thoại: (0277) 3881518 - Fax: (0277) 388 1713</p>
                    </div>
                    <div className={styles.info}>
                        <i className="bi bi-envelope-fill"></i>
                        <p>Email: dhdt@dthu.edu.vn</p>
                    </div>
                </div>
            </div>
            <div className={styles.footer_right}>
                <h2>Kết nối với chúng tôi</h2>
                <div className={styles.contact_group}>
                    <div>
                        <Link href="#">
                            <img src={require("../../Assets/img/Facebook_Logo.png")} alt="Facebook" />
                        </Link>
                    </div>
                    <div>
                        <Link href="#">
                            <img src={require("../../Assets/img/youtube_logo.png")} alt="YouTube" />
                        </Link>
                    </div>
                    <div>
                        <Link href="#">
                            <img src={require("../../Assets/img/Ins_Logo.png")} alt="Instagram" />
                        </Link>
                    </div>
                    <div>
                        <Link href="#">
                            <img src={require("../../Assets/img/Gmail_logo.png")} alt="Gmail" />
                        </Link>
                    </div>
                </div>
                <p>&copy;2024 - By Thien My & Thanh Danh</p>
            </div>
        </footer>
    )
}

export default Footer;

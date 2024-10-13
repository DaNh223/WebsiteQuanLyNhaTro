import { useState, useEffect } from 'react';
import styles from './style.module.css'; // Import CSS module
import { Link, useLocation } from 'react-router-dom';

function SideBar() {
    const location = useLocation();
    const [loaiND, setLoaiND] = useState();

    useEffect(() => {
        const maND = sessionStorage.getItem('maND');
        fetch(`http://localhost:8080/nguoidung/${maND}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.loaiND.tenloai);
                setLoaiND(data.loaiND.tenloai);
            })
            .catch(error => {
                console.error('Error fetching houses:', error);
            });

    }, [])


    return (
        <>
            <div className={styles.side_bar}>
                <div className={styles.side_sticky}>

                    {/* {loaiND === "chutro" && (
                        <div>
                            <h2>QUẢN LÝ NHÀ TRỌ</h2>
                            <div className={styles.side_content}>
                                <Link to="/upload" className={location.pathname === "/upload" ? 'activeAction' : ""}>
                                    <div className={styles.side_item}>
                                        <i className="bi bi-caret-right-fill"></i>
                                        Đăng tin nhà trọ
                                    </div>
                                </Link>
                                <Link to="/list" className={location.pathname === "/list" ? 'activeAction' : ""}>
                                    <div className={styles.side_item}>
                                        <i className="bi bi-caret-right-fill"></i>
                                        Danh sách nhà trọ
                                    </div>
                                </Link>
                            </div>


                            <div className={styles.side_content}>
                                <h2>TÀI KHOẢN</h2>
                                <Link to="/user" className={location.pathname === "/user" ? 'activeAction' : ""}>
                                    <div className={styles.side_item}>
                                        <i className="bi bi-caret-right-fill"></i>
                                        Thông tin cá nhân
                                    </div>
                                </Link>
                                <Link to="/password" className={location.pathname === "/password" ? 'activeAction' : ""}>
                                    <div className={styles.side_item}>
                                        <i className="bi bi-caret-right-fill"></i>
                                        Đổi mật khẩu
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )}
                    {loaiND === "admin" && (
                        <div className={styles.side_content}>

                            <Link to="/managePost" className={location.pathname === "/managePost" ? 'activeAction' : ""}>
                                <div className={styles.side_item}>
                                    <i className="bi bi-caret-right-fill"></i>
                                    Quản lý bài đăng
                                </div>
                            </Link>
                            <Link to="/manageAccount" className={location.pathname === "/manageAccount" ? 'activeAction' : ""}>
                                <div className={styles.side_item}>
                                    <i className="bi bi-caret-right-fill"></i>
                                    Quản lý tài khoản
                                </div>
                            </Link>
                        </div>
                    )} */}

                    {loaiND === "admin" && (
                        <div className={styles.side_content}>
                            <h2>QUẢN LÝ HỆ THỐNG</h2>

                            <Link to="/managePost" className={location.pathname === "/managePost" ? 'activeAction' : ""}>
                                <div className={styles.side_item}>
                                    <i className="bi bi-caret-right-fill"></i>
                                    Quản lý bài đăng
                                </div>
                            </Link>
                            <Link to="/manageAccount" className={location.pathname === "/manageAccount" ? 'activeAction' : ""}>
                                <div className={styles.side_item}>
                                    <i className="bi bi-caret-right-fill"></i>
                                    Quản lý tài khoản
                                </div>
                            </Link>
                        </div>
                    )}


                    <div>
                        <div className={styles.side_content}>
                            <h2>QUẢN LÝ NHÀ TRỌ</h2>

                            <Link to="/upload" className={location.pathname === "/upload" ? 'activeAction' : ""}>
                                <div className={styles.side_item}>
                                    <i className="bi bi-caret-right-fill"></i>
                                    Đăng tin nhà trọ
                                </div>
                            </Link>
                            <Link to="/list" className={location.pathname === "/list" ? 'activeAction' : ""}>
                                <div className={styles.side_item}>
                                    <i className="bi bi-caret-right-fill"></i>
                                    Danh sách nhà trọ
                                </div>
                            </Link>
                        </div>

                        {(loaiND === "chutro" || loaiND === "admin") && (
                            <div className={styles.side_content}>
                                <h2>TÀI KHOẢN</h2>
                                <Link to="/user" className={location.pathname === "/user" ? 'activeAction' : ""}>
                                    <div className={styles.side_item}>
                                        <i className="bi bi-caret-right-fill"></i>
                                        Thông tin cá nhân
                                    </div>
                                </Link>
                                <Link to="/password" className={location.pathname === "/password" ? 'activeAction' : ""}>
                                    <div className={styles.side_item}>
                                        <i className="bi bi-caret-right-fill"></i>
                                        Đổi mật khẩu
                                    </div>
                                </Link>
                            </div>
                        )}


                    </div>


                </div>
            </div >
        </>
    );
}

export default SideBar;

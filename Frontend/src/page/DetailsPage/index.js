import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';


import { Autoplay, Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules'; // Thêm Thumbs
import style from './style.module.css';

import MapComponent from '../../component/MapComponent';

function DetailsPage() {
    const { id } = useParams();
    const [hostelDetail, setHostelDetail] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    // const thumbsSwiperRef = useRef(null);

    useEffect(() => {
        const fetchHouseDetail = async () => {
            try {
                const response = await fetch(`http://localhost:8080/nhatro/${id}`);
                const data = await response.json();
                setHostelDetail(data);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin nhà trọ:", error);
            }
        };

        fetchHouseDetail();
    }, [id]);

    if (!hostelDetail) {
        return <div>Đang tải thông tin...</div>;
    }

    return (
        <div className={style.content}>
            <div className={style.content_container}>
                <div className={style.left_container}>
                    <div className={`${style.image_form} ${style.form}`}>
                        <div className={`${style.image_header} ${style.form_header}`}>
                            <h2>{hostelDetail.tenTro}</h2>
                        </div>
                        <div className={style.image_content}>
                            <div className="card-wrapper">
                                <div className="card">
                                    {/* Swiper chính */}
                                    <Swiper
                                        thumbs={{ swiper: thumbsSwiper }}
                                        loop={true}
                                        spaceBetween={10}
                                        navigation={true}
                                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                                        modules={[FreeMode, Autoplay, Pagination, Navigation, Thumbs]}
                                        className="mySwiper2"
                                    >
                                        {hostelDetail.hinhAnh && hostelDetail.hinhAnh.map((hinh, index) => (
                                            <SwiperSlide key={index} style={{ height: '400px' }}>
                                                <img className="image-fit" src={`http://localhost:8080/img/${hinh.url}`} alt={`Slide ${index}`} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* Swiper thumbnails */}
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        spaceBetween={10}
                                        slidesPerView={5}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        pagination={{ clickable: true }}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="mySwiper"
                                    >
                                        {hostelDetail.hinhAnh && hostelDetail.hinhAnh.map((hinh, index) => (
                                            <SwiperSlide key={index} className={style.img_item} style={{ height: '100px' }}>
                                                <img src={`http://localhost:8080/img/${hinh.url}`} alt={`Thumbnail ${index}`} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${style.info_form} ${style.form}`}>
                        <div className={`${style.info_header} ${style.form_header}`}>
                            <h3>Thông tin về nhà trọ</h3>
                        </div>
                        <div className={style.info_content}>
                            <div className={`${style.address} ${style.info}`}>
                                <i className="bi bi-geo-alt-fill"></i>
                                <p>
                                    <span>Địa chỉ: </span>
                                    {`${hostelDetail.diaChi}, ${hostelDetail.phuong}, ${hostelDetail.quan}, ${hostelDetail.tinh}`}
                                </p>
                            </div>
                            <div className={`${style.price} ${style.info}`}>
                                <i className="bi bi-currency-dollar"></i>
                                <p><span>Giá: </span>{`${hostelDetail.giaPhong.toLocaleString()} VNĐ`}</p>
                            </div>
                            <div className={`${style.square} ${style.info}`}>
                                <i className="bi bi-aspect-ratio-fill"></i>
                                <p><span>Diện tích: </span>{`${hostelDetail.dienTich} m²`}</p>
                            </div>

                            <div className={`${style.room} ${style.info}`}>
                                <i className="bi bi-houses-fill"></i>
                                <p><span>Phòng: </span>{`${hostelDetail.trangThai}`}</p>
                            </div>
                        </div>
                    </div>

                    <div className={`${style.price_form} ${style.form}`}>
                        <div className={`${style.price_header} ${style.form_header}`}>
                            <h3>Giá tiền điện/nước</h3>
                        </div>

                        <div className={`${style.price_content}`}>
                            <div className={`${style.electric} ${style.info}`}>
                                <i className="bi bi-lightning-charge-fill"></i>
                                <p><span>Tiền điện: </span>
                                    {hostelDetail.giaDien} VNĐ/kWh
                                </p>
                            </div>

                            <div className={`${style.water} ${style.info}`}>
                                <i className="bi bi-droplet-fill"></i>
                                <p><span>Tiền nước: </span>
                                    {hostelDetail.giaNuoc} VNĐ/Khối
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={`${style.benefit_form} ${style.form}`}>
                        <div className={`${style.benefit_header} ${style.form_header}`}>
                            <h3>Tiện ích</h3>
                        </div>
                        <div className={style.benefit_content}>
                            <p className={style.info}>{hostelDetail.tienIch}</p>
                        </div>
                    </div>

                    <div className={`${style.desc_form} ${style.form}`}>
                        <div className={`${style.desc_header} ${style.form_header}`}>
                            <h3>Mô tả</h3>
                        </div>
                        <div className={style.desc_content}>
                            <p className={style.info}>{hostelDetail.moTa}</p>
                        </div>
                    </div>
                </div>

                <div className={style.right_container}>
                    <div className={`${style.contact_form} ${style.form}`}>
                        <div className={style.contact_header}>
                            <h3>Thông tin liên hệ</h3>
                        </div>
                        <div className={style.contact_img}>
                            <img
                                src={hostelDetail.nguoiDung.hinhND
                                    ? `http://localhost:8080/img/${hostelDetail.nguoiDung.hinhND}`
                                    : require('../../Assets/img/user_img.png')}  // Đường dẫn ảnh mặc định
                                alt="Thumbnail"
                            />
                        </div>
                        <div className={style.contact_name}>
                            <h3>Người đăng: {hostelDetail.nguoiDung.tenND}</h3>
                        </div>
                        <div className={style.contact_phone}>
                            <h3>SĐT: {hostelDetail.nguoiDung.sdt}</h3>
                            {hostelDetail.nguoiDung.zalo && (
                                <div className={`${style.zalo} ${style.contact_icon}`}>
                                    <a href={hostelDetail.nguoiDung.zalo} target="_blank" rel="noopener noreferrer">
                                        <img src={require('../../Assets/img/Icon_of_Zalo.png')} alt="Zalo" />
                                    </a>
                                </div>
                            )}
                            {hostelDetail.nguoiDung.facebook && (
                                <div className={`${style.facebook} ${style.contact_icon}`}>
                                    <a href={hostelDetail.nguoiDung.facebook} target="_blank" rel="noopener noreferrer">
                                        <img src={require('../../Assets/img/Facebook_Logo.png')} alt="Zalo" />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={`${style.location_form} ${style.form}`}>
                        <div className={style.location_header}>
                            <h3>Vị trí</h3>
                        </div>
                        <div id={style.map}>
                            <MapComponent
                                lat={hostelDetail.lat}
                                lon={hostelDetail.lng}
                                diachi={hostelDetail.diaChi}
                                phuong={hostelDetail.phuong}
                            ></MapComponent>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default DetailsPage;

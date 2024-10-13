import styles from './style.module.css'

function GuidePage() {
    return (
        <div className={styles.content}>
            <h1 >Hướng dẫn</h1>
            <h3>HỆ THỐNG NGÂN HÀNG NHÀ TRỌ HỖ TRỢ SINH VIÊN - TRƯỜNG ĐẠI HỌC ĐỒNG THÁP</h3>

            <p>
                <span>Ngay từ bây giờ, mọi tổ chức, cá nhân đã có thể “góp vốn” cho “ngân hàng” bằng cách sau đây:</span>
                <br />
                <span>1. Truy cập: nhatro.dthu.edu.vn</span>
                <br />
                <span>2. Đăng nhập tài khoản bằng tài khoản chung hệ thống nhà trường</span>
                <br />
                <span>3. Cung cấp thông tin về nhà trọ mà mình biết để hỗ trợ các bạn sinh viên.</span>
                <br />
                <span style={{ marginLeft: '10px', fontWeight: 600 }}>
                    3.1 Hướng dẫn đăng tải thông tin nhà trọ:
                </span>
                <br />
                <img src={require('../../Assets/img/dangtro.png')} alt="" />

                <span style={{ marginLeft: '10px', fontWeight: 600 }}>3.2 Hướng dẫn quản lý thông tin trọ đã đăng:</span>
                <br />
                <img src={require('../../Assets/img/quanlytro.png')} alt="" />

                <span>
                    Mọi thông tin mà các bạn cung cấp sẽ được cập nhật thường xuyên trên hệ thống và được chia sẻ “miễn phí” đến
                    sinh viên của Trường Đại học Đồng Tháp.
                    <br />
                    Trường Đại học Đồng Tháp mong nhận được sự chung tay của các thầy cô, các bạn sinh viên, các tổ chức, cá
                    nhân trong quá trình xây dựng “Ngân hàng nhà trọ hỗ trợ sinh viên – Trường Đại học Đồng Tháp” để hệ thống
                    được lớn mạnh với những thông tin được đa dạng, phong phú với mục đích ý nghĩa và thiết thực hỗ trợ sinh
                    viên Trường Đại học Đồng Tháp.
                    <br />


                    Các bạn sinh viên muốn tìm nhà trọ hãy truy cập hệ thống và “tham khảo” thông tin được cung cấp, bình tĩnh
                    chọn lựa, tìm hiểu kỹ càng về chất lượng, giá cả thuê phòng, vị trí, điện nước, hợp đồng thuê với chủ nhà,
                    vấn đề tăng giá hằng năm, an ninh và các vấn đề khác. Hy vọng hệ thống một phần nào đó sẽ hỗ trợ các bạn sớm
                    tìm được nhà trọ ưng ý! Chúc các bạn may mắn!
                </span>
            </p>
        </div>

    )

}
export default GuidePage
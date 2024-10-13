--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

-- Started on 2024-10-13 17:22:37

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 16697)
-- Name: hinhanh; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hinhanh (
    maha integer NOT NULL,
    url character varying(200),
    mant integer
);


ALTER TABLE public.hinhanh OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16696)
-- Name: hinhanh_maha_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hinhanh_maha_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hinhanh_maha_seq OWNER TO postgres;

--
-- TOC entry 4897 (class 0 OID 0)
-- Dependencies: 223
-- Name: hinhanh_maha_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hinhanh_maha_seq OWNED BY public.hinhanh.maha;


--
-- TOC entry 218 (class 1259 OID 16657)
-- Name: loaind; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.loaind (
    maloai integer NOT NULL,
    tenloai character varying(100)
);


ALTER TABLE public.loaind OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16656)
-- Name: loaind_maloai_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.loaind_maloai_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.loaind_maloai_seq OWNER TO postgres;

--
-- TOC entry 4898 (class 0 OID 0)
-- Dependencies: 217
-- Name: loaind_maloai_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.loaind_maloai_seq OWNED BY public.loaind.maloai;


--
-- TOC entry 220 (class 1259 OID 16664)
-- Name: nguoidung; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nguoidung (
    mand integer NOT NULL,
    tennd character varying(100),
    ngaysinh date,
    sdt character varying(100),
    zalo character varying(200),
    facebook character varying(200),
    hinhnd character varying(1000),
    diachi character varying(200),
    matk integer,
    maloai integer
);


ALTER TABLE public.nguoidung OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16663)
-- Name: nguoidung_mand_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nguoidung_mand_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nguoidung_mand_seq OWNER TO postgres;

--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 219
-- Name: nguoidung_mand_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nguoidung_mand_seq OWNED BY public.nguoidung.mand;


--
-- TOC entry 222 (class 1259 OID 16683)
-- Name: nhatro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nhatro (
    mant integer NOT NULL,
    tentro character varying(100),
    diachi character varying(200),
    dientich double precision,
    giaphong double precision,
    giadien double precision,
    gianuoc double precision,
    mota character varying(200),
    tienich character varying(200),
    trangthai character varying(50),
    trangthaiduyet character varying(20),
    lng character varying(100),
    lat character varying(100),
    tinh character varying(100),
    quan character varying(100),
    phuong character varying(100),
    mand integer
);


ALTER TABLE public.nhatro OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16682)
-- Name: nhatro_mant_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nhatro_mant_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nhatro_mant_seq OWNER TO postgres;

--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 221
-- Name: nhatro_mant_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nhatro_mant_seq OWNED BY public.nhatro.mant;


--
-- TOC entry 226 (class 1259 OID 16715)
-- Name: otp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.otp (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    otp_code character varying(6) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    expires_at timestamp without time zone NOT NULL,
    is_verified boolean DEFAULT false
);


ALTER TABLE public.otp OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16714)
-- Name: otp_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.otp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.otp_id_seq OWNER TO postgres;

--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 225
-- Name: otp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.otp_id_seq OWNED BY public.otp.id;


--
-- TOC entry 216 (class 1259 OID 16650)
-- Name: taikhoan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.taikhoan (
    matk integer NOT NULL,
    email character varying(100),
    password character varying(200)
);


ALTER TABLE public.taikhoan OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16649)
-- Name: taikhoan_matk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.taikhoan_matk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.taikhoan_matk_seq OWNER TO postgres;

--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 215
-- Name: taikhoan_matk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.taikhoan_matk_seq OWNED BY public.taikhoan.matk;


--
-- TOC entry 4717 (class 2604 OID 16700)
-- Name: hinhanh maha; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hinhanh ALTER COLUMN maha SET DEFAULT nextval('public.hinhanh_maha_seq'::regclass);


--
-- TOC entry 4714 (class 2604 OID 16660)
-- Name: loaind maloai; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loaind ALTER COLUMN maloai SET DEFAULT nextval('public.loaind_maloai_seq'::regclass);


--
-- TOC entry 4715 (class 2604 OID 16667)
-- Name: nguoidung mand; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nguoidung ALTER COLUMN mand SET DEFAULT nextval('public.nguoidung_mand_seq'::regclass);


--
-- TOC entry 4716 (class 2604 OID 16686)
-- Name: nhatro mant; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhatro ALTER COLUMN mant SET DEFAULT nextval('public.nhatro_mant_seq'::regclass);


--
-- TOC entry 4718 (class 2604 OID 16718)
-- Name: otp id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otp ALTER COLUMN id SET DEFAULT nextval('public.otp_id_seq'::regclass);


--
-- TOC entry 4713 (class 2604 OID 16653)
-- Name: taikhoan matk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taikhoan ALTER COLUMN matk SET DEFAULT nextval('public.taikhoan_matk_seq'::regclass);


--
-- TOC entry 4889 (class 0 OID 16697)
-- Dependencies: 224
-- Data for Name: hinhanh; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hinhanh (maha, url, mant) FROM stdin;
256	img256.png	49
257	img257.jpg	49
258	img258.jpg	49
259	img259.jpg	49
260	img260.jpg	49
246	img246.jpg	47
247	img247.jpg	47
248	img248.jpg	47
249	img249.jpg	47
250	img250.jpg	47
251	img251.jpg	48
252	img252.jpg	48
253	img253.jpg	48
254	img254.jpg	48
255	img255.jpg	48
\.


--
-- TOC entry 4883 (class 0 OID 16657)
-- Dependencies: 218
-- Data for Name: loaind; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.loaind (maloai, tenloai) FROM stdin;
1	admin
2	chutro
3	sinhvien
\.


--
-- TOC entry 4885 (class 0 OID 16664)
-- Dependencies: 220
-- Data for Name: nguoidung; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nguoidung (mand, tennd, ngaysinh, sdt, zalo, facebook, hinhnd, diachi, matk, maloai) FROM stdin;
1	Nguyễn Thành Danh	2003-03-22	0706622303	https://zalo.me/0706622303	https://www.facebook.com/ntdanh220303	user_1.jpg	123 Duong 1, thành phố Sa Đéc, tỉnh Đồng Tháp	1	1
7	Nguyễn Văn B	2003-03-22	0706622303	\N	\N	\N	123 Duong 1, thành phố Sa Đéc, tỉnh Đồng Tháp	7	2
6	Nguyễn Văn Anh	2003-03-22	0706622303	https://zalo.me/0706622303	https://www.facebook.com/ntdanh220303	user_6.jpg	123 Duong 1, thành phố Sa Đéc, tỉnh Đồng Tháp	6	2
14	Lê Hoàng Thiện Mỹ	2024-10-01	1231231231	\N	\N	\N	Cao Lãnh	14	2
\.


--
-- TOC entry 4887 (class 0 OID 16683)
-- Dependencies: 222
-- Data for Name: nhatro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nhatro (mant, tentro, diachi, dientich, giaphong, giadien, gianuoc, mota, tienich, trangthai, trangthaiduyet, lng, lat, tinh, quan, phuong, mand) FROM stdin;
49	Nhà trọ 2	168 A Ngã Am	20	2500000	3000	15000	Không	Có máy lạnh, trung tâm thành phố.	Hết phòng	Đã duyệt	105.6344393	10.4626432	Tỉnh Đồng Tháp	Thành phố Cao Lãnh	Phường 1	7
47	Tấn Nha	66 chợ Tân Tịch	10	850000	2500	11000	Vào chợ 50m	Gần chợ, giờ giấc tự do, cách trường Đại Học 800m.	Còn phòng	Đã duyệt	105.6347065	10.4291123	Tỉnh Đồng Tháp	Thành phố Cao Lãnh	Phường 6	1
48	Thanh Xuân	386 CMT8	15	1500000	3500	12000	Không	Không	Còn phòng	Đã duyệt	105.6446073	10.4645002	Tỉnh Đồng Tháp	Thành phố Cao Lãnh	Phường Mỹ Phú	6
\.


--
-- TOC entry 4891 (class 0 OID 16715)
-- Dependencies: 226
-- Data for Name: otp; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.otp (id, email, otp_code, created_at, expires_at, is_verified) FROM stdin;
13	hetyty345@gmail.com	6996	\N	2024-10-13 12:11:39.048681	t
14	hetyty345@gmail.com	2359	\N	2024-10-13 16:27:58.759938	t
\.


--
-- TOC entry 4881 (class 0 OID 16650)
-- Dependencies: 216
-- Data for Name: taikhoan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.taikhoan (matk, email, password) FROM stdin;
1	hetyty123@gmail.com	123123123
7	user3@gmail.com	123123123
6	user2@gmail.com	11111111
14	hetyty345@gmail.com	pUpaH2TM
\.


--
-- TOC entry 4903 (class 0 OID 0)
-- Dependencies: 223
-- Name: hinhanh_maha_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hinhanh_maha_seq', 272, true);


--
-- TOC entry 4904 (class 0 OID 0)
-- Dependencies: 217
-- Name: loaind_maloai_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.loaind_maloai_seq', 3, true);


--
-- TOC entry 4905 (class 0 OID 0)
-- Dependencies: 219
-- Name: nguoidung_mand_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nguoidung_mand_seq', 14, true);


--
-- TOC entry 4906 (class 0 OID 0)
-- Dependencies: 221
-- Name: nhatro_mant_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nhatro_mant_seq', 51, true);


--
-- TOC entry 4907 (class 0 OID 0)
-- Dependencies: 225
-- Name: otp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.otp_id_seq', 14, true);


--
-- TOC entry 4908 (class 0 OID 0)
-- Dependencies: 215
-- Name: taikhoan_matk_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.taikhoan_matk_seq', 14, true);


--
-- TOC entry 4730 (class 2606 OID 16702)
-- Name: hinhanh hinhanh_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hinhanh
    ADD CONSTRAINT hinhanh_pkey PRIMARY KEY (maha);


--
-- TOC entry 4724 (class 2606 OID 16662)
-- Name: loaind loaind_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loaind
    ADD CONSTRAINT loaind_pkey PRIMARY KEY (maloai);


--
-- TOC entry 4726 (class 2606 OID 16671)
-- Name: nguoidung nguoidung_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nguoidung
    ADD CONSTRAINT nguoidung_pkey PRIMARY KEY (mand);


--
-- TOC entry 4728 (class 2606 OID 16690)
-- Name: nhatro nhatro_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhatro
    ADD CONSTRAINT nhatro_pkey PRIMARY KEY (mant);


--
-- TOC entry 4732 (class 2606 OID 16722)
-- Name: otp otp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otp
    ADD CONSTRAINT otp_pkey PRIMARY KEY (id);


--
-- TOC entry 4722 (class 2606 OID 16655)
-- Name: taikhoan taikhoan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taikhoan
    ADD CONSTRAINT taikhoan_pkey PRIMARY KEY (matk);


--
-- TOC entry 4736 (class 2606 OID 16703)
-- Name: hinhanh hinhanh_mant_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hinhanh
    ADD CONSTRAINT hinhanh_mant_fkey FOREIGN KEY (mant) REFERENCES public.nhatro(mant);


--
-- TOC entry 4733 (class 2606 OID 16677)
-- Name: nguoidung nguoidung_maloai_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nguoidung
    ADD CONSTRAINT nguoidung_maloai_fkey FOREIGN KEY (maloai) REFERENCES public.loaind(maloai);


--
-- TOC entry 4734 (class 2606 OID 16672)
-- Name: nguoidung nguoidung_matk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nguoidung
    ADD CONSTRAINT nguoidung_matk_fkey FOREIGN KEY (matk) REFERENCES public.taikhoan(matk);


--
-- TOC entry 4735 (class 2606 OID 16691)
-- Name: nhatro nhatro_mand_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhatro
    ADD CONSTRAINT nhatro_mand_fkey FOREIGN KEY (mand) REFERENCES public.nguoidung(mand);


-- Completed on 2024-10-13 17:22:37

--
-- PostgreSQL database dump complete
--


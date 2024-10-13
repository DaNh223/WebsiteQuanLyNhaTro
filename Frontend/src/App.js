import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Header from './component/Header';
import Footer from './component/Footer';
import SideBar from './component/SideBar';
import HomePage from './page/HomePage';
import IntroducePage from './page/IntroducePage';
import GuidePage from './page/GuidePage';
import HostelPage from './page/HostelPage';
import DetailsPage from './page/DetailsPage';
import UploadPage from './page/UploadPage';
import ListHostelPage from './page/ListHostelPage';
import UserPage from './page/UserPage';
import PasswordPage from './page/PasswordPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './page/LoginPage';
import ManagePostPage from './page/AdminPage/manage_post.js';
import ManageAccountPage from './page/AdminPage/manage_account.js';
import RegisterPage from './page/RegisterPage/index.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/introduce" element={<IntroducePage />} />
          <Route path="/hostel" element={<HostelPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/detail/:id" element={<DetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/managePost" element={<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: 'var(--lower_gray_color)', textAlign: 'start' }}>
            <SideBar />
            <ManagePostPage />
          </div>} />

          <Route path="/manageAccount" element={<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: 'var(--lower_gray_color)', textAlign: 'start' }}>
            <SideBar />
            <ManageAccountPage />
          </div>} />

          <Route
            path="/upload"
            element={
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: 'var(--lower_gray_color)', textAlign: 'start' }}>
                <SideBar />
                <UploadPage />
              </div>
            }
          />

          <Route
            path="/list"
            element={
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: 'var(--lower_gray_color)', textAlign: 'start' }}>
                <SideBar />
                <ListHostelPage />
              </div>
            }
          />

          <Route
            path="/user"
            element={
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: 'var(--lower_gray_color)', textAlign: 'start' }}>
                <SideBar />
                <UserPage />
              </div>
            }
          />

          <Route
            path="/password"
            element={
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: 'var(--lower_gray_color)', textAlign: 'start' }}>
                <SideBar />
                <PasswordPage />
              </div>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

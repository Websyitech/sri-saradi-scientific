"use client";

import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function TopHeader() {
  return (
    <div className="top-header">
      <div className="top-header-container">
        {/* Left - Contact Info */}
        <div className="top-header-left">
          <a href="mailto:info@srisaradiscientific.com" className="top-header-item">
            <FaEnvelope className="top-header-icon" />
            <span>info@srisaradiscientific.com</span>
          </a>
          <a href="tel:+919742443809" className="top-header-item">
            <FaPhoneAlt className="top-header-icon" />
            <span>+91 97424 43809</span>
          </a>
        </div>

        {/* Right - Login & Track Order */}
        <div className="top-header-right">
          <a href="/login" className="top-header-link">Login / Register</a>
          <span className="top-header-divider">|</span>
          <a href="/track-order" className="top-header-link">Track Order</a>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

interface ContactSettings {
  contact_email?: string;
  contact_phone?: string;
}

export default function TopHeader() {
  const [contactInfo, setContactInfo] = useState<ContactSettings>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setContactInfo({
          contact_email: data.contact_email || "info@srisaradiscientific.com",
          contact_phone: data.contact_phone || "+91 97424 43809",
        });
      })
      .catch(() => {
        // Fallback to default values if API fails
        setContactInfo({
          contact_email: "info@srisaradiscientific.com",
          contact_phone: "+91 97424 43809",
        });
      });
  }, []);

  return (
    <div className="top-header">
      <div className="top-header-container">
        {/* Left - Contact Info */}
        <div className="top-header-left">
          <a href={`mailto:${contactInfo.contact_email}`} className="top-header-item">
            <FaEnvelope className="top-header-icon" />
            <span>{contactInfo.contact_email}</span>
          </a>
          <a href={`tel:${contactInfo.contact_phone?.replace(/\s+/g, '')}`} className="top-header-item">
            <FaPhoneAlt className="top-header-icon" />
            <span>{contactInfo.contact_phone}</span>
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

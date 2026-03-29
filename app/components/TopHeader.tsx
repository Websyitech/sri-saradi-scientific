"use client";

import { useState, useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaTimes } from "react-icons/fa";

interface ContactSettings {
  contact_email?: string;
  contact_phone?: string;
}

export default function TopHeader() {
  const [contactInfo, setContactInfo] = useState<ContactSettings>({});
  const [showProductInquiry, setShowProductInquiry] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    productName: "",
    description: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/product-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage("Your inquiry has been submitted successfully! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          productName: "",
          description: "",
          company: "",
        });
        setTimeout(() => {
          setShowProductInquiry(false);
          setSubmitMessage("");
        }, 2000);
      } else {
        setSubmitMessage("Failed to submit inquiry. Please try again.");
      }
    } catch (error) {
      setSubmitMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <button 
            onClick={() => setShowProductInquiry(true)}
            className="top-header-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Can't Find Product?
          </button>
          <span className="top-header-divider">|</span>
          <a href="/login" className="top-header-link">Login / Register</a>
          <span className="top-header-divider">|</span>
          <a href="/track-order" className="top-header-link">Track Order</a>
        </div>
      </div>

      {/* Product Inquiry Modal */}
      {showProductInquiry && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10002,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowProductInquiry(false);
            }
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px 24px 16px',
                borderBottom: '1px solid #e0e0e0',
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#171717',
                }}
              >
                Can't Find Product? Let Us Help!
              </h2>
              <button
                onClick={() => setShowProductInquiry(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '4px',
                }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
              {submitMessage && (
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    backgroundColor: submitMessage.includes('successfully') ? '#d4edda' : '#f8d7da',
                    color: submitMessage.includes('successfully') ? '#155724' : '#721c24',
                    border: `1px solid ${submitMessage.includes('successfully') ? '#c3e6cb' : '#f5c6cb'}`,
                    fontSize: '14px',
                  }}
                >
                  {submitMessage}
                </div>
              )}

              <div style={{ display: 'grid', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d0d0d0',
                        borderRadius: '6px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#2D2B7F'}
                      onBlur={(e) => e.target.style.borderColor = '#d0d0d0'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d0d0d0',
                        borderRadius: '6px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#2D2B7F'}
                      onBlur={(e) => e.target.style.borderColor = '#d0d0d0'}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d0d0d0',
                        borderRadius: '6px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#2D2B7F'}
                      onBlur={(e) => e.target.style.borderColor = '#d0d0d0'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d0d0d0',
                        borderRadius: '6px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#2D2B7F'}
                      onBlur={(e) => e.target.style.borderColor = '#d0d0d0'}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter the product you're looking for"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d0d0d0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2D2B7F'}
                    onBlur={(e) => e.target.style.borderColor = '#d0d0d0'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
                    Additional Details
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Please provide any additional details like specifications, quantity, catalog numbers, etc."
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d0d0d0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      resize: 'vertical',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2D2B7F'}
                    onBlur={(e) => e.target.style.borderColor = '#d0d0d0'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '14px 24px',
                    backgroundColor: isSubmitting ? '#ccc' : '#2D2B7F',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s',
                    marginTop: '8px',
                  }}
                  onMouseOver={(e) => !isSubmitting && ((e.target as HTMLElement).style.backgroundColor = '#1e1c5e')}
                  onMouseOut={(e) => !isSubmitting && ((e.target as HTMLElement).style.backgroundColor = '#2D2B7F')}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

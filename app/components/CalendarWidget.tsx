"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function CalendarWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    reason: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      // Format the date from YYYY-MM-DD to MM/dd/yyyy
      const dateParts = formData.date.split("-");
      const formattedDate = dateParts.length === 3 ? `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}` : formData.date;

      // Construct the Zoho URL by replacing the placeholders
      const baseUrl = "https://calendar.zoho.in/eventreq/0802124af1cd7f9b1c42ca539e2d268800001ee66517b85868dcf3d95e25fc5c5512e03f2ca87ada465917b6e183843c37cee8dfa634ec2d0abf35c209b7a0a286f4bb0c1ed4b217e3276748f9b3";
      
      const queryParams = new URLSearchParams({
        name: formData.name,
        mailId: formData.email,
        date: formattedDate,
        time: formData.time,
        reason: formData.reason,
      });

      const finalUrl = `${baseUrl}?${queryParams.toString()}`;

      // We use mode: 'no-cors' to prevent CORS errors since this is a simple webhook hit
      await fetch(finalUrl, {
        method: "GET",
        mode: "no-cors",
      });

      setStatus("success");
      setTimeout(() => {
        setIsOpen(false);
        setStatus("idle");
        setFormData({ name: "", email: "", date: "", time: "", reason: "" });
      }, 3000);
    } catch (error) {
      console.error("Error submitting appointment:", error);
      setStatus("error");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="calendar-widget"
        title="Book an Appointment"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          backgroundColor: "var(--teal)",
          color: "white",
          padding: "14px 28px",
          borderRadius: "30px",
          fontWeight: "600",
          fontSize: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.4)",
          zIndex: 9999,
          cursor: "pointer",
          border: "2px solid rgba(255,255,255,0.1)",
          transition: "transform 0.2s ease, background-color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.backgroundColor = "var(--teal-dark)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.backgroundColor = "var(--teal)";
        }}
      >
        Book an Appointment
      </button>

      {/* Modal Form */}
      {isOpen && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <button onClick={() => setIsOpen(false)} style={closeButtonStyle}>
              <FaTimes size={20} />
            </button>
            
            <h2 style={{ marginBottom: "20px", color: "var(--primary)", fontSize: "1.5rem", fontWeight: "600" }}>
              Book an Appointment
            </h2>

            {status === "success" ? (
              <div style={successMessageStyle}>
                <p>Thank you! Your appointment request has been submitted successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={formStyle}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} placeholder="Your Name" />
                </div>
                
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Email</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} placeholder="your.email@example.com" />
                </div>

                <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>Date</label>
                    <input required type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>Time</label>
                    <input required type="time" name="time" value={formData.time} onChange={handleChange} style={inputStyle} />
                  </div>
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Reason for Appointment</label>
                  <textarea required name="reason" value={formData.reason} onChange={handleChange} style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} placeholder="Please briefly describe the reason for your visit..." />
                </div>

                {status === "error" && (
                  <p style={{ color: "red", fontSize: "0.9rem", marginBottom: "15px" }}>
                    Something went wrong. Please try again later.
                  </p>
                )}

                <button type="submit" disabled={status === "submitting"} style={submitButtonStyle}>
                  {status === "submitting" ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// --- Inline Styles for the Modal ---
const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  zIndex: 999999, // Super high z-index to overlay above sticky headers
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(4px)",
};

const modalStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "32px",
  borderRadius: "12px",
  width: "100%",
  maxWidth: "450px",
  position: "relative",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
};

const closeButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "16px",
  right: "16px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "#666",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const inputGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "15px",
};

const labelStyle: React.CSSProperties = {
  marginBottom: "6px",
  fontSize: "0.9rem",
  fontWeight: "500",
  color: "var(--foreground, #4a5565)",
};

const inputStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  fontSize: "1rem",
  outline: "none",
  transition: "border-color 0.2s ease",
};

const submitButtonStyle: React.CSSProperties = {
  backgroundColor: "var(--primary)", // Changed to primary blue instead of teal to match site theme
  color: "var(--text-light, white)",
  border: "none",
  padding: "12px",
  borderRadius: "6px",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "10px",
  transition: "background-color 0.2s ease",
};

const successMessageStyle: React.CSSProperties = {
  backgroundColor: "var(--teal-light)",
  color: "var(--teal-dark)",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  fontWeight: "500",
  lineHeight: "1.5",
};

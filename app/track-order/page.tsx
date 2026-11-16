"use client";

import { useState } from "react";
import { FaSearch, FaBox, FaTruck, FaCheckCircle, FaClipboardList } from "react-icons/fa";

type OrderStatus = {
  orderId: string;
  date: string;
  status: "processing" | "shipped" | "in-transit" | "delivered";
  items: string[];
  estimatedDelivery: string;
  trackingNumber: string;
} | null;

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [tracked, setTracked] = useState(false);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo order status
    setOrderStatus({
      orderId: orderId || "SSS-001",
      date: "January 15, 2025",
      status: "in-transit",
      items: [
        "SGE Needles for luer lock syringes (x2)",
        "Hamilton Standard Microsyringe (x1)",
      ],
      estimatedDelivery: "January 22, 2025",
      trackingNumber: "SRSCI2025001847IN",
    });
    setTracked(true);
  };

  const steps = [
    { key: "processing", label: "Order Placed", icon: <FaClipboardList />, date: "Jan 15, 2025" },
    { key: "shipped", label: "Shipped", icon: <FaBox />, date: "Jan 17, 2025" },
    { key: "in-transit", label: "In Transit", icon: <FaTruck />, date: "Jan 19, 2025" },
    { key: "delivered", label: "Delivered", icon: <FaCheckCircle />, date: "Est. Jan 22, 2025" },
  ];

  const getStepIndex = (status: string) => {
    return steps.findIndex((s) => s.key === status);
  };

  return (
    <div style={{ background: "#f8f9fb", minHeight: "80vh" }}>
      {/* Breadcrumb */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e8e8e8",
          padding: "14px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 40px",
            fontSize: "13px",
            color: "#888",
          }}
        >
          <a href="/" style={{ color: "#2D2B7F", textDecoration: "none" }}>
            Home
          </a>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: "#444" }}>Track Order</span>
        </div>
      </div>

      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #2D2B7F 0%, #1a1a2e 100%)",
          padding: "50px 0",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          <FaTruck
            style={{
              fontSize: "40px",
              color: "rgba(255,255,255,0.3)",
              marginBottom: "16px",
            }}
          />
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 8px 0",
            }}
          >
            Track Your Order
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.65)",
              margin: 0,
            }}
          >
            Enter your order ID and email to check the current status of your shipment
          </p>
        </div>
      </div>

      {/* Track Form */}
      <div
        style={{
          maxWidth: "700px",
          margin: "-30px auto 0",
          padding: "0 20px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <form
          onSubmit={handleTrack}
          style={{
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            padding: "32px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#444",
                  marginBottom: "6px",
                }}
              >
                Order ID
              </label>
              <input
                type="text"
                placeholder="e.g. ORD-2025-00847"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  color: "#333",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#444",
                  marginBottom: "6px",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  color: "#333",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="login-submit-btn"
            style={{
              width: "100%",
              padding: "14px",
              background: "linear-gradient(135deg, #2D2B7F, #3a38a0)",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 700,
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.25s",
              boxShadow: "0 4px 16px rgba(45, 43, 127, 0.3)",
            }}
          >
            <FaSearch />
            Track Order
          </button>
        </form>
      </div>

      {/* Order Status Result */}
      {tracked && orderStatus && (
        <div
          style={{
            maxWidth: "700px",
            margin: "30px auto 60px",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              padding: "32px",
            }}
          >
            {/* Order Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "28px",
                paddingBottom: "20px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#1a1a2e",
                    margin: "0 0 4px 0",
                  }}
                >
                  Order #{orderStatus.orderId}
                </h3>
                <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
                  Placed on {orderStatus.date}
                </p>
              </div>
              <span
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: 700,
                  background: "#e8f5e9",
                  color: "#2e7d32",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {orderStatus.status.replace("-", " ")}
              </span>
            </div>

            {/* Progress Steps */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "32px",
                position: "relative",
              }}
            >
              {/* Progress Line */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "40px",
                  right: "40px",
                  height: "3px",
                  background: "#e8e8e8",
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "40px",
                  width: `${(getStepIndex(orderStatus.status) / (steps.length - 1)) * (100 - 14)}%`,
                  height: "3px",
                  background: "#2D2B7F",
                  zIndex: 1,
                  transition: "width 0.5s",
                }}
              />

              {steps.map((step, idx) => {
                const currentIdx = getStepIndex(orderStatus.status);
                const isCompleted = idx <= currentIdx;
                const isCurrent = idx === currentIdx;
                return (
                  <div
                    key={step.key}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative",
                      zIndex: 2,
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: isCompleted ? "#2D2B7F" : "#e8e8e8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isCompleted ? "#fff" : "#999",
                        fontSize: "16px",
                        marginBottom: "10px",
                        boxShadow: isCurrent ? "0 0 0 4px rgba(45,43,127,0.2)" : "none",
                        transition: "all 0.3s",
                      }}
                    >
                      {step.icon}
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: isCompleted ? 700 : 500,
                        color: isCompleted ? "#2D2B7F" : "#999",
                        textAlign: "center",
                      }}
                    >
                      {step.label}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#aaa",
                        marginTop: "4px",
                        textAlign: "center",
                      }}
                    >
                      {step.date}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Order Details */}
            <div
              style={{
                background: "#f8f9fb",
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#1a1a2e",
                  margin: "0 0 12px 0",
                }}
              >
                Order Items
              </h4>
              {orderStatus.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 0",
                    borderBottom:
                      idx < orderStatus.items.length - 1
                        ? "1px solid #eee"
                        : "none",
                  }}
                >
                  <FaBox style={{ color: "#2D2B7F", fontSize: "13px" }} />
                  <span style={{ fontSize: "14px", color: "#444" }}>{item}</span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "16px",
                  paddingTop: "12px",
                  borderTop: "1px solid #e0e0e0",
                }}
              >
                <div>
                  <span style={{ fontSize: "12px", color: "#888" }}>
                    Tracking Number
                  </span>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#2D2B7F",
                      margin: "2px 0 0 0",
                    }}
                  >
                    {orderStatus.trackingNumber}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "12px", color: "#888" }}>
                    Estimated Delivery
                  </span>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#1a1a2e",
                      margin: "2px 0 0 0",
                    }}
                  >
                    {orderStatus.estimatedDelivery}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Section (when not tracked) */}
      {!tracked && (
        <div
          style={{
            maxWidth: "700px",
            margin: "40px auto 60px",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {[
              {
                icon: <FaClipboardList />,
                title: "Order Confirmation",
                desc: "Check your email for order details and confirmation number.",
              },
              {
                icon: <FaTruck />,
                title: "Shipping Updates",
                desc: "Receive real-time updates about your shipment status.",
              },
              {
                icon: <FaCheckCircle />,
                title: "Delivery Proof",
                desc: "Get delivery confirmation with signature proof.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                style={{
                  background: "#fff",
                  borderRadius: "10px",
                  padding: "24px",
                  textAlign: "center",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "#f0f0ff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#2D2B7F",
                    fontSize: "18px",
                    marginBottom: "14px",
                  }}
                >
                  {card.icon}
                </div>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#1a1a2e",
                    margin: "0 0 6px 0",
                  }}
                >
                  {card.title}
                </h4>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#888",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

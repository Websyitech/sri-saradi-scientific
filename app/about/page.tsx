"use client";

import { FaFlask, FaUsers, FaGlobeAmericas, FaAward, FaHandshake, FaCheckCircle } from "react-icons/fa";

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "5000+", label: "Products Supplied" },
  { value: "1200+", label: "Happy Clients" },
  { value: "50+", label: "Brand Partners" },
];

const values = [
  {
    icon: <FaCheckCircle />,
    title: "Quality Assurance",
    description:
      "Every product we supply undergoes rigorous quality checks to meet international standards and ensure reliable research outcomes.",
  },
  {
    icon: <FaHandshake />,
    title: "Customer First",
    description:
      "We build lasting relationships by understanding our clients' needs and providing tailored solutions with exceptional support.",
  },
  {
    icon: <FaFlask />,
    title: "Innovation Driven",
    description:
      "We continuously update our product portfolio with cutting-edge laboratory equipment and the latest scientific advancements.",
  },
  {
    icon: <FaGlobeAmericas />,
    title: "Global Standards",
    description:
      "Partnering with world-renowned brands to deliver internationally certified products for laboratories across India.",
  },
];

const team = [
  { name: "Dr. Ramesh Kumar", role: "Founder & Managing Director", initials: "RK" },
  { name: "Priya Sharma", role: "Head of Operations", initials: "PS" },
  { name: "Suresh Reddy", role: "Technical Director", initials: "SR" },
  { name: "Anitha Devi", role: "Sales Manager", initials: "AD" },
];

export default function AboutPage() {
  return (
    <div style={{ background: "#fff" }}>
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
          <span style={{ color: "#444" }}>About Us</span>
        </div>
      </div>

      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #2D2B7F 0%, #1a1a2e 100%)",
          padding: "70px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            left: "10%",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
          }}
        />

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 40px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "3px",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "16px",
              padding: "6px 18px",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "30px",
            }}
          >
            About Us
          </span>
          <h1
            style={{
              fontSize: "40px",
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 16px 0",
              lineHeight: 1.2,
            }}
          >
            Empowering Scientific Research <br />
            Since 2010
          </h1>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.65)",
              margin: 0,
              maxWidth: "650px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Sri Saradi Scientific is a trusted supplier of high-quality laboratory and scientific
            equipment, serving research institutions, universities, and industries across India.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "-40px auto 0",
          padding: "0 40px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "28px 20px",
                textAlign: "center",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#2D2B7F",
                  marginBottom: "4px",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "13px", color: "#888", fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story Section */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "70px 40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "#2D2B7F",
                marginBottom: "12px",
                display: "block",
              }}
            >
              Our Story
            </span>
            <h2
              style={{
                fontSize: "30px",
                fontWeight: 800,
                color: "#1a1a2e",
                margin: "0 0 20px 0",
                lineHeight: 1.3,
              }}
            >
              Bridging the Gap Between Science & Equipment
            </h2>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.8,
                color: "#666",
                margin: "0 0 16px 0",
              }}
            >
              Founded in Hyderabad, Sri Saradi Scientific started with a vision to make world-class
              laboratory equipment accessible to every research facility in India. Our founder, with
              over two decades of experience in the scientific instruments industry, recognized the
              challenges researchers face in sourcing reliable equipment.
            </p>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.8,
                color: "#666",
                margin: 0,
              }}
            >
              Today, we partner with 50+ global brands and serve 1200+ institutions, providing
              everything from basic lab consumables to advanced analytical instruments. Our
              commitment to quality, competitive pricing, and technical support has made us a
              preferred supplier in the region.
            </p>
          </div>

          {/* Visual Element */}
          <div
            style={{
              background: "linear-gradient(135deg, #f0f0ff 0%, #e8ecff 100%)",
              borderRadius: "16px",
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "320px",
            }}
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="60" cy="60" r="55" stroke="#2D2B7F" strokeWidth="2" opacity="0.2" />
              <circle cx="60" cy="60" r="40" stroke="#2D2B7F" strokeWidth="2" opacity="0.15" />
              <path
                d="M50 40v40M70 40v40M40 55h40M40 65h40"
                stroke="#2D2B7F"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="60" cy="35" r="6" fill="#2D2B7F" opacity="0.3" />
              <circle cx="60" cy="85" r="6" fill="#2D2B7F" opacity="0.3" />
              <circle cx="35" cy="60" r="5" fill="#4CAF50" opacity="0.5" />
              <circle cx="85" cy="60" r="5" fill="#2196F3" opacity="0.5" />
            </svg>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#2D2B7F",
                margin: "20px 0 8px 0",
              }}
            >
              Scientific Excellence
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#666",
                margin: 0,
                textAlign: "center",
              }}
            >
              Precision. Reliability. Innovation.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div
        style={{
          background: "#f8f9fb",
          padding: "70px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "0 40px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "#2D2B7F",
                marginBottom: "12px",
                display: "block",
              }}
            >
              Our Values
            </span>
            <h2
              style={{
                fontSize: "30px",
                fontWeight: 800,
                color: "#1a1a2e",
                margin: 0,
              }}
            >
              What Drives Us
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "24px",
            }}
          >
            {values.map((value, idx) => (
              <div
                key={idx}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "28px",
                  display: "flex",
                  gap: "18px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  transition: "box-shadow 0.2s",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #2D2B7F, #3a38a0)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "20px",
                    flexShrink: 0,
                  }}
                >
                  {value.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#1a1a2e",
                      margin: "0 0 8px 0",
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "#666",
                      margin: 0,
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "70px 40px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "#2D2B7F",
              marginBottom: "12px",
              display: "block",
            }}
          >
            Our Team
          </span>
          <h2
            style={{
              fontSize: "30px",
              fontWeight: 800,
              color: "#1a1a2e",
              margin: "0 0 8px 0",
            }}
          >
            Meet the Experts
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "#888",
              margin: 0,
              maxWidth: "500px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Dedicated professionals committed to delivering the best in scientific equipment supply
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
        >
          {team.map((member, idx) => (
            <div
              key={idx}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "32px 20px",
                textAlign: "center",
                border: "1px solid #f0f0f0",
                transition: "box-shadow 0.2s",
              }}
            >
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #2D2B7F, #3a38a0)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                {member.initials}
              </div>
              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1a1a2e",
                  margin: "0 0 4px 0",
                }}
              >
                {member.name}
              </h4>
              <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Partners Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #2D2B7F 0%, #1a1a2e 100%)",
          padding: "60px 0",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 40px",
          }}
        >
          <FaAward
            style={{
              fontSize: "36px",
              color: "rgba(255,255,255,0.3)",
              marginBottom: "16px",
            }}
          />
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 12px 0",
            }}
          >
            Trusted by Leading Institutions
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 32px 0",
              lineHeight: 1.7,
            }}
          >
            We proudly serve research laboratories, universities, pharmaceutical companies, and
            government institutions across Telangana and Andhra Pradesh.
          </p>
          <a
            href="/products"
            className="login-submit-btn"
            style={{
              display: "inline-block",
              padding: "14px 36px",
              background: "#fff",
              color: "#2D2B7F",
              fontSize: "15px",
              fontWeight: 700,
              borderRadius: "8px",
              textDecoration: "none",
              transition: "all 0.25s",
            }}
          >
            Explore Our Products
          </a>
        </div>
      </div>
    </div>
  );
}

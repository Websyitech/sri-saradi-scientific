"use client";

import { useState, useEffect } from "react";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaChevronDown,
  FaChevronUp,
  FaUsers,
  FaGraduationCap,
  FaHeartbeat,
  FaRocket,
} from "react-icons/fa";

interface JobOpening {
  id: string;
  title: string;
  department: string | null;
  location: string | null;
  type: string | null;
  description: string | null;
  responsibilities: string[];
  requirements: string[];
  postedAt: string;
}

const benefits = [
  {
    icon: <FaHeartbeat />,
    title: "Health & Wellness",
    desc: "Comprehensive health insurance coverage for you and your family.",
  },
  {
    icon: <FaGraduationCap />,
    title: "Learning & Growth",
    desc: "Training programs and certifications to enhance your expertise.",
  },
  {
    icon: <FaUsers />,
    title: "Collaborative Culture",
    desc: "Work with passionate scientists and industry professionals.",
  },
  {
    icon: <FaRocket />,
    title: "Career Advancement",
    desc: "Clear career paths with regular performance-based promotions.",
  },
];

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [openings, setOpenings] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/careers")
      .then((res) => res.json())
      .then((data: JobOpening[]) => {
        if (data && Array.isArray(data)) setOpenings(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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
          <span style={{ color: "#444" }}>Careers</span>
        </div>
      </div>

      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #2D2B7F 0%, #1a1a2e 100%)",
          padding: "70px 0",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "-80px",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            right: "5%",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
          }}
        />

        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            padding: "0 40px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <FaBriefcase
            style={{
              fontSize: "36px",
              color: "rgba(255,255,255,0.25)",
              marginBottom: "16px",
            }}
          />
          <h1
            style={{
              fontSize: "38px",
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 12px 0",
            }}
          >
            Join Our Team
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.65)",
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            Be part of a team that empowers scientific research. We're looking for passionate
            individuals who want to make a difference in the world of science.
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "60px 40px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "#2D2B7F",
              display: "block",
              marginBottom: "12px",
            }}
          >
            Why Work With Us
          </span>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 800,
              color: "#1a1a2e",
              margin: 0,
            }}
          >
            Benefits & Perks
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {benefits.map((b, idx) => (
            <div
              key={idx}
              style={{
                background: "#f8f9fb",
                borderRadius: "12px",
                padding: "28px 20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #2D2B7F, #3a38a0)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "20px",
                  marginBottom: "16px",
                }}
              >
                {b.icon}
              </div>
              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1a1a2e",
                  margin: "0 0 8px 0",
                }}
              >
                {b.title}
              </h4>
              <p
                style={{
                  fontSize: "13px",
                  color: "#888",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div
        style={{
          background: "#f8f9fb",
          padding: "60px 0",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 40px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "#2D2B7F",
                display: "block",
                marginBottom: "12px",
              }}
            >
              Open Positions
            </span>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#1a1a2e",
                margin: "0 0 8px 0",
              }}
            >
              Current Openings
            </h2>
            <p style={{ fontSize: "14px", color: "#888", margin: 0 }}>
              {loading ? "Loading..." : `${openings.length} positions available`}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {openings.map((job) => (
              <div
                key={job.id}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  border: expandedJob === job.id ? "1px solid #2D2B7F" : "1px solid #f0f0f0",
                  transition: "border-color 0.2s",
                }}
              >
                {/* Job Header */}
                <button
                  onClick={() =>
                    setExpandedJob(expandedJob === job.id ? null : job.id)
                  }
                  style={{
                    width: "100%",
                    padding: "24px 28px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "17px",
                        fontWeight: 700,
                        color: "#1a1a2e",
                        margin: "0 0 8px 0",
                      }}
                    >
                      {job.title}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "13px",
                          color: "#888",
                        }}
                      >
                        <FaBriefcase style={{ fontSize: "11px" }} />
                        {job.department}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "13px",
                          color: "#888",
                        }}
                      >
                        <FaMapMarkerAlt style={{ fontSize: "11px" }} />
                        {job.location}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "13px",
                          color: "#888",
                        }}
                      >
                        <FaClock style={{ fontSize: "11px" }} />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#2D2B7F",
                      fontSize: "16px",
                      flexShrink: 0,
                    }}
                  >
                    {expandedJob === job.id ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>

                {/* Job Details */}
                {expandedJob === job.id && (
                  <div
                    style={{
                      padding: "0 28px 28px",
                      borderTop: "1px solid #f0f0f0",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: 1.7,
                        color: "#666",
                        margin: "20px 0",
                      }}
                    >
                      {job.description}
                    </p>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "28px",
                        marginBottom: "24px",
                      }}
                    >
                      <div>
                        <h4
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#1a1a2e",
                            margin: "0 0 12px 0",
                          }}
                        >
                          Responsibilities
                        </h4>
                        <ul
                          style={{
                            margin: 0,
                            padding: "0 0 0 18px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          {job.responsibilities.map((r, i) => (
                            <li
                              key={i}
                              style={{
                                fontSize: "13px",
                                color: "#666",
                                lineHeight: 1.6,
                              }}
                            >
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#1a1a2e",
                            margin: "0 0 12px 0",
                          }}
                        >
                          Requirements
                        </h4>
                        <ul
                          style={{
                            margin: 0,
                            padding: "0 0 0 18px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          {job.requirements.map((r, i) => (
                            <li
                              key={i}
                              style={{
                                fontSize: "13px",
                                color: "#666",
                                lineHeight: 1.6,
                              }}
                            >
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ fontSize: "12px", color: "#aaa" }}>
                        Posted: {new Date(job.postedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </span>
                      <a
                        href={`mailto:careers@srisaradiscientific.com?subject=Application for ${job.title}`}
                        className="login-submit-btn"
                        style={{
                          display: "inline-block",
                          padding: "12px 28px",
                          background: "linear-gradient(135deg, #2D2B7F, #3a38a0)",
                          color: "#fff",
                          fontSize: "14px",
                          fontWeight: 700,
                          borderRadius: "8px",
                          textDecoration: "none",
                          transition: "all 0.25s",
                          boxShadow: "0 4px 16px rgba(45, 43, 127, 0.3)",
                        }}
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
              padding: "32px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#1a1a2e",
                margin: "0 0 8px 0",
              }}
            >
              Don't see a role that fits?
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#888",
                margin: "0 0 20px 0",
              }}
            >
              Send your resume to{" "}
              <a
                href="mailto:careers@srisaradiscientific.com"
                style={{ color: "#2D2B7F", textDecoration: "underline" }}
              >
                careers@srisaradiscientific.com
              </a>{" "}
              and we'll keep you in mind for future opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

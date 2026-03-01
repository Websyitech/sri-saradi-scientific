"use client";

import { useState } from "react";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setEmail("");
            setTimeout(() => setStatus("idle"), 3000);
        }, 1000);
    };

    return (
        <section className="newsletter-section">
            <div className="newsletter-container">

                <div className="newsletter-content">
                    <div className="newsletter-icon-wrap">
                        <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </div>

                    <div className="newsletter-text">
                        <h2 className="newsletter-title">Sign Up For Newsletter</h2>
                        <p className="newsletter-desc">
                            Sign up for all the news about our latest arrivals and get an exclusive early.
                        </p>
                    </div>
                </div>

                <form className="newsletter-form" onSubmit={handleSubmit}>
                    <div className="newsletter-input-group">
                        <input
                            type="email"
                            className="newsletter-input"
                            placeholder="Your mail address..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={status === "loading" || status === "success"}
                        />
                        <button
                            type="submit"
                            className="newsletter-submit"
                            disabled={status === "loading" || status === "success"}
                        >
                            {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
                        </button>
                    </div>
                </form>

            </div>
        </section>
    );
}

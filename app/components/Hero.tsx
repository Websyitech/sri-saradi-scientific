interface HeroButton {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'outline';
}

interface HeroProps {
  title?: string;
  heading?: string | React.ReactNode;
  description?: string;
  image?: string | null;
  showPartnerPill?: boolean;
  showActions?: boolean;
  buttons?: HeroButton[];
}

export default function Hero({ 
  title = "Cotaus Authorized Distributor · India",
  heading = (
    <>
      Your Trusted Source for<br />
      <span className="hl">World-Class</span> Lab<br />
      Consumables <span className="hl2">in India</span>
    </>
  ),
  description = "Sri Saradi Scientific brings Cotaus's ISO 13485-certified laboratory consumables — pipette tips, PCR plates, cell culture systems, cryogenic tubes, and more — directly to research labs, pharmaceutical companies, and diagnostic centers across India.",
  image,
  showPartnerPill = true,
  showActions = true,
  buttons,
}: HeroProps = {}) {
  // Default buttons if not provided
  const defaultButtons = [
    { label: "Get a Quote", href: "#contact", variant: "primary" as const },
    { label: "Download the Product", href: "#download", variant: "outline" as const }
  ];
  
  const buttonList: HeroButton[] = buttons || defaultButtons;
  return (
    <div className="hero">
      <div className="hero-grid-bg"></div>
      <div className="hero-pattern"></div>

      <div className="hero-left">
        {showPartnerPill && (
          <div className="partner-pill">
            <div className="partner-dot"></div>
            {title}
          </div>
        )}
        <h1>
          {heading}
        </h1>
        {description && (
          <p className="hero-desc">
            {description}
          </p>
        )}
        {showActions && (
          <div className="hero-actions">
            {buttonList.map((btn: HeroButton, idx) => {
              const className = btn.variant === 'outline' ? 'btn-outline' : 'btn-primary';
              
              if (btn.onClick) {
                return (
                  <button
                    key={idx}
                    onClick={btn.onClick}
                    className={className}
                    style={{
                      background: btn.variant === 'outline' ? 'transparent' : 'var(--teal)',
                      color: '#fff',
                      padding: '0.85rem 2rem',
                      borderRadius: '40px',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      boxShadow: btn.variant === 'outline' ? 'none' : '0 4px 20px rgba(0,158,142,0.4)',
                      border: btn.variant === 'outline' ? '1px solid rgba(255,255,255,0.25)' : 'none',
                      cursor: 'pointer',
                      display: 'inline-block'
                    }}
                  >
                    {btn.label}
                  </button>
                );
              }
              
              return (
                <a
                  key={idx}
                  href={btn.href}
                  className={className}
                >
                  {btn.label}
                </a>
              );
            })}
          </div>
        )}
        {/* <div className="hero-stats">
          <div>
            <div className="hstat-val">
              1,000<span>+</span>
            </div>
            <div className="hstat-label">Product SKUs</div>
          </div>
          <div>
            <div className="hstat-val">9</div>
            <div className="hstat-label">Product Series</div>
          </div>
          <div>
            <div className="hstat-val">
              15<span>+ yrs</span>
            </div>
            <div className="hstat-label">Manufacturer Experience</div>
          </div>
        </div> */}
      </div>

      <div className="hero-right">
        {image ? (
          <div className="hero-image-placeholder">
            <img 
              src={image} 
              alt="Product" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '12px'
              }}
            />
          </div>
        ) : (
          <div className="hero-image-placeholder">
            <div className="placeholder-content">
              <span className="placeholder-icon">🖼️</span>
              <p>Hero Image</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

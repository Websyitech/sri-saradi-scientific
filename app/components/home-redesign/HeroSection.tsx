'use client';

import React from 'react';
import { SvgIcon } from './SvgIcon';

interface HeroSectionProps {
  onOpenEnquiry: (category?: string) => void;
  motionPaused: boolean;
  onToggleMotion: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenEnquiry,
  motionPaused,
  onToggleMotion,
}) => {
  return (
    <section className="hero home-hero">
      <div className="wrap">
        <div className="hero-grid">
          {/* Left Column: Hero Copy */}
          <div className="hero-copy">
            <div className="eyebrow">Scientist-led sourcing. Integrated logistics.</div>
            <h1>
              From scientific need
              <br />
              to <span className="blue">global supply.</span>
            </h1>
            <p className="lead">
              We help laboratories, industries and dealers translate an application into the right product requirements — then connect manufacturer expertise, supporting documents and worldwide delivery through one scientific point of contact.
            </p>
            <div className="actions">
              <button
                type="button"
                className="btn"
                onClick={() => onOpenEnquiry('product')}
              >
                Discuss your requirement <span aria-hidden="true">↗</span>
              </button>
              <a className="text-link" href="#workflow">
                See how we work ↓
              </a>
            </div>
            <div className="hero-tag">FOR LABORATORIES, INDUSTRIES &amp; DEALERS</div>
          </div>

          {/* Right Column: Science Window Graphic */}
          <div className="hero-art">
            <div className="science-window">
              <div className="window-label">
                <span>THE CONNECTED WORKFLOW</span>
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <i className="status-dot"></i> SCIENCE, SUPPORTED
                </span>
              </div>

              <svg className="science-svg" viewBox="0 0 560 490" aria-hidden="true"><defs><linearGradient id="strand" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#74e1ff"/><stop offset=".5" stopColor="#009FE3"/><stop offset="1" stopColor="#7585ed"/></linearGradient><linearGradient id="rung"><stop stopColor="#5ddaff"/><stop offset="1" stopColor="#6d80d2"/></linearGradient><radialGradient id="sphere"><stop stopColor="#4665bc" stopOpacity=".45"/><stop offset=".85" stopColor="#162855" stopOpacity=".3"/><stop offset="1" stopColor="#69c9ee" stopOpacity=".2"/></radialGradient><filter id="glow"><feGaussianBlur stdDeviation="3"/></filter></defs><ellipse cx="280" cy="260" rx="195" ry="145" fill="none" stroke="#5374ac" strokeOpacity=".23" transform="rotate(-25 280 260)"/><ellipse cx="280" cy="260" rx="215" ry="100" fill="none" stroke="#547bc2" strokeOpacity=".3" transform="rotate(32 280 260)"/><circle cx="280" cy="246" r="134" fill="url(#sphere)" stroke="#8ab8ec" strokeOpacity=".15"/><circle cx="280" cy="246" r="153" fill="none" stroke="#72b5e9" strokeOpacity=".2" strokeDasharray="2 8"/><path className="flow-line" d="M86 161Q280 30 470 254Q482 445 170 379Q27 321 86 161" fill="none" stroke="#36b4e9" opacity=".45"/><g className="orbiter"><circle cx="477" cy="268" r="5" fill="#77dfff"/><circle cx="128" cy="365" r="4" fill="#87a1f2"/></g><g className="float"><line x1="280.0" y1="115" x2="280.0" y2="115" stroke="url(#rung)" strokeWidth="3" opacity=".75"/><line x1="299.3" y1="129" x2="260.7" y2="129" stroke="url(#rung)" strokeWidth="3" opacity=".75"/><line x1="316.2" y1="143" x2="243.8" y2="143" stroke="url(#rung)" strokeWidth="3" opacity=".75"/><line x1="328.4" y1="157" x2="231.6" y2="157" stroke="url(#rung)" strokeWidth="3" opacity=".75"/><line x1="334.5" y1="171" x2="225.5" y2="171" stroke="url(#rung)" strokeWidth="3" opacity=".75"/><line x1="333.6" y1="185" x2="226.4" y2="185" stroke="url(#rung)" strokeWidth="3" opacity=".75"/><line x1="325.9" y1="199" x2="234.1" y2="199" stroke="url(#rung)" strokeWidth="3" opacity=".75"/><line x1="312.3" y1="213" x2="247.7" y2="213" stroke="url(#rung)" strokeWidth="3" opacity=".75"/><line x1="294.6" y1="227" x2="265.4" y2="227" stroke="url(#rung)" strokeWidth="3" opacity=".75"/><line x1="275.1" y1="241" x2="284.9" y2="241" stroke="url(#rung)" strokeWidth="3" opacity=".75"/><line x1="256.1" y1="255" x2="303.9" y2="255" stroke="url(#rung)" strokeWidth="3" opacity=".75"/><line x1="240.2" y1="269" x2="319.8" y2="269" stroke="url(#rung)" strokeWidth="3" opacity=".75"/><line x1="229.4" y1="283" x2="330.6" y2="283" stroke="url(#rung)" strokeWidth="3" opacity=".75"/><line x1="225.1" y1="297" x2="334.9" y2="297" stroke="url(#rung)" strokeWidth="3" opacity=".75"/><line x1="227.7" y1="311" x2="332.3" y2="311" stroke="url(#rung)" strokeWidth="3" opacity=".75"/><line x1="237.0" y1="325" x2="323.0" y2="325" stroke="url(#rung)" strokeWidth="3" opacity=".75"/><line x1="251.8" y1="339" x2="308.2" y2="339" stroke="url(#rung)" strokeWidth="3" opacity=".75"/><line x1="270.2" y1="353" x2="289.8" y2="353" stroke="url(#rung)" strokeWidth="3" opacity=".75"/><path d="M 280.00,115 L 282.82,117 L 285.63,119 L 288.43,121 L 291.21,123 L 293.95,125 L 296.66,127 L 299.33,129 L 301.94,131 L 304.50,133 L 306.99,135 L 309.41,137 L 311.75,139 L 314.02,141 L 316.19,143 L 318.26,145 L 320.24,147 L 322.11,149 L 323.87,151 L 325.51,153 L 327.03,155 L 328.43,157 L 329.71,159 L 330.85,161 L 331.86,163 L 332.73,165 L 333.46,167 L 334.05,169 L 334.50,171 L 334.81,173 L 334.97,175 L 334.99,177 L 334.86,179 L 334.59,181 L 334.18,183 L 333.62,185 L 332.92,187 L 332.09,189 L 331.11,191 L 330.00,193 L 328.76,195 L 327.39,197 L 325.90,199 L 324.29,201 L 322.56,203 L 320.72,205 L 318.77,207 L 316.71,209 L 314.57,211 L 312.33,213 L 310.00,215 L 307.60,217 L 305.13,219 L 302.59,221 L 299.98,223 L 297.33,225 L 294.63,227 L 291.89,229 L 289.13,231 L 286.33,233 L 283.52,235 L 280.71,237 L 277.88,239 L 275.07,241 L 272.27,243 L 269.49,245 L 266.73,247 L 264.01,249 L 261.34,251 L 258.71,253 L 256.14,255 L 253.63,257 L 251.19,259 L 248.82,261 L 246.54,263 L 244.35,265 L 242.25,267 L 240.25,269 L 238.35,271 L 236.56,273 L 234.89,275 L 233.34,277 L 231.91,279 L 230.60,281 L 229.43,283 L 228.38,285 L 227.48,287 L 226.71,289 L 226.08,291 L 225.60,293 L 225.25,295 L 225.06,297 L 225.00,299 L 225.09,301 L 225.33,303 L 225.71,305 L 226.23,307 L 226.89,309 L 227.69,311 L 228.63,313 L 229.71,315 L 230.91,317 L 232.25,319 L 233.71,321 L 235.30,323 L 237.00,325 L 238.81,327 L 240.74,329 L 242.76,331 L 244.89,333 L 247.10,335 L 249.41,337 L 251.79,339 L 254.25,341 L 256.77,343 L 259.36,345 L 262.00,347 L 264.69,349 L 267.42,351 L 270.18,353 L 272.97,355 L 275.77,357 L 278.59,359" fill="none" stroke="url(#strand)" strokeWidth="10" strokeLinecap="round"/><path d="M 280.00,115 L 277.18,117 L 274.37,119 L 271.57,121 L 268.79,123 L 266.05,125 L 263.34,127 L 260.67,129 L 258.06,131 L 255.50,133 L 253.01,135 L 250.59,137 L 248.25,139 L 245.98,141 L 243.81,143 L 241.74,145 L 239.76,147 L 237.89,149 L 236.13,151 L 234.49,153 L 232.97,155 L 231.57,157 L 230.29,159 L 229.15,161 L 228.14,163 L 227.27,165 L 226.54,167 L 225.95,169 L 225.50,171 L 225.19,173 L 225.03,175 L 225.01,177 L 225.14,179 L 225.41,181 L 225.82,183 L 226.38,185 L 227.08,187 L 227.91,189 L 228.89,191 L 230.00,193 L 231.24,195 L 232.61,197 L 234.10,199 L 235.71,201 L 237.44,203 L 239.28,205 L 241.23,207 L 243.29,209 L 245.43,211 L 247.67,213 L 250.00,215 L 252.40,217 L 254.87,219 L 257.41,221 L 260.02,223 L 262.67,225 L 265.37,227 L 268.11,229 L 270.87,231 L 273.67,233 L 276.48,235 L 279.29,237 L 282.12,239 L 284.93,241 L 287.73,243 L 290.51,245 L 293.27,247 L 295.99,249 L 298.66,251 L 301.29,253 L 303.86,255 L 306.37,257 L 308.81,259 L 311.18,261 L 313.46,263 L 315.65,265 L 317.75,267 L 319.75,269 L 321.65,271 L 323.44,273 L 325.11,275 L 326.66,277 L 328.09,279 L 329.40,281 L 330.57,283 L 331.62,285 L 332.52,287 L 333.29,289 L 333.92,291 L 334.40,293 L 334.75,295 L 334.94,297 L 335.00,299 L 334.91,301 L 334.67,303 L 334.29,305 L 333.77,307 L 333.11,309 L 332.31,311 L 331.37,313 L 330.29,315 L 329.09,317 L 327.75,319 L 326.29,321 L 324.70,323 L 323.00,325 L 321.19,327 L 319.26,329 L 317.24,331 L 315.11,333 L 312.90,335 L 310.59,337 L 308.21,339 L 305.75,341 L 303.23,343 L 300.64,345 L 298.00,347 L 295.31,349 L 292.58,351 L 289.82,353 L 287.03,355 L 284.23,357 L 281.41,359" fill="none" stroke="url(#strand)" strokeWidth="8" strokeLinecap="round"/><path d="M 280.00,115 L 282.82,117 L 285.63,119 L 288.43,121 L 291.21,123 L 293.95,125 L 296.66,127 L 299.33,129 L 301.94,131 L 304.50,133 L 306.99,135 L 309.41,137 L 311.75,139 L 314.02,141 L 316.19,143 L 318.26,145 L 320.24,147 L 322.11,149 L 323.87,151 L 325.51,153 L 327.03,155 L 328.43,157 L 329.71,159 L 330.85,161 L 331.86,163 L 332.73,165 L 333.46,167 L 334.05,169 L 334.50,171 L 334.81,173 L 334.97,175 L 334.99,177 L 334.86,179 L 334.59,181 L 334.18,183 L 333.62,185 L 332.92,187 L 332.09,189 L 331.11,191 L 330.00,193 L 328.76,195 L 327.39,197 L 325.90,199 L 324.29,201 L 322.56,203 L 320.72,205 L 318.77,207 L 316.71,209 L 314.57,211 L 312.33,213 L 310.00,215 L 307.60,217 L 305.13,219 L 302.59,221 L 299.98,223 L 297.33,225 L 294.63,227 L 291.89,229 L 289.13,231 L 286.33,233 L 283.52,235 L 280.71,237 L 277.88,239 L 275.07,241 L 272.27,243 L 269.49,245 L 266.73,247 L 264.01,249 L 261.34,251 L 258.71,253 L 256.14,255 L 253.63,257 L 251.19,259 L 248.82,261 L 246.54,263 L 244.35,265 L 242.25,267 L 240.25,269 L 238.35,271 L 236.56,273 L 234.89,275 L 233.34,277 L 231.91,279 L 230.60,281 L 229.43,283 L 228.38,285 L 227.48,287 L 226.71,289 L 226.08,291 L 225.60,293 L 225.25,295 L 225.06,297 L 225.00,299 L 225.09,301 L 225.33,303 L 225.71,305 L 226.23,307 L 226.89,309 L 227.69,311 L 228.63,313 L 229.71,315 L 230.91,317 L 232.25,319 L 233.71,321 L 235.30,323 L 237.00,325 L 238.81,327 L 240.74,329 L 242.76,331 L 244.89,333 L 247.10,335 L 249.41,337 L 251.79,339 L 254.25,341 L 256.77,343 L 259.36,345 L 262.00,347 L 264.69,349 L 267.42,351 L 270.18,353 L 272.97,355 L 275.77,357 L 278.59,359" fill="none" stroke="#b6e9ff" strokeWidth="2" opacity=".55"/><circle cx="256" cy="151" r="3" fill="#c2f3ff"/><circle cx="323" cy="297" r="3" fill="#c2f3ff"/></g><circle cx="88" cy="161" r="4" fill="#49c6f5"/><circle cx="468" cy="254" r="4" fill="#49c6f5"/><circle cx="170" cy="380" r="4" fill="#7bd6b5"/></svg>

              <div className="art-pill pill-1">
                <SvgIcon name="target" />
                <span>Your application</span>
              </div>

              <div className="art-pill pill-2">
                <SvgIcon name="network" />
                <span>Manufacturer input</span>
              </div>

              <div className="art-pill pill-3">
                <SvgIcon name="document" />
                <span>Documents &amp; follow-up</span>
              </div>

              <button
                type="button"
                className="motion-toggle"
                onClick={onToggleMotion}
                aria-pressed={motionPaused}
              >
                {motionPaused ? 'Resume motion' : 'Pause motion'}
              </button>

              <div className="window-footer">
                <span>REQUIREMENT → PRODUCT → SUPPORT</span>
                <strong>One partner.</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Facts Footer */}
        <div className="hero-facts">
          <div>
            <SvgIcon name="people" />
            <span>Founded by bench scientists</span>
          </div>
          <div>
            <SvgIcon name="network" />
            <span>Direct access to manufacturer expertise</span>
          </div>
          <div>
            <SvgIcon name="box" />
            <span>Integrated worldwide logistics</span>
          </div>
        </div>
      </div>
    </section>
  );
};

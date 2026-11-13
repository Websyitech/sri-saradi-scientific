'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SvgIcon } from './SvgIcon';
import TextType from './TextType';

interface HeroSectionProps {
  onOpenEnquiry: (category?: string) => void;
  motionPaused: boolean;
  onToggleMotion: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenEnquiry, motionPaused }) => {
  return (
    <section className="hero home-hero hero-reference">
      <div className="hero-reference-background" aria-hidden="true">
        <Image
          src="/assets/laboratory_banner_2.webp"
          alt="Scientist working in a laboratory"
          fill
          priority
          sizes="100vw"
          className="hero-reference-image"
        />
        <div className="hero-reference-overlay" />
      </div>

      <div className="wrap hero-reference-wrap">
        <div className="hero-copy-wrap">
          <div className="hero-copy">
            <h1>
              From scientific need
              <br />
              <span className="hero-typed-line">
                <TextType
                  as="span"
                  className="blue"
                  prefix="to "
                  prefixColor="#fff"
                  text={[
                    'global supply.',
                    'seamless delivery.',
                    'verified quality.',
                    'trusted sourcing.',
                  ]}
                  typingSpeed={70}
                  pauseDuration={2200}
                  deletingSpeed={45}
                  deleteMode="backspace"
                  typeEffect="fade"
                  cursorStyle="bar"
                  cursorGlide
                  showCursor
                  pause={motionPaused}
                />
              </span>
            </h1>
            <p className="lead">
              We help laboratories, industries and dealers translate an application into the right product requirements then connect manufacturer expertise, supporting documents and worldwide delivery through one scientific point of contact.
            </p>
            <div className="actions">
              <button
                type="button"
                className="btn"
                id="hero-discuss-requirement-btn"
                aria-haspopup="dialog"
                aria-controls="enquiry-dialog"
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
        </div>

        <div className="hero-facts">
          <div><SvgIcon name="people" /><span>Founded by bench scientists</span></div>
          <div><SvgIcon name="network" /><span>Direct access to manufacturer expertise</span></div>
          <div><SvgIcon name="box" /><span>Integrated worldwide logistics</span></div>
        </div>
      </div>
    </section>
  );
};

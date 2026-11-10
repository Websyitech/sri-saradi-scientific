'use client';

import React, { useState, useEffect } from 'react';
import './home-redesign.css';

import { HeroSection } from './HeroSection';
import { PartnerBar } from './PartnerBar';
import { LogisticsSection } from './LogisticsSection';
import { ProblemSection } from './ProblemSection';
import { DivisionSection } from './DivisionSection';
import { PlasticsSection } from './PlasticsSection';
import { WorkflowSection } from './WorkflowSection';
import { AudienceSection } from './AudienceSection';
import { CostSection } from './CostSection';
import { DocumentationSection } from './DocumentationSection';
import { TeamSection } from './TeamSection';
import { FaqSection } from './FaqSection';
import { CtaSection } from './CtaSection';
import { EnquiryModal } from './EnquiryModal';

export const HomeRedesign: React.FC = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState<boolean>(false);
  const [enquiryCategory, setEnquiryCategory] = useState<string>('product');
  const [motionPaused, setMotionPaused] = useState<boolean>(false);

  const handleOpenEnquiry = (category: string = 'product') => {
    setEnquiryCategory(category);
    setIsEnquiryOpen(true);
  };

  const handleToggleMotion = () => {
    setMotionPaused((prev) => !prev);
  };

  // Scroll reveal animation handler
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 }
      );

      const revealElements = document.querySelectorAll('.homepage-redesign section:not(.hero) .reveal');
      revealElements.forEach((el) => {
        el.classList.add('js-reveal');
        observer.observe(el);
      });

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div className={`homepage-redesign ${motionPaused ? 'motion-paused' : ''}`}>
      <HeroSection
        onOpenEnquiry={handleOpenEnquiry}
        motionPaused={motionPaused}
        onToggleMotion={handleToggleMotion}
      />
      <PartnerBar />
      <DivisionSection />
      <LogisticsSection onOpenEnquiry={handleOpenEnquiry} />
      <WorkflowSection />
      <ProblemSection />
      <PlasticsSection onOpenEnquiry={handleOpenEnquiry} />
      <AudienceSection onOpenEnquiry={handleOpenEnquiry} />
      <CostSection onOpenEnquiry={handleOpenEnquiry} />
      <DocumentationSection onOpenEnquiry={handleOpenEnquiry} />
      <TeamSection />
      <FaqSection onOpenEnquiry={handleOpenEnquiry} />
      <CtaSection onOpenEnquiry={handleOpenEnquiry} />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialCategory={enquiryCategory}
      />
    </div>
  );
};

export default HomeRedesign;

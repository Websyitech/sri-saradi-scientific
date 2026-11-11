'use client';

import React, { useState } from 'react';
import { workflows, WorkflowCategory, WorkflowStep } from './workflow-data';
import { SvgIcon } from './SvgIcon';

export const WorkflowSection: React.FC = () => {
  const [currentFlow, setCurrentFlow] = useState<string>('molecular');
  const [currentStep, setCurrentStep] = useState<number>(0);

  const flowData: WorkflowCategory = workflows[currentFlow] || workflows.molecular;
  const count = flowData.steps.length;
  const activeStep: WorkflowStep = flowData.steps[currentStep] || flowData.steps[0];

  const handleTabChange = (key: string) => {
    setCurrentFlow(key);
    setCurrentStep(0);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(count - 1, prev + 1));
  };

  return (
    <section className="section workflow-section" id="workflow">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">Watch the work move forward</div>
            <h2>
              One requirement.
              <br />
              Connected from bench to delivery.
            </h2>
          </div>
          <p>
            Choose your application. Follow the brief, the product review and the supply route with a clear owner and a useful output at every stage.
          </p>
        </div>

        <div className="tab-bar" role="tablist" aria-label="Select application">
          <button
            id="flow-tab-molecular"
            role="tab"
            aria-selected={currentFlow === 'molecular'}
            aria-controls="flow-content"
            onClick={() => handleTabChange('molecular')}
          >
            Molecular biology
          </button>
          <button
            id="flow-tab-plasticware"
            role="tab"
            aria-selected={currentFlow === 'plasticware'}
            aria-controls="flow-content"
            onClick={() => handleTabChange('plasticware')}
          >
            Biological plasticware
          </button>
          <button
            id="flow-tab-lab"
            role="tab"
            aria-selected={currentFlow === 'lab'}
            aria-controls="flow-content"
            onClick={() => handleTabChange('lab')}
          >
            Lab filtration
          </button>
          <button
            id="flow-tab-process"
            role="tab"
            aria-selected={currentFlow === 'process'}
            aria-controls="flow-content"
            onClick={() => handleTabChange('process')}
          >
            Process filtration
          </button>
        </div>

        <div
          id="flow-content"
          role="tabpanel"
          aria-labelledby={`flow-tab-${currentFlow}`}
        >
          {/* Workflow Stepper + Panel */}
          <div className="workflow">
            <div className="step-list" id="flow-steps">
              {flowData.steps.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  className={`step ${i === currentStep ? 'active' : ''}`}
                  aria-pressed={i === currentStep}
                  aria-controls="flow-panel"
                  onClick={() => setCurrentStep(i)}
                >
                  <span className="step-info">
                    <strong>{s.title}</strong>
                    <small>{s.subtitle}</small>
                  </span>
                </button>
              ))}
            </div>

            <div className="workflow-panel" id="flow-panel" aria-live="polite" aria-atomic="true">
              <div className="panel-glow" aria-hidden="true" />
              <div className="panel-index">
                <span className="panel-chip">{flowData.label}</span>
                <span className="panel-counter">Stage 0{currentStep + 1} / 0{count}</span>
              </div>
              <div className="panel-body">
                <div className="panel-main">
                  <div className="panel-icon" aria-hidden="true">
                    <SvgIcon name={activeStep.icon} />
                  </div>
                  <div>
                    <h3>{activeStep.heading}</h3>
                    <p>{activeStep.description}</p>
                  </div>
                </div>
                <div className="panel-meta-row">
                  <div className="stage-owner">
                    <strong>Who works on this</strong>
                    <span>{activeStep.owner}</span>
                  </div>
                  <div className="stage-input">
                    <span className="in-badge">IN</span>
                    <p>{activeStep.input}</p>
                  </div>
                </div>
              </div>
              <div className="outcome">
                <span className="output-label">OUT / What moves to the next step</span>
                <p className="outcome-text">{activeStep.outcome}</p>
              </div>

              <div className="journey-navigation">
                <button
                  id="previous-step"
                  type="button"
                  className="journey-button"
                  disabled={currentStep === 0}
                  onClick={handlePrev}
                >
                  ← Previous stage
                </button>
                <button
                  id="next-step"
                  type="button"
                  className="journey-button"
                  disabled={currentStep === count - 1}
                  onClick={handleNext}
                >
                  Next stage →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

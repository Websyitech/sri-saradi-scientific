'use client';

import React, { useState, useEffect, useRef } from 'react';
import { workflows, WorkflowCategory, WorkflowStep } from './workflow-data';
import { SvgIcon } from './SvgIcon';

const TRACK_LABELS = ['Brief', 'Review', 'Quote', 'Deliver', 'Follow up'];

export const WorkflowSection: React.FC = () => {
  const [currentFlow, setCurrentFlow] = useState<string>('molecular');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('Explore at your own pace');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const flowData: WorkflowCategory = workflows[currentFlow] || workflows.molecular;
  const count = flowData.steps.length;
  const activeStep: WorkflowStep = flowData.steps[currentStep] || flowData.steps[0];

  const stopWorkflow = (msg = 'Explore at your own pace') => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
    setStatusMessage(msg);
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      stopWorkflow('Paused — select a stage to explore');
    } else {
      setIsPlaying(true);
      setStatusMessage('Playing • 6 seconds per stage');
      setCurrentStep(0);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < count - 1) {
            return prev + 1;
          } else {
            stopWorkflow('Workflow complete — select any stage to explore');
            return prev;
          }
        });
      }, 6000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, count]);

  const handleTabChange = (key: string) => {
    stopWorkflow();
    setCurrentFlow(key);
    setCurrentStep(0);
  };

  const handleStepClick = (index: number) => {
    stopWorkflow();
    setCurrentStep(index);
  };

  const handlePrev = () => {
    stopWorkflow();
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    stopWorkflow();
    setCurrentStep((prev) => Math.min(count - 1, prev + 1));
  };

  return (
    <section className="section dark-section" id="workflow">
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
            Choose your application. Follow the brief, the product review and the supply route — with a clear owner and a useful output at every stage.
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
          className={isPlaying ? 'is-playing' : ''}
        >
          <div className="journey-controls">
            <span id="journey-status">{statusMessage}</span>
            <button
              id="play-workflow"
              className="journey-button"
              aria-pressed={isPlaying}
              onClick={handlePlayToggle}
            >
              {isPlaying ? 'Pause workflow' : 'Play workflow'}
            </button>
          </div>

          {/* Journey Track */}
          <div className="journey-track" id="flow-track" aria-label="Workflow stages">
            {flowData.steps.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`journey-node ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'complete' : ''}`}
                aria-pressed={i === currentStep}
                aria-controls="flow-panel"
                onClick={() => handleStepClick(i)}
              >
                <span className="journey-dot">{i < currentStep ? '✓' : i + 1}</span>
                <strong>{TRACK_LABELS[i] || `Stage ${i + 1}`}</strong>
              </button>
            ))}
          </div>

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
                  onClick={() => handleStepClick(i)}
                >
                  <span className="step-num">0{i + 1}</span>
                  <span>
                    <strong>{s.title}</strong>
                    <small>{s.subtitle}</small>
                  </span>
                </button>
              ))}
            </div>

            <div className="workflow-panel" id="flow-panel" aria-live="polite" aria-atomic="true">
              <div className="panel-index">
                <span>{flowData.label}</span>
                <span>Stage 0{currentStep + 1} / 0{count}</span>
              </div>
              <div className="stage-owner">
                <strong>Who works on this</strong>
                <span>{activeStep.owner}</span>
              </div>
              <div className="stage-input">
                <span>IN</span>
                <p>{activeStep.input}</p>
              </div>
              <div className="panel-icon">
                <SvgIcon name={activeStep.icon} />
              </div>
              <h3>{activeStep.heading}</h3>
              <p>{activeStep.description}</p>
              <div className="outcome">
                <span className="output-label">OUT / What moves to the next step</span>
                {activeStep.outcome}
              </div>
            </div>
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

        <p className="workflow-note">
          Your technical team defines acceptance criteria and approves suitability. We connect the scientific questions, manufacturer input and integrated logistics. Product delivery is confirmed for the order; custom services follow their project plan.
        </p>
      </div>
    </section>
  );
};

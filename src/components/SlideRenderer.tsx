import React, { useState } from 'react';
import type { SlideData } from '../types/presentation';
import { InteractiveSimulator } from './InteractiveSimulator';
import { IoTVisualLayout } from './IoTVisualLayout';
import { HardwareBoardDiagram } from './HardwareBoardDiagram';

interface SlideRendererProps {
  slide: SlideData;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCode = (codeText: string, index: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <article className={`canva-slide-canvas ${slide.type === 'title' ? 'canvas-cover-page' : ''}`} aria-label={slide.title}>
      {slide.type === 'title' ? (
        <div className="exact-user-cover-layout">
          {/* Top Header Row */}
          <div className="cover-top-bar">
            <span className="cover-course-code">IT-ELECT 3</span>
            <span className="cover-date-arrow">September 19, 2026 &nbsp;&rarr;</span>
          </div>

          {/* Center Title Lockup */}
          <div className="cover-center-content">
            <div className="cover-title-wrapper">
              <h1 className="cover-main-text">anti sleep alarm</h1>
              <span className="cover-script-group1" aria-hidden="true">Group 1</span>
            </div>
          </div>

          {/* Bottom Team Members Footer */}
          <div className="cover-bottom-bar">
            <p className="cover-members-list">
              ALEGRE &middot; CUIZON, C. &middot; CUIZON, V. &middot; CUMAHIG &middot; LOFRANCO &middot; OCHEA &middot; PIZON &middot; TALITY &middot; OCHEA
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Top Slide Meta (Canva Style) */}
          <div className="slide-top-meta">
            <span className="meta-category">{slide.category}</span>
            <span className="meta-counter">SLIDE {String(slide.slideNumber).padStart(2, '0')} / 11</span>
            <span className="meta-right-tag">{slide.heroKicker || '2026 IOT LAB'}</span>
          </div>
          <header className="editorial-slide-header">
            <h2 className="editorial-headline">{slide.title}</h2>
            <p className="editorial-subhead">{slide.subtitle}</p>
          </header>

          {/* Problem Slide (2x2 Giant Numbered Cards) */}
          {slide.type === 'problem' && (
            <div className="editorial-grid-2x2">
              {slide.bullets?.map((b, idx) => (
                <div key={idx} className="editorial-card">
                  <div className="card-top-row">
                    <span className="card-num-huge">0{idx + 1}</span>
                    {b.badge && (
                      <span className={`card-badge ${b.badgeTone === 'warning' ? 'badge-warning' : b.badgeTone === 'success' ? 'badge-success' : ''}`}>
                        {b.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="card-title-prominent">{b.headline}</h3>
                  <p className="card-desc-clean">{b.detail}</p>
                </div>
              ))}
            </div>
          )}

          {/* Concept Slide (4-Step Horizontal Timeline with rich metadata) */}
          {slide.type === 'concept' && (
            <div className="timeline-row">
              {slide.bullets?.map((b, idx) => (
                <div key={idx} className="timeline-step-card">
                  <div className="step-card-top">
                    <div className="step-indicator-circle">{idx + 1}</div>
                    {b.badge && (
                      <span className={`step-badge ${
                        b.badgeTone === 'warning' ? 'badge-warning'
                        : b.badgeTone === 'success' ? 'badge-success'
                        : 'badge-info'
                      }`}>{b.badge}</span>
                    )}
                  </div>
                  <h3 className="step-stage-title">{b.headline}</h3>
                  {b.subhead && <p className="step-subhead">{b.subhead}</p>}
                  <p className="step-stage-desc">{b.detail}</p>
                  <div className="step-meta-grid">
                    {b.component && (
                      <div className="step-meta-item">
                        <span className="step-meta-label">COMPONENT</span>
                        <span className="step-meta-val">{b.component}</span>
                      </div>
                    )}
                    {b.metric && (
                      <div className="step-meta-item">
                        <span className="step-meta-label">THRESHOLD</span>
                        <span className="step-meta-val accent-red">{b.metric}</span>
                      </div>
                    )}
                    {b.trigger && (
                      <div className="step-meta-item step-meta-full">
                        <span className="step-meta-label">HOW IT WORKS</span>
                        <span className="step-meta-val">{b.trigger}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Hardware BOM & Architecture Layout Slide */}
          {slide.type === 'hardware' && (
            <div className="iot-visual-wrapper">
              <IoTVisualLayout />
            </div>
          )}

          {/* Microcontroller Board Anatomy & Part Classification Slide */}
          {slide.type === 'board-diagram' && (
            <div className="board-diagram-slide-wrapper">
              <HardwareBoardDiagram />
            </div>
          )}

          {/* Algorithm Math Slide */}
          {slide.type === 'algorithm' && slide.formula && (
            <div className="algorithm-layout">
              <div className="algorithm-hero-box">
                <div className="formula-big-text">{slide.formula.expression}</div>
                <p className="formula-sub-explain">{slide.formula.description}</p>
              </div>

              <div className="table-editorial-wrapper">
                <table className="editorial-table">
                  <thead>
                    <tr>
                      <th scope="col">OPERATIONAL STATE</th>
                      <th scope="col">EAR NUMERIC THRESHOLD</th>
                      <th scope="col">FIRMWARE INTERPRETATION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slide.formula.thresholds.map((row, idx) => (
                      <tr key={idx}>
                        <td><strong>{row.label}</strong></td>
                        <td><span className="ear-code">{row.value}</span></td>
                        <td>{row.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 3 Algorithm Explainer Cards to Balance the Slide */}
              <div className="algorithm-insights-row">
                <div className="algo-insight-card">
                  <div className="algo-insight-badge">01 &middot; LANDMARKS</div>
                  <h4 className="algo-insight-title">6 Facial Eye Points</h4>
                  <p className="algo-insight-desc">Calculates vertical eyelid gap vs horizontal eye width using 6 coordinates from MediaPipe.</p>
                </div>
                <div className="algo-insight-card">
                  <div className="algo-insight-badge">02 &middot; FILTERING</div>
                  <h4 className="algo-insight-title">0.15s Blink Immunity</h4>
                  <p className="algo-insight-desc">Normal human blinks last ~0.15s and are ignored, preventing false alarms during active study.</p>
                </div>
                <div className="algo-insight-card">
                  <div className="algo-insight-badge">03 &middot; SPEED</div>
                  <h4 className="algo-insight-title">30 FPS Live Sampling</h4>
                  <p className="algo-insight-desc">Executes 30 times per second with instant serial trigger output to the ESP32 controller.</p>
                </div>
              </div>
            </div>
          )}

          {/* Flow FSM Slide */}
          {slide.type === 'flow' && slide.stateSteps && (
            <div className="fsm-steps-list">
              {slide.stateSteps.map((step, idx) => (
                <div key={idx} className="fsm-row-card">
                  <div className="fsm-stage-col">
                    <span className="fsm-stage-num">{step.stage}</span>
                    <span className="fsm-stage-title">{step.title}</span>
                  </div>
                  <div className="fsm-meta-col">
                    <span className="fsm-meta-label">TRIGGER CONDITION</span>
                    <span className="fsm-meta-val">{step.condition}</span>
                  </div>
                  <div className="fsm-meta-col">
                    <span className="fsm-meta-label">ACTUATOR RESPONSE</span>
                    <span className="fsm-meta-val">{step.action}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Code Snippets Slide */}
          {slide.type === 'code' && slide.codeSnippets && (
            <div className="code-editorial-box">
              {slide.codeSnippets.map((snippet, idx) => (
                <React.Fragment key={idx}>
                  <div className="code-header-bar">
                    <div className="code-title-group">
                      <span className="code-dot"></span>
                      <span className="code-fname">{snippet.filename}</span>
                      <span className="code-lang-pill">{snippet.language.toUpperCase()}</span>
                    </div>
                    <button
                      type="button"
                      className="btn-code-copy"
                      onClick={() => handleCopyCode(snippet.code, idx)}
                    >
                      {copiedIndex === idx ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                  <pre className="code-pre-body">
                    <code>{snippet.code}</code>
                  </pre>
                  <div className="code-footer-note">
                    <strong>SYSTEM PURPOSE: </strong>
                    <span>{snippet.description}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Interactive Simulator Slide */}
          {slide.type === 'simulator' && (
            <div className="simulator-embed-wrapper">
              <InteractiveSimulator />
            </div>
          )}

          {/* Challenges & Roadmap Slides */}
          {(slide.type === 'challenges' || slide.type === 'roadmap') && (
            <div className="editorial-grid-2x2">
              {slide.bullets?.map((b, idx) => (
                <div key={idx} className="editorial-card">
                  <div className="card-top-row">
                    <span className="card-num-huge">0{idx + 1}</span>
                    {b.badge && (
                      <span className={`card-badge ${b.badgeTone === 'warning' ? 'badge-warning' : b.badgeTone === 'success' ? 'badge-success' : ''}`}>
                        {b.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="card-title-prominent">{b.headline}</h3>
                  <p className="card-desc-clean">{b.detail}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </article>
  );
};

export default SlideRenderer;

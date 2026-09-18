import React, { useState, useEffect, useCallback } from 'react';
import { presentationSlides } from '../data/slides';
import SlideRenderer from './SlideRenderer';
import { exportPresentationToPPTX } from '../services/pptxExport';

export const Presentation: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const totalSlides = presentationSlides.length;
  const currentSlide = presentationSlides[currentIndex];

  // Track browser fullscreen state across all browser engines
  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as any;
      const isFs = !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );
      setIsFullscreen(isFs);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const goToNext = useCallback(() => {
    if (currentIndex < totalSlides - 1) {
      setDirection('next');
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, totalSlides]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection('prev');
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const toggleFullscreen = async () => {
    try {
      const doc = document as any;
      const root = (document.getElementById('deck-root') || document.documentElement) as any;
      const isFs = !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );

      if (!isFs) {
        if (root.requestFullscreen) {
          await root.requestFullscreen();
        } else if (root.webkitRequestFullscreen) {
          await root.webkitRequestFullscreen();
        } else if (root.mozRequestFullScreen) {
          await root.mozRequestFullScreen();
        } else if (root.msRequestFullscreen) {
          await root.msRequestFullscreen();
        }
      } else {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          await doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen toggle failed:', err);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleExportPPTX = async () => {
    try {
      setIsExporting(true);
      await exportPresentationToPPTX(presentationSlides);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3500);
    } catch (err) {
      console.error('PPTX export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea', 'select'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          goToNext();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          goToPrev();
          break;
        case 'Home':
          e.preventDefault();
          setDirection('prev');
          setCurrentIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setDirection('next');
          setCurrentIndex(totalSlides - 1);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 't':
        case 'T':
          e.preventDefault();
          toggleTheme();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          handleExportPPTX();
          break;
        case '?':
          e.preventDefault();
          setShowShortcuts((prev) => !prev);
          break;
        case 'Escape':
          setShowShortcuts(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, totalSlides]);

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  return (
    <div className={`deck-viewport fullscreen-viewport theme-${theme}`} id="deck-root">
      {/* Export Toast Confirmation */}
      {exportSuccess && (
        <div className="floating-toast-banner" role="status">
          PowerPoint (.pptx) file generated and downloaded!
        </div>
      )}

      {/* Full-Screen Presentation Stage */}
      <main className="deck-stage-fullscreen">
        <div
          key={currentIndex}
          className={`slide-animation-wrapper slide-anim-${direction}`}
        >
          <SlideRenderer slide={currentSlide} />
        </div>

        {/* Discreet Edge Hover Chevrons */}
        {currentIndex > 0 && (
          <button
            type="button"
            className="edge-nav-arrow edge-nav-prev"
            onClick={goToPrev}
            aria-label="Previous Slide (ArrowLeft)"
            title="Previous Slide (Shortcut: ←)"
          >
            &#x2039;
          </button>
        )}
        {currentIndex < totalSlides - 1 && (
          <button
            type="button"
            className="edge-nav-arrow edge-nav-next"
            onClick={goToNext}
            aria-label="Next Slide (ArrowRight / Space)"
            title="Next Slide (Shortcut: → / Space)"
          >
            &#x203A;
          </button>
        )}

        {/* Minimal Bottom-Right Utility Strip (100% Transparent, Fixed on Right) */}
        <aside className="discrete-deck-controls" aria-label="Deck Controls">
          <button
            type="button"
            className="deck-util-btn"
            onClick={handleExportPPTX}
            disabled={isExporting}
            title="Export PowerPoint PPTX (Shortcut: P)"
          >
            {isExporting ? 'Exporting...' : 'PPTX'}
          </button>
          <button
            type="button"
            className="deck-util-btn"
            onClick={toggleTheme}
            title="Toggle Theme (Shortcut: T)"
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
          <button
            type="button"
            className="deck-util-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFullscreen();
            }}
            title="Toggle Fullscreen (Shortcut: F or F11)"
          >
            {isFullscreen ? 'Exit Full' : 'Fullscreen'}
          </button>
        </aside>

        {/* Minimal 3px Bottom Progress Track */}
        <div className="deck-progress-track" aria-hidden="true">
          <div
            className="deck-progress-fill"
            style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
          />
        </div>
      </main>

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div className="modal-overlay" onClick={() => setShowShortcuts(false)}>
          <div
            className="shortcuts-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="shortcuts-title"
          >
            <div className="modal-header">
              <h3 id="shortcuts-title">Keyboard Navigation</h3>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setShowShortcuts(false)}
              >
                Close (Esc)
              </button>
            </div>
            <div className="shortcuts-list">
              <div className="shortcut-row">
                <kbd>Right Arrow</kbd> / <kbd>Space</kbd>
                <span>Next Slide</span>
              </div>
              <div className="shortcut-row">
                <kbd>Left Arrow</kbd>
                <span>Previous Slide</span>
              </div>
              <div className="shortcut-row">
                <kbd>Home</kbd> / <kbd>End</kbd>
                <span>First / Last Slide</span>
              </div>
              <div className="shortcut-row">
                <kbd>F</kbd>
                <span>Fullscreen</span>
              </div>
              <div className="shortcut-row">
                <kbd>T</kbd>
                <span>Toggle Light / Dark Mode</span>
              </div>
              <div className="shortcut-row">
                <kbd>P</kbd>
                <span>Export to PowerPoint PPTX</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

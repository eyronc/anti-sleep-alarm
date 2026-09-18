import React, { useState, useEffect, useRef } from 'react';

export const InteractiveSimulator: React.FC = () => {
  // Stage states: 0 = Monitoring, 1 = Soft Warning, 2 = Piercing Alarm, 3 = Physical Slap + Mist
  const [activeStage, setActiveStage] = useState<0 | 1 | 2 | 3>(0);
  const [isAutoRunning, setIsAutoRunning] = useState<boolean>(false);
  const [autoTimer, setAutoTimer] = useState<number>(0);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [isSlapping, setIsSlapping] = useState<boolean>(false);
  const [isMistSpraying, setIsMistSpraying] = useState<boolean>(false);
  const [acknowledged, setAcknowledged] = useState<boolean>(false);
  const [slapCount, setSlapCount] = useState<number>(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getAudioContext = (): AudioContext => {
    if (!audioCtxRef.current) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // 1. Realistic Physical Slap Sound (White noise impact crack + flesh thump + transient whip snap)
  const playSlapSound = () => {
    if (!audioEnabled) return;
    try {
      const ctx = getAudioContext();
      const t0 = ctx.currentTime;

      // Layer 1: Sharp White Noise Impact Crack
      const bufferSize = Math.floor(ctx.sampleRate * 0.07);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.015));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1400, t0);
      noiseFilter.Q.setValueAtTime(1.8, t0);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.95, t0);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.065);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      // Layer 2: Low-frequency flesh impact thump (180Hz -> 45Hz)
      const thumpOsc = ctx.createOscillator();
      const thumpGain = ctx.createGain();
      thumpOsc.type = 'sine';
      thumpOsc.frequency.setValueAtTime(180, t0);
      thumpOsc.frequency.exponentialRampToValueAtTime(45, t0 + 0.065);

      thumpGain.gain.setValueAtTime(0.8, t0);
      thumpGain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.075);

      thumpOsc.connect(thumpGain);
      thumpGain.connect(ctx.destination);

      // Layer 3: High-frequency whip/snap transient
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = 'triangle';
      snapOsc.frequency.setValueAtTime(3200, t0);
      snapOsc.frequency.exponentialRampToValueAtTime(800, t0 + 0.025);

      snapGain.gain.setValueAtTime(0.55, t0);
      snapGain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.03);

      snapOsc.connect(snapGain);
      snapGain.connect(ctx.destination);

      noise.start(t0);
      thumpOsc.start(t0);
      snapOsc.start(t0);

      thumpOsc.stop(t0 + 0.08);
      snapOsc.stop(t0 + 0.04);
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  };

  // 2. Soft Warning Chime for Stage 1 (Repeated polite 3-note melodic motif)
  const playWarningChimeOnce = () => {
    if (!audioEnabled) return;
    try {
      const ctx = getAudioContext();
      const t0 = ctx.currentTime;

      // Note 1: 523Hz (C5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, t0);
      gain1.gain.setValueAtTime(0.22, t0);
      gain1.gain.exponentialRampToValueAtTime(0.001, t0 + 0.28);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(t0);
      osc1.stop(t0 + 0.3);

      // Note 2: 659Hz (E5)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, t0 + 0.14);
      gain2.gain.setValueAtTime(0.001, t0);
      gain2.gain.setValueAtTime(0.25, t0 + 0.14);
      gain2.gain.exponentialRampToValueAtTime(0.001, t0 + 0.44);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(t0 + 0.14);
      osc2.stop(t0 + 0.46);

      // Note 3: 784Hz (G5)
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(783.99, t0 + 0.28);
      gain3.gain.setValueAtTime(0.001, t0);
      gain3.gain.setValueAtTime(0.28, t0 + 0.28);
      gain3.gain.exponentialRampToValueAtTime(0.001, t0 + 0.65);
      osc3.connect(gain3);
      gain3.connect(ctx.destination);
      osc3.start(t0 + 0.28);
      osc3.stop(t0 + 0.68);
    } catch {}
  };

  // 3. Piercing 85 dB Alarm Siren for Stage 2 (Pulsing high-frequency emergency sweep)
  const playAlarmSirenOnce = () => {
    if (!audioEnabled) return;
    try {
      const ctx = getAudioContext();
      const t0 = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(2400, t0);
      osc.frequency.linearRampToValueAtTime(3100, t0 + 0.18);
      osc.frequency.linearRampToValueAtTime(2400, t0 + 0.36);

      gain.gain.setValueAtTime(0.3, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.42);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t0);
      osc.stop(t0 + 0.45);
    } catch {}
  };

  // Sound Engine: Loops chime continuously in Stage 1 and siren continuously in Stage 2
  useEffect(() => {
    // Clear any previous sound loop
    if (soundLoopRef.current) {
      clearInterval(soundLoopRef.current);
      soundLoopRef.current = null;
    }

    if (!audioEnabled) return;

    if (activeStage === 1) {
      // Play immediately, then repeat every 1.4s until stopped
      playWarningChimeOnce();
      soundLoopRef.current = setInterval(() => {
        playWarningChimeOnce();
      }, 1400);
    } else if (activeStage === 2) {
      // Play immediately, then pulse every 0.55s until stopped
      playAlarmSirenOnce();
      soundLoopRef.current = setInterval(() => {
        playAlarmSirenOnce();
      }, 550);
    }

    return () => {
      if (soundLoopRef.current) {
        clearInterval(soundLoopRef.current);
        soundLoopRef.current = null;
      }
    };
  }, [activeStage, audioEnabled]);

  // Trigger the Physical Slap & Mist Actuation
  const executeSlapAction = () => {
    setIsSlapping(true);
    setIsMistSpraying(true);
    setSlapCount((c) => c + 1);
    playSlapSound();

    setTimeout(() => {
      setIsMistSpraying(false);
    }, 450);

    setTimeout(() => {
      setIsSlapping(false);
    }, 650);
  };

  // Manual stage selection
  const handleSelectStage = (stage: 0 | 1 | 2 | 3) => {
    setIsAutoRunning(false);
    setAutoTimer(0);
    setActiveStage(stage);

    if (stage === 3) {
      executeSlapAction();
    }
  };

  // Paced Auto-Escalation Simulation
  useEffect(() => {
    if (!isAutoRunning) return;

    let timer = 0;
    const interval = setInterval(() => {
      timer = Number((timer + 0.2).toFixed(1));
      setAutoTimer(timer);

      // Stage 0: 0.0s to 2.4s (Awake study session)
      if (timer < 2.5) {
        setActiveStage(0);
      }
      // Stage 1: 2.6s to 5.4s (Eyelids droop, continuous chime begins)
      else if (timer >= 2.6 && timer < 5.6) {
        setActiveStage(1);
      }
      // Stage 2: 5.6s to 8.4s (Deep micro-sleep, piercing alarm siren)
      else if (timer >= 5.6 && timer < 8.6) {
        setActiveStage(2);
      }
      // Stage 3: 8.6s (Prolonged sleep! Physical Slap + Water Mist)
      else if (timer >= 8.6) {
        setActiveStage(3);
        executeSlapAction();
        setIsAutoRunning(false);
        clearInterval(interval);
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [isAutoRunning]);

  const handleStartAuto = () => {
    setAutoTimer(0);
    setActiveStage(0);
    setAcknowledged(false);
    setIsAutoRunning(true);
  };

  const handleDisarm = () => {
    setIsAutoRunning(false);
    setAutoTimer(0);
    setActiveStage(0);
    setIsSlapping(false);
    setIsMistSpraying(false);
    if (soundLoopRef.current) {
      clearInterval(soundLoopRef.current);
      soundLoopRef.current = null;
    }
    setAcknowledged(true);
    setTimeout(() => setAcknowledged(false), 2200);
  };

  return (
    <div className="simulator-room-container" id="study-room-simulation">
      {/* Top Header Bar */}
      <div className="room-header-row">
        <div className="room-title-block">
          <span className="room-badge">INTERACTIVE LAB</span>
          <h3 className="room-heading">The Midnight Battleground: Desk vs. Bed</h3>
        </div>

        <div className="room-actions-bar">
          <button
            type="button"
            className={`btn-room-action btn-slap-test ${isSlapping ? 'slap-burst' : ''}`}
            onClick={executeSlapAction}
            title="Trigger physical slap sound and servo sweep"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
              <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
              <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
            </svg>
            Test Slap Sound
          </button>
          <button
            type="button"
            className={`btn-room-action btn-auto-sim ${isAutoRunning ? 'active' : ''}`}
            onClick={isAutoRunning ? () => setIsAutoRunning(false) : handleStartAuto}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              {isAutoRunning ? (
                <rect x="6" y="4" width="12" height="16" rx="2" />
              ) : (
                <polygon points="5 3 19 12 5 21 5 3" />
              )}
            </svg>
            {isAutoRunning ? `Escalating (${autoTimer.toFixed(1)}s)` : 'Run Escalation Test'}
          </button>
          <button
            type="button"
            className={`btn-room-action btn-sound-switch ${audioEnabled ? 'sound-on' : 'sound-off'}`}
            onClick={() => setAudioEnabled(!audioEnabled)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {audioEnabled ? (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </>
              ) : (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </>
              )}
            </svg>
            {audioEnabled ? 'Audio: ON' : 'Audio: MUTED'}
          </button>
        </div>
      </div>

      {/* Main Simulation Scene — Person, Desk, Alarm */}
      <div className={`study-room-scene sim-centered-scene ${isSlapping ? 'scene-shake' : ''} stage-${activeStage}`}>
        <div className="room-desk-zone sim-desk-only">

          {/* Desk Environment: Seated Human with Physical Slap Hammer Rig Right Beside Him */}
          <div className="desk-environment">
            {/* Office Chair Backrest behind the student */}
            <div className="office-chair-rig">
              <div className="chair-headrest"></div>
              <div className="chair-backrest"></div>
            </div>

            {/* Human Seated Figure: Slumps Forward Onto Desk Without Decapitation */}
            <div className={`human-seated-rig stage-${activeStage} ${isSlapping ? 'shock-jolt' : ''}`}>
              {/* Comic Impact Burst directly on the head upon physical strike */}
              {isSlapping && (
                <div className="slap-impact-starburst">
                  <span className="impact-text">THWACK!</span>
                </div>
              )}

              {/* Speech Bubble floating safely above head */}
              <div className="student-speech-bubble">
                {activeStage === 0 && 'Focusing: Chapter 4 Networking...'}
                {activeStage === 1 && 'Chime playing... eyes feeling heavy...'}
                {activeStage === 2 && 'Zzz... deeply unconscious...'}
                {activeStage === 3 && 'AWAKE! I AM STUDYING!'}
              </div>

              {/* Head & Neck Unit: Rigidly Joined, Pivots Naturally Without Detaching */}
              <div className="human-head-group">
                <div className="avatar-head">
                  <div className="avatar-hair"></div>
                  <div className="avatar-face">
                    {/* Stage 0: Awake Alert Eyes */}
                    {activeStage === 0 && (
                      <div className="face-expression expr-alert">
                        <div className="vector-eyes">
                          <svg className="vector-eye" width="18" height="12" viewBox="0 0 20 14">
                            <ellipse cx="10" cy="7" rx="9" ry="6" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
                            <circle cx="10" cy="7" r="3.5" fill="#0f172a" />
                            <circle cx="8.5" cy="5.5" r="1.2" fill="#ffffff" />
                          </svg>
                          <svg className="vector-eye" width="18" height="12" viewBox="0 0 20 14">
                            <ellipse cx="10" cy="7" rx="9" ry="6" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
                            <circle cx="10" cy="7" r="3.5" fill="#0f172a" />
                            <circle cx="8.5" cy="5.5" r="1.2" fill="#ffffff" />
                          </svg>
                        </div>
                        <div className="mouth mouth-smile"></div>
                      </div>
                    )}

                    {/* Stage 1: Drowsy Drooping Eyelids */}
                    {activeStage === 1 && (
                      <div className="face-expression expr-drowsy">
                        <div className="vector-eyes">
                          <svg className="vector-eye" width="18" height="12" viewBox="0 0 20 14">
                            <ellipse cx="10" cy="7" rx="9" ry="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
                            <circle cx="10" cy="8" r="2.5" fill="#0f172a" />
                            <path d="M1 5 Q10 10 19 5" stroke="#94a3b8" strokeWidth="2" fill="none" />
                          </svg>
                          <svg className="vector-eye" width="18" height="12" viewBox="0 0 20 14">
                            <ellipse cx="10" cy="7" rx="9" ry="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
                            <circle cx="10" cy="8" r="2.5" fill="#0f172a" />
                            <path d="M1 5 Q10 10 19 5" stroke="#94a3b8" strokeWidth="2" fill="none" />
                          </svg>
                        </div>
                        <div className="mouth mouth-droop"></div>
                        <div className="vector-zzz-bubble">Zzz</div>
                      </div>
                    )}

                    {/* Stage 2: Asleep (Closed Eye Arcs, Slumped on Arms) */}
                    {activeStage === 2 && (
                      <div className="face-expression expr-asleep">
                        <div className="vector-eyes">
                          <svg className="vector-eye" width="18" height="10" viewBox="0 0 20 10">
                            <path d="M2 3 Q10 9 18 3" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                          </svg>
                          <svg className="vector-eye" width="18" height="10" viewBox="0 0 20 10">
                            <path d="M2 3 Q10 9 18 3" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                          </svg>
                        </div>
                        <div className="mouth mouth-sleep"></div>
                        <div className="vector-zzz-trail">
                          <span className="z-char z1">Z</span>
                          <span className="z-char z2">z</span>
                          <span className="z-char z3">z</span>
                        </div>
                      </div>
                    )}

                    {/* Stage 3: Shocked Slapped Awake (Wide Open Eyes & Gasp) */}
                    {activeStage === 3 && (
                      <div className="face-expression expr-shocked">
                        <div className="vector-eyes">
                          <svg className="vector-eye" width="20" height="16" viewBox="0 0 22 18">
                            <circle cx="11" cy="9" r="8" fill="#ffffff" stroke="#b91c1c" strokeWidth="2.5" />
                            <circle cx="11" cy="9" r="2.5" fill="#0f172a" />
                          </svg>
                          <svg className="vector-eye" width="20" height="16" viewBox="0 0 22 18">
                            <circle cx="11" cy="9" r="8" fill="#ffffff" stroke="#b91c1c" strokeWidth="2.5" />
                            <circle cx="11" cy="9" r="2.5" fill="#0f172a" />
                          </svg>
                        </div>
                        <div className="mouth mouth-gasp"></div>
                        <div className="vector-sweat-drop">
                          <svg width="12" height="16" viewBox="0 0 12 16">
                            <path d="M6 1 C6 1 1 8 1 11 A5 5 0 0 0 11 11 C11 8 6 1 6 1 Z" fill="#38bdf8" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Secure Anatomical Neck Connector (Prevents Head Separation) */}
                <div className="avatar-neck-anchor"></div>
              </div>

              {/* Upper Torso & Arms */}
              <div className="human-torso-group">
                <div className="avatar-torso">
                  <div className="torso-collar"></div>
                </div>
                {/* Arms: Change posture dynamically */}
                <div className={`avatar-arms-set arms-stage-${activeStage}`}>
                  <div className="human-arm arm-left"></div>
                  <div className="human-arm arm-right"></div>
                </div>
              </div>
            </div>

            {/* UNIFIED IOT ALARM STATION: Blue Box with Mist Nozzle Stem on top & Slap Mallet on front */}
            <div className={`desk-iot-station-rig ${isSlapping ? 'actuator-striking' : ''} ${isMistSpraying ? 'mist-active' : ''}`}>
              {/* Mist Nozzle Assembly: Extends directly out of the top of the blue box */}
              <div className="station-mist-assembly">
                <div className="station-mist-stem">
                  <div className="station-mist-head"></div>
                </div>
                {isMistSpraying && (
                  <div className="station-mist-cloud">
                    <span className="mist-particle p1"></span>
                    <span className="mist-particle p2"></span>
                    <span className="mist-particle p3"></span>
                    <span className="mist-particle p4"></span>
                    <span className="mist-particle p5"></span>
                  </div>
                )}
              </div>

              {/* Blue Enclosure / SG90 Servo Cube */}
              <div className="station-blue-box">
                <span className="station-box-label">SG90</span>
              </div>

              {/* Slap Mallet Lever Arm */}
              <div className="mallet-lever-arm">
                <div className="mallet-rod"></div>
                <div className="mallet-head-cushion">
                  <span className="mallet-badge-txt">WAKE!</span>
                </div>
              </div>
            </div>

            {/* STATIONARY STUDY DESK: STRICTLY FIXED, NEVER TILTS, NEVER ROTATES */}
            <div className="stationary-study-desk" aria-hidden="true">
              {/* Desk Top Surface with Props */}
              <div className="desk-top-plank">
                {/* Laptop with Code Editor Screen */}
                <div className="desk-laptop">
                  <div className="laptop-lid">
                    <div className="laptop-code-display">
                      <div className="mock-code-line cl-blue"></div>
                      <div className="mock-code-line cl-green"></div>
                      <div className="mock-code-line cl-orange"></div>
                    </div>
                  </div>
                  <div className="laptop-keyboard-deck"></div>
                </div>

                {/* Open Study Notes Book */}
                <div className="desk-open-notes">
                  <div className="notes-page-left"></div>
                  <div className="notes-page-right"></div>
                  <div className="study-pen"></div>
                </div>

                {/* Coffee Mug */}
                <div className="desk-coffee-mug">
                  <div className="mug-handle"></div>
                </div>
              </div>

              {/* Solid Horizontal Desk Apron & Sturdy Legs */}
              <div className="desk-front-apron"></div>
              <div className="desk-steel-legs">
                <div className="desk-leg leg-l"></div>
                <div className="desk-leg leg-r"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Selector - clean card-style row */}
      <div className="sim-stage-dock">
        <div className="sim-stage-track">
          {[
            { stage: 0 as const, label: 'Awake', sub: 'EAR ≥ 0.25', color: '#22c55e' },
            { stage: 1 as const, label: 'Drowsy', sub: 'Chime loops', color: '#f59e0b' },
            { stage: 2 as const, label: 'Asleep', sub: '85dB Siren', color: '#f97316' },
            { stage: 3 as const, label: 'Slap + Mist', sub: 'Physical hit', color: '#ef4444' }
          ].map(({ stage, label, sub, color }) => (
            <button
              key={stage}
              type="button"
              className={`sim-stage-card ${activeStage === stage ? 'sim-card-active' : ''}`}
              style={{ '--stage-color': color } as React.CSSProperties}
              onClick={() => handleSelectStage(stage)}
            >
              <span className="sim-stage-num">Stage {stage}</span>
              <span className="sim-stage-label">{label}</span>
              <span className="sim-stage-sub">{sub}</span>
            </button>
          ))}
          <button
            type="button"
            className={`sim-stage-card sim-disarm-card ${acknowledged ? 'disarmed-flash' : ''}`}
            onClick={handleDisarm}
            title="Simulate pressing physical disarm button (GPIO 21)"
          >
            <span className="sim-stage-num">GPIO 21</span>
            <span className="sim-stage-label">{acknowledged ? 'Disarmed!' : 'Disarm'}</span>
            <span className="sim-stage-sub">Press button</span>
          </button>
        </div>
        {slapCount > 0 && (
          <span className="slap-counter-badge">Slap Interventions: {slapCount}</span>
        )}
      </div>
    </div>
  );
};

export default InteractiveSimulator;

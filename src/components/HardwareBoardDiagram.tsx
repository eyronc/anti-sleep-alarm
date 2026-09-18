import React, { useState } from 'react';
import alarm3dImg from '../assets/anti-sleep-alarm-3d.jpg';

export interface BoardPart {
  id: string;
  name: string;
  category: 'processing' | 'power' | 'comm' | 'actuator' | 'input';
  side: 'left' | 'right';
  x: number; // percentage on 3D board
  y: number; // percentage on 3D board
  role: string;
  specs: string;
  pinout: string;
}

const BOARD_PARTS: BoardPart[] = [
  // Left side components
  {
    id: 'esp32-core',
    name: 'ESP32-S3 Main Board',
    category: 'processing',
    side: 'left',
    x: 39,
    y: 44,
    role: 'Brain of the device. Receives signals from the webcam, runs the 5-stage alarm rules, and controls all waking parts.',
    specs: 'Dual-core Xtensa processor at 240MHz with Wi-Fi and Bluetooth.',
    pinout: 'ESP32-S3 Microcontroller (3.3V Logic)'
  },
  {
    id: 'camera-mount',
    name: 'Camera Eye Tracker',
    category: 'input',
    side: 'left',
    x: 46,
    y: 15,
    role: 'Watches your face while you study. Tracks 468 landmark points to measure if your eyes are open or closed.',
    specs: 'HD webcam sensor mounted on a flexible gooseneck arm.',
    pinout: 'USB-C Video Stream (30 FPS Face Mesh)'
  },
  {
    id: 'status-leds',
    name: 'Status Light LEDs',
    category: 'processing',
    side: 'left',
    x: 38,
    y: 42,
    role: 'Color indicator lights. Green = awake and focused, Yellow = getting drowsy, Red = alarm triggered.',
    specs: 'RGB surface mount LEDs with frosted light diffuser.',
    pinout: 'GPIO 27 (Status Light Signal)'
  },
  {
    id: 'usb-telemetry',
    name: 'USB-C Power & Data',
    category: 'comm',
    side: 'left',
    x: 31,
    y: 52,
    role: 'Plugs into your laptop to power the device (5V) and receive eye measurement data from the camera script.',
    specs: 'USB Type-C port with 500mA safety fuse protection.',
    pinout: '5V Power, Ground, Data Lines'
  },
  {
    id: 'actuator-wires',
    name: 'Actuator Wiring',
    category: 'comm',
    side: 'left',
    x: 48,
    y: 55,
    role: 'Neat color-coded wires that carry trigger signals from the ESP32 chip to the buzzer, servo motor, and mist spray.',
    specs: 'Flexible multi-color ribbon cable with secure header pins.',
    pinout: 'GPIO 18 (Buzzer), GPIO 19 (Servo), GPIO 23 (Mist), GPIO 21 (Button)'
  },

  // Right side components
  {
    id: 'servo-slap-arm',
    name: 'Servo Slap Arm',
    category: 'actuator',
    side: 'right',
    x: 68,
    y: 38,
    role: 'Motorized waking arm. Sweeps down quickly in Stage 3 to give a physical tap and snap you out of sleep.',
    specs: 'SG90 mini servo motor, fast 0.1-second sweep speed, soft padded mallet.',
    pinout: 'GPIO 19 (Motor Angle Control Pin)'
  },
  {
    id: 'piezo-siren',
    name: '85dB Alarm Buzzer',
    category: 'actuator',
    side: 'right',
    x: 60,
    y: 55,
    role: 'Loud sound alarm. Plays a gentle reminder chime in Stage 1, then a loud piercing siren in Stage 2.',
    specs: 'Active piezo buzzer speaker reaching 85 decibels of volume.',
    pinout: 'GPIO 18 (Audio Output Pin)'
  },
  {
    id: 'mist-nozzle',
    name: 'Water Mist Nozzle',
    category: 'actuator',
    side: 'right',
    x: 46,
    y: 64,
    role: 'Cold water spray nozzle. Sprays a gentle puff of cool water mist at your face to wake you up instantly.',
    specs: 'Ultrasonic ceramic disc that turns cold water into fine 5-micron mist.',
    pinout: 'GPIO 23 (Mist Relay Trigger)'
  },
  {
    id: 'disarm-btn',
    name: 'Disarm Push Button',
    category: 'input',
    side: 'right',
    x: 56,
    y: 69,
    role: 'Big red reset button on your desk. Press it to prove you are awake and immediately turn off all sounds and motors.',
    specs: 'Tactile push button with instant hardware interrupt circuit.',
    pinout: 'GPIO 21 (Emergency Interrupt Pin - Under 5ms)'
  },
  {
    id: 'power-reg',
    name: 'Power Supply Unit',
    category: 'power',
    side: 'right',
    x: 72,
    y: 72,
    role: 'Regulates power cleanly into 3.3V for the computer chip and 5V for the motor and buzzer.',
    specs: 'Low-dropout voltage regulator with filtering capacitors to prevent electrical noise.',
    pinout: '3.3V Logic Bus & 5V Motor Power'
  }
];

export const HardwareBoardDiagram: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<BoardPart>(BOARD_PARTS[0]); // Default to ESP32 core
  const [hoveredPart, setHoveredPart] = useState<BoardPart | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<'all' | 'processing' | 'power' | 'comm' | 'actuator' | 'input'>('all');

  const leftParts = BOARD_PARTS.filter(p => p.side === 'left');
  const rightParts = BOARD_PARTS.filter(p => p.side === 'right');

  // Handle mouse leaving the entire diagram container -> indicator disappears!
  const handleDiagramMouseLeave = () => {
    setHoveredPart(null);
    setIsHovering(false);
  };

  const handlePartHover = (part: BoardPart) => {
    setSelectedPart(part);
    setHoveredPart(part);
    setIsHovering(true);
  };

  const activePart = (isHovering && hoveredPart) ? hoveredPart : selectedPart;

  return (
    <div
      className="board-diagram-wrapper"
      onMouseLeave={handleDiagramMouseLeave}
    >
      {/* Category Filter Pills */}
      <div className="board-filter-bar">
        <span className="filter-title">CLASSIFY PARTS:</span>
        <button
          type="button"
          className={`btn-filter-pill ${filterCategory === 'all' ? 'active' : ''}`}
          onClick={() => setFilterCategory('all')}
        >
          All 10 Modules
        </button>
        <button
          type="button"
          className={`btn-filter-pill ${filterCategory === 'processing' ? 'active' : ''}`}
          onClick={() => setFilterCategory('processing')}
        >
          Processing & Brain
        </button>
        <button
          type="button"
          className={`btn-filter-pill ${filterCategory === 'actuator' ? 'active' : ''}`}
          onClick={() => setFilterCategory('actuator')}
        >
          Waking Outputs (Sound, Tap, Mist)
        </button>
        <button
          type="button"
          className={`btn-filter-pill ${filterCategory === 'input' ? 'active' : ''}`}
          onClick={() => setFilterCategory('input')}
        >
          Sensors & Reset Button
        </button>
        <button
          type="button"
          className={`btn-filter-pill ${filterCategory === 'power' ? 'active' : ''}`}
          onClick={() => setFilterCategory('power')}
        >
          Power Supply
        </button>
        <button
          type="button"
          className={`btn-filter-pill ${filterCategory === 'comm' ? 'active' : ''}`}
          onClick={() => setFilterCategory('comm')}
        >
          Wiring & USB Cables
        </button>
      </div>

      {/* Main Diagram Area: Left Callouts | 3D Rendered Anti-Sleep Alarm Station | Right Callouts */}
      <div
        className="board-interactive-stage"
        onMouseLeave={handleDiagramMouseLeave}
      >
        {/* Left Side Callout Pointers */}
        <div className="callout-column column-left">
          {leftParts.map((part) => {
            const isMatch = filterCategory === 'all' || part.category === filterCategory;
            const isSelected = activePart.id === part.id && isHovering;
            return (
              <div
                key={part.id}
                className={`callout-item ${isSelected ? 'selected' : ''} ${!isMatch ? 'dimmed' : ''}`}
                onClick={() => { setSelectedPart(part); setHoveredPart(part); setIsHovering(true); }}
                onMouseEnter={() => handlePartHover(part)}
              >
                <span className="callout-label">{part.name}</span>
                <span className="callout-dot"></span>
                <span className="callout-line"></span>
              </div>
            );
          })}
        </div>

        {/* Center: 3D Rendered Anti-Sleep Alarm Prototype Station */}
        <div className="board-3d-center">
          <div className="board-image-viewport">
            <img
              src={alarm3dImg}
              alt="3D Rendered Anti-Sleep Alarm IoT Hardware Station"
              className="board-3d-photo"
            />

            {/* Subtle Clickable/Hoverable Target Dots for All Matching Parts */}
            {BOARD_PARTS.map((part) => {
              const isMatch = filterCategory === 'all' || part.category === filterCategory;
              if (!isMatch) return null;

              const isTargetActive = isHovering && hoveredPart?.id === part.id;

              return (
                <div
                  key={part.id}
                  className={`target-hotspot-marker ${isTargetActive ? 'active-target' : 'idle-target'}`}
                  style={{
                    left: `${part.x}%`,
                    top: `${part.y}%`
                  }}
                  onClick={() => { setSelectedPart(part); setHoveredPart(part); setIsHovering(true); }}
                  onMouseEnter={() => handlePartHover(part)}
                  title={part.name}
                >
                  <span className="hotspot-pulse"></span>
                  <span className="hotspot-center-dot"></span>

                  {/* Indicator & Tooltip Card: ONLY VISIBLE WHEN ACTIVELY HOVERING */}
                  {isTargetActive && (
                    <div className={`hotspot-tag ${part.y < 35 ? 'tag-below' : 'tag-above'}`}>
                      <span className="tag-category-dot"></span>
                      <span className="tag-text">{part.name}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side Callout Pointers */}
        <div className="callout-column column-right">
          {rightParts.map((part) => {
            const isMatch = filterCategory === 'all' || part.category === filterCategory;
            const isSelected = activePart.id === part.id && isHovering;
            return (
              <div
                key={part.id}
                className={`callout-item ${isSelected ? 'selected' : ''} ${!isMatch ? 'dimmed' : ''}`}
                onClick={() => { setSelectedPart(part); setHoveredPart(part); setIsHovering(true); }}
                onMouseEnter={() => handlePartHover(part)}
              >
                <span className="callout-line"></span>
                <span className="callout-dot"></span>
                <span className="callout-label">{part.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Technical Classification & Function Inspector */}
      <div className="board-part-inspector">
        <div className="inspector-badge-row">
          <div className="inspector-left-header">
            <span className={`part-category-tag cat-${activePart.category}`}>
              {activePart.category === 'processing' && 'PROCESSING & BRAIN'}
              {activePart.category === 'power' && 'POWER SUPPLY'}
              {activePart.category === 'comm' && 'WIRING & USB'}
              {activePart.category === 'actuator' && 'WAKING ACTUATOR'}
              {activePart.category === 'input' && 'SENSOR & BUTTON'}
            </span>
            <h3 className="part-name-display">{activePart.name}</h3>
          </div>
          <div className="part-pinout-pill">
            <span className="pill-label">CONNECTION:</span>
            <span className="pill-value">{activePart.pinout}</span>
          </div>
        </div>

        <div className="inspector-info-grid">
          <div className="info-cell">
            <span className="cell-title">WHAT THIS PART DOES</span>
            <p className="cell-body">{activePart.role}</p>
          </div>
          <div className="info-cell">
            <span className="cell-title">SIMPLE HARDWARE SPECS</span>
            <p className="cell-body font-mono">{activePart.specs}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardwareBoardDiagram;

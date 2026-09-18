import React, { useState } from 'react';

interface HardwareNode {
  id: string;
  name: string;
  pin: string;
  stage: string;
  voltage: string;
  role: string;
  detail: string;
}

const hardwareNodes: HardwareNode[] = [
  {
    id: 'camera',
    name: 'Camera Eye Tracker',
    pin: 'USB-C / Host PC',
    stage: 'Input Stage',
    voltage: '5V USB Bus',
    role: 'Watches your face 30 times per second. Tracks 468 face points and calculates how open your eyes are (EAR score).',
    detail: 'Output: USB UART 115200 Baud → ESP32'
  },
  {
    id: 'esp32',
    name: 'ESP32-S3 Main Board',
    pin: 'Core Controller',
    stage: 'Central Hub',
    voltage: '3.3V / 5V',
    role: 'Brain of the alarm. Receives the eye data from the camera script, decides which alarm stage to trigger, and drives all hardware outputs.',
    detail: 'GPIO 18 Buzzer · GPIO 19 Servo · GPIO 23 Mist · GPIO 21 Disarm'
  },
  {
    id: 'buzzer',
    name: '85 dB Alarm Buzzer',
    pin: 'GPIO 18',
    stage: 'Stage 1 & 2 — Sound',
    voltage: '5V via NPN',
    role: 'Stage 1: Plays a soft reminder chime when eyes shut for 1.2s. Stage 2: Blasts a loud 85dB piercing siren at 2.2s.',
    detail: 'Frequency: 500Hz (chime) → 2800Hz (siren)'
  },
  {
    id: 'servo',
    name: 'Servo Slap Arm',
    pin: 'GPIO 19',
    stage: 'Stage 3 — Physical Hit',
    voltage: '5V External Rail',
    role: 'If sounds don\'t wake you, the SG90 motor swings the padded mallet arm down in 120ms to physically tap you on the shoulder.',
    detail: '0° parked → 90° strike → returns to 0°'
  },
  {
    id: 'mist',
    name: 'Water Mist Nozzle',
    pin: 'GPIO 23',
    stage: 'Stage 3 — Cool Spray',
    voltage: '5V Relay + Transducer',
    role: 'Fires at the same time as the slap arm. Sprays a cold water mist puff at your face to snap you awake instantly.',
    detail: '350ms mist burst · 5-micron droplet size'
  },
  {
    id: 'disarm',
    name: 'Disarm Push Button',
    pin: 'GPIO 21',
    stage: 'Emergency Reset',
    voltage: '3.3V Pull-Up',
    role: 'Big red desk button. Press it to prove you\'re awake. Instantly shuts off all sounds, returns the arm to rest, and resets the system in under 5ms.',
    detail: 'Hardware interrupt — instant response'
  }
];

const stageColor: Record<string, string> = {
  'Input Stage': '#3b82f6',
  'Central Hub': '#ef4444',
  'Stage 1 & 2 — Sound': '#f59e0b',
  'Stage 3 — Physical Hit': '#f97316',
  'Stage 3 — Cool Spray': '#06b6d4',
  'Emergency Reset': '#22c55e'
};

export const IoTVisualLayout: React.FC = () => {
  // Start with camera (Input Stage) selected by default
  const [activeNode, setActiveNode] = useState<HardwareNode>(hardwareNodes[0]);

  const left = hardwareNodes.slice(0, 3);
  const right = hardwareNodes.slice(3);

  const renderCard = (node: HardwareNode) => {
    const isActive = activeNode.id === node.id;
    const color = stageColor[node.stage] ?? '#ef4444';
    return (
      <div
        key={node.id}
        className={`arch-hover-card ${isActive ? 'arch-card-active' : ''}`}
        onMouseEnter={() => setActiveNode(node)}
        style={{ '--card-accent': color } as React.CSSProperties}
      >
        <div className="arch-card-inner">
          <span className="arch-stage-badge" style={{ color, borderColor: color }}>{node.stage}</span>
          <p className="arch-card-name">{node.name}</p>
          <span className="arch-pin-tag">{node.pin}</span>
        </div>
        {isActive && <div className="arch-card-active-bar" style={{ background: color }} />}
      </div>
    );
  };

  const color = stageColor[activeNode.stage] ?? '#ef4444';

  return (
    <div className="arch-layout-wrap">
      {/* Two-column hover card grid */}
      <div className="arch-card-grid">
        <div className="arch-col">{left.map(renderCard)}</div>
        <div className="arch-col">{right.map(renderCard)}</div>
      </div>

      {/* Inspector strip at bottom */}
      <div className="arch-inspector" style={{ '--inspector-accent': color } as React.CSSProperties}>
        <div className="arch-inspector-left">
          <span className="arch-insp-stage" style={{ color }}>{activeNode.stage}</span>
          <h3 className="arch-insp-name">{activeNode.name}</h3>
          <span className="arch-insp-pin">{activeNode.pin} · {activeNode.voltage}</span>
        </div>
        <div className="arch-inspector-divider" style={{ background: color }} />
        <div className="arch-inspector-right">
          <p className="arch-insp-role">{activeNode.role}</p>
          <span className="arch-insp-detail">{activeNode.detail}</span>
        </div>
      </div>
    </div>
  );
};

export default IoTVisualLayout;

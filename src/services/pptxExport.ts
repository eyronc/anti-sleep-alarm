import pptxgen from 'pptxgenjs';
import type { SlideData } from '../types/presentation';

export async function exportPresentationToPPTX(slides: SlideData[]): Promise<void> {
  const pres = new pptxgen();

  // Widescreen 16:9 standard layout
  pres.layout = 'LAYOUT_16x9';
  pres.author = 'IoT Maker Lab';
  pres.company = 'Anti-Sleep Alarm Engineering';
  pres.title = 'Anti-Sleep Alarm: Autonomous IoT Slumber Deterrent';

  // Define brand colors
  const BG_DARK = '0B0F17';
  const CARD_BG = '151C28';
  const BORDER_COL = '232E42';
  const TEXT_WHITE = 'F8FAFC';
  const TEXT_MUTED = '94A3B8';
  const ACCENT_AMBER = 'F59E0B';
  const ACCENT_EMERALD = '10B981';
  const ACCENT_BLUE = '38BDF8';

  for (const slideData of slides) {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };

    // Title slide special exact cover reproduction using exact Canva slide graphic
    if (slideData.type === 'title') {
      try {
        slide.addImage({
          path: '/cover-slide.png',
          x: 0,
          y: 0,
          w: 13.333,
          h: 7.5
        });
      } catch (err) {
        console.warn('Fallback title text rendering', err);
        slide.background = { color: 'EDEDED' };
        slide.addText('IT-ELECT 3', { x: 0.8, y: 0.8, w: 4.0, h: 0.5, fontSize: 16, bold: true, color: '111111' });
        slide.addText('anti sleep alarm', { x: 0.8, y: 3.0, w: 11.7, h: 1.2, fontSize: 56, bold: true, color: '111111', align: 'center' });
        slide.addText('Group 1', { x: 4.5, y: 2.6, w: 4.2, h: 1.0, fontSize: 38, italic: true, color: 'E52E2E', align: 'center' });
        slide.addText('ALEGRE · CUIZON, C. · CUIZON, V. · CUMAHIG · LOFRANCO · OCHEA · PIZON · TALITY · OCHEA', {
          x: 0.8, y: 6.3, w: 11.7, h: 0.5, fontSize: 11, bold: true, color: '222222', align: 'center'
        });
      }
      continue;
    }

    // Slide Header Category Kicker for non-title slides
    slide.addText(slideData.category.toUpperCase(), {
      x: 0.8,
      y: 0.5,
      w: 11.5,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: ACCENT_AMBER,
      charSpacing: 2
    });

    // Slide Main Title
    slide.addText(slideData.title, {
      x: 0.8,
      y: 0.8,
      w: 11.5,
      h: 0.6,
      fontSize: 26,
      fontFace: 'Arial',
      bold: true,
      color: TEXT_WHITE
    });

    // Slide Subtitle
    slide.addText(slideData.subtitle, {
      x: 0.8,
      y: 1.45,
      w: 11.5,
      h: 0.4,
      fontSize: 13,
      fontFace: 'Arial',
      color: TEXT_MUTED
    });

    // Divider Line
    slide.addShape(pres.ShapeType.line, {
      x: 0.8,
      y: 1.95,
      w: 11.7,
      h: 0,
      line: { color: BORDER_COL, width: 1 }
    });

    // Content area according to slide type
    if (slideData.type === 'hardware') {
      // Top IoT Architecture Visual Block Diagram
      // Block 1: Vision Host Input
      slide.addShape(pres.ShapeType.roundRect, {
        x: 0.8,
        y: 2.1,
        w: 3.2,
        h: 1.55,
        rectRadius: 0.1,
        fill: { color: CARD_BG },
        line: { color: BORDER_COL, width: 1.5 }
      });
      slide.addText('INPUT STAGE · HOST PC / RPi', {
        x: 0.95,
        y: 2.2,
        w: 2.9,
        h: 0.25,
        fontSize: 9,
        bold: true,
        color: ACCENT_AMBER
      });
      slide.addText('Vision Pipeline (MediaPipe)', {
        x: 0.95,
        y: 2.45,
        w: 2.9,
        h: 0.35,
        fontSize: 12,
        bold: true,
        color: TEXT_WHITE
      });
      slide.addText('468 Facial Landmarks · EAR Vector Math\nStreams: USB UART 115200 Baud', {
        x: 0.95,
        y: 2.8,
        w: 2.9,
        h: 0.7,
        fontSize: 9.5,
        color: TEXT_MUTED
      });

      // Bus Line 1 (Arrow)
      slide.addText('UART ->', {
        x: 4.05,
        y: 2.7,
        w: 0.9,
        h: 0.3,
        fontSize: 8.5,
        bold: true,
        color: ACCENT_BLUE,
        align: 'center'
      });

      // Block 2: Central IoT Controller (ESP32-S3)
      slide.addShape(pres.ShapeType.roundRect, {
        x: 5.0,
        y: 2.1,
        w: 3.5,
        h: 1.55,
        rectRadius: 0.1,
        fill: { color: CARD_BG },
        line: { color: 'F43F5E', width: 2 }
      });
      slide.addText('CENTRAL CONTROLLER · ESP32-S3', {
        x: 5.15,
        y: 2.2,
        w: 3.2,
        h: 0.25,
        fontSize: 9,
        bold: true,
        color: 'F43F5E'
      });
      slide.addText('IoT Actuator Hub & State Machine', {
        x: 5.15,
        y: 2.45,
        w: 3.2,
        h: 0.35,
        fontSize: 12,
        bold: true,
        color: TEXT_WHITE
      });
      slide.addText('Dual Xtensa 240MHz · 5-Stage Safety FSM\nGPIO 18, 19, 23 PWM & GPIO 21 Hardware ISR', {
        x: 5.15,
        y: 2.8,
        w: 3.2,
        h: 0.7,
        fontSize: 9.5,
        color: TEXT_MUTED
      });

      // Bus Line 2 (Arrow)
      slide.addText('GPIO ->', {
        x: 8.55,
        y: 2.7,
        w: 0.9,
        h: 0.3,
        fontSize: 8.5,
        bold: true,
        color: ACCENT_EMERALD,
        align: 'center'
      });

      // Block 3: Actuator Cluster
      slide.addShape(pres.ShapeType.roundRect, {
        x: 9.5,
        y: 2.1,
        w: 3.0,
        h: 1.55,
        rectRadius: 0.1,
        fill: { color: CARD_BG },
        line: { color: BORDER_COL, width: 1.5 }
      });
      slide.addText('OUTPUT ACTUATOR CLUSTER', {
        x: 9.65,
        y: 2.2,
        w: 2.7,
        h: 0.25,
        fontSize: 9,
        bold: true,
        color: ACCENT_EMERALD
      });
      slide.addText('Graduated Interventions', {
        x: 9.65,
        y: 2.45,
        w: 2.7,
        h: 0.35,
        fontSize: 12,
        bold: true,
        color: TEXT_WHITE
      });
      slide.addText('PIN 18: 85dB Piezo | PIN 19: SG90 Servo\nPIN 23: Mist Relay | PIN 21: Disarm ISR', {
        x: 9.65,
        y: 2.8,
        w: 2.7,
        h: 0.7,
        fontSize: 9,
        color: TEXT_MUTED
      });

      // Bottom Hardware Component Breakdown & Electrical Specs Table
      const hwTableRows: any[][] = [
        [
          { text: 'HARDWARE COMPONENT', options: { bold: true, color: TEXT_WHITE, fill: '1E293B', fontSize: 9 } },
          { text: 'INTERFACE / PIN', options: { bold: true, color: ACCENT_AMBER, fill: '1E293B', fontSize: 9 } },
          { text: 'VOLTAGE', options: { bold: true, color: ACCENT_BLUE, fill: '1E293B', fontSize: 9 } },
          { text: 'ESCALATION ROLE', options: { bold: true, color: TEXT_WHITE, fill: '1E293B', fontSize: 9 } },
          { text: 'CIRCUITRY & FIRMWARE OPERATION', options: { bold: true, color: TEXT_WHITE, fill: '1E293B', fontSize: 9 } }
        ],
        [
          { text: 'ESP32-S3 MCU', options: { bold: true, color: TEXT_WHITE, fontSize: 8.5 } },
          { text: 'Core Processor', options: { color: ACCENT_AMBER, fontSize: 8.5 } },
          { text: '3.3V / 5V', options: { color: ACCENT_BLUE, fontSize: 8.5 } },
          { text: 'State Machine & Hub', options: { color: TEXT_WHITE, fontSize: 8.5 } },
          { text: 'Dual-core 240MHz, evaluates UART messages, triggers PWM & handles ISR reset.', options: { color: TEXT_MUTED, fontSize: 8 } }
        ],
        [
          { text: 'Vision Camera', options: { bold: true, color: TEXT_WHITE, fontSize: 8.5 } },
          { text: 'USB 2.0 Bus', options: { color: ACCENT_AMBER, fontSize: 8.5 } },
          { text: '5V DC', options: { color: ACCENT_BLUE, fontSize: 8.5 } },
          { text: 'Ocular Ingestion', options: { color: TEXT_WHITE, fontSize: 8.5 } },
          { text: 'Streams 30 FPS video to MediaPipe Face Mesh for Euclidean EAR computation.', options: { color: TEXT_MUTED, fontSize: 8 } }
        ],
        [
          { text: '85 dB Piezo Buzzer', options: { bold: true, color: TEXT_WHITE, fontSize: 8.5 } },
          { text: 'GPIO 18 (PWM)', options: { color: ACCENT_AMBER, fontSize: 8.5 } },
          { text: '5V (Transistor)', options: { color: ACCENT_BLUE, fontSize: 8.5 } },
          { text: 'Stages 1 & 2 Audio', options: { color: TEXT_WHITE, fontSize: 8.5 } },
          { text: 'Emits 500 Hz chime (Stage 1) and piercing 2.7 kHz alarm siren (Stage 2).', options: { color: TEXT_MUTED, fontSize: 8 } }
        ],
        [
          { text: 'SG90 Servo Arm', options: { bold: true, color: TEXT_WHITE, fontSize: 8.5 } },
          { text: 'GPIO 19 (50Hz PWM)', options: { color: ACCENT_AMBER, fontSize: 8.5 } },
          { text: '5V External', options: { color: ACCENT_BLUE, fontSize: 8.5 } },
          { text: 'Stage 3 Physical Hit', options: { color: TEXT_WHITE, fontSize: 8.5 } },
          { text: '1.8 kg-cm torque, sweeps 90 deg in 120ms to tap the desk/student with audible slap.', options: { color: TEXT_MUTED, fontSize: 8 } }
        ],
        [
          { text: 'Mist Pump & Relay', options: { bold: true, color: TEXT_WHITE, fontSize: 8.5 } },
          { text: 'GPIO 23 (Digital)', options: { color: ACCENT_AMBER, fontSize: 8.5 } },
          { text: '5V Isolated', options: { color: ACCENT_BLUE, fontSize: 8.5 } },
          { text: 'Stage 3 Water Spray', options: { color: TEXT_WHITE, fontSize: 8.5 } },
          { text: 'Optocoupler isolated relay triggers 350ms burst of 110 kHz ultrasonic cool water mist.', options: { color: TEXT_MUTED, fontSize: 8 } }
        ],
        [
          { text: 'Disarm Pushbutton', options: { bold: true, color: TEXT_WHITE, fontSize: 8.5 } },
          { text: 'GPIO 21 (ISR)', options: { color: ACCENT_AMBER, fontSize: 8.5 } },
          { text: '3.3V Logic', options: { color: ACCENT_BLUE, fontSize: 8.5 } },
          { text: 'Conscious Reset', options: { color: TEXT_WHITE, fontSize: 8.5 } },
          { text: 'Hardware falling edge interrupt with 50ms software debounce; silences alarms instantly.', options: { color: TEXT_MUTED, fontSize: 8 } }
        ]
      ];

      slide.addTable(hwTableRows, {
        x: 0.8,
        y: 3.8,
        w: 11.7,
        h: 2.9,
        colW: [1.8, 1.6, 1.0, 1.9, 5.4],
        border: { color: BORDER_COL, pt: 1 },
        fill: { color: CARD_BG },
        align: 'left',
        valign: 'middle'
      });
    } else if (slideData.type === 'board-diagram') {
      // Top Left Callout Card: Input & Power Parts
      slide.addShape(pres.ShapeType.roundRect, {
        x: 0.8,
        y: 2.1,
        w: 3.2,
        h: 2.3,
        rectRadius: 0.1,
        fill: { color: CARD_BG },
        line: { color: BORDER_COL, width: 1.5 }
      });
      slide.addText('INPUT & POWER CLASSIFICATION', {
        x: 0.95,
        y: 2.2,
        w: 2.9,
        h: 0.25,
        fontSize: 9,
        bold: true,
        color: ACCENT_AMBER
      });
      slide.addText('• USB Connector: 5V Data & Power Ingestion\n• USB-TTL Converter: 115200 Baud Bridge\n• 5V & 3.3V Regulators: Thermal Overload LDO\n• DC Barrel Jack: 7-12V Motor Current Supply\n• Poly Fuse: 500mA Auto-Reset Short Circuit', {
        x: 0.95,
        y: 2.5,
        w: 2.9,
        h: 1.8,
        fontSize: 8.5,
        color: TEXT_WHITE
      });

      // Center Visual Microcontroller PCB Board Graphic
      slide.addShape(pres.ShapeType.roundRect, {
        x: 4.3,
        y: 2.1,
        w: 4.7,
        h: 2.3,
        rectRadius: 0.15,
        fill: { color: '0F766E' },
        line: { color: '115E59', width: 2 }
      });

      // Silkscreen Logo
      slide.addText('ARDUINO / ESP32-S3 IOT', {
        x: 4.5,
        y: 2.2,
        w: 4.3,
        h: 0.3,
        fontSize: 10,
        bold: true,
        color: 'F8FAFC',
        align: 'center'
      });

      // Top Digital PWM Header
      slide.addShape(pres.ShapeType.rect, {
        x: 4.8,
        y: 2.55,
        w: 3.7,
        h: 0.22,
        fill: { color: '0F172A' },
        line: { color: '334155', width: 1 }
      });
      slide.addText('DIGITAL I/O (PWM ~ PIN 18, 19, 23)', {
        x: 4.8,
        y: 2.55,
        w: 3.7,
        h: 0.22,
        fontSize: 7.5,
        bold: true,
        color: '38BDF8',
        align: 'center'
      });

      // Central DIP MCU Package
      slide.addShape(pres.ShapeType.rect, {
        x: 5.2,
        y: 3.1,
        w: 3.3,
        h: 0.45,
        fill: { color: '090D16' },
        line: { color: '334155', width: 1.5 }
      });
      slide.addText('ATMEGA328P / ESP32 CORE MCU', {
        x: 5.2,
        y: 3.18,
        w: 3.3,
        h: 0.3,
        fontSize: 8,
        bold: true,
        color: 'F8FAFC',
        align: 'center'
      });

      // Bottom Power & Analog Header
      slide.addShape(pres.ShapeType.rect, {
        x: 4.8,
        y: 3.85,
        w: 3.7,
        h: 0.22,
        fill: { color: '0F172A' },
        line: { color: '334155', width: 1 }
      });
      slide.addText('POWER &middot; ANALOG IN (PIN 21 ISR)', {
        x: 4.8,
        y: 3.85,
        w: 3.7,
        h: 0.22,
        fontSize: 7.5,
        bold: true,
        color: '10B981',
        align: 'center'
      });

      // Top Right Callout Card: Control & Actuator Parts
      slide.addShape(pres.ShapeType.roundRect, {
        x: 9.3,
        y: 2.1,
        w: 3.2,
        h: 2.3,
        rectRadius: 0.1,
        fill: { color: CARD_BG },
        line: { color: BORDER_COL, width: 1.5 }
      });
      slide.addText('CONTROL & ACTUATION', {
        x: 9.45,
        y: 2.2,
        w: 2.9,
        h: 0.25,
        fontSize: 9,
        bold: true,
        color: ACCENT_EMERALD
      });
      slide.addText('• Digital I/O Headers: PWM Waveform Drive\n• ATmega / ESP32 MCU: 5-Stage State Machine\n• 16MHz Quartz Resonator: Sub-us Timing\n• Analog / PIN 21: Instant ISR Disarm Button\n• Status LEDs: Built-in D13 Strobe & TX/RX', {
        x: 9.45,
        y: 2.5,
        w: 2.9,
        h: 1.8,
        fontSize: 8.5,
        color: TEXT_WHITE
      });

      // Bottom Component Classification Breakdown Table
      const boardTableRows: any[][] = [
        [
          { text: 'SYSTEM CLASSIFICATION', options: { bold: true, color: TEXT_WHITE, fill: '1E293B', fontSize: 9 } },
          { text: 'KEY COMPONENTS', options: { bold: true, color: ACCENT_AMBER, fill: '1E293B', fontSize: 9 } },
          { text: 'PIN / INTERFACE', options: { bold: true, color: ACCENT_BLUE, fill: '1E293B', fontSize: 9 } },
          { text: 'ROLE IN ANTI-SLEEP ESCALATION PIPELINE', options: { bold: true, color: TEXT_WHITE, fill: '1E293B', fontSize: 9 } }
        ],
        [
          { text: 'Processing & Logic', options: { bold: true, color: TEXT_WHITE, fontSize: 8.5 } },
          { text: 'ATmega328P / ESP32 MCU, 16MHz Crystal', options: { color: TEXT_WHITE, fontSize: 8.5 } },
          { text: 'Core Bus / XTAL', options: { color: ACCENT_AMBER, fontSize: 8.5 } },
          { text: 'Executes closed-loop FSM logic, tracks closure debounce timers, drives PWM signals.', options: { color: TEXT_MUTED, fontSize: 8 } }
        ],
        [
          { text: 'Actuator Outputs', options: { bold: true, color: ACCENT_EMERALD, fontSize: 8.5 } },
          { text: 'Piezo Buzzer, SG90 Servo, Mist Relay', options: { color: TEXT_WHITE, fontSize: 8.5 } },
          { text: 'GPIO 18, 19, 23 (PWM)', options: { color: ACCENT_AMBER, fontSize: 8.5 } },
          { text: 'Stages 1-3 graduated deterrents: 500Hz chirp, 85dB siren, motorized desk slap, and cool mist.', options: { color: TEXT_MUTED, fontSize: 8 } }
        ],
        [
          { text: 'Sensory & ISR Inputs', options: { bold: true, color: 'A855F7', fontSize: 8.5 } },
          { text: 'Ocular Camera Bus, Tactile Disarm Switch', options: { color: TEXT_WHITE, fontSize: 8.5 } },
          { text: 'USB UART, GPIO 21 (ISR)', options: { color: ACCENT_AMBER, fontSize: 8.5 } },
          { text: 'Receives real-time EAR stream; hardware interrupt switch cancels alarms with sub-5ms latency.', options: { color: TEXT_MUTED, fontSize: 8 } }
        ],
        [
          { text: 'Power Regulation', options: { bold: true, color: ACCENT_BLUE, fontSize: 8.5 } },
          { text: 'AMS1117 5V LDO, LP2985 3.3V, Poly Fuse', options: { color: TEXT_WHITE, fontSize: 8.5 } },
          { text: 'VIN, 5V, 3.3V, GND', options: { color: ACCENT_AMBER, fontSize: 8.5 } },
          { text: 'Maintains clean logic rails and isolates high-current servo motor transients from microcontroller.', options: { color: TEXT_MUTED, fontSize: 8 } }
        ]
      ];

      slide.addTable(boardTableRows, {
        x: 0.8,
        y: 4.65,
        w: 11.7,
        h: 2.1,
        colW: [2.2, 2.8, 2.0, 4.7],
        border: { color: BORDER_COL, pt: 1 },
        fill: { color: CARD_BG },
        align: 'left',
        valign: 'middle'
      });
    } else if (slideData.type === 'algorithm' && slideData.formula) {
      // Algorithm Math formula box
      slide.addShape(pres.ShapeType.rect, {
        x: 0.8,
        y: 2.2,
        w: 11.7,
        h: 1.2,
        fill: { color: CARD_BG },
        line: { color: ACCENT_AMBER, width: 1.5 }
      });

      slide.addText(slideData.formula.expression, {
        x: 1.0,
        y: 2.35,
        w: 11.3,
        h: 0.5,
        fontSize: 18,
        bold: true,
        fontFace: 'Courier New',
        color: ACCENT_AMBER
      });

      slide.addText(slideData.formula.description, {
        x: 1.0,
        y: 2.85,
        w: 11.3,
        h: 0.4,
        fontSize: 12,
        color: TEXT_WHITE
      });

      // Threshold Table
      const tableRows: any[][] = [
        [
          { text: 'STATE', options: { bold: true, color: TEXT_WHITE, fill: '1E293B' } },
          { text: 'EAR RANGE', options: { bold: true, color: ACCENT_AMBER, fill: '1E293B' } },
          { text: 'SYSTEM INTERPRETATION', options: { bold: true, color: TEXT_WHITE, fill: '1E293B' } }
        ]
      ];

      slideData.formula.thresholds.forEach((t) => {
        tableRows.push([
          { text: t.label, options: { bold: true, color: TEXT_WHITE } },
          { text: t.value, options: { color: ACCENT_BLUE, bold: true } },
          { text: t.meaning, options: { color: TEXT_MUTED } }
        ]);
      });

      slide.addTable(tableRows, {
        x: 0.8,
        y: 3.6,
        w: 11.7,
        rowH: 0.45,
        colW: [2.5, 3.0, 6.2],
        fill: { color: CARD_BG },
        color: TEXT_WHITE,
        fontSize: 11,
        border: { pt: 1, color: BORDER_COL }
      });

      if (slideData.takeaway) {
        slide.addText(`Key Takeaway: ${slideData.takeaway}`, {
          x: 0.8,
          y: 6.2,
          w: 11.7,
          h: 0.5,
          fontSize: 12,
          bold: true,
          color: ACCENT_EMERALD
        });
      }
    } else if (slideData.type === 'flow' && slideData.stateSteps) {
      // State machine flow table
      const fsmRows: any[][] = [
        [
          { text: 'STAGE', options: { bold: true, color: TEXT_WHITE, fill: '1E293B' } },
          { text: 'STATE NAME', options: { bold: true, color: ACCENT_AMBER, fill: '1E293B' } },
          { text: 'TRIGGER CONDITION', options: { bold: true, color: TEXT_WHITE, fill: '1E293B' } },
          { text: 'ACTUATOR RESPONSE', options: { bold: true, color: ACCENT_EMERALD, fill: '1E293B' } },
          { text: 'CONTEXT NOTE', options: { bold: true, color: TEXT_MUTED, fill: '1E293B' } }
        ]
      ];

      slideData.stateSteps.forEach((s) => {
        fsmRows.push([
          { text: s.stage, options: { bold: true, color: ACCENT_BLUE } },
          { text: s.title, options: { bold: true, color: TEXT_WHITE } },
          { text: s.condition, options: { color: TEXT_MUTED, fontSize: 10 } },
          { text: s.action, options: { color: TEXT_WHITE, fontSize: 10 } },
          { text: s.humorLevel, options: { color: ACCENT_AMBER, italic: true, fontSize: 10 } }
        ]);
      });

      slide.addTable(fsmRows, {
        x: 0.8,
        y: 2.2,
        w: 11.7,
        rowH: 0.65,
        colW: [1.6, 2.3, 3.2, 3.0, 1.6],
        fill: { color: CARD_BG },
        color: TEXT_WHITE,
        fontSize: 10.5,
        border: { pt: 1, color: BORDER_COL }
      });

      if (slideData.takeaway) {
        slide.addText(`Safety Architecture: ${slideData.takeaway}`, {
          x: 0.8,
          y: 6.1,
          w: 11.7,
          h: 0.5,
          fontSize: 12,
          bold: true,
          color: ACCENT_EMERALD
        });
      }
    } else if (slideData.type === 'code' && slideData.codeSnippets) {
      // Code Snippet Slide
      const snippet = slideData.codeSnippets[0];

      // File header bar
      slide.addShape(pres.ShapeType.rect, {
        x: 0.8,
        y: 2.2,
        w: 11.7,
        h: 0.45,
        fill: { color: '1E293B' },
        line: { color: BORDER_COL, width: 1 }
      });

      slide.addText(`SOURCE: ${snippet.filename} (${snippet.language.toUpperCase()})`, {
        x: 1.0,
        y: 2.25,
        w: 8.0,
        h: 0.35,
        fontSize: 11,
        bold: true,
        fontFace: 'Courier New',
        color: ACCENT_BLUE
      });

      // Code Body Container
      slide.addShape(pres.ShapeType.rect, {
        x: 0.8,
        y: 2.65,
        w: 11.7,
        h: 3.6,
        fill: { color: '070A0F' },
        line: { color: BORDER_COL, width: 1 }
      });

      slide.addText(snippet.code, {
        x: 1.0,
        y: 2.75,
        w: 11.3,
        h: 3.4,
        fontSize: 8.5,
        fontFace: 'Courier New',
        color: 'E2E8F0',
        wrap: true
      });

      slide.addText(snippet.description, {
        x: 0.8,
        y: 6.35,
        w: 11.7,
        h: 0.4,
        fontSize: 11,
        color: ACCENT_AMBER,
        bold: true
      });
    } else if (slideData.bullets) {
      // Standard Cards (2x2 or list layout)
      slideData.bullets.forEach((b, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const xPos = 0.8 + col * 6.0;
        const yPos = 2.2 + row * 2.0;

        slide.addShape(pres.ShapeType.rect, {
          x: xPos,
          y: yPos,
          w: 5.7,
          h: 1.8,
          fill: { color: CARD_BG },
          line: { color: BORDER_COL, width: 1 }
        });

        if (b.badge) {
          slide.addText(b.badge.toUpperCase(), {
            x: xPos + 0.25,
            y: yPos + 0.15,
            w: 5.2,
            h: 0.25,
            fontSize: 9,
            bold: true,
            color: b.badgeTone === 'warning' ? ACCENT_AMBER : ACCENT_EMERALD
          });
        }

        slide.addText(b.headline, {
          x: xPos + 0.25,
          y: yPos + 0.45,
          w: 5.2,
          h: 0.35,
          fontSize: 14,
          bold: true,
          color: TEXT_WHITE
        });

        slide.addText(b.detail, {
          x: xPos + 0.25,
          y: yPos + 0.85,
          w: 5.2,
          h: 0.8,
          fontSize: 11.5,
          color: TEXT_MUTED
        });
      });

      if (slideData.takeaway) {
        slide.addText(`Summary: ${slideData.takeaway}`, {
          x: 0.8,
          y: 6.3,
          w: 11.7,
          h: 0.45,
          fontSize: 11.5,
          bold: true,
          color: ACCENT_EMERALD
        });
      }
    }
  }

  // Save and download presentation
  await pres.writeFile({ fileName: 'Anti-Sleep-Alarm-Presentation.pptx' });
}

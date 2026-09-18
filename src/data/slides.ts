import type { SlideData } from '../types/presentation';

export const presentationSlides: SlideData[] = [
  {
    id: 'intro',
    category: 'IT-ELECT 3',
    slideNumber: 1,
    title: 'anti sleep alarm',
    subtitle: 'Group 1',
    heroKicker: 'September 19, 2026 ->',
    takeaway: 'ALEGRE · CUIZON, C. · CUIZON, V. · CUMAHIG · LOFRANCO · OCHEA · PIZON · TALITY · OCHEA',
    type: 'title',
    bullets: [
      {
        headline: 'Course Subject',
        detail: 'IT-ELECT 3'
      },
      {
        headline: 'Project Team',
        detail: 'Group 1'
      },
      {
        headline: 'Team Members',
        detail: 'Alegre, Cuizon, C., Cuizon, V., Cumahig, Lofranco, Ochea, Pizon, Tality, Ochea'
      }
    ]
  },
  {
    id: 'what-is-it',
    category: 'PROJECT OVERVIEW',
    slideNumber: 2,
    title: 'What Is the Anti-Sleep Alarm?',
    subtitle: 'A Smart Desk Device That Keeps Students Awake During Late-Night Study',
    heroKicker: 'THE PROBLEM & SOLUTION',
    type: 'problem',
    bullets: [
      {
        headline: '1. Falling Asleep Without Knowing',
        detail: 'When studying late at night, you can fall asleep for a few seconds without realizing it. You are still holding your pen, but your eyes close and your brain stops working.',
        badge: 'The Problem',
        badgeTone: 'warning'
      },
      {
        headline: '2. Phone Alarms Do Not Work',
        detail: 'Phone alarms are too easy to turn off while half-asleep. Coffee and energy drinks cause fast heartbeats, but your eyelids still feel heavy past midnight.',
        badge: 'Why Alarms Fail',
        badgeTone: 'warning'
      },
      {
        headline: '3. The Anti-Sleep Alarm Solution',
        detail: 'A smart device placed on your study desk. A webcam watches your eyes, and if you fall asleep, it automatically wakes you up with sounds, a tap arm, and a cool water spray.',
        badge: 'The Solution',
        badgeTone: 'success'
      },
      {
        headline: '4. Goal of Our Project',
        detail: 'Help students stay awake and finish studying for exams safely, without needing dangerous amounts of caffeine or falling into an accidental 8-hour sleep.',
        badge: 'Our Goal',
        badgeTone: 'info'
      }
    ]
  },
  {
    id: 'how-it-works',
    category: 'HOW IT WORKS',
    slideNumber: 3,
    title: 'How It Works in 4 Steps',
    subtitle: 'From Eye Tracking on Camera to Physically Waking You Up',
    heroKicker: 'OPERATIONAL STEPS',
    type: 'concept',
    bullets: [
      {
        headline: '1. Camera Watches Face',
        subhead: 'AI Facial Landmark Tracker',
        detail: 'The webcam scans your face 30 times every second using AI face tracking to lock onto both eyes.',
        badge: 'Step 1: Detect',
        badgeTone: 'info',
        component: 'Webcam / USB Camera',
        metric: '30 FPS Real-Time Feed',
        trigger: 'Tracks 468 facial mesh coordinates'
      },
      {
        headline: '2. Measures Eye Opening',
        subhead: 'Eye Aspect Ratio (EAR) Math',
        detail: 'Calculates how wide open your eyelids are by comparing vertical eye opening against horizontal eye width.',
        badge: 'Step 2: Calculate',
        badgeTone: 'info',
        component: 'Python EAR Script',
        metric: 'Awake: > 0.25 | Shut: < 0.20',
        trigger: 'Runs geometric eyelid distance math'
      },
      {
        headline: '3. Filters Quick Blinks',
        subhead: '1.2-Second Safety Timer',
        detail: 'Natural human blinks last only ~0.15s. The system ignores blinks so you can study without false alarms.',
        badge: 'Step 3: Filter',
        badgeTone: 'warning',
        component: 'Debounce Timer Buffer',
        metric: 'Blink: < 0.25s | Sleep: > 1.2s',
        trigger: 'Only triggers when eyes stay shut'
      },
      {
        headline: '4. Wakes You in Stages',
        subhead: 'Chime, Siren, Slap, & Mist',
        detail: 'Plays a soft chime at 1.2s, a loud 85dB siren at 2.2s, and triggers the physical slap arm and cool mist at 3.5s.',
        badge: 'Step 4: Wake Up',
        badgeTone: 'success',
        component: 'ESP32 + Buzzer + Servo + Mist',
        metric: '3 Scaled Alarm Stages',
        trigger: 'Press red desk button to disarm'
      }
    ]
  },
  {
    id: 'structure',
    category: 'SYSTEM ARCHITECTURE',
    slideNumber: 4,
    title: 'System Structure: Hardware & Software',
    subtitle: 'How the Camera, Controller, and Waking Devices Connect Together',
    heroKicker: 'SYSTEM BLUEPRINT',
    type: 'hardware',
    hardwareList: [
      {
        name: 'Webcam Eye Tracker',
        role: 'Watches Your Face',
        spec: 'Runs MediaPipe AI face mesh at 30 frames per second on your laptop',
        humorNote: 'Sees when your eyes close with zero excuses.',
        iconType: 'camera'
      },
      {
        name: 'ESP32-S3 Microcontroller',
        role: 'Brain of the Device',
        spec: 'Receives signals from the laptop and controls all alarms and motors',
        humorNote: 'The smart chip that never gets sleepy.',
        iconType: 'chip'
      },
      {
        name: '85dB Alarm Buzzer',
        role: 'Makes Warning Sounds',
        spec: 'Plays a soft reminder chime first, then a loud piercing siren',
        humorNote: 'Cuts right through your drowsiness.',
        iconType: 'speaker'
      },
      {
        name: 'Servo Slap Arm',
        role: 'Physical Tap on the Head',
        spec: 'Motorized arm with a soft padded mallet that sweeps to wake you up',
        humorNote: 'A friendly physical tap that demands attention.',
        iconType: 'shield'
      },
      {
        name: 'Cool Water Mist Spray',
        role: 'Sensory Wake-Up Blast',
        spec: 'Mini ultrasonic spray nozzle that mists cold water on your face',
        humorNote: 'Instant cold water splash to bring you back to life.',
        iconType: 'zap'
      },
      {
        name: 'Disarm Push Button',
        role: 'Turn Off the Alarm',
        spec: 'Big red button on the desk you press to prove you are awake',
        humorNote: 'Forces you to sit up and physically press it.',
        iconType: 'refresh'
      }
    ]
  },
  {
    id: 'hardware-board',
    category: 'HARDWARE BLUEPRINT',
    slideNumber: 5,
    title: 'Anti-Sleep Alarm: Hardware Blueprint',
    subtitle: 'Physical IoT Station Architecture, Component Classification, & Actuation Mapping',
    heroKicker: 'COMPONENT TAXONOMY',
    type: 'board-diagram',
    bullets: [
      {
        headline: 'Physical IoT Device Layout',
        detail: 'Complete mapping of ESP32-S3 core, SG90 servo slap arm, 85dB piezo siren, mist nozzle, camera sensor, and hardware ISR disarm switch.'
      }
    ]
  },
  {
    id: 'process',
    category: 'THE PROCESS',
    slideNumber: 6,
    title: 'The Process: Eye Aspect Ratio (EAR)',
    subtitle: 'The Simple Math Formula That Detects When Your Eyes Close',
    heroKicker: 'DETECTION ALGORITHM',
    type: 'algorithm',
    formula: {
      expression: 'EAR = (Eye Height 1 + Eye Height 2) / (2 * Eye Width)',
      description: 'Calculates the ratio between eyelid height and eye width across 6 distinct facial coordinates.',
      thresholds: [
        { label: 'Wide Awake', value: 'EAR > 0.25', meaning: 'Student is actively reading, reviewing, or writing.' },
        { label: 'Normal Blink', value: 'EAR < 0.20 (0.15s)', meaning: 'Filtered out as normal blinking so it will not false alarm.' },
        { label: 'Drowsy Droop', value: '0.21 - 0.24 (1.2s)', meaning: 'Heavy eyelids detected; triggers polite Stage 1 reminder chime.' },
        { label: 'Deep Micro-Sleep', value: 'EAR < 0.20 (> 2.2s)', meaning: 'True sleep confirmed; triggers 85dB siren and slap arm.' }
      ]
    }
  },
  {
    id: 'escalation',
    category: 'STATE MACHINE',
    slideNumber: 7,
    title: '5-Stage Escalation State Machine',
    subtitle: 'Step-by-Step Response: From Awake to Sound, Slap Arm, and Reset',
    heroKicker: 'SMART ESCALATION',
    type: 'flow',
    stateSteps: [
      {
        stage: 'Stage 0',
        title: 'Awake & Studying',
        condition: 'Eyes open (EAR >= 0.25)',
        action: 'System is quiet. Green light is on. You are studying normally.',
        humorLevel: 'Calm and focused',
        status: 'calm'
      },
      {
        stage: 'Stage 1',
        title: 'Drowsy Chime',
        condition: 'Eyes closing for 1.2 seconds',
        action: 'Plays a soft warning chime to remind you to sit up straight.',
        humorLevel: 'Polite reminder',
        status: 'alert'
      },
      {
        stage: 'Stage 2',
        title: '85dB Siren Alarm',
        condition: 'Eyes closed for 2.2 seconds',
        action: 'Blasts a loud continuous siren to snap you out of micro-sleep.',
        humorLevel: 'Loud wake-up call',
        status: 'panic'
      },
      {
        stage: 'Stage 3',
        title: 'Physical Slap & Mist',
        condition: 'Eyes closed for over 3.5 seconds',
        action: 'Motorized slap arm taps you and cold water mist sprays your face!',
        humorLevel: 'Full physical intervention',
        status: 'panic'
      },
      {
        stage: 'Disarm',
        title: 'Manual Reset Button',
        condition: 'You press the red desk button',
        action: 'Instantly stops all sounds, resets motors, and returns to Stage 0.',
        humorLevel: 'Safety reset',
        status: 'reset'
      }
    ]
  },
  {
    id: 'code-python',
    category: 'SAMPLE CODE',
    slideNumber: 8,
    title: 'Sample Code: Eye Tracker (Python)',
    subtitle: 'Camera Code That Measures Your Eyes and Sends Commands to the Board',
    heroKicker: 'PYTHON SCRIPT',
    type: 'code',
    codeSnippets: [
      {
        language: 'python',
        filename: 'eye_tracker.py',
        description: 'Watches your webcam, calculates if your eyes are closed, and tells the ESP32 chip which alarm stage to trigger.',
        code: `import cv2, time, serial, numpy as np
import mediapipe as mp

# 1. Connect to the ESP32 board through USB serial cable
esp32 = serial.Serial('COM3', 115200, timeout=0.1)

# Eye landmark points from MediaPipe face mesh
LEFT_EYE = [362, 385, 387, 263, 373, 380]

# 2. Math function: calculates how open your eye is
def compute_ear(landmarks, indices):
    pts = [np.array([landmarks[i].x, landmarks[i].y]) for i in indices]
    vertical_1 = np.linalg.norm(pts[1] - pts[5]) # Top to bottom height 1
    vertical_2 = np.linalg.norm(pts[2] - pts[4]) # Top to bottom height 2
    horizontal = np.linalg.norm(pts[0] - pts[3]) # Eye corner width
    return (vertical_1 + vertical_2) / (2.0 * horizontal)

# 3. Turn on the laptop webcam
cap = cv2.VideoCapture(0)
mesh = mp.solutions.face_mesh.FaceMesh(max_num_faces=1)
sleep_start = None

# 4. Main loop: runs 30 times per second
while cap.isOpened():
    ret, frame = cap.read()
    if not ret: break
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = mesh.process(rgb)

    if results.multi_face_landmarks:
        ear = compute_ear(results.multi_face_landmarks[0].landmark, LEFT_EYE)
        
        # Check if eyelids are drooping shut
        if ear < 0.21:
            if sleep_start is None: sleep_start = time.time()
            elapsed = time.time() - sleep_start

            # Stage 3: Eyes shut for 3.5s -> Trigger slap arm & water mist
            if elapsed > 3.5:   
                esp32.write(b'TRIGGER_STAGE_3\\n')
            # Stage 2: Eyes shut for 2.2s -> Trigger loud 85dB alarm siren
            elif elapsed > 2.2: 
                esp32.write(b'TRIGGER_STAGE_2\\n')
            # Stage 1: Eyes shut for 1.2s -> Trigger polite warning chime
            elif elapsed > 1.2: 
                esp32.write(b'TRIGGER_STAGE_1\\n')
        else:
            # Eyes are open and awake -> Keep all alarms quiet
            sleep_start = None
            esp32.write(b'STATUS_OK\\n')`
      }
    ]
  },
  {
    id: 'code-firmware',
    category: 'SAMPLE CODE',
    slideNumber: 9,
    title: 'Sample Code: Actuator Firmware (ESP32 C++)',
    subtitle: 'Arduino Code That Triggers the Buzzer, Slap Arm, Mist, & Button',
    heroKicker: 'EMBEDDED C++ FIRMWARE',
    type: 'code',
    codeSnippets: [
      {
        language: 'cpp',
        filename: 'AntiSleepActuator.ino',
        description: 'Receives serial commands from the laptop, plays sounds, moves the slap arm, sprays mist, and listens for the disarm button.',
        code: `#include <ESP32Servo.h>

// 1. Assign hardware pins on the ESP32 board
const int PIN_BUZZER = 18; // Connected to the 85dB Piezo Buzzer
const int PIN_SERVO  = 19; // Connected to the SG90 Slap Arm Motor
const int PIN_MIST   = 23; // Connected to the Cool Mist Spray Relay
const int PIN_DISARM = 21; // Connected to the Big Red Disarm Button

Servo wakeupArm;
volatile bool emergencyActive = false;

// 2. Hardware interrupt: instantly disarms all alarms when button is pressed
void IRAM_ATTR handleDisarm() {
  emergencyActive = false;
  digitalWrite(PIN_BUZZER, LOW); // Turn off sound immediately
  digitalWrite(PIN_MIST, LOW);   // Stop water spray immediately
  wakeupArm.write(0);            // Return slap arm back to safe resting position
}

// 3. Setup pins and button listener
void setup() {
  Serial.begin(115200);
  pinMode(PIN_BUZZER, OUTPUT);
  pinMode(PIN_MIST, OUTPUT);
  pinMode(PIN_DISARM, INPUT_PULLUP);
  // Interrupt: When button is pressed down, run handleDisarm() in under 5 milliseconds
  attachInterrupt(digitalPinToInterrupt(PIN_DISARM), handleDisarm, FALLING);
  wakeupArm.attach(PIN_SERVO);
  wakeupArm.write(0); // Start with arm safely parked
}

// 4. Main loop: listens for commands sent from the Python camera tracker
void loop() {
  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\\n');
    cmd.trim();

    // Stage 1: Play soft reminder chime
    if (cmd == "TRIGGER_STAGE_1") {
      tone(PIN_BUZZER, 500, 150); // 500Hz gentle beep
    } 
    // Stage 2: Blast loud piercing siren
    else if (cmd == "TRIGGER_STAGE_2") {
      tone(PIN_BUZZER, 2800, 800); // 2800Hz loud 85dB alert
    } 
    // Stage 3: Physical wake-up: Slap arm swings down and cold mist sprays!
    else if (cmd == "TRIGGER_STAGE_3") {
      emergencyActive = true;
      digitalWrite(PIN_MIST, HIGH); // Turn on water mist spray
      wakeupArm.write(90);          // Slap arm swings forward to tap student
      delay(400);                   // Hold for physical contact
      wakeupArm.write(0);           // Return arm to standby position
      digitalWrite(PIN_MIST, LOW);  // Turn off water mist
    } 
    // Status OK: Student is awake -> Keep buzzer quiet
    else if (cmd == "STATUS_OK") {
      noTone(PIN_BUZZER);
    }
  }
}`
      }
    ]
  },
  {
    id: 'simulator',
    category: 'LIVE DEMO',
    slideNumber: 10,
    title: 'Interactive Drowsiness Simulator',
    subtitle: 'Hands-on Verification of EAR Thresholds, Synthesized Audio, & Actuators',
    heroKicker: 'LIVE TEST BENCH',
    type: 'simulator'
  },
  {
    id: 'takeaways',
    category: 'PROJECT SUMMARY',
    slideNumber: 11,
    title: 'Key Takeaways',
    subtitle: 'Conclusion',
    heroKicker: 'CORE TAKEAWAYS',
    type: 'roadmap',
    bullets: [
      {
        headline: '1. Camera Tracks Your Eyes',
        detail: 'The webcam watches your face while you study. It knows the difference between a normal quick blink and falling asleep.',
        badge: 'Detection',
        badgeTone: 'info'
      },
      {
        headline: '2. Stage 1 & 2 Warning Sounds',
        detail: 'If your eyes close for 1.2 seconds, a gentle chime sounds. If you stay asleep for 2.2 seconds, a loud 85dB siren goes off.',
        badge: 'Audio Alert',
        badgeTone: 'warning'
      },
      {
        headline: '3. Stage 3 Slap Arm & Mist Spray',
        detail: 'If sound does not wake you, the motorized arm taps you and a cool water mist sprays your face to snap you right back awake.',
        badge: 'Physical Wake-up',
        badgeTone: 'success'
      },
      {
        headline: '4. Physical Button Shuts It Off',
        detail: 'You press the red desk button to prove you are awake. This instantly turns off all sounds and returns the arm to resting position.',
        badge: 'Disarm Switch',
        badgeTone: 'info'
      }
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Demo Settings
  const lifeExpectancy = 80;
  // Let's set DOB to 26 years ago for a good visual representation
  const dob = new Date();
  dob.setFullYear(dob.getFullYear() - 26);
  
  // Elements
  const gridContainer = document.getElementById('grid-container');
  const timerYears = document.getElementById('timer-years');
  const timerFraction = document.getElementById('timer-fraction');
  
  let animationFrameId;
  let fluidSim = null;
  let activeNodeData = {
    element: null,
    startMs: 0,
    endMs: 0
  };

  // --- Fluid Dynamics Simulation ---
  const FLUID_COLS = 64;
  const PROPAGATION = 0.45;
  const DAMPING = 0.995;
  const MOUSE_MOVE_STRENGTH = 2.5;
  const MOUSE_DRAG_STRENGTH = 4.0;
  const CLICK_SPLASH_FORCE = 0.18;
  const TILT_STRENGTH = 0.006;
  const AMBIENT_SPEED = 1.8;
  const AMBIENT_AMP = 0.012;

  class FluidSimulation {
    constructor(el) {
      this.el = el;
      this.isCircle = false;
      this.heights = new Float32Array(FLUID_COLS);
      this.velocities = new Float32Array(FLUID_COLS);

      this.canvas = document.createElement('canvas');
      this.canvas.className = 'fluid-canvas';
      this.canvas.style.pointerEvents = 'none';
      el.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d');

      this.progress = 0;
      this.mouseX = -1;
      this.mouseY = -1;
      this.prevMouseX = -1;
      this.prevMouseY = -1;
      this.mouseInside = false;
      this.mouseDown = false;
      this.tiltX = 0;
      this.tiltY = 0;
      this.animTime = 0;
      
      this.waterColor = '#ffffff';
      this.bgColor = '#1a1a1a';
      this.waterColorHL = 'rgba(255,255,255,0.45)';
      this.w = 0;
      this.h = 0;

      this.resize();

      this.boundMouseMove = this._onMouseMove.bind(this);
      this.boundMouseLeave = this._onMouseLeave.bind(this);
      this.boundMouseDown = this._onMouseDown.bind(this);
      this.boundMouseUp = this._onMouseUp.bind(this);
      
      el.addEventListener('mousemove', this.boundMouseMove);
      el.addEventListener('mouseleave', this.boundMouseLeave);
      el.addEventListener('mousedown', this.boundMouseDown);
      window.addEventListener('mouseup', this.boundMouseUp);
    }

    resize() {
      const rect = this.el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = Math.max(1, Math.round(rect.width * dpr));
      this.h = Math.max(1, Math.round(rect.height * dpr));
      this.canvas.width = this.w;
      this.canvas.height = this.h;
    }

    setProgress(p) {
      this.progress = Math.max(0, Math.min(1, p));
    }

    _isInsideShape(nx, ny) {
      return nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1;
    }

    _getNormalized(e) {
      const rect = this.el.getBoundingClientRect();
      return {
        nx: (e.clientX - rect.left) / rect.width,
        ny: (e.clientY - rect.top) / rect.height
      };
    }

    _onMouseMove(e) {
      const { nx, ny } = this._getNormalized(e);

      if (!this._isInsideShape(nx, ny)) {
        this.mouseInside = false;
        this.mouseX = -1;
        this.mouseY = -1;
        return;
      }

      const surfaceNY = 1 - this.progress;
      const inWater = ny >= (surfaceNY - 0.10);

      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
      this.mouseX = nx;
      this.mouseY = ny;
      this.mouseInside = inWater;
    }

    _onMouseDown(e) {
      this.mouseDown = true;
      const { nx, ny } = this._getNormalized(e);

      if (!this._isInsideShape(nx, ny)) return;

      const surfaceNY = 1 - this.progress;
      if (ny < (surfaceNY - 0.10)) return;

      const col = Math.floor(nx * (FLUID_COLS - 1));
      const splashForce = CLICK_SPLASH_FORCE * this.h;

      for (let k = -5; k <= 5; k++) {
        const ci = col + k;
        if (ci >= 0 && ci < FLUID_COLS) {
          const falloff = Math.exp(-(k * k) / 4.0);
          this.heights[ci] -= splashForce * falloff;
        }
      }
    }

    _onMouseUp(_e) {
      this.mouseDown = false;
    }

    _onMouseLeave() {
      this.mouseInside = false;
      this.mouseDown = false;
      this.mouseX = -1;
      this.mouseY = -1;
      this.prevMouseX = -1;
      this.prevMouseY = -1;
    }

    update() {
      const ht = this.heights;
      const v = this.velocities;
      const n = FLUID_COLS;
      this.animTime += 0.016;

      const ambientAmp = Math.max(0.5, this.h * AMBIENT_AMP);
      for (let i = 0; i < n; i++) {
        const target = Math.sin(this.animTime * AMBIENT_SPEED + i * 0.35) * ambientAmp
          + Math.sin(this.animTime * AMBIENT_SPEED * 0.7 + i * 0.22 + 2.0) * ambientAmp * 0.4;
        ht[i] += (target - ht[i]) * 0.015;
      }

      if (this.mouseInside && this.mouseX >= 0) {
        const col = Math.floor(this.mouseX * (n - 1));
        const strength = this.mouseDown ? MOUSE_DRAG_STRENGTH : MOUSE_MOVE_STRENGTH;

        if (this.prevMouseX >= 0) {
          const mouseVelY = (this.mouseY - this.prevMouseY);
          const mouseVelX = (this.mouseX - this.prevMouseX);
          const totalVel = Math.abs(mouseVelY) + Math.abs(mouseVelX);

          if (totalVel > 0.001) {
            const force = mouseVelY * strength * this.h * 0.15;
            const lateralForce = Math.abs(mouseVelX) * strength * this.h * 0.10;

            for (let k = -6; k <= 6; k++) {
              const ci = col + k;
              if (ci >= 0 && ci < n) {
                const falloff = Math.exp(-(k * k) / 5.0);
                ht[ci] += (force + lateralForce) * falloff;
              }
            }
          }
        }

        if (this.mouseDown) {
          const pushForce = this.h * 0.025;
          for (let k = -4; k <= 4; k++) {
            const ci = col + k;
            if (ci >= 0 && ci < n) {
              const falloff = Math.exp(-(k * k) / 3.5);
              ht[ci] -= pushForce * falloff;
            }
          }
        }
      }

      for (let i = 1; i < n - 1; i++) {
        v[i] += (ht[i - 1] + ht[i + 1] - 2 * ht[i]) * PROPAGATION;
      }
      
      v[0] += (ht[1] - ht[0]) * PROPAGATION;
      v[n - 1] += (ht[n - 2] - ht[n - 1]) * PROPAGATION;

      const maxDisp = this.h * 0.18;
      for (let i = 0; i < n; i++) {
        v[i] *= DAMPING;
        ht[i] += v[i];
        if (ht[i] > maxDisp) ht[i] = maxDisp;
        if (ht[i] < -maxDisp) ht[i] = -maxDisp;
      }

      this.render();
    }

    render() {
      const ctx = this.ctx;
      const w = this.w;
      const h = this.h;
      if (w < 1 || h < 1) return;

      ctx.clearRect(0, 0, w, h);

      const n = FLUID_COLS;
      const eqY = h * (1 - this.progress);

      ctx.beginPath();
      ctx.moveTo(0, h);

      const points = [];
      for (let i = 0; i < n; i++) {
        const x = (i / (n - 1)) * w;
        const y = eqY - this.heights[i];
        points.push({ x, y });
      }

      ctx.lineTo(points[0].x, points[0].y);

      for (let i = 0; i < points.length - 1; i++) {
        const cpX = (points[i].x + points[i + 1].x) / 2;
        const cpY = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, cpX, cpY);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.lineTo(w, h);
      ctx.closePath();

      ctx.fillStyle = this.waterColor;
      ctx.globalAlpha = 0.9;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, h);

      for (let i = 0; i < n; i++) {
        const x = (i / (n - 1)) * w;
        const y = eqY - this.heights[i] + 2;
        if (i === 0) {
          ctx.lineTo(x, y);
        } else {
          const prevX = ((i - 1) / (n - 1)) * w;
          const prevY = eqY - this.heights[i - 1] + 2;
          const cpX = (prevX + x) / 2;
          const cpY = (prevY + y) / 2;
          ctx.quadraticCurveTo(prevX, prevY, cpX, cpY);
        }
      }

      ctx.lineTo(w, h);
      ctx.closePath();

      ctx.fillStyle = this.waterColorHL;
      ctx.globalAlpha = 0.6;
      ctx.fill();

      ctx.globalAlpha = 1;
    }

    destroy() {
      this.el.removeEventListener('mousemove', this.boundMouseMove);
      this.el.removeEventListener('mouseleave', this.boundMouseLeave);
      this.el.removeEventListener('mousedown', this.boundMouseDown);
      window.removeEventListener('mouseup', this.boundMouseUp);
      if (this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }
    }
  }

  // --- Grid Mathematics ---
  function renderGrid() {
    if (!gridContainer) return;

    if (fluidSim) {
      fluidSim.destroy();
      fluidSim = null;
    }

    gridContainer.innerHTML = '';

    const now = new Date();
    const totalUnits = lifeExpectancy; // Years precision for landing page demo

    const availableWidth = gridContainer.clientWidth - 32;
    const availableHeight = gridContainer.clientHeight - 32;

    const aspect = availableWidth / availableHeight;
    let bestCols = Math.ceil(Math.sqrt(totalUnits * aspect));

    let maxSquareSize = 0;
    let optimizedCols = bestCols;

    for (let c = Math.max(1, bestCols - 2); c <= bestCols + 2; c++) {
      const r = Math.ceil(totalUnits / c);
      const w = availableWidth / c;
      const h = availableHeight / r;
      const sz = Math.min(w, h);
      if (sz > maxSquareSize) {
        maxSquareSize = sz;
        optimizedCols = c;
      }
    }

    bestCols = optimizedCols;
    const boxSize = Math.floor(maxSquareSize) - 2;

    const dobMs = dob.getTime();
    const yearMs = 365.25 * 24 * 60 * 60 * 1000;
    
    for (let i = 0; i < totalUnits; i++) {
      const box = document.createElement('div');
      box.className = 'grid-box';
      box.style.width = `${boxSize}px`;
      box.style.height = `${boxSize}px`;

      const startMs = dobMs + (i * yearMs);
      const endMs = startMs + yearMs;

      if (now.getTime() >= endMs) {
        box.classList.add('past');
      } else if (now.getTime() >= startMs && now.getTime() < endMs) {
        activeNodeData = {
          element: box,
          startMs,
          endMs
        };
        fluidSim = new FluidSimulation(box);
      }
      
      gridContainer.appendChild(box);
    }
  }

  // --- Clock ---
  function updateClock() {
    const now = new Date().getTime();
    const dobMs = dob.getTime();
    const diffMs = Math.max(0, now - dobMs);
    const yearMs = 365.25 * 24 * 60 * 60 * 1000;
    
    const years = diffMs / yearMs;
    const yearsInt = Math.floor(years);
    const fraction = years - yearsInt;
    
    if (timerYears) timerYears.textContent = yearsInt.toString().padStart(2, '0');
    if (timerFraction) timerFraction.textContent = fraction.toFixed(9).substring(2);

    if (fluidSim && activeNodeData.element) {
      const s = activeNodeData.startMs;
      const e = activeNodeData.endMs;
      const p = Math.max(0, Math.min(1, (now - s) / (e - s)));
      fluidSim.setProgress(p);
      fluidSim.update();
    }

    animationFrameId = requestAnimationFrame(updateClock);
  }

  // Handle Resize
  window.addEventListener('resize', () => {
    renderGrid();
  });

  // Init
  renderGrid();
  updateClock();
});

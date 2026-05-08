// Loader
(function () {
  const overlay = document.getElementById('loader-overlay');
  if (!overlay) return;
  setTimeout(() => {
    overlay.classList.add('done');
    setTimeout(() => overlay.remove(), 500);
  }, 1400);
})();

// Pixelate profile photo via canvas
(function () {
  const img = document.querySelector('.photo-pixelated');
  if (!img) return;
  function pixelate() {
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    if (!w || !h) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const scale = 0.12;
    const sw = Math.floor(w * scale);
    const sh = Math.floor(h * scale);
    canvas.width = w;
    canvas.height = h;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, sw, sh);
    ctx.drawImage(canvas, 0, 0, sw, sh, 0, 0, w, h);
    img.src = canvas.toDataURL();
    img.style.imageRendering = 'pixelated';
  }
  if (img.complete) pixelate();
  else img.addEventListener('load', pixelate);
})();

// Pixel rain background
(function () {
  const canvas = document.getElementById('pixel-rain');
  const ctx = canvas.getContext('2d');
  let w, h;
  const pixels = [];
  const PIXEL_COUNT = 35;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createPixel() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.4 + 0.1,
      drift: (Math.random() - 0.5) * 0.2,
    };
  }

  function init() {
    resize();
    for (let i = 0; i < PIXEL_COUNT; i++) pixels.push(createPixel());
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of pixels) {
      ctx.fillStyle = `rgba(138, 200, 255, ${p.opacity})`;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      p.y += p.speed;
      p.x += p.drift;
      if (p.y > h + 4) {
        p.y = -4;
        p.x = Math.random() * w;
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  draw();
})();

// Avatar face animation on load
(function () {
  const face = document.querySelector('.avatar-placeholder span');
  if (!face) return;
  const expressions = [':/',':|',':)', ':D', ':)'];
  let i = 0;
  face.textContent = expressions[0];
  const interval = setInterval(() => {
    i++;
    if (i >= expressions.length) {
      clearInterval(interval);
      return;
    }
    face.textContent = expressions[i];
  }, 400);
})();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav toggle
document.querySelector('.nav-toggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// Publication tabs
document.querySelectorAll('.pub-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.pub-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.pub-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// Scroll reveal
const reveals = document.querySelectorAll(
  '.about-content, .pub-year-group, .course-card, .cv-block'
);
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);
reveals.forEach(el => observer.observe(el));

// Pixel Black Cat — interactive
(function () {
  const canvas = document.getElementById('cat-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const S = 3;
  const CW = 72, CH = 96;

  const BLACK = '#1a1a2e';
  const DARK = '#2a2a3e';
  const EYE = '#8ec8ff';
  const NOSE = '#e8a0bf';
  const HEART = '#f28ba8';
  const YARN = '#baddff';
  const YARN2 = '#8ec8ff';
  const BERRY_DARK = '#3b2d6b';
  const BERRY_MID = '#5a45a0';
  const BERRY_LIGHT = '#7b68c4';
  const BERRY_LEAF = '#6aab7a';

  // states: idle, track, pet, eat, lonely, sleep
  let state = 'idle';
  let frame = 0;
  let idleTimer = 0;
  let tailWag = 0;
  let blinking = false;
  let blinkTimer = 0;
  let lastInteraction = Date.now();
  const SLEEP_AFTER = 8000;

  let mouseNear = false;
  let mouseOver = false;
  let mouseOnHead = false;
  let mouseRelX = 0;
  let mouseRelY = 0;

  const particles = [];

  // blueberry drop
  let berryY = -10;
  let berryVel = 0;
  let berryActive = false;
  let eatTimer = 0;
  let berryCooldown = 0;

  // lonely
  let lonelyTimer = 0;

  // pet
  let petStrokes = 0;
  let lastPetX = -1;
  let petCooldown = 0;

  const catEl = canvas.parentElement;

  const CAT_OY = 8; // fixed vertical offset — room above for particles/berry

  function updateMouseState(e) {
    const rect = catEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    mouseRelX = dx;
    mouseRelY = dy;

    const wasNear = mouseNear;
    mouseNear = dist < 120;
    mouseOver = dist < 50;
    mouseOnHead = mouseOver && (e.clientY - rect.top) < rect.height * 0.4;

    if (mouseNear) {
      lastInteraction = Date.now();
      if (state === 'sleep') { state = 'track'; idleTimer = 0; }
      if (state !== 'pet' && state !== 'eat' && state !== 'lonely') {
        state = 'track';
        idleTimer = 0;
      }
    }

    if (!mouseNear && wasNear && state !== 'sleep' && state !== 'lonely' && state !== 'eat') {
      state = 'lonely';
      lonelyTimer = 0;
    }
  }

  document.addEventListener('mousemove', updateMouseState);

  document.addEventListener('mousemove', (e) => {
    if (!mouseOnHead || petCooldown > 0) return;
    const rect = catEl.getBoundingClientRect();
    const px = e.clientX - rect.left;
    if (lastPetX >= 0 && Math.abs(px - lastPetX) > 6) {
      petStrokes++;
      if (petStrokes >= 3) {
        state = 'pet';
        idleTimer = 0;
        petStrokes = 0;
        petCooldown = 40;
        lastInteraction = Date.now();
      }
    }
    lastPetX = px;
  });

  // click = drop a blueberry
  catEl.addEventListener('click', () => {
    if (!berryActive && berryCooldown <= 0) {
      berryActive = true;
      berryY = 0;
      berryVel = 0;
      berryCooldown = 90;
      lastInteraction = Date.now();
    }
  });

  // particles
  function spawnHeart() {
    particles.push({
      type: 'heart',
      x: 4 + Math.random() * 6,
      y: CAT_OY - 3,
      life: 45, maxLife: 45,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.4,
    });
  }

  function spawnYarn() {
    particles.push({
      type: 'yarn',
      x: 5 + Math.random() * 4,
      y: CAT_OY - 3,
      life: 50, maxLife: 50,
      vx: 0, vy: -0.25,
      rot: Math.random() * 6.28,
    });
  }

  function drawPixel(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * S, y * S, S, S);
  }

  // cat parts
  function drawCatBase(oy) {
    drawPixel(3,0+oy,BLACK); drawPixel(4,0+oy,BLACK);
    drawPixel(2,1+oy,BLACK); drawPixel(3,1+oy,DARK); drawPixel(4,1+oy,DARK);
    drawPixel(9,0+oy,BLACK); drawPixel(10,0+oy,BLACK);
    drawPixel(9,1+oy,DARK); drawPixel(10,1+oy,DARK); drawPixel(11,1+oy,BLACK);
    for (let x=3;x<=10;x++) drawPixel(x,2+oy,BLACK);
    for (let x=2;x<=11;x++) drawPixel(x,3+oy,BLACK);
    for (let x=2;x<=11;x++) drawPixel(x,4+oy,BLACK);
    for (let x=2;x<=11;x++) drawPixel(x,5+oy,BLACK);
    for (let x=3;x<=10;x++) drawPixel(x,6+oy,BLACK);
  }

  function drawBody(oy) {
    for (let x=3;x<=10;x++) drawPixel(x,7+oy,BLACK);
    for (let x=2;x<=11;x++) drawPixel(x,8+oy,BLACK);
    for (let x=2;x<=11;x++) drawPixel(x,9+oy,BLACK);
    for (let x=2;x<=11;x++) drawPixel(x,10+oy,BLACK);
    for (let x=2;x<=11;x++) drawPixel(x,11+oy,BLACK);
    drawPixel(2,12+oy,DARK); drawPixel(3,12+oy,DARK); drawPixel(4,12+oy,DARK);
    drawPixel(9,12+oy,DARK); drawPixel(10,12+oy,DARK); drawPixel(11,12+oy,DARK);
  }

  function drawTail(oy, wag) {
    const offY = Math.round(Math.sin(wag));
    drawPixel(12,10+oy+offY,BLACK);
    drawPixel(13,9+oy+offY,BLACK);
    drawPixel(14,8+oy+offY,BLACK);
    drawPixel(15,8+oy+offY,DARK);
  }

  function drawTrackingEyes(oy) {
    let ex=0, ey=0;
    if (Math.abs(mouseRelX)>10) ex = mouseRelX>0?1:-1;
    if (Math.abs(mouseRelY)>10) ey = mouseRelY>0?1:0;
    const lx=4+ex, rx=8+ex, ty=3+ey;
    drawPixel(lx,ty+oy,EYE); drawPixel(lx+1,ty+oy,EYE);
    drawPixel(lx,ty+1+oy,EYE); drawPixel(lx+1,ty+1+oy,EYE);
    drawPixel(rx,ty+oy,EYE); drawPixel(rx+1,ty+oy,EYE);
    drawPixel(rx,ty+1+oy,EYE); drawPixel(rx+1,ty+1+oy,EYE);
    drawPixel(6,5+oy,NOSE); drawPixel(7,5+oy,NOSE);
  }

  function drawLookUpEyes(oy) {
    drawPixel(4,3+oy,EYE); drawPixel(5,3+oy,EYE);
    drawPixel(4,4+oy,EYE); drawPixel(5,4+oy,EYE);
    drawPixel(8,3+oy,EYE); drawPixel(9,3+oy,EYE);
    drawPixel(8,4+oy,EYE); drawPixel(9,4+oy,EYE);
    drawPixel(6,5+oy,NOSE); drawPixel(7,5+oy,NOSE);
  }

  function drawNormalEyes(oy, blink) {
    if (blink) {
      drawPixel(4,4+oy,DARK); drawPixel(5,4+oy,DARK);
      drawPixel(8,4+oy,DARK); drawPixel(9,4+oy,DARK);
    } else {
      drawPixel(4,3+oy,EYE); drawPixel(5,3+oy,EYE);
      drawPixel(4,4+oy,EYE); drawPixel(5,4+oy,EYE);
      drawPixel(8,3+oy,EYE); drawPixel(9,3+oy,EYE);
      drawPixel(8,4+oy,EYE); drawPixel(9,4+oy,EYE);
    }
    drawPixel(6,5+oy,NOSE); drawPixel(7,5+oy,NOSE);
  }

  function drawHappyEyes(oy) {
    drawPixel(4,3+oy,EYE); drawPixel(5,3+oy,EYE);
    drawPixel(3,4+oy,EYE); drawPixel(6,4+oy,EYE);
    drawPixel(8,3+oy,EYE); drawPixel(9,3+oy,EYE);
    drawPixel(7,4+oy,EYE); drawPixel(10,4+oy,EYE);
    drawPixel(6,5+oy,NOSE); drawPixel(7,5+oy,NOSE);
  }

  function drawSleepEyes(oy) {
    drawPixel(4,4+oy,DARK); drawPixel(5,4+oy,DARK);
    drawPixel(8,4+oy,DARK); drawPixel(9,4+oy,DARK);
    drawPixel(6,5+oy,NOSE); drawPixel(7,5+oy,NOSE);
  }

  function drawZzz(f) {
    const offset = Math.floor(f/10)%3;
    const alpha = ((f%10)/10);
    ctx.fillStyle = `rgba(142,200,255,${0.3+alpha*0.5})`;
    ctx.font = `${7+offset}px 'Press Start 2P',monospace`;
    ctx.fillText('z', (14-offset)*S, (CAT_OY-1+offset*2)*S);
  }

  // blueberry (3x3 pixel art)
  function drawBlueberry(bx, by) {
    drawPixel(bx,by,BERRY_LEAF); drawPixel(bx+1,by,BERRY_LEAF);
    drawPixel(bx,by+1,BERRY_DARK); drawPixel(bx+1,by+1,BERRY_MID); drawPixel(bx+2,by+1,BERRY_DARK);
    drawPixel(bx,by+2,BERRY_MID); drawPixel(bx+1,by+2,BERRY_LIGHT); drawPixel(bx+2,by+2,BERRY_MID);
    drawPixel(bx,by+3,BERRY_DARK); drawPixel(bx+1,by+3,BERRY_MID); drawPixel(bx+2,by+3,BERRY_DARK);
  }

  // pixel heart
  function drawHeart(px, py, alpha) {
    ctx.globalAlpha = alpha;
    const c = HEART;
    const x = Math.round(px), y = Math.round(py);
    drawPixel(x,y,c); drawPixel(x+2,y,c);
    drawPixel(x-1,y+1,c); drawPixel(x,y+1,c); drawPixel(x+1,y+1,c); drawPixel(x+2,y+1,c); drawPixel(x+3,y+1,c);
    drawPixel(x,y+2,c); drawPixel(x+1,y+2,c); drawPixel(x+2,y+2,c);
    drawPixel(x+1,y+3,c);
    ctx.globalAlpha = 1;
  }

  // pixel yarn ball
  function drawYarnBall(px, py, alpha, rot) {
    ctx.globalAlpha = alpha;
    const cx = Math.round(px), cy = Math.round(py);
    drawPixel(cx,cy,YARN); drawPixel(cx+1,cy,YARN2); drawPixel(cx+2,cy,YARN);
    drawPixel(cx,cy+1,YARN2); drawPixel(cx+1,cy+1,YARN); drawPixel(cx+2,cy+1,YARN2);
    drawPixel(cx,cy+2,YARN); drawPixel(cx+1,cy+2,YARN2); drawPixel(cx+2,cy+2,YARN);
    const sx = cx+2+Math.round(Math.sin(rot)*1.5);
    const sy = cy+2+Math.round(Math.cos(rot)*0.8);
    drawPixel(sx,sy,YARN2);
    drawPixel(sx+1,sy+1,YARN);
    ctx.globalAlpha = 1;
  }

  // ── render ──
  function render() {
    ctx.clearRect(0,0,CW,CH);
    frame++;
    tailWag += (state==='pet'||state==='track') ? 0.3 : 0.12;

    blinkTimer++;
    if (blinkTimer>70 && !blinking) { blinking=true; blinkTimer=0; }
    if (blinking && blinkTimer>4) { blinking=false; blinkTimer=0; }

    if (berryCooldown>0) berryCooldown--;
    if (petCooldown>0) petCooldown--;

    if (Date.now()-lastInteraction > SLEEP_AFTER && state!=='sleep' && state!=='lonely' && state!=='eat') {
      state='sleep'; idleTimer=0;
    }

    // blueberry physics
    if (berryActive) {
      berryVel += 0.18;
      berryY += berryVel;
      const landY = CAT_OY - 1;
      if (berryY >= landY) {
        berryY = landY;
        berryActive = false;
        state = 'eat';
        eatTimer = 0;
      }
    }

    const oy = CAT_OY;

    // draw cat
    drawCatBase(oy);
    drawBody(oy);
    drawTail(oy, tailWag);

    // draw falling/landed blueberry
    if (berryActive) {
      drawBlueberry(6, Math.round(berryY));
    }

    switch (state) {
      case 'idle':
        drawNormalEyes(oy, blinking);
        idleTimer++;
        if (idleTimer>200) { state='sleep'; idleTimer=0; }
        break;

      case 'track':
        if (berryActive) {
          drawLookUpEyes(oy);
        } else {
          drawTrackingEyes(oy);
        }
        break;

      case 'pet':
        drawHappyEyes(oy);
        if (Math.random()<0.12) spawnHeart();
        idleTimer++;
        if (idleTimer>60) { state = mouseNear?'track':'idle'; idleTimer=0; }
        break;

      case 'eat':
        eatTimer++;
        if (eatTimer < 20) {
          drawLookUpEyes(oy);
          drawBlueberry(6, CAT_OY-1);
        } else if (eatTimer < 50) {
          // eating — happy face, berry gone
          drawHappyEyes(oy);
          if (eatTimer===20) spawnHeart();
        } else {
          state = mouseNear?'track':'idle';
          idleTimer=0;
        }
        break;

      case 'lonely':
        drawSleepEyes(oy);
        lonelyTimer++;
        if (lonelyTimer===1) spawnYarn();
        if (lonelyTimer>70) { state='idle'; idleTimer=0; }
        if (mouseNear) { state='track'; idleTimer=0; }
        break;

      case 'sleep':
        drawSleepEyes(oy);
        drawZzz(frame);
        break;
    }

    // particles
    for (let i=particles.length-1; i>=0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      const alpha = Math.max(0, p.life/p.maxLife);
      if (p.type==='heart') {
        drawHeart(p.x, p.y, alpha);
      } else if (p.type==='yarn') {
        p.rot += 0.08;
        drawYarnBall(p.x, p.y, alpha, p.rot);
      }
      if (p.life<=0) particles.splice(i,1);
    }

    requestAnimationFrame(render);
  }

  render();
})();

let objects = [];
window.epr = [];
window.ekr = [];
window.er = [];

class Box {
  x = 20;
  y = 20;
  width = 100;
  height = 100;
  color = "black";
  mass = 1;
  velX = 0;
  velY = 0;
  reverse = false;
  print = true;

  constructor() {
    objects.push(this);
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    if (this.print) {
      const height = 900 - this.height - this.y;

      const ep = height * 9.8 * 40 * this.mass;
      const ek = (this.mass * this.velY * this.velY) / 2;

      console.log("Ep", ep, "Ek", ek, "E", ep + ek);
    }
  }

  move(force, angle) {
    const forceX = Math.cos(angle) * force;
    const forceY = Math.sin(angle) * force;
    const accelX = forceX / this.mass;
    const accelY = forceY / this.mass;

    this.velX += accelX * deltaTime;
    this.velY += accelY * deltaTime;
    const prevVelX = this.velX;
    const prevVelY = this.velY;

    this.x += ((prevVelX + this.velX) / 2) * deltaTime;
    this.y += ((prevVelY + this.velY) / 2) * deltaTime;

    if (this.reverse && this.y < 400) this.reverse = false;
    else if (!this.reverse && this.y >= 900 - this.height) {
      this.velY = -this.velY;
      this.reverse = true;
    }
  }
}

const frame = () => {
  window.request = requestAnimationFrame(frame);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  box.move(box.mass * 9.8 * 40, Math.PI / 2);

  objects.forEach((o) => o.draw());
};

const simulate = () => {
  objects = [];
  console.log("simulating");

  if (window.request) {
    cancelAnimationFrame(window.request);
    window.request = undefined;
  }

  window.box = new Box();
  const bottom = new Box();
  bottom.height = 10;
  bottom.width = 1000;
  bottom.x = 5;
  bottom.y = 900;
  bottom.color = "green";
  bottom.print = false;

  frame();
};

const start = () => {
  console.log("start");
  window.canvas = document.getElementById("canvas");
  window.ctx = canvas.getContext("2d");
  window.reset = document.getElementById("reset-btn");
  window.deltaTime = 1 / 60;

  ctx.canvas.width = 1024;
  ctx.canvas.height = 1024;

  reset.onclick = simulate;
};

window.onload = start;

const objects = [];

class Box {
  x = 20;
  y = 20;
  width = 100;
  height = 100;
  color = "black";
  mass = 1;
  velX = 0;
  velY = 0;

  constructor() {
    objects.push(this);
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    console.log(
      "velocity",
      Math.sqrt(Math.pow(this.velX, 2) + Math.pow(this.velY, 2))
    );
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
  }
}

const frame = () => {
  window.request = requestAnimationFrame(frame);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  box.move(box.mass * 9.8 * 10, Math.PI / 4);

  objects.forEach((o) => o.draw());
};

const simulate = () => {
  console.log("simulating");

  if (window.request) {
    cancelAnimationFrame(window.request);
    window.request = undefined;
  }

  window.box = new Box();

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

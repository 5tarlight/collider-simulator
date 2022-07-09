class Box {
  x = 10;
  y = 10;
  width = 50;
  height = 50;
  color = "black";

  draw() {
    console.log("draw!");
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const simulate = () => {
  console.log("simulating");
  const box = new Box();
  box.draw();
};

const start = () => {
  console.log("start");
  window.canvas = document.getElementById("canvas");
  window.ctx = canvas.getContext("2d");
  window.reset = document.getElementById("reset-btn");

  ctx.canvas.width = 1024;
  ctx.canvas.height = 1024;

  reset.onclick = simulate;
};

window.onload = start;

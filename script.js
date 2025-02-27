window.addEventListener("load", start);

function start() {
  console.log("JavaScript is running");
  document.addEventListener("keydown", keypressHandler);
  document.addEventListener("keyup", keypressHandler);

  for (let i = 0; i < 10; i++) {
    const div = document.createElement("div");
    div.classList.add("asteroid");

    document.querySelector("#gamefield").insertAdjacentElement("beforeend", div);
    const obj = {
      x: Math.floor(Math.random() * 750),
      y: -30,
      w: 50,
      h: 50,
      s: Math.random() * 100 + 50,
      visual: div,
    };
    objects.push(obj);
  }

  requestAnimationFrame(tick);
}

function keypressHandler(event) {
  const value = event.type === "keydown";
  const key = event.key;
  if (key === "a" || key === "ArrowLeft") controls.left = value;
  if (key === "w" || key === "ArrowUp") controls.up = value;
  if (key === "s" || key === "ArrowDown") controls.down = value;
  if (key === "d" || key === "ArrowRight") controls.right = value;
}

const controls = {
  up: false,
  down: false,
  left: false,
  right: false,
  fire: false,
};

let points = 0;

const objects = [];

const object = {
  x: 380,
  y: 370,
  s: 300,
  w: 60,
  h: 80,
  hl: 100,
};

let lastTime = 0;

function tick(timestamp) {
  requestAnimationFrame(tick);

  const delta = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  if (controls.left && object.x > object.w / 2) {
    object.x -= object.s * delta;
  } else if (controls.right && object.x < 770) {
    object.x += object.s * delta;
  }

  if (controls.up && object.y > object.h / 2) {
    object.y -= object.s * delta;
  } else if (controls.down && object.y < 410) {
    object.y += object.s * delta;
  }

  for (let i = 0; i < objects.length; i++) {
    objects[i].y += objects[i].s * delta;
    if (objects[i].y > 450) {
      objects[i].y = -30;
      objects[i].x = Math.floor(Math.random() * 750);
    }
  }

  for (const obj of objects) {
    if (distance(obj, object) < combinedSize(obj, object)) {
      obj.s *= 0.95;
      object.hl--;
    }
  }

  function distance(obj, object) {
    return Math.sqrt(Math.pow(obj.x - object.x, 2) + Math.pow(obj.y - object.y, 2));
  }

  function combinedSize(obj, object) {
    return obj.w / 2 + object.w / 2;
  }

  const visualSpaceShip = document.querySelector(".spaceship");
  visualSpaceShip.style.translate = `${object.x - object.w / 2}px ${object.y - object.h / 2}px`;

  for (let i = 0; i < objects.length; i++) {
    objects[i].visual.style.translate = `${objects[i].x - 25}px ${objects[i].y - 25}px`;
  }

  document.querySelector("#score #number").textContent = String(points).padStart(3, "0");
  document.querySelector("#healthbar").style.width = `${object.hl}%`;
}

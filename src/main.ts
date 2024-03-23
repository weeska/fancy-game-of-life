import "./style.css";
import { renderAsText } from "./gameRenderer.ts";
import { GameOfLife } from "./game.ts";

const game = new GameOfLife(60, 30, 1000);
const textRenderer =
  document.querySelector<HTMLTextAreaElement>("#textRenderer")!;

const addQueue: any[] = [];

textRenderer.onmousemove = (ev) => {
  if ((ev.buttons & 1) !== 1) {
    return;
  }

  const x = Math.floor((ev.offsetX / textRenderer.clientWidth) * 60);
  const y = Math.floor((ev.offsetY / textRenderer.clientHeight) * 30);

  addQueue.push({ x, y });

  game.doSomethingToCell(x, y);
};

textRenderer.onmouseup = (ev) => {
  addQueue.forEach((c) => {
    game.activateCell(c.x, c.y);
  });

  addQueue.length = 0;
};

let lastTick: DOMHighResTimeStamp;
const doTick = (ts?: DOMHighResTimeStamp) => {
  if (lastTick === undefined || (ts || 0) - lastTick > 30) {
    renderAsText(textRenderer, game);
    game.tick();
    lastTick = ts!;
  }

  requestAnimationFrame(doTick);
};

doTick();

import { GameOfLife } from "./game";

export function renderAsText(container: HTMLTextAreaElement, game: GameOfLife) {
  const text = [];
  for (let i = 0; i < game.cells.length; ++i) {
    if (i % game.width === 0 && i > 0) {
      text.push("\r\n");
    }
    switch (game.cells[i]) {
      case 1:
        text.push("{}");
        break;
      case 2:
        text.push("()");
        break;
      default:
        text.push("  ");
        break;
    }
  }
  container.innerText = text.join("");
}

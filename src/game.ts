export class GameOfLife {
  public cells: Array<number>;
  public tickTimeMs: number;

  constructor(
    public readonly width: number,
    public readonly height: number,
    private readonly initiallyFilled: number
  ) {
    this.cells = new Array(height * width).fill(0);
    this.tickTimeMs = 0;

    for (let i = 0; i < this.initiallyFilled; ++i) {
      const y = Math.floor(Math.random() * (this.height - 1));
      const x = Math.floor(Math.random() * (this.width - 1));

      this.cells[y * width + x] = 1;
    }
  }

  activateCell(x: number, y: number) {
    if (x < 0 || y < 0 || x > this.width || y > this.height) {
      return;
    }

    const cellIndex = y * this.width + x;
    this.cells[cellIndex] = 1;
  }

  doSomethingToCell(x: number, y: number) {
    if (x < 0 || y < 0 || x > this.width || y > this.height) {
      return;
    }

    const cellIndex = y * this.width + x;
    this.cells[cellIndex] = 2;
  }

  tick() {
    const now = Date.now();
    const cells = [...this.cells];
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        let count = 0;

        const cellIndex = y * this.width + x;
        const isAlive = this.cells[cellIndex] === 1;

        if (cells[cellIndex] === 2) {
          continue;
        }

        count += this.countIfSet(x - 1, y - 1);
        count += this.countIfSet(x, y - 1);
        count += this.countIfSet(x + 1, y - 1);

        count += this.countIfSet(x - 1, y);
        count += this.countIfSet(x + 1, y);

        count += this.countIfSet(x - 1, y + 1);
        count += this.countIfSet(x, y + 1);
        count += this.countIfSet(x + 1, y + 1);

        if (count < 2) {
          cells[cellIndex] = 0;
        }

        if (count === 3 && !isAlive) {
          cells[cellIndex] = 1;
        }

        if (count >= 4) {
          cells[cellIndex] = 0;
        }
      }
    }
    this.cells = cells;
    this.tickTimeMs = Date.now() - now;
  }

  private countIfSet(x: number, y: number): number {
    if (x < 0 || y < 0 || x > this.width || y > this.height) {
      return 0;
    }

    return this.cells[y * this.width + x] === 1 ? 1 : 0;
  }
}

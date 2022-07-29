// For the purpose of using css vars declared within :root
const root = document.querySelector(":root");

class gameOfLife {
  constructor() {
    this.cellSize = 5;
    this.deadCellColor = getComputedStyle(root).getPropertyValue("--bg-color");
    this.aliveCellColor =
      getComputedStyle(root).getPropertyValue("--alive-cell-color");
    this.columnsCells = Math.floor(canvas.width / this.cellSize);
    this.rowsCells = Math.floor(canvas.height / this.cellSize);
    // 2D array for the state of current lifecycle
    this.activeCellsArray = [];
    // 2D array for the state of previous lifecycle
    this.inactiveCellsArray = [];

    this.arrayInitialization = () => {
      for (let i = 0; i < this.rowsCells; i++) {
        this.activeCellsArray[i] = [];
        for (let j = 0; j < this.columnsCells; j++) {
          this.activeCellsArray[i][j] = 0;
        }
      }
      this.inactiveCellsArray = this.activeCellsArray;
    };

    this.arrayRandomize = () => {
      for (let i = 0; i < this.rowsCells; i++) {
        for (let j = 0; j < this.columnsCells; j++) {
          this.activeCellsArray[i][j] = Math.random() > 0.5 ? 1 : 0;
        }
      }
    };

    this.fillArray = () => {
      for (let i = 0; i < this.rowsCells; i++) {
        for (let j = 0; j < this.columnsCells; j++) {
          let color;
          if (this.activeCellsArray[i][j] == 1) color = this.aliveCellColor;
          else color = this.deadCellColor;
          context.fillStyle = color;
          context.fillRect(
            j * this.cellSize,
            i * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        }
      }
    };

    this.setCellValueHelper = (row, col) => {
      try {
        return this.activeCellsArray[row][col];
      } catch {
        return 0;
      }
    };

    this.countNeighbours = (row, col) => {
      let total_neighbours = 0;
      total_neighbours += this.setCellValueHelper(row - 1, col - 1);
      total_neighbours += this.setCellValueHelper(row - 1, col);
      total_neighbours += this.setCellValueHelper(row - 1, col + 1);
      total_neighbours += this.setCellValueHelper(row, col - 1);
      total_neighbours += this.setCellValueHelper(row, col + 1);
      total_neighbours += this.setCellValueHelper(row + 1, col - 1);
      total_neighbours += this.setCellValueHelper(row + 1, col);
      total_neighbours += this.setCellValueHelper(row + 1, col + 1);
      return total_neighbours;
    };

    this.updateCellValue = (row, col) => {
      const total = this.countNeighbours(row, col);
      // cell with more than 4 or less then 3 neighbours dies. 1 => 0; 0 => 0
      if (total > 4 || total < 3) {
        return 0;
      }
      // dead cell with 3 neighbours becomes alive. 0 => 1
      else if (this.activeCellsArray[row][col] === 0 && total === 3) {
        return 1;
      }
      // or returning its status back. 0 => 0; 1 => 1
      else {
        return this.activeCellsArray[row][col];
      }
    };

    this.updateLifeCycle = () => {
      for (let i = 0; i < this.rowsCells; i++) {
        for (let j = 0; j < this.columnsCells; j++) {
          let new_state = this.updateCellValue(i, j);
          this.inactiveCellsArray[i][j] = new_state;
        }
      }
      this.activeCellsArray = this.inactiveCellsArray;
    };

    // Ends the game
    this.gameSetUp = () => {
      this.arrayInitialization();
    };

    this.runGame = () => {
      this.updateLifeCycle();
      this.fillArray();
    };
  }
}

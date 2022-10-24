import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'N-Queens-App';
  N: number = 4;
  N1: number = 4;
  grid: any = [];
  showGrid: any = [];
  timeGap: any = 500;
  numberOfOperations: any = 0;
  inProcess: boolean = false;

  // Initial setup of Grid
  ngOnInit(): void {
    this.grid = [];
    this.showGrid = [];
    this.timeGap = 500;
    this.numberOfOperations = 0;

    for (var i = 0; i < this.N; i++) {
      var temp = [];
      for (var j = 0; j < this.N; j++) {
        temp.push(0);
      }
      this.grid.push(temp);
    }
    for (var i = 0; i < this.N; i++) {
      var temp = [];
      for (var j = 0; j < this.N; j++) {
        temp.push(0);
      }
      this.showGrid.push(temp);
    }
  }

  // Function for changing the Grid size
  changeGrid() {
    if (this.inProcess) {
      alert('Wait for ongoing process to end!');
      return;
    }
    this.N = this.N1;
    this.grid = [];
    this.timeGap = 500;
    this.numberOfOperations = 0;

    this.showGrid = [];
    for (var i = 0; i < this.N; i++) {
      var temp = [];
      for (var j = 0; j < this.N; j++) {
        temp.push(0);
      }
      this.grid.push(temp);
    }
    for (var i = 0; i < this.N; i++) {
      var temp = [];
      for (var j = 0; j < this.N; j++) {
        temp.push(0);
      }
      this.showGrid.push(temp);
    }
  }

  // Check function for valid position
  async checkIfSafe(row: any, col: any) {
    for (var i = row - 1; i >= 1; i--) {
      if (this.grid[i - 1][col - 1] == 1) {
        return false;
      }
    }
    for (var i = 1; i < this.N; i++) {
      var tempRow = row - i;
      var tempCol = col + i;
      if (tempRow >= 1 && tempCol <= this.N) {
        if (this.grid[tempRow - 1][tempCol - 1] == 1) {
          return false;
        }
      }
    }
    for (var i = 1; i < this.N; i++) {
      var tempRow = row - i;
      var tempCol1 = col - i;
      if (tempRow >= 1 && tempCol1 >= 1) {
        if (this.grid[tempRow - 1][tempCol1 - 1] == 1) {
          return false;
        }
      }
    }

    return true;
  }
  // Recursion Logic
  async solve(row: any) {
    if (row > this.N) {
      return true;
    }
    for (var i = 0; i < this.N; i++) {
      this.numberOfOperations++;
      if (this.numberOfOperations <= 5) {
        this.timeGap = 500;
      } else if (this.numberOfOperations > 5 && this.numberOfOperations <= 20) {
        this.timeGap = 300;
      } else if (
        this.numberOfOperations > 20 &&
        this.numberOfOperations <= 40
      ) {
        this.timeGap = 200;
      } else if (
        this.numberOfOperations > 40 &&
        this.numberOfOperations <= 60
      ) {
        this.timeGap = 100;
      } else {
        this.timeGap = 20;
      }

      this.showGrid[row - 1][i] = -1;
      await new Promise((resolve) => setTimeout(resolve, this.timeGap));
      if (await this.checkIfSafe(row, i + 1)) {
        this.grid[row - 1][i] = 1;
        this.showGrid[row - 1][i] = 1;

        await new Promise((resolve) => setTimeout(resolve, this.timeGap));

        if (await this.solve(row + 1)) {
          return true;
        } else {
          this.grid[row - 1][i] = 0;
          this.showGrid[row - 1][i] = 0;
          await new Promise((resolve) => setTimeout(resolve, this.timeGap));
        }
      }
      this.showGrid[row - 1][i] = 0;
    }
    return false;
  }
  // Start the operation
  async startOperation() {
    if (this.inProcess) {
      alert('Wait for ongoing process to end!');
      return;
    } else {
      this.changeGrid();
      this.inProcess = true;
      if (await this.solve(1)) {
        console.log('yes its possible!');
        this.inProcess = false;
      } else {
        console.log('no its not possible!');
        this.inProcess = false;
      }
    }
  }
}

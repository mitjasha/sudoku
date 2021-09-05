module.exports = function solveSudoku(matrix) {
  let size = 9;
  let boxSize = 3;

  function findEmptyCell (matrix) {

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (matrix[i][j] === 0) {
           return [i, j];
        }
      }
    }

    return null;
  }

  function isTruth(num, pos, matrix) {
    let [i, j] = pos;

    for (let k = 0; k < size; k++) {
      if ((matrix[k][j] === num) && (k !== i)) {
        return false;
      }
    }

    for (let k = 0; k < size; k++) {
      if ((matrix[i][k] === num) && (k !== j)) {
        return false;
      }
    }

    let boxRow = Math.floor(i / boxSize) * boxSize;
    let boxCol = Math.floor(j / boxSize) * boxSize;
    for (let l = boxRow; l < boxRow + boxSize; l++) {
      for (let m = boxCol; m < boxCol + boxSize; m++) {
        if ((matrix[l][m] === num) && (l !== i) && (m !== j)) {
          return false;
        }
      }
    }

    return true;
  }

  function solve() {
    let cell = findEmptyCell(matrix);

    if (cell === null) {
      return true;
    }

    for (let i = 1; i <= size; i++) {
      let currentNum = i;
      let isTrue = isTruth(currentNum, cell, matrix);

      if (isTrue) {
        let [x, y] = cell;
        matrix[x][y] = currentNum;
        
        if (solve()) {
          return true;
        }

        matrix[x][y] = 0;
      }
    }

    return false;
  }

  solve();
  return matrix;  
}



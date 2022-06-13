export const fieldHandler = {
  isAround: (fieldCell, cell) => {
    return (fieldCell.x === cell.x && fieldCell.y === cell.y)
    || (fieldCell.x === cell.x - 1 && fieldCell.y === cell.y)
    || (fieldCell.x === cell.x + 1 && fieldCell.y === cell.y)
    || (fieldCell.x === cell.x && fieldCell.y === cell.y - 1)
    || (fieldCell.x === cell.x && fieldCell.y === cell.y + 1)
    || (fieldCell.x === cell.x - 1 && fieldCell.y === cell.y - 1)
    || (fieldCell.x === cell.x + 1 && fieldCell.y === cell.y - 1)
    || (fieldCell.x === cell.x - 1 && fieldCell.y === cell.y + 1)
    || (fieldCell.x === cell.x + 1 && fieldCell.y === cell.y + 1)
  },
  isAroundedByCellsWithType: (field, cell, type) => {
    if (cell.x === 0) {
      if (cell.y === 0) {
        return (field[cell.x + 1][cell.y].type === type)
        && (field[cell.x][cell.y + 1].type === type)
        && (field[cell.x + 1][cell.y + 1].type === type)
      } else if (cell.y === field.length - 1) {
        return (field[cell.x + 1][cell.y].type === type)
        && (field[cell.x][cell.y - 1].type === type)
        && (field[cell.x + 1][cell.y - 1].type === type)
      } else {
        return (field[cell.x][cell.y - 1].type === type)
        && (field[cell.x][cell.y + 1].type === type)
        && (field[cell.x + 1][cell.y].type === type)
        && (field[cell.x + 1][cell.y - 1].type === type)
        && (field[cell.x + 1][cell.y + 1].type === type)
      }
    } else if (cell.x === field.length - 1) {
      if (cell.y === 0) {
        return (field[cell.x - 1][cell.y].type === type)
        && (field[cell.x][cell.y + 1].type === type)
        && (field[cell.x - 1][cell.y + 1].type === type)
      } else if (cell.y === field.length - 1) {
        return (field[cell.x - 1][cell.y].type === type)
        && (field[cell.x][cell.y - 1].type === type)
        && (field[cell.x - 1][cell.y - 1].type === type)
      } else {
        return (field[cell.x][cell.y - 1].type === type)
        && (field[cell.x][cell.y + 1].type === type)
        && (field[cell.x - 1][cell.y].type === type)
        && (field[cell.x - 1][cell.y - 1].type === type)
        && (field[cell.x - 1][cell.y + 1].type === type)
      }
    } else {
      return (field[cell.x - 1][cell.y].type === type)
      && (field[cell.x + 1][cell.y].type === type)
      && (field[cell.x][cell.y - 1].type === type)
      && (field[cell.x][cell.y + 1].type === type)
      && (field[cell.x - 1][cell.y - 1].type === type)
      && (field[cell.x + 1][cell.y - 1].type === type)
      && (field[cell.x - 1][cell.y + 1].type === type)
      && (field[cell.x + 1][cell.y + 1].type === type)
    }
  },
  isNextToCellWithType: (field, cell, type) => {
    if (cell.x === 0) {
      if (cell.y === 0) {
        return (field[cell.x + 1][cell.y].type === type)
        || (field[cell.x][cell.y + 1].type === type)
        || (field[cell.x + 1][cell.y + 1].type === type)
      } else if (cell.y === field.length - 1) {
        return (field[cell.x + 1][cell.y].type === type)
        || (field[cell.x][cell.y - 1].type === type)
        || (field[cell.x + 1][cell.y - 1].type === type)
      } else {
        return (field[cell.x][cell.y - 1].type === type)
        || (field[cell.x][cell.y + 1].type === type)
        || (field[cell.x + 1][cell.y].type === type)
        || (field[cell.x + 1][cell.y - 1].type === type)
        || (field[cell.x + 1][cell.y + 1].type === type)
      }
    } else if (cell.x === field.length - 1) {
      if (cell.y === 0) {
        return (field[cell.x - 1][cell.y].type === type)
        || (field[cell.x][cell.y + 1].type === type)
        || (field[cell.x - 1][cell.y + 1].type === type)
      } else if (cell.y === field.length - 1) {
        return (field[cell.x - 1][cell.y].type === type)
        || (field[cell.x][cell.y - 1].type === type)
        || (field[cell.x - 1][cell.y - 1].type === type)
      } else {
        return (field[cell.x][cell.y - 1].type === type)
        || (field[cell.x][cell.y + 1].type === type)
        || (field[cell.x - 1][cell.y].type === type)
        || (field[cell.x - 1][cell.y - 1].type === type)
        || (field[cell.x - 1][cell.y + 1].type === type)
      }
    } else {
      if (cell.y === 0) {
        return (field[cell.x - 1][cell.y].type === type)
        || (field[cell.x][cell.y + 1].type === type)
        || (field[cell.x - 1][cell.y + 1].type === type)
        || (field[cell.x + 1][cell.y].type === type)
        || (field[cell.x + 1][cell.y + 1].type === type)
      } else if (cell.y === field.length - 1) {
        return (field[cell.x - 1][cell.y].type === type)
        || (field[cell.x][cell.y - 1].type === type)
        || (field[cell.x - 1][cell.y - 1].type === type)
        || (field[cell.x + 1][cell.y].type === type)
        || (field[cell.x + 1][cell.y - 1].type === type)
      } else {
        return (field[cell.x - 1][cell.y].type === type)
        || (field[cell.x + 1][cell.y].type === type)
        || (field[cell.x][cell.y - 1].type === type)
        || (field[cell.x][cell.y + 1].type === type)
        || (field[cell.x - 1][cell.y - 1].type === type)
        || (field[cell.x + 1][cell.y - 1].type === type)
        || (field[cell.x - 1][cell.y + 1].type === type)
        || (field[cell.x + 1][cell.y + 1].type === type)
      }
    }
  },
  isAdjacentToCellWithType: (field, cell, type) => {
    if (cell.x === 0) {
      if (cell.y === 0) {
        return (field[cell.x + 1][cell.y].type === type)
        || (field[cell.x][cell.y + 1].type === type)
      } else if (cell.y === field.length) {
        return (field[cell.x + 1][cell.y].type === type)
        || (field[cell.x][cell.y - 1].type === type)
      } else {
        return (field[cell.x][cell.y - 1].type === type)
        || (field[cell.x][cell.y + 1].type === type)
        || (field[cell.x + 1][cell.y].type === type)
      }
    } else if (cell.x === field.length - 1) {
      if (cell.y === 0) {
        return (field[cell.x - 1][cell.y].type === type)
        || (field[cell.x][cell.y + 1].type === type)
      } else if (cell.y === field.length - 1) {
        return (field[cell.x - 1][cell.y].type === type)
        || (field[cell.x][cell.y - 1].type === type)
      } else {
        return (field[cell.x][cell.y - 1].type === type)
        || (field[cell.x][cell.y + 1].type === type)
        || (field[cell.x - 1][cell.y].type === type)
      }
    } else {
      return (field[cell.x - 1][cell.y].type === type)
      || (field[cell.x + 1][cell.y].type === type)
      || (field[cell.x][cell.y - 1].type === type)
      || (field[cell.x][cell.y + 1].type === type)
    }
  }
}
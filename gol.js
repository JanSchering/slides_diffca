
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const resolution = 10;
const cols = canvas.width / resolution;
const rows = canvas.height / resolution;

console.log("test")

function createGrid() {
    const grid = new Array(cols).fill(null)
        .map(() => new Array(rows).fill(null)
            .map(() => Math.floor(Math.random() * 2)));

    return grid;
}

function drawGrid(grid) {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const x = i * resolution;
            const y = j * resolution;
            ctx.fillStyle = grid[i][j] ? 'black' : 'white';
            ctx.fillRect(x, y, resolution, resolution);
        }
    }
}

function update(grid) {
    const nextGen = createGrid();

    console.log("called")

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const cell = grid[i][j];
            const neighbors = countNeighbors(grid, i, j);

            if (cell === 0 && neighbors === 3) {
                nextGen[i][j] = 1;
            } else if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
                nextGen[i][j] = 0;
            } else {
                nextGen[i][j] = cell;
            }
        }
    }

    return nextGen;
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            const col = (x + i + cols) % cols;
            const row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

let grid = createGrid();

function animate() {
    requestAnimationFrame(animate);
    grid = update(grid);
    drawGrid(grid);
}

animate()

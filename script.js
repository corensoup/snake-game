const canvas = document.querySelector('#canvas')
const score = document.querySelector('#score')
const ctx = canvas.getContext('2d')

const width = height = 500

canvas.width = width
canvas.height = height

const grid = 20
let countFrame = 0

const player = {
	score: 0
}

const snake = {
	x:  400,
	y: 400,
	dx: grid,
	dy: 0,
	cells: [],
	maxCells: 4
}

const apple = {
	x: 300,
	y: 300
}

const getRandomInt = (min, max) => Math.floor(Math.random() * (max-min) + min) 

const fillScore = (playerScore) => {
	score.innerHTML = playerScore
}

const loop = () => {
	requestAnimationFrame(loop)	
	if(++countFrame < 4) return;
	countFrame = 0

	ctx.fillStyle = 'black'
	ctx.fillRect(0,0, canvas.width, canvas.height)

	snake.x += snake.dx
	snake.y += snake.dy

	if (snake.x < 0) snake.x = canvas.width - grid
	else if(snake.x >= canvas.width) snake.x = 0
	else if (snake.y < 0) snake.y = canvas.height - grid
	else if(snake.y >= canvas.height) snake.y = 0

	snake.cells.unshift({x: snake.x, y: snake.y})
	if(snake.cells.length > snake.maxCells) snake.cells.pop()

	ctx.fillStyle = 'red'
	ctx.fillRect(apple.x, apple.y, grid, grid)
	
	ctx.fillStyle = 'green'
	snake.cells.forEach((cell, idx) => {
		ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1)
		
		if(cell.x === apple.x && cell.y === apple.y) {
			snake.maxCells++
			fillScore(++player.score)
			apple.x = getRandomInt(grid, canvas.width / grid) * grid
			apple.y = getRandomInt(grid, canvas.height / grid) * grid		
		}	

		for (let i = idx + 1; i < snake.cells.length; i++) {
			if(cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
				snake.maxCells = 4
				snake.dx = grid
				snake.dy = 0
				snake.cells = []
				
				fillScore(player.score = 0)

				apple.x = getRandomInt(0, canvas.width / grid) * grid
				apple.y = getRandomInt(0, canvas.height / grid) * grid
			}
		}
	})
}

document.addEventListener('keydown', evt => {
	if(evt.keyCode === 37 && snake.dx === 0) {snake.dx = -grid; snake.dy = 0}
	else if(evt.keyCode === 38 && snake.dy === 0) {snake.dy = -grid; snake.dx = 0}
	else if(evt.keyCode === 39 && snake.dx === 0) {snake.dx = grid; snake.dy = 0}
	else if(evt.keyCode === 40 && snake.dy === 0) {snake.dy = grid; snake.dx = 0}
})

requestAnimationFrame(loop)

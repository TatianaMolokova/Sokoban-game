// Задаем начальное количество секунд:
let sec = 1
// Задаем начальное количество шагов:
let steps = 0
// Задаем счетчик для поставленных коробок:
let win = 0
// Задаем счетчик для количества целей:
let countTarget = 0

const map = [
    [2, 2, 1, 1, 1, 1, 1, 2],
    [1, 1, 1, 2, 2, 2, 1, 2],
    [1, 3, 4, 5, 2, 2, 1, 2],
    [1, 1, 1, 2, 5, 3, 1, 2],
    [1, 3, 1, 1, 5, 2, 1, 2],
    [1, 2, 1, 2, 3, 2, 1, 1],
    [1, 5, 2, 2, 5, 5, 3, 1],
    [1, 2, 2, 2, 3, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
]

const man = {
    x: 0,
    y: 0
}

function draw(map) {
    const maps = document.getElementById('Main')
    for (let i = 0; i < map.length; i++) {
        const list = document.createElement('div')
        list.className = 'list'
        for (let j = 0; j < map[0].length; j++) {
            const cell = document.createElement('div')
            switch (map[i][j]) {
                case 1:
                    cell.className = 'brick'
                    cell.dataset.val = '1'
                    break
                case 2:
                    cell.className = 'back'
                    cell.dataset.val = '2'
                    break
                case 4:
                    man.x = j
                    man.y = i
                    cell.className = 'man'
                    cell.dataset.val = '4'
                    break
                case 5:
                    cell.className = 'box'
                    cell.dataset.val = '5'
                    break
                case 3:
                    cell.className = 'target'
                    cell.dataset.val = '3'
                    countTarget++
                    break
            }
            cell.dataset.pos = `x:${j} y:${i}`
            list.append(cell)
        }
        maps.append(list)
    }
}

function Move(dx, dy) {
    const manNow = document.querySelector(`[data-pos="x:${man.x} y:${man.y}"]`)
    const next = document.querySelector(`[data-pos="x:${man.x + dx} y:${man.y + dy}"]`)
    const nextbox = document.querySelector(`[data-pos="x:${man.x + dx + dx} y:${man.y + dy + dy}"]`)
    // Для позиции человека:
    if (manNow.dataset.val == 4) {
        // Следующим блоком идёт пустое пространство:
        if (next.dataset.val == 2) {
            manNow.dataset.val = 2
            manNow.className = 'back'
            next.dataset.val = 4
            next.className = 'man'
            man.x += dx
            man.y += dy
            steps++
            count()
        // Следующим блоком идёт цель:
        } else if (next.dataset.val == 3) {
            manNow.dataset.val = 2
            manNow.className = 'back'
            next.dataset.val = 43
            next.className = 'man'
            man.x += dx
            man.y += dy
            steps++
            count()
        // Следующим блоком идёт коробка:
        } else if (next.dataset.val == 5) {
            // Следующим блоком идёт пустое пространство:
            if (nextbox.dataset.val == 2) {
                manNow.dataset.val = 2
                manNow.className = 'back'
                next.dataset.val = 4
                next.className = 'man'
                nextbox.dataset.val = 5
                nextbox.className = 'box'
                man.x += dx
                man.y += dy
                steps++
                count()
            // Последующим блоком идёт цель:
            } else if (nextbox.dataset.val == 3) {
                manNow.dataset.val = 2
                manNow.className = 'back'
                next.dataset.val = 4
                next.className = 'man'
                nextbox.dataset.val = 53
                nextbox.className = 'box'
                man.x += dx
                man.y += dy
                steps++
                count()
                win++
                if (countTarget == win) {
                    const winElement = document.getElementById('win')
                    winElement.textContent = 'Вы победили!'
                    clearInterval(timer)
                }
            }
        // Следующим блоком идёт коробка на цели:
        } else if (next.dataset.val == 53) {
            // Последующим блоком идёт пустое пространство:
            if (nextbox.dataset.val == 2) {
                manNow.dataset.val = 2
                manNow.className = 'back'
                next.dataset.val = 43
                next.className = 'man'
                nextbox.dataset.val = 5
                nextbox.className = 'box'
                man.x += dx
                man.y += dy
                steps++
                count()
                win--
            // Последующим блоком идёт цель:
            } else if (nextbox.dataset.val == 3) {
                manNow.dataset.val = 2
                manNow.className = 'back'
                next.dataset.val = 43
                next.className = 'man'
                nextbox.dataset.val = 53
                nextbox.className = 'box'
                man.x += dx
                man.y += dy
                steps++
                count()
            }
        }
    // Для позиции человека на цели:
    } else if (manNow.dataset.val == 43) {
        // Следующим блоком идёт пустое пространство:
        if (next.dataset.val == 2) {
            manNow.dataset.val = 3
            manNow.className = 'target'
            next.dataset.val = 4
            next.className = 'man'
            man.x += dx
            man.y += dy
            steps++
            count()
        // Следующим блоком идёт цель:
        } else if (next.dataset.val == 3) {
            manNow.dataset.val = 3
            manNow.className = 'target'
            next.dataset.val = 43
            next.className = 'man'
            man.x += dx
            man.y += dy
            steps++
            count()
        // Следующим блоком идёт коробка:
        } else if (next.dataset.val == 5) {
            // Последующим блоком идёт пустое пространство:
            if (nextbox.dataset.val == 2) {
                manNow.dataset.val = 3
                manNow.className = 'target'
                next.dataset.val = 4
                next.className = 'man'
                nextbox.dataset.val = 5
                nextbox.className = 'box'
                man.x += dx
                man.y += dy
                steps++
                count()
            // Последующим блоком идёт цель:
            } else if (nextbox.dataset.val == 3) {
                manNow.dataset.val = 3
                manNow.className = 'target'
                next.dataset.val = 4
                next.className = 'man'
                nextbox.dataset.val = 53
                nextbox.className = 'box'
                man.x += dx
                man.y += dy
                steps++
                count()
                win++
                if (countTarget == win) {
                    const winElement = document.getElementById('win')
                    winElement.textContent = 'Вы победили!'
                    clearInterval(timer)
                }
            }
        // Последующим блоком идёт коробка на цели:
        } else if (next.dataset.val == 53) {
            // Последующим блоком идёт пустое пространство:
            if (nextbox.dataset.val == 2) {
                manNow.dataset.val = 3
                manNow.className = 'target'
                next.dataset.val = 43
                next.className = 'man'
                nextbox.dataset.val = 5
                nextbox.className = 'box'
                man.x += dx
                man.y += dy
                steps++
                count()
                win--
            // Последующим блоком идёт цель:
            } else if (nextbox.dataset.val == 3) {
                manNow.dataset.val = 3
                manNow.className = 'target'
                next.dataset.val = 43
                next.className = 'man'
                nextbox.dataset.val = 53
                nextbox.className = 'box'
                man.x += dx
                man.y += dy
                steps++
                count()
            }
        }
    }
}

draw(map)

document.addEventListener('keydown', function(event) {
    if (countTarget == win) return;

    switch (event.key) {
        case 'ArrowUp':
            Move(0, -1)
            break
        case 'ArrowDown':
            Move(0, 1)
            break
        case 'ArrowLeft':
            Move(-1, 0)
            break
        case 'ArrowRight':
            Move(1, 0)
            break
    }
})

// Таймер
const timer = setInterval(function() {
    const tm = document.getElementById('timer')
    const minutes = Math.floor(sec / 60)
    const seconds = sec % 60
    tm.textContent = `Прошло времени: ${minutes} мин ${seconds} сек`
    sec++
}, 1000)

// Обновление шагов:
function count() {
    const sch = document.getElementById('steps')
    sch.textContent = `Шаги: ${steps}`
}
function addItem(button) {
    let lane = button.parentNode
    let newCard = document.createElement('div')
    newCard.className = 'card'
    newCard.tabIndex = 0

    let itemHeader = document.createElement('span')
    itemHeader.className = 'item-header'
    itemHeader.contentEditable = true
    itemHeader.textContent = 'New Item'

    let removeButton = document.createElement('button')
    removeButton.className = 'remove-item-button'
    removeButton.title = 'Remove Item'
    removeButton.textContent = 'X'
    removeButton.onclick = function() {
        removeItem(this)
    }

    newCard.appendChild(itemHeader)
    newCard.appendChild(removeButton)

    lane.appendChild(newCard)
    lane.insertBefore(newCard, button)
    makeItemDraggable(newCard)
}

function addLane() {
    let board = document.getElementById('board')
    let newLane = document.createElement('div')
    newLane.className = 'lane'

    let laneHeader = document.createElement('div')
    laneHeader.className = 'lane-header'
    laneHeader.tabIndex = 0

    let laneTitle = document.createElement('span')
    laneTitle.className = 'lane-title'
    laneTitle.contentEditable = true
    laneTitle.textContent = 'New Lane'

    let removeButton = document.createElement('button')
    removeButton.className = 'remove-lane-button'
    removeButton.title = 'Remove Lane'
    removeButton.textContent = 'X'
    removeButton.onclick = function() {
        removeLane(this)
    }

    laneHeader.appendChild(laneTitle)
    laneHeader.appendChild(removeButton)

    let addItemButton = document.createElement('button')
    addItemButton.className = 'add-item-button'
    addItemButton.title = 'Add Item'
    addItemButton.textContent = '+'
    addItemButton.onclick = function() {
        addItem(this)
    }

    newLane.appendChild(laneHeader)
    newLane.appendChild(addItemButton)

    board.appendChild(newLane)
    makeLaneDroppable(newLane)
}

function removeItem(button) {
    let card = button.parentNode
    card.parentNode.removeChild(card)
}

function removeLane(button) {
    let lane = button.parentNode.parentNode
    lane.parentNode.removeChild(lane)
}

board.addEventListener('dblclick', (event) => {
    if (event.target.classList.contains('card')) {
        const card = event.target
        const lane = card.parentElement
        const laneIndex = Array.from(board.children).indexOf(lane)
        let targetlaneIndex = laneIndex + 1
        if (targetlaneIndex > board.children.length - 1) {
            targetlaneIndex = 0
        }
        board.children[targetlaneIndex].appendChild(card)
    }
})

const makeItemDraggable = (item) => {
    item.setAttribute('draggable', true)

    item.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', event.target.innerText)
    })
}

const makeLaneDroppable = (lane) => {
    lane.addEventListener('dragover', (event) => {
        event.preventDefault()
    })

    lane.addEventListener('drop', (event) => {
        const data = event.dataTransfer.getData('text/plain')
        const item = document.createElement('div')
        item.classList.add('card')
        item.innerText = data
        makeItemDraggable(item)
        lane.appendChild(item)
    })
}

const items = document.querySelectorAll('.card')
items.forEach((item) => makeItemDraggable(item))

const lanes = document.querySelectorAll('.lane')
lanes.forEach((lane) => makeLaneDroppable(lane))

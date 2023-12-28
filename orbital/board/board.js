const board = document.getElementById('board'),
    addItemForm = document.getElementById('add-item-form'),
    addItemButton = document.getElementById('add-item-button'),
    saveAddItemButton = document.getElementById('save-add-item-button'),
    cancelAddItemButton = document.getElementById('cancel-add-item-button'),
    addItemInput = document.getElementById('add-item-input'),
    addLaneForm = document.getElementById('add-lane-form'),
    addLaneButton = document.getElementById('add-lane-button'),
    saveAddLaneButton = document.getElementById('save-add-lane-button'),
    cancelAddLaneButton = document.getElementById('cancel-add-lane-button'),
    addLaneInput = document.getElementById('add-lane-input'),
    body = document.getElementById('body');
    
function addItem() {
    addItemForm.style.display = 'block';
}

function cancelAddItem() {
    addItemForm.style.display = 'none';
}

function saveAddItem() {
    const itemText = addItemInput.value;
    if (!itemText) return;
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.innerText = itemText;
    board.firstElementChild.appendChild(newCard);

    addItemForm.style.display = 'none';
    addItemInput.value = '';
    makeItemDraggable(newCard)
}

function addLane() {
    addLaneForm.style.display = 'block';

}
function cancelAddLane() {
    addLaneForm.style.display = 'none';
}

function saveAddLane() {
    const laneText = addLaneInput.value;
    if (!laneText) return;

    const newLane = document.createElement('div');
    newLane.classList.add('lane');
    newLane.innerHTML = `
      <div class="lane-header">${laneText}</div>
    `;
    board.appendChild(newLane);

    const option = document.createElement('option');
    option.value = board.children.length - 1;
    option.innerText = laneText;
    laneRemoveSelect.appendChild(option);

    addLaneForm.style.display = 'none';
    addLaneInput.value = '';
    makeLaneDroppable(newLane)
}

board.addEventListener('dblclick', (event) => {
    if (event.target.classList.contains('card')) {
        const card = event.target;
        const lane = card.parentElement;
        const laneIndex = Array.from(board.children).indexOf(lane);
        let targetlaneIndex = laneIndex + 1;
        if (targetlaneIndex > board.children.length - 1) {
            targetlaneIndex = 0;
        }
        board.children[targetlaneIndex].appendChild(card);
    }
});

function removeItem(button) {
    var card = button.parentNode;
    card.parentNode.removeChild(card);
}

function removeLane(button) {
    var lane = button.parentNode.parentNode;
    lane.parentNode.removeChild(lane);
}

const makeItemDraggable = (item) => {
    item.setAttribute('draggable', true);

    item.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', event.target.innerText);
    });
};

const makeLaneDroppable = (lane) => {
    lane.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    lane.addEventListener('drop', (event) => {
        const data = event.dataTransfer.getData('text/plain');
        const item = document.createElement('div');
        item.classList.add('card');
        item.innerText = data;
        makeItemDraggable(item);
        lane.appendChild(item);
    });
};

const items = document.querySelectorAll('.card');
items.forEach((item) => makeItemDraggable(item));

const lanes = document.querySelectorAll('.lane');
lanes.forEach((lane) => makeLaneDroppable(lane));

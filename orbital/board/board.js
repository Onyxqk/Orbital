const board = document.getElementById('board'),
    addItemForm = document.getElementById('add-item-form'),
    editItemForm = document.getElementById('edit-item-form'),
    itemRemoveForm = document.getElementById('item-remove-form'),
    addItemButton = document.getElementById('add-item-button'),
    removeItemButton = document.getElementById('remove-item-button'),
    confirmRemoveItemButton = document.getElementById('confirm-remove-item-button'),
    cancelRemoveItemButton = document.getElementById('cancel-remove-item-button'),
    saveAddItemButton = document.getElementById('save-add-item-button'),
    cancelAddItemButton = document.getElementById('cancel-add-item-button'),
    addItemInput = document.getElementById('add-item-input'),
    saveEditItemButton = document.getElementById('save-edit-item-button'),
    cancelEditItemButton = document.getElementById('cancel-edit-item-button'),
    editItemInput = document.getElementById('edit-item-input'),
    itemRemoveSelect = document.getElementById('item-remove-select'),
    addLaneForm = document.getElementById('add-lane-form'),
    editLaneForm = document.getElementById('edit-lane-form'),
    laneRemoveForm = document.getElementById('lane-remove-form'),
    addLaneButton = document.getElementById('add-lane-button'),
    removeLaneButton = document.getElementById('remove-lane-button'),
    confirmRemoveLaneButton = document.getElementById('confirm-remove-lane-button'),
    cancelRemoveLaneButton = document.getElementById('cancel-remove-lane-button'),
    saveAddLaneButton = document.getElementById('save-add-lane-button'),
    cancelAddLaneButton = document.getElementById('cancel-add-lane-button'),
    saveEditLaneButton = document.getElementById('save-edit-lane-button'),
    cancelEditLaneButton = document.getElementById('cancel-edit-lane-button'),
    addLaneInput = document.getElementById('add-lane-input'),
    editLaneInput = document.getElementById('edit-lane-input'),
    laneRemoveSelect = document.getElementById('lane-remove-select'),
    body = document.getElementById('body');

function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    document.querySelector(".menu-bar").classList.toggle("dark-mode");
    document.querySelectorAll(".menu-button").forEach(element => {
        element.classList.toggle("dark-mode")
    });
    document.querySelectorAll(".card").forEach(element => {
        element.classList.toggle("dark-mode")
    });
    document.querySelectorAll(".lane").forEach(element => {
        element.classList.toggle("dark-mode")
    });
    document.querySelectorAll(".lane-header").forEach(element => {
        element.classList.toggle("dark-mode")
    });
    document.querySelectorAll(".form-input").forEach(element => {
        element.classList.toggle("dark-mode")
    });
    document.querySelectorAll(".form-button").forEach(element => {
        element.classList.toggle("dark-mode")
    });
    document.querySelectorAll(".form-label").forEach(element => {
        element.classList.toggle("dark-mode")
    });
}

function addItem() {
    addItemForm.style.display = 'block';

}

function cancelAddItem() {
    addItemForm.style.display = 'none';
}

function cancelEditItem() {
    editItemForm.style.display = 'none';
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
}

function removeItem() {
    itemRemoveForm.style.display = 'block';
}

function confirmRemoveItem() {
    const itemIndex = itemRemoveSelect.value;
    const lane = itemRemoveSelect.parentElement;
    lane.removeChild(lane.children[itemIndex]);

    const options = itemRemoveSelect.querySelectorAll('option');
    for (let i = 0; i < options.length; i++) {
        if (options[i].value > itemIndex) {
            options[i].value--;
        }
    }
}

function cancelRemoveItem() {
    itemRemoveForm.style.display = 'none';
}

function addLane() {
    addLaneForm.style.display = 'block';

}
function cancelAddLane() {
    addLaneForm.style.display = 'none';
}

function cancelEditLane() {
    editLaneForm.style.display = 'none';
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
}


function removeLane() {
    laneRemoveForm.style.display = 'block';
}

function cancelRemoveLane() {
    laneRemoveForm.style.display = 'none';
}

function confirmRemoveLane() {
    const laneIndex = laneRemoveSelect.value;
    board.removeChild(board.children[laneIndex]);

    const options = laneRemoveSelect.querySelectorAll('option');
    for (let i = 0; i < options.length; i++) {
        if (options[i].value > laneIndex) {
            options[i].value--;
        }
    }

    laneRemoveForm.style.display = 'none';

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

function editItem(event) {
    if (event.target.classList.contains('card')) {
        const card = event.target;
        editItemInput.value = card.innerText;
        editItemForm.style.display = 'block';

        saveEditItemButton.addEventListener('click', () => {
            const itemText = editItemInput.value;
            if (!itemText) return;

            card.innerText = itemText;
            editItemForm.style.display = 'none';
            editItemInput.value = '';
        });
    }
}

function editLane(event) {
    if (event.target.classList.contains('lane-header')) {
        const laneHeader = event.target;
        editLaneInput.value = laneHeader.innerText;
        editLaneForm.style.display = 'block';

        saveEditLaneButton.addEventListener('click', () => {
            const laneText = editLaneInput.value;
            if (!laneText) return;

            laneHeader.innerText = laneText;
            editLaneForm.style.display = 'none';
            editLaneInput.value = '';
        });
    }
}

board.addEventListener('click', (event) => {
    editItem(event);
    editLane(event);
});

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

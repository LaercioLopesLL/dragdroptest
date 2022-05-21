const itens = [
    {id: 1, nome: 'Item 1', sequencia: 1},
    {id: 2, nome: 'Item 2', sequencia: 2},
    {id: 3, nome: 'Item 3', sequencia: 3},
    {id: 4, nome: 'Item 4', sequencia: 4},
    {id: 5, nome: 'Item 5', sequencia: 5},
    {id: 6, nome: 'Item 6', sequencia: 6},
    {id: 7, nome: 'Item 7', sequencia: 7},
    {id: 8, nome: 'Item 8', sequencia: 8},
    {id: 9, nome: 'Item 9', sequencia: 9},
    {id: 10, nome: 'Item 10', sequencia: 10},
];

function reorganize(){
    document.querySelectorAll('.item').forEach((element, index) => {
        item = itens.find(i => i.id == element.dataset.id);
        item.sequencia = index + 1;
        element.dataset.sequencia = index + 1;
    });
}

const container = document.querySelector('.container');

container.innerHTML = itens.map(item => {
    return `<span class="item" draggable="true" data-id="${item.id}" id="item${item.id}" data-sequencia="${item.sequencia}">
            <span>${item.nome}</span>
            <span class="action-container">
                <button class="btn-action" onclick="moveLeft(this)">
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20,9V15H12V19.84L4.16,12L12,4.16V9H20Z" />
                    </svg>
                </button>
                <button class="btn-action" onclick="moveRight(this)">
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M4,15V9H12V4.16L19.84,12L12,19.84V15H4Z" />
                    </svg>
                </button>
            </span>
        </span>`;
}).join('');

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragover', dragOver)
    item.addEventListener('dragenter', dragEnter)
    item.addEventListener('dragleave', dragLeave);
    item.addEventListener('drop', drop);
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', this.id);
    this.classList.add('draggable');
}

function dragEnter(e) {
    e.preventDefault();
    if (!this.classList.contains('draggable')) {
        this.classList.add('drag-over');
    }
}

function dragOver(e) {
    e.preventDefault();
    if (!this.classList.contains('draggable') && !this.classList.contains('drag-over')) {
        this.classList.add('drag-over');
    }
}

function dragLeave(e) {
    document.querySelectorAll('.item').forEach((item, index) => {
        item.classList.remove('drag-over');
    });
}

function drop(e) {
    const id = e.dataTransfer.getData('text/plain');
    document.querySelector(`#${id}`).classList.remove('draggable');
    this.parentNode.insertBefore(document.querySelector(`#${id}`), this);
    document.querySelectorAll('.item').forEach(item => {
        item.classList.remove('drag-over');
        item.classList.remove('draggable');
    });
    reorganize();
}

function moveLeft(element){
    const clicado = element.parentNode.parentNode;
    if (clicado?.previousSibling?.classList?.contains('item')){
        clicado.previousSibling.parentNode.insertBefore(clicado, clicado.previousSibling);
        reorganize();
    }
}

function moveRight(element){
    const clicado = element.parentNode.parentNode;
    if(clicado?.nextSibling?.classList?.contains('item')){
        clicado.nextSibling.parentNode.insertBefore(clicado, clicado.nextSibling.nextSibling);
        reorganize();
    }
}
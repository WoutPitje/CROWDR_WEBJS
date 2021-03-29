export default class GridView {
    
    constructor() {
        this.windowSize = 750;
        this.gridSize = 15;
        this.paneSize = this.windowSize / this.gridSize;
     }

    init(gridController) {
        this.gridController =  gridController;
        this.generateGrid();
        this.generateImages();
        this.dropEvents();
    }


    generateGrid() {
        let paneSize = this.paneSize;
        let windowSize = this.windowSize;
        console.log(paneSize);
        const grid = document.getElementById("grid");
                        grid.style.position = "relative";
                        grid.style.width = `${windowSize}px`;
                        grid.style.height = `${windowSize}px`;
                        
        let rows = this.gridSize;
                    let cols = this.gridSize;
                    for(let i = 0; i < rows; i++) {
                        for(let j = 0; j < cols; j++) {
                            addGridPane(j, i);
                        }
                    }
                    function addGridPane(x, y) {
                        const gridPane = document.createElement("div");
                        gridPane.className =  `border gridpane absolute border border-black hover:bg-gray-400 dropzone`;
                        gridPane.id = `x${x}y${y}`;
                        gridPane.style.left = `${x * paneSize}px`;
                        gridPane.style.top = `${y * paneSize}px`;
                        gridPane.style.height = `${paneSize}px`;
                        gridPane.style.width = `${paneSize}px`;
                        gridPane.style.position = "absolute";
                        grid.appendChild(gridPane);
                    }
    }
   
    generateImages() {
        let block = document.getElementById("images_block");
        block.className = 'h-full draggable-items';

        let imageBlock = document.createElement("div");
        imageBlock.className = "mb-5 flex flex-col";
        imageBlock.id = "imageList"
        imageBlock.setAttribute('draggable', 'true');
        imageBlock.style.width = 50 + "px";
        imageBlock.style.height = 50 + "px";

        if(this.gridController.tenten > 0) this.generateImage('tent', imageBlock, 'Tenten', this.gridController.tenten);
        if(this.gridController.drankkramen > 0)this.generateImage('drink', imageBlock, 'Drankkramen', this.gridController.drankkramen);
        if(this.gridController.eetkramen > 0)this.generateImage('food', imageBlock, 'Eetkramen', this.gridController.eetkramen);
        if(this.gridController.toiletten > 0)this.generateImage('toilet', imageBlock, 'Toiletten', this.gridController.toiletten);
        if(this.gridController.bredebomen > 0)this.generateImage('bredeboom', imageBlock, 'Bredebomen', this.gridController.bredebomen);
        if(this.gridController.hogebomen > 0)this.generateImage('hogeboom', imageBlock, 'Hogebomen', this.gridController.hogebomen);
        if(this.gridController.prullenbakken > 0)this.generateImage('prullenbak', imageBlock, 'Prullenbakken', this.gridController.prullenbakken);
        if(this.gridController.schaduwbomen > 0)this.generateImage('schaduwboom', imageBlock, 'Schaduwbomen', this.gridController.schaduwbomen);

        block.appendChild(imageBlock);
    } 

    generateImage(type, imageBlock, name, amount){

        var image = document.createElement("img");
        image.src = "../src/images/"+ type +".png";
        image.id = type;
        image.setAttribute('draggable', 'true');

        let amountInputLabel = document.createElement("label");
        amountInputLabel.htmlFor = 'amountInput';
        amountInputLabel.innerHTML = name + '=' + amount;

        let inputblock = document.createElement("div");
        inputblock.appendChild(image);
        inputblock.appendChild(amountInputLabel);
        inputblock.className = "mb-4 flex flex-col w-full";

        imageBlock.appendChild(inputblock);
    }

    dropEvents(){
        const dropzones = document.querySelector('.dropzones');

        let element = null;
        let event = null;
        function startEvent(e) {
            element = e.target;
        }
        document
            .querySelector('.draggable-items')
            .addEventListener('dragstart', startEvent, false);

        dropzones.addEventListener('dragover', (e) => {
            e.preventDefault();
        }); 

        dropzones.addEventListener('drop', (e) => {
            
            e.preventDefault();

                e.target.insertBefore(element,e.target.firstChild);
                this.gridController.setGridFill(e.target.id, element.id);
                

                element.addEventListener('dragstart', startEvent);
            e.stopImmediatePropagation()
            
        });       

        
    }
}
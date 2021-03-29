export default class MainView {
    constructor() {
       this.windowSize = 750;
       this.gridSize = 15;
       this.paneSize = this.windowSize / this.gridSize;
    }

    init(mainController, navigationController, stepController) {
        this.mainController = mainController;
        this.navigationController = navigationController;
        this.stepController = stepController;

        this.generateGrid();
        let step = stepController.setStep(1);
        this.generateImages();
        this.dropEvents();
    }

    generateStep(data, step, location) {
        switch (step) {
            case 1: this.generateStep1(data); break;
            case 2: console.log("stap 2"); break;
            default: console.log(step + "default zou niet moeten!"); break;
        }
    }

    generateStep1(data) {
        let block = document.getElementById("configuration_block");
        block.className = 'h-full';
        let nameInput = document.createElement("input");
        nameInput.setAttribute('type', 'text');
        nameInput.id = 'nameInput';
        let nameInputLabel = document.createElement("label");
        nameInputLabel.htmlFor = 'nameInput';
        nameInputLabel.innerHTML = 'Name: ';

        let inputblock1 = document.createElement("div");
        inputblock1.appendChild(nameInputLabel);
        inputblock1.appendChild(nameInput);

        let visitorsInput = document.createElement("input");
        visitorsInput.setAttribute('type', 'number');
        visitorsInput.id = 'visitorsInput';
        let visitorsInputLabel = document.createElement("label");
        visitorsInputLabel.htmlFor = 'visitorseInput';
        visitorsInputLabel.innerHTML = 'Visitors: ';

        let inputblock2 = document.createElement("div");

        let submitButton = document.createElement("button");
        submitButton.innerHTML = 'next step';
        submitButton.className = 'p-2 bg-green-500 hover:bg-green-800 hover:text-white w-full';
        
        inputblock1.className = "mb-5 flex flex-col";
        inputblock2.className = "mb-5 flex flex-col";

        inputblock2.appendChild(visitorsInputLabel);
        inputblock2.appendChild(visitorsInput);

        block.appendChild(inputblock1);
        block.appendChild(inputblock2);
        block.appendChild(submitButton);
        
        
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

        if(this.mainController.tenten > 0) this.generateImage('tent', imageBlock, 'Tenten', this.mainController.tenten);
        if(this.mainController.drankkramen > 0)this.generateImage('drink', imageBlock, 'Drankkramen', this.mainController.drankkramen);
        if(this.mainController.eetkramen > 0)this.generateImage('food', imageBlock, 'Eetkramen', this.mainController.eetkramen);
        if(this.mainController.toiletten > 0)this.generateImage('toilet', imageBlock, 'Toiletten', this.mainController.toiletten);
        if(this.mainController.bredebomen > 0)this.generateImage('bredeboom', imageBlock, 'Bredebomen', this.mainController.bredebomen);
        if(this.mainController.hogebomen > 0)this.generateImage('hogeboom', imageBlock, 'Hogebomen', this.mainController.hogebomen);
        if(this.mainController.prullenbakken > 0)this.generateImage('prullenbak', imageBlock, 'Prullenbakken', this.mainController.prullenbakken);
        if(this.mainController.schaduwbomen > 0)this.generateImage('schaduwboom', imageBlock, 'Schaduwbomen', this.mainController.schaduwbomen);

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

                e.target.appendChild(element);
                element.removeEventListener('dragstart', startEvent, false)

                e.target.addEventListener('dragstart', e => {
            
                    
                    element = e.target;            
            });
            
        });       

        
    }
} 
import Helper from './Helper.js'

export default class GridView {
    
    constructor() {
        this.windowSize = 750;
        this.gridSize = 15;
        this.paneSize = this.windowSize / this.gridSize;
     }

    init(gridController) {
        this.gridController = gridController;
    }

    refreshNormal(data) {
        
        this.generateRightSide();
        this.generateGrid();
        this.drawGridItems();   
        this.generateImages(data);
        this.dropEvents();       
    }

    refreshLocked() {
        
        this.drawRegionLock();
        this.generateGrid();
        this.drawGridItems(); 
        this.lockEvents();    
    }

    generateRightSide() {
        let block = document.getElementById("right-side")
        block.className = "w-1/5 h-full bg-gray-200 flex flex-col p-5 justify-between";

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let itemLegenda = document.createElement("div");
        itemLegenda.className = "w-full flex flex-row flex-wrap";
        itemLegenda.id = "images_block";

        let div = document.createElement("div");
        div.className = "h-3.5/5 w-full flex flex-col";

        let dropbackzone = document.createElement("div");
        dropbackzone.className = "bg-gray-400 w-full h-full mb-5";
        dropbackzone.innerHTML = "Drop back items here!";
        dropbackzone.style.fontStyle = "italic";
        dropbackzone.style.textAlign = 'center';
        dropbackzone.style.lineHeight = '240px';
        dropbackzone.id = "dropbackzone";

        let lockRegion = document.createElement("button");
        lockRegion.addEventListener('click', () => { if(confirm('Are you sure you want to lock this region?')) this.gridController.lockRegion(); });
        lockRegion.innerHTML = "Lock region";
        lockRegion.className = "p-5 mb-5 bg-blue-500 hover:bg-blue-800 hover:text-white w-full";
        lockRegion.id = "lock_button"

        let runSimulation = document.createElement("button");
        runSimulation.innerHTML = "Run simulation";
        runSimulation.addEventListener("click" , () => {this.runSimulation()})
        runSimulation.className = "p-5 bg-green-500 hover:bg-green-800 hover:text-white w-full";

        div.appendChild(dropbackzone);
        div.appendChild(lockRegion);
        div.appendChild(runSimulation);

        block.appendChild(itemLegenda);
        block.appendChild(div);
    }

    runSimulation() {
        this.gridController.mainController.runSimulation();
    }
    
    generateGrid() {
        let paneSize = this.paneSize;
        let windowSize = this.windowSize;

        const grid = document.getElementById("grid");
                        grid.style.position = "relative";
                        grid.style.width = `${windowSize}px`;
                        grid.style.height = `${windowSize}px`;

                        while (grid.firstChild) {
                            grid.removeChild(grid.firstChild);
                        }
                        
        let rows = this.gridSize;
                    let cols = this.gridSize;
                    for(let x = 0; x < rows; x++) {
                        for(let y = 0; y < cols; y++) {
                            const gridPane = document.createElement("div");
                        gridPane.className =  `border gridpane absolute border border-gray-100 hover:bg-gray-400 dropzone`;
                        gridPane.id = `x${x}y${y}`;
                        gridPane.style.left = `${x * paneSize}px`;
                        gridPane.style.top = `${y * paneSize}px`;
                        gridPane.style.height = `${paneSize}px`;
                        gridPane.style.width = `${paneSize}px`;
                        gridPane.style.position = "absolute";
                        grid.appendChild(gridPane);
                        let item = this.gridController.getItem(x,y);
                        if(item == "tent" || item == "drinkStand" || item == "toilet" || item == "foodStand" || item == "trashcan") {
                            let image = this.getImageBlock(item);
                            
                            gridPane.insertBefore(image, gridPane.firstChild);
                        }
                        if( item == "wideTree" || item == "highTree" || item == "shadowTree" ) {
                            let image = this.getImageBlock(item);
                            image.setAttribute('draggable', false);
                            gridPane.insertBefore(image, gridPane.firstChild);
                        }
                        }
                    }
                    
    }

    drawRegionLock(){
        let block = document.getElementById("right-side")
        block.className = "w-1/5 h-full bg-gray-200 flex flex-col p-5 justify-end";

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let div = document.createElement("div");
        div.className = "h-3.5/5 w-full flex flex-col";
        div.style.verticalAlign = "bottom";

        let runSimulation = document.createElement("button");
        runSimulation.innerHTML = "Run simulation";
        runSimulation.addEventListener("click" , () => {this.runSimulation()})
        runSimulation.className = "p-5 bg-green-500 hover:bg-green-800 hover:text-white w-full";

        div.appendChild(runSimulation);

        block.appendChild(div);
    }

    drawGridItems() {
        for(let x = 0; x < this.gridSize; x++) {
            for(let y = 0; y < this.gridSize; y++) {
                let type = this.gridController.getItem(x,y);
               
                document.getElementById('x' + x + 'y' + y).style.backgroundColor = "white";
                if(type == "tentSurface" || type == "tent") {
                    document.getElementById('x' + x + 'y' + y).style.backgroundColor = "yellow";
                } else if(type =="drinkStandSurface" || type == "drinkStand") {
                    document.getElementById('x' + x + 'y' + y).style.backgroundColor = "red";
                } else if(type =="toiletSurface" || type == "toilet") {
                    document.getElementById('x' + x + 'y' + y).style.backgroundColor = "grey";
                } else if(type =="highTreeSurface" || type =="wideTreeSurface" || type == "shadowTreeSurface" || type=="highTree" || type == "wideTree" || type=="shadowTree") {
                    document.getElementById('x' + x + 'y' + y).style.backgroundColor = "green";
                } else if(type =="foodStand") {
                    document.getElementById('x' + x + 'y' + y).style.backgroundColor = "brown";
                }
                 else if(type =="trashcan") {
                document.getElementById('x' + x + 'y' + y).style.backgroundColor = "grey";
                }
            }
        }
    }
   
    generateImages(data) {
        let block = document.getElementById("images_block");

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }
        
        this.generateImage('tent', data.getCurrentLocation().tents, block);
        this.generateImage('foodStand',  data.getCurrentLocation().eatingStands, block);
        this.generateImage('drinkStand',  data.getCurrentLocation().drinkStands, block);
        this.generateImage('toilet',  data.getCurrentLocation().toiletBuildings, block);
        this.generateImage('trashcan',  data.getCurrentLocation().trashcans, block);
    } 

    generateImage(type, amount, parent){
        
        let subBlock = document.createElement("div");
        subBlock.className = "w-full flex flex-row flex-wrap";

        for(let i =0;i< amount;i++){
            let image = this.getImageBlock(type);
            
            subBlock.appendChild(image);
            parent.appendChild(subBlock);
        }
    }

    getImageBlock(type) {
        let image = document.createElement("img");
        image.src = "../src/images/"+ type +".png";
        image.id = type;
        image.setAttribute('draggable', !this.gridController.getRegionLock());
        image.className = "draggable-item";
        image.style.width = "50px";
        image.style.height = "50px";
        return image;
    }

    drawConfigOptions(x, y, text1, value1, type1, text2, value2, type2){
        
        let block = document.getElementById("right-side")
        block.className = "w-1/5 h-full bg-gray-200 flex flex-col p-5 justify-between";

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let errorBox = document.createElement("div");
        errorBox.className = "p-3 mb-2 bg-red-200";
        errorBox.id = 'configErrorbox'
        errorBox.style.verticalAlign = "bottom";

        let div = document.createElement("div");
        div.className = "h-3.5/5 w-full flex flex-col";

        let firstInput = Helper.getInputField('firstInput', type1);
        firstInput.value = value1;
        let firstInputLabel = Helper.getLabel(text1);
        let firstInputBlock = Helper.getDivForInput(firstInputLabel, firstInput);

        let secondInput = Helper.getInputField('secondInput', type2);
        secondInput.value = value2;
        let secondInputLabel = Helper.getLabel(text2);
        let secondInputBlock = Helper.getDivForInput(secondInputLabel, secondInput);
        
        let submitButton = Helper.getButton("Save", "save-button", () => {
            this.gridController.updateConfigData(x, y, firstInput.value, secondInput.value);                
        }); 

        Helper.appendChilds([errorBox, firstInputBlock, secondInputBlock, submitButton], div);

        let div2 = document.createElement("div");
        div2.className = "h-3.5/5 w-full flex flex-col";

        let runSimulation = document.createElement("button");
        runSimulation.innerHTML = "Run simulation";
        runSimulation.addEventListener("click" , () => {this.runSimulation()})
        runSimulation.className = "p-5 bg-green-500 hover:bg-green-800 hover:text-white w-full";

        div2.appendChild(runSimulation);

        block.appendChild(div);
        block.appendChild(div2);

        Helper.clearConfigErrors();
    }

    dropEvents(){
        let draggableItems = document.getElementsByClassName('draggable-item');
        let dropzones = document.getElementsByClassName('dropzone');
        
        let element;
        
        for(let i = 0; i < draggableItems.length;i++) {
            draggableItems[i].addEventListener('dragstart', (e) => {
                element = e.target;
                this.gridController.mainController.soundController.playSelectSound();
            });
        }
        
        for(let i = 0; i < dropzones.length; i++) {
            dropzones[i].addEventListener('dragover', (e) => {
                e.preventDefault();
                if(element.parentNode.classList.contains("dropzone")) {
                    this.gridController.deleteGridFill(element.parentNode.id, element.id);
                }
            }); 
    
            dropzones[i].addEventListener('drop', (e) => {

                if(this.gridController.canPlace(e.target.id, element.id)) {
                    e.preventDefault();
                    if(element.parentNode.classList.contains('dropzone')) {
                        this.gridController.moveItem(e.target.id, element.id);
                    } else {
                        this.gridController.setGridFill(e.target.id, element.id);            
                    } 
                    this.gridController.mainController.soundController.playDropSound();  
                } else {
                    alert("You can't place your item right here!");

                    if(element.parentNode.classList.contains("dropzone")) {
                        this.gridController.moveItem(element.parentNode.id, element.id);
                    }
                }
                this.gridController.refreshGrid();
            });       
        }
        
        let dropbackzone = document.getElementById('dropbackzone');
        dropbackzone.addEventListener('dragover', (e) => {
            e.preventDefault();
        }); 

        dropbackzone.addEventListener('drop', (e) => {
            e.preventDefault();
            // e.stopImmediatePropagation();
            if(element.parentNode.classList.contains("dropzone")) {
                this.gridController.dropBack(element.id);
                this.gridController.mainController.soundController.playDropSound();
            } else {
                alert("You can't place your item right here!");
            }
            this.gridController.refreshGrid();
        })
    }

        lockEvents(){
            let draggableItems = document.getElementsByClassName('draggable-item');
            
            for(let i = 0; i < draggableItems.length;i++) {
                draggableItems[i].addEventListener('click', (e) => {
                    this.gridController.setConfigurationField(e.target.parentNode.id);                   
                });
            }
        }
}
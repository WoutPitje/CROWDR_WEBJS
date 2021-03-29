export default class GridView {
    
    constructor() {
        this.windowSize = 750;
        this.gridSize = 15;
        this.paneSize = this.windowSize / this.gridSize;
     }

    init(gridController) {
        this.gridController = gridController;
    }

    refresh(data) {
        
        this.drawGridItems();
        this.generateImages(data);
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
                        console.log(item);
                        if(item == "tent" || item == "drinkStand" || item == "toilet" || item == "wideTree" || item == "highTree" || item == "shadowTree" || item == "foodStand" || item == "trashcan") {
                            let image = this.getImageBlock(item);
                            
                            gridPane.appendChild(image);
                        }
                        }
                    }
                    
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
        block.className = 'h-full';

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let imageBlock = document.createElement("div");
        imageBlock.className = "mb-5 flex flex-col";
        imageBlock.id = "imageList"
        imageBlock.setAttribute('draggable', 'true');
        imageBlock.style.width = 50 + "px";
        imageBlock.style.height = 50 + "px";

        this.generateImage('tent', imageBlock, 'Tenten', data.getCurrentLocation().tents);
        this.generateImage('drinkStand', imageBlock, 'Drankkramen', data.getCurrentLocation().eatingStalls);
        this.generateImage('foodStand', imageBlock, 'Eetkramen', data.getCurrentLocation().drinkStalls);
       this.generateImage('toilet', imageBlock, 'Toiletten', data.getCurrentLocation().toiletBuildings);
        this.generateImage('wideTree', imageBlock, 'Bredebomen', data.getCurrentLocation().wideTrees);
        this.generateImage('highTree', imageBlock, 'Hogebomen', data.getCurrentLocation().highTrees);
        this.generateImage('trashcan', imageBlock, 'Prullenbakken', data.getCurrentLocation().trashcans);
       this.generateImage('shadowTree', imageBlock, 'Schaduwbomen', data.getCurrentLocation().shadowTrees);

        block.appendChild(imageBlock);
    } 

    generateImage(type, imageBlock, name, amount){
        let inputblock = document.createElement("div");
        
        inputblock.className = "mb-4 flex flex-col w-full";
        let itemBlock = document.createElement("div");
        itemBlock.className = "flex flex-row w-full";
        for(let i =0;i< amount;i++){
            let image = this.getImageBlock(type);
            itemBlock.appendChild(image);
        }
        
        let amountInputLabel = document.createElement("label");
        amountInputLabel.htmlFor = 'amountInput';
        amountInputLabel.innerHTML = name;

        inputblock.appendChild(amountInputLabel);
        inputblock.appendChild(itemBlock);

        imageBlock.appendChild(inputblock);
    }

    getImageBlock(type) {
        let image = document.createElement("img");
        image.src = "../src/images/"+ type +".png";
        image.id = type;
        image.setAttribute('draggable', 'true');
        image.className = "draggable-item";
        return image;
    }

    dropEvents(){
        const draggableItems = document.getElementsByClassName('draggable-item');
        const dropzones = document.querySelector('.dropzones');
        
        let element = null;
        let oldelement = null;
        
        for(let i = 0; i < draggableItems.length;i++) {
            draggableItems[i].addEventListener('dragstart', (e) => {
                element = e.target;
            });
        }
        
        

        dropzones.addEventListener('dragover', (e) => {
            e.preventDefault();
            oldelement = element.parentNode;
            if(oldelement.id != ""){
                this.gridController.deleteGridFill(oldelement.id,element.id);
            }
            
        }); 

        dropzones.addEventListener('drop', (e) => {
           
            
           
            
            if(this.gridController.canPlace(e.target.id, element.id)) {
                e.preventDefault();
                
                e.target.appendChild(element);
                
                this.gridController.setGridFill(e.target.id, element.id);
                

                element.addEventListener('dragstart',  (e) => {
                    element = e.target;
                });
                this.drawGridItems();
                e.stopImmediatePropagation();
            } else {
                alert("you cant place your item right here");
                if(oldelement.id != ""){
                this.gridController.setGridFill(oldelement.id, element.id);
                }
            }
            
        });       

        
    }
}
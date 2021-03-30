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
                        if(item == "tent" || item == "drinkStand" || item == "toilet" || item == "foodStand" || item == "trashcan") {
                            let image = this.getImageBlock(item);
                           
                            gridPane.insertBefore(image, gridPane.firstChild);
                        }
                        if( item == "wideTree" || item == "highTree" || item == "shadowTree" ) {
                            let image = this.getImageBlock(item);
                            
                            gridPane.insertBefore(image, gridPane.firstChild);
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
        
        for(let i =0;i< amount;i++){
            let image = this.getImageBlock(type);
            image.style.width = "50px";
            image.style.height = "50px";
            parent.appendChild(image);
        }
        
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
        let draggableItems = document.getElementsByClassName('draggable-item');
        let dropzones = document.getElementsByClassName('dropzone');
        
        
        let element;
        
        
        for(let i = 0; i < draggableItems.length;i++) {
            draggableItems[i].addEventListener('dragstart', (e) => {
                element = e.target;
                
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
                    
                    e.target.insertBefore(element, e.target.firstChild);
                    
                    this.gridController.setGridFill(e.target.id, element.id);
                    
                    
    
                    element.addEventListener('dragstart',  (e) => {
                        element = e.target;
                    });
                    
                    e.stopImmediatePropagation();
                } else {
                    alert("you cant place your item right here");
                    if(element.parentNode.classList.contains("dropzone")) {
                        this.gridController.setGridFill(element.parentNode.id, element.id);
                    }
                   
                    
                }
                this.drawGridItems();
               
            });       
    
            
        }
        
        let dropbackzone = document.querySelector('#dropbackzone');
        dropbackzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            
            
            
        }); 

        dropbackzone.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();

            if(element.parentNode.classList.contains("dropzone")) {
            
                this.gridController.dropBack(element.id);
                
                let block = document.getElementById("images_block");
                element.style.width = "50px";
                element.style.height = "50px";
                block.appendChild(element);   
            } else {
                alert("you cant place your item right here");
                
                    this.gridController.setGridFill(element.parentNode.id, element.id);
                
               
            }
            this.drawGridItems();
           
            

        })
        }
        

        
}
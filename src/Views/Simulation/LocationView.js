import Trashcan from "../../Models/Trashcan"

export default class LocationView {
    constructor(locationController) {
        this.locationController = locationController;
        this.locationBlocks = [];
        this.locationBlockWidth = 350;
        this.locationBlockHeight = 350;
        this.gridWidth = this.locationBlockWidth / 15;
        this.gridHeight = this.locationBlockHeight / 15;
        this.groupWidth = 8;
    }
    init(data) {
        let locationsblock = document.getElementById("locations-block");
        console.log(locationsblock);

        data.locations.forEach((location) => {
            let nameTag = document.createElement("span");
            nameTag.innerHTML = location.name;
            let locationBlock = document.createElement("canvas");
            locationBlock.id = location.name;
            locationBlock.setAttribute("width", "" + this.locationBlockWidth);
            locationBlock.setAttribute("height", "" + this.locationBlockHeight);
            locationBlock.className = "locationblock bg-gray-100"
            let div = document.createElement("div");
            let canvas = locationBlock.getContext("2d");
            canvas.translate(0.5,0.5);
            this.locationBlocks.push(canvas);
            div.appendChild(nameTag);
            div.appendChild(locationBlock);
            locationBlock.addEventListener("mousemove", (e) => this.hoverPeople(location, e.clientX - locationBlock.offsetLeft - locationBlock.scrollLeft, e.clientY - locationBlock.offsetTop - locationBlock.scrollTop));
            locationsblock.appendChild(div);
        });

        this.drawLocations(data);
        

        
    }

    refresh(data) {
        this.drawLocations(data);
        
    }

    drawLocations(data) {
       
        for(let i = 0; i < this.locationBlocks.length; i++) {
            this.drawLocation(data.locations[i] , this.locationBlocks[i]);
        }
    }

    drawLocation(locationData, block) {
        
        block.clearRect(0, 0, this.locationBlockWidth, this.locationBlockHeight);
        for(let x = 0; x < 15; x++) {
            for(let y = 0; y < 15; y++) {
                this.drawBackgroundItem(locationData.grid.array[x][y].getFillType(), block,  x, y);
                
                if(locationData.getGridBlock(x,y).object instanceof Trashcan) {
                    console.log("jes")
                    this.drawTrashcan(x,y,block,locationData.getGridBlock(x,y).object.filled);
                }
            }
        }
        for(let x = 0; x < 15; x++) {
            for(let y = 0; y < 15; y++) {
                this.drawPeople(locationData.grid.array[x][y].getAmountOfPeople(), block, x, y);
            }
        }
        
    }
    drawTrashCan(x, y, block, filled) {
        
        block.fillStyle = "green";
        block.fillRect(x ,y - this.gridHeight / filled,this.gridWidth, this.gridHeight);
        block.fill();
        block.stroke();  
    }

    drawPeople(amount, block,x,y) {
        if(amount > 0) this.drawGroup(amount,block, x, y);
        
    }

    drawGroup(amount, block, x, y) {
        block.strokeStyle = "red";
        block.beginPath();
        block.arc(x * this.gridWidth + this.gridWidth /2, y * this.gridHeight + this.gridHeight /2 , this.groupWidth, 0, 2 * Math.PI);
        block.fillStyle = "white";
        block.fill();
        block.stroke();   
        block.fillStyle = "black";
        block.font = "12px Arial";
       
        block.fillText(amount, x * this.gridWidth + this.gridWidth /2 - 3, y * this.gridHeight + this.gridHeight /2 + 4);
    }
    drawBackgroundItem(type, block,x,y) {
        if(type != null) {
            let color = null;
            let image = null;
            //colors
            if(type == "tentSurface" || type == "tent") {
                color = "yellow";
            } else if(type =="drinkStandSurface" || type == "drinkStand") {
                color = "red";
            } else if(type =="toiletSurface" || type == "toilet") {
                color = "gray";
            } else if(type =="highTreeSurface" || type =="wideTreeSurface" || type == "shadowTreeSurface" || type=="highTree" || type == "wideTree" || type=="shadowTree") {
                color = "green";
            } else if(type =="foodStand") {
                color = "brown";
            }
             else if(type =="trashcan") {
                color = "gray";

            }
            //images
            if(type == "tent" || type =="drinkStand" || type =="toilet" || type=="highTree" || type == "wideTree" || type=="shadowTree" || type=="foodStand" || type =="trashcan") {
                image = type;
            }

            this.drawGridPane(x,y,color,image,block);
        }            
    }

    drawGridPane(x,y,color,image, block) {
        
        block.fillStyle = color;
        block.fillRect(x * this.gridWidth, y * this.gridHeight, this.gridWidth, this.gridHeight);
        
        if(image != null) {
            let drawing = new Image();
            drawing.src = "../src/Images/" + image + ".png"; 
            
            drawing.onload = () => {
                block.drawImage(drawing,x * this.gridWidth, y * this.gridHeight, this.gridWidth, this.gridHeight);
            }

            
        }
    }

    

    hoverPeople(location,x,y) {
        if(x < 0 || y < 0) {
            return;
        }
        let infoblock = document.getElementById("people-info-block");

        while (infoblock.firstChild) {
           infoblock.removeChild(infoblock.firstChild);
        }

        x = Math.floor(x / 23.3);
        y = Math.floor(y /23.3);



        let infoheader = document.createElement("h1");
        infoheader.className = "font-bold"
        infoheader.innerHTML = "Info about block x" + (x+1) + ", y"+(y+1) + " (" + location.name +")";

        infoblock.appendChild(infoheader);

        let gridBlock = location.grid.getGridBlock(x + 1,y + 1);


        let personinfoheader = document.createElement("span");
        personinfoheader.innerHTML = "People in this block"
        personinfoheader.className = "italic";
        infoblock.appendChild(personinfoheader);
        if(gridBlock.getAmountOfPeople() <= 0) { 
            let personRow = document.createElement("span");
            personRow.innerHTML = "-";

            infoblock.appendChild(personRow);
        }
        let i =  1; 
        gridBlock.groupsOfPeople.forEach(group => {
            let groupRow = document.createElement("span");
            groupRow.innerHTML = "group " + i;
            groupRow.className = "font-bold"
            infoblock.appendChild(groupRow);
            group.people.forEach(person => {
                let personRow = document.createElement("span");
                personRow.className = "ml-4"
                personRow.innerHTML = person.getName() + " (" + person.getAge() + ") ("+ person.getGender() + ") ";
                infoblock.appendChild(personRow);
            });
            i++;
        });
        
    }
}
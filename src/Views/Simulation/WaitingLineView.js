export default class WaitingLineView {

    constructor(waitingLineController) {
        this.waitingLineController = waitingLineController; 
        this.waitingLineWidth = 25;
        this.groupWidth = 7;
        this.waitingLinesBlock = document.getElementById("waitingLine");
        this.waitingLinesHeight = this.waitingLinesBlock.height;
        this.waitingLinesWidth = this.waitingLinesBlock.width;
        this.waitingLineBlockHeight = 50;
        this.canvas = this.waitingLinesBlock.getContext("2d");
        this.canvas.translate(0.5,0.0);
    }

    refresh(data) {
        this.canvas.clearRect(0, 0, this.waitingLinesWidth, this.waitingLinesHeight);
        this.drawScanBuilding();
        this.drawWaitingLines(data.openWaitingLines);
        
        this.drawPeopleInLine(data.waitingLines);
        
    }

    getWaitingLines() {
        let waitingLineInput = document.getElementById("openWaitingLines");
    
        return waitingLineInput;
    }
    drawScanBuilding() {
        let block = this.canvas;
        block.fillStyle = "darkblue";
        block.fillRect(0, 0, this.waitingLinesWidth, this.waitingLineBlockHeight);
    }
    drawWaitingLines(amount) {
        
        let block = this.canvas;
        let x = 0;
        let width = this.waitingLineWidth;
        let height = this.waitingLinesHeight;
        block.strokeStyle = "black";
        block.beginPath();
        block.moveTo(0, this.waitingLineBlockHeight);
        block.lineTo(0, height);
        block.stroke();
        for(let i = 1; i <= amount;i++) {
            block.beginPath();
            block.moveTo(i * width, 0 + this.waitingLineBlockHeight);
            block.lineTo(i * width, height);
            block.stroke();
        }
    }

    drawPeopleInLine(waitingLines) {
        let block = this.canvas;
        let radius = this.groupWidth;
        let line = 1;
        let x = radius;
        let y = radius;
        let width = this.waitingLinesWidth;
        
        
        waitingLines.forEach(waitingLine => {
            waitingLine.people.forEach(waitingGroup => {
                block.strokeStyle = "red";
                block.beginPath();
                block.arc((line - 1)* this.waitingLineWidth + this.waitingLineWidth /2, y + this.waitingLineBlockHeight + 5, radius, 0, 2 * Math.PI);
                block.stroke();   
                block.fillStyle = "black";
                block.font = "12px Arial";
               
                block.fillText(waitingGroup.people.length, (line - 1)* this.waitingLineWidth + this.waitingLineWidth /2 -3 , y + this.waitingLineBlockHeight + 5 + 5);
                 y+= radius * 2;
            });
            y = radius;
            line++;
        });
        
        
        // peopleinline.forEach(waitingGroup => {
            
        //     
        //     block.arc(x, y, radius, 0, 2 * Math.PI);
        //     block.stroke();   
        //     block.font = "20px Arial";
        //     block.fillText(waitingGroup.people.length, x - radius + 5 , y +  6);
        //     x+= radius*2;
        //     if(x >= width) {
        //         x = radius;
        //         y += radius * 2;
        //     }
        // })
    }

}
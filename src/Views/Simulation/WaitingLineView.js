export default class WaitingLineView {

    constructor(waitingLineController) {
        this.waitingLineController = waitingLineController; 
        this.waitingLineWidth = 50;
        this.groupWidth = 10;
        this.waitingLinesBlock = document.getElementById("waitingLine");
        this.waitingLinesHeight = this.waitingLinesBlock.height;
        this.waitingLinesWidth = this.waitingLinesBlock.width;
        this.canvas = this.waitingLinesBlock.getContext("2d");
    }

    refresh(data) {
        this.canvas.clearRect(0, 0, this.waitingLinesWidth, this.waitingLinesHeight);
        this.drawWaitingLines(data.openWaitingLines);
        
        this.drawPeopleInLine(data.peopleInLine);
        
    }

    getWaitingLines() {
        let waitingLineInput = document.getElementById("openWaitingLines");
    
        return waitingLineInput;
    }
    drawWaitingLines(amount) {
        let block = this.canvas;
        let x = 0;
        let width = this.waitingLineWidth;
        let height = this.waitingLinesHeight;
        block.beginPath();
        block.moveTo(0, 0);
        block.lineTo(0, height);
        block.stroke();
        for(let i = 1; i <= amount;i++) {
            block.beginPath();
            block.moveTo(i * width, 0);
            block.lineTo(i * width, height);
            block.stroke();
        }
    }

    drawPeopleInLine(peopleinline) {
        let block = this.canvas;
        let radius = this.groupWidth;
        let x = radius;
        let y = radius;
        let width = this.waitingLinesWidth;
       
        
        
        peopleinline.forEach(waitingGroup => {
            
            block.beginPath();
            block.arc(x, y, radius, 0, 2 * Math.PI);
            block.stroke();   
            block.font = "20px Arial";
            block.fillText(waitingGroup.people.length, x - radius + 5 , y +  6);
            x+= radius*2;
            if(x >= width) {
                x = radius;
                y += radius * 2;
            }
        })
    }

}
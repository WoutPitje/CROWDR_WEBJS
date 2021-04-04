import GroupOfPeople from '../../Models/Simulation/GroupOfPeople.js'

export default class WaitingLineController{

    constructor(data, simulationController) {
        this.data = data;
        this.simulationController = simulationController;
        
        this.waitingLineView = this.simulationController.waitingLineView;
    
        this.amountOfVisitors = 0;
    }

    init() {
        this.setVisitors();
        this.data.setOpenWaitingLines(this.getAmountOfWaitingLinesOpen());
        this.data.setWaitingLines();
        this.waitingLineView.refresh(this.data);
    }

    refresh() {
        
        if(this.data.openWaitingLines != this.getAmountOfWaitingLinesOpen()) {
            this.data.setOpenWaitingLines(this.getAmountOfWaitingLinesOpen());
            this.data.setWaitingLines();
        }
        this.scanWaitingLines();
        this.waitingLineView.refresh(this.data);
        this.amountOfVisitors = this.amountOfVisitors + 13;
    }

    scanWaitingLines() {
        this.data.scanWaitingLines();
    }

    setVisitors() {
        let maxAmountOfVisitors = 0;

        this.data.locations.forEach(location => {
            maxAmountOfVisitors += location.visitors;
        });

        this.amountOfVisitors = Math.floor(Math.random() * maxAmountOfVisitors) + (3/4*maxAmountOfVisitors); 
        for(let i = 0; i < this.amountOfVisitors; ) {
            let amountOfPeople = Math.floor(Math.random() * 4) + 1;
            
            let groupOfPeople = new GroupOfPeople(amountOfPeople);
            this.data.addWaitingGroup(groupOfPeople);
            i = i + amountOfPeople;
        }
        console.log(this.data.peopleInLine)
    }

    getAmountOfWaitingLinesOpen() {
        let openWaitingLines = this.waitingLineView.getWaitingLines();
       
        return parseInt(openWaitingLines.value);
    }

}
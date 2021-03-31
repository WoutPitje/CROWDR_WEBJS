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
        this.waitingLineView.refresh(this.data);
    }

    refresh() {
        this.setWaitingLines();
        this.waitingLineView.refresh(this.data);
    }

    setVisitors() {
        let maxAmountOfVisitors = 0;

        this.data.locations.forEach(location => {
            maxAmountOfVisitors += location.visitors;
        });

        this.amountOfVisitors = Math.floor(Math.random() * maxAmountOfVisitors) + Math.floor(maxAmountOfVisitors / 4 * 3); 
        for(let i = 0; i < this.amountOfVisitors; ) {
            let amountOfPeople = Math.floor(Math.random() * 4) + 1;
            
            let groupOfPeople = new GroupOfPeople(amountOfPeople);
            this.data.addWaitingGroup(groupOfPeople);
            i = i + amountOfPeople;
        }
        console.log(this.data.peopleInLine)
    }

    setWaitingLines() {
        let openWaitingLines = this.waitingLineView.getWaitingLines();
       
        this.data.setOpenWaitingLines(openWaitingLines.value);

        
    }

}
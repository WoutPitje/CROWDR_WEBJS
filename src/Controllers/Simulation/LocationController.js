import Trashcan from "../../Models/Trashcan";


export default class LocationController {

    constructor(data, simulationController) {
        this.data = data;
        this.simulationController = simulationController;
        this.locationView = simulationController.locationView;
    }

    refresh() {
        this.locationView.refresh(this.data);
        this.fillTrashCans();
        this.leavePeople();
    }

    leavePeople() {
        this.data.leavePeople(1);
    }

    fillTrashCans() {
        this.data.locations.forEach(location => {
            for(let i = 0; i < 15;i++) {
                for(let j = 0; j < 15; j++) {
                     let block = location.getGridBlock(i,j);
                     if(block.object instanceof Trashcan) {
                        block.object.fill();
                     }
                }
            }
        });
    }



}
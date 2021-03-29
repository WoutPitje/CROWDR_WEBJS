import Grid from "../Models/Grid"

export default class GridController {
    constructor(data) {
        this.data = data;
        this.mainGrid = new Grid();

        this.tenten = 3;
        this.eetkramen = 2;
        this.drankkramen = 1;
        this.toiletten = 4;
        this.prullenbakken = 5;
        this.hogebomen = 2;
        this.bredebomen = 3;
        this.schaduwbomen = 1;
    }

    getData() {
        return data;
    }

    isGridFilled(coordinates){

        let x = coordinates.slice(coordinates.indexOf('x') + 1 ,coordinates.indexOf('y'));
        let y = coordinates.slice(coordinates.indexOf('y') + 1 ,coordinates.length);

        return this.mainGrid.array[x][y].getFilled();
    }

    setGridFill(coordinates, type){

        let x = coordinates.slice(coordinates.indexOf('x') + 1 ,coordinates.indexOf('y'));
        let y = coordinates.slice(coordinates.indexOf('y') + 1 ,coordinates.length);
        x = parseInt(x);
        y = parseInt(y);
        

        this.mainGrid.placeItem(x,y,type);
    }

    deleteGridFill(coordinates, type) {
        let x = coordinates.slice(coordinates.indexOf('x') + 1 ,coordinates.indexOf('y'));
        let y = coordinates.slice(coordinates.indexOf('y') + 1 ,coordinates.length);
        x = parseInt(x);
        y = parseInt(y);
        

        this.mainGrid.deleteItem(x,y,type);
    }
    getItem(x,y) {
        return this.mainGrid.getItem(x,y);
    }

    updateGridImages(type){
        switch(type){
            case "tent":
                this.tenten--;
                break;
            case "drink":
                this.drankkramen--;
                break;
            case "food":
                this.eetkramen--;
                break;
            case "toilet":
                this.toiletten--;
                break;
            case "prullenbak":
                this.prullenbakken--;
                break;
            case "hogeboom":
                this.hogebomen--;
                break;
            case "bredeboom":
                this.bredebomen--;
                break;
            case "schaduwboom":
                this.schaduwbomen--;
                break;
        }
    }
}

import Grid from "../Models/Grid"

export default class MainController {
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

    setGridFill(coordinates, setFill){

        let x = coordinates.slice(coordinates.indexOf('x') + 1 ,coordinates.indexOf('y'));
        let y = coordinates.slice(coordinates.indexOf('y') + 1 ,coordinates.length);

        this.mainGrid.array[x][y].setFilled(setFill);
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

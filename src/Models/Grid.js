import GridBlock from "../Models/GridBlock";

export default class Grid {
    
    constructor() {
        this.array = [];
        for (var i = 0; i < 15; i++) {
            this.array[i] = [];
            for (var j = 0; j < 15; j++) {
                this.array[i][j] = new GridBlock();
            }
        }
    }
}
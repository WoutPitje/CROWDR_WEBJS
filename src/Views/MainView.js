import Helper from "./Helper";

export default class MainView {
    constructor() {
       this.windowSize = 750;
       this.gridSize = 15;
       this.paneSize = this.windowSize / this.gridSize;
    }

    init(mainController, navigationController, stepController) {
        this.mainController = mainController;
        this.navigationController = navigationController;
        this.stepController = stepController;

        this.generateGrid();
        let step = stepController.setStep(1);
        Helper.clearErrors();
        
    }

    error(error) {
        Helper.setErrors(error);
    }
    generateGrid() {
        let paneSize = this.paneSize;
        let windowSize = this.windowSize;
        
        const grid = document.getElementById("grid");
                        grid.style.position = "relative";
                        grid.style.width = `${windowSize}px`;
                        grid.style.height = `${windowSize}px`;
                        
        let rows = this.gridSize;
                    let cols = this.gridSize;
                    for(let i = 0; i < rows; i++) {
                        for(let j = 0; j < cols; j++) {
                            addGridPane(j, i);
                        }
                    }
                    function addGridPane(x, y) {
                        const gridPane = document.createElement("div");
                        gridPane.className =  `border gridpane absolute border border-black hover:bg-gray-400`;
                        gridPane.id = `x${x}y${y}`;
                        gridPane.style.left = `${x * paneSize}px`;
                        gridPane.style.top = `${y * paneSize}px`;
                        gridPane.style.height = `${paneSize}px`;
                        gridPane.style.width = `${paneSize}px`;
                        gridPane.style.position = "absolute"
                        grid.appendChild(gridPane);
                    }
    }
   
    
}
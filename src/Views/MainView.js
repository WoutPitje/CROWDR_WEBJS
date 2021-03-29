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

    
    }

    generateStep(data, step, location) {
        switch (step) {
            case 1: this.generateStep1(data); break;
            case 2: console.log("stap 2"); break;
            default: console.log(step + "default zou niet moeten!"); break;
        }
    }

    generateStep1(data) {
        let block = document.getElementById("configuration_block");
        block.className = 'h-full';
        let nameInput = document.createElement("input");
        nameInput.setAttribute('type', 'text');
        nameInput.id = 'nameInput';
        let nameInputLabel = document.createElement("label");
        nameInputLabel.htmlFor = 'nameInput';
        nameInputLabel.innerHTML = 'Name: ';

        let inputblock1 = document.createElement("div");
        inputblock1.appendChild(nameInputLabel);
        inputblock1.appendChild(nameInput);

        let visitorsInput = document.createElement("input");
        visitorsInput.setAttribute('type', 'number');
        visitorsInput.id = 'visitorsInput';
        let visitorsInputLabel = document.createElement("label");
        visitorsInputLabel.htmlFor = 'visitorseInput';
        visitorsInputLabel.innerHTML = 'Visitors: ';

        let inputblock2 = document.createElement("div");

        let submitButton = document.createElement("button");
        submitButton.innerHTML = 'next step';
        submitButton.className = 'p-2 bg-green-500 hover:bg-green-800 hover:text-white w-full';
        
        inputblock1.className = "mb-5 flex flex-col";
        inputblock2.className = "mb-5 flex flex-col";

        inputblock2.appendChild(visitorsInputLabel);
        inputblock2.appendChild(visitorsInput);

        block.appendChild(inputblock1);
        block.appendChild(inputblock2);
        block.appendChild(submitButton);
        
        
    }

    
} 
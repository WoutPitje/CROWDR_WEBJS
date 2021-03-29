import Helper from "./Helper";

export default class StepView {
    constructor() {
       this.windowSize = 750;
       this.gridSize = 15;
       this.paneSize = this.windowSize / this.gridSize;
    }

    init(mainController, navigationController, stepController) {
        this.mainController = mainController;
        this.navigationController = navigationController;
        this.stepController = stepController;

        
        document.getElementById("resetConfig").addEventListener('click' , () => {stepController.resetConfig();})
        Helper.clearErrors();
    }
    generateStep1() {
        let block = document.getElementById("configuration_block");
        
        block.className = 'h-full';
        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let nameInput = Helper.getInputField('nameInput', 'text');
        let nameInputLabel = Helper.getLabel('Name: ', 'nameInput');
        let inputblock1 = Helper.getDivForInput(nameInputLabel, nameInput);

        let visitorInput = Helper.getInputField('vistorInput', 'number');
        let visitorInputLabel = Helper.getLabel('Visitors: ', 'visitorInput');
        let inputblock2 = Helper.getDivForInput(visitorInputLabel, visitorInput);
        
        let submitButton = Helper.getButton("next step", () => {this.stepController.step1(nameInput.value, visitorInput.value)});
        Helper.appendChilds([inputblock1, inputblock2, submitButton], block);
    }

    generateStep2() {
        let block = document.getElementById("configuration_block");

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let tentInput = Helper.getInputField('tentInput', 'number');
        let tentInputLabel = Helper.getLabel('Amount of tents: ', 'tentInput');
        let inputblock = Helper.getDivForInput(tentInputLabel, tentInput);

        let submitButton = Helper.getButton("next step", () => {this.stepController.step2(tentInput.value); });

        Helper.appendChilds([inputblock, submitButton], block);
    }
    generateStep3() {
        let block = document.getElementById("configuration_block");

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let eatingStallsInput = Helper.getInputField('eatingStallInput', 'number');
        let eatingStallInputLabel = Helper.getLabel('Amount of teating stalls: ', 'eatingStallInput');
        let inputblock = Helper.getDivForInput(eatingStallInputLabel, eatingStallsInput);

        let submitButton = Helper.getButton("next step", () => {this.stepController.step3(eatingStallInput.value); });

        Helper.appendChilds([inputblock, submitButton], block);
    }

    generateStep4() {
        let block = document.getElementById("configuration_block");

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let drinkStallsInput = Helper.getInputField('drinkStallInput', 'number');
        let drinkStallInputLabel = Helper.getLabel('Amount of tdrink stalls: ', 'drinkStallInput');
        let inputblock = Helper.getDivForInput(drinkStallInputLabel, drinkStallsInput);

        let submitButton = Helper.getButton("next step", () => {this.stepController.step4(drinkStallInput.value); });

        Helper.appendChilds([inputblock, submitButton], block);
    }

    generateStep5() {
        let block = document.getElementById("configuration_block");

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let highTreeInput =  Helper.getInputField('highTreeInput', 'number');
        let highTreeInputLabel = Helper.getLabel('Amount of high trees(1x1): ', 'highTreeInput');
        let inputBlock1 = Helper.getDivForInput(highTreeInputLabel, highTreeInput);

        let wideTreeInput =  Helper.getInputField('wideTreeInput', 'number');
        let wideTreeInputLabel = Helper.getLabel('Amount of wide trees(2x1): ', 'wideTreeInput');
        let inputBlock2 = Helper.getDivForInput(wideTreeInputLabel, wideTreeInput);

        let shadowTreeInput =  Helper.getInputField('shadowTreeInput', 'number');
        let shadowTreeInputLabel = Helper.getLabel('Amount of shadow trees(3x3): ', 'shadowTreeInput');
        let inputBlock3 = Helper.getDivForInput(shadowTreeInputLabel, shadowTreeInput);

        let submitButton = Helper.getButton("next step", () => {this.stepController.step5(highTreeInput.value, wideTreeInput.value, shadowTreeInput.value)});

        Helper.appendChilds([inputBlock1, inputBlock2, inputBlock3, submitButton], block)

        
    }

    generateStep6() {
        let block = document.getElementById("configuration_block");

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let toiletBuildingsInput = Helper.getInputField('toiletBuildingsInput', 'number');
        let toiletBuildingsInputLabel = Helper.getLabel('Amount of toilet buildings: ', 'toiletBuildingsInput');
        let inputblock = Helper.getDivForInput(toiletBuildingsInputLabel, toiletBuildingsInput);

        let submitButton = Helper.getButton("next step", () => {this.stepController.step6(toiletBuildingsInput.value); });

        Helper.appendChilds([inputblock, submitButton] , block);

    }

    generateStep7(maximumAmountOfTrashcans) {
        let block = document.getElementById("configuration_block");

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let trashCanInput = Helper.getInputField('trashCanInput', 'number');
        let trashCanInputLabel = Helper.getLabel('Amount of trashcans (max: ' + maximumAmountOfTrashcans + '): ', 'trashCanInput');
        let inputblock = Helper.getDivForInput(trashCanInputLabel, trashCanInput);

        let submitButton = Helper.getButton("next step", () => {this.stepController.step7(trashCanInput.value); });

        Helper.appendChilds([inputblock, submitButton] , block);

    }
   
    
}
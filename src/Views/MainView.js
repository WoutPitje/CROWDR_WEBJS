import Helper from "./Helper";

export default class MainView {
    

    init(mainController, navigationController, stepController) {
        this.mainController = mainController;
        this.navigationController = navigationController;
        this.stepController = stepController;

    
    }

    error(error) {
        Helper.setStepErrors(error);
    }
    
} 
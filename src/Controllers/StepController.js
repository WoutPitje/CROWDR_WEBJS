import Helper from "../Views/Helper";

export default class StepController {
    constructor(mainController, data) {
        this.data = data;
        this.mainController = mainController;
        this.stepController = mainController.stepController;
        this.stepView = mainController.stepView;
    }

    
    setStep() {
        let location = this.data.getCurrentLocation();
        
        if(location.name == null || location.visitors == null) {
            this.stepView.generateStep1();
        }
        else if(location.tents == null) {
            this.stepView.generateStep2();
        }
        else if(location.eatingStands == null) {
            this.stepView.generateStep3();
        }
        else if(location.drinkStands == null) {
            this.stepView.generateStep4();
        }
        else if(location.highTrees == null) {
            this.stepView.generateStep5();
        }
        else if(location.toiletBuildings == null) {
            this.stepView.generateStep6();
        }
        else if(location.trashcans == null) {
            this.stepView.generateStep7();
        } else {
            this.stepView.generateFinal();
        }
    }

    resetConfig() {
        this.data.resetCurrentLocation();
        this.mainController.refreshNavigation();
        this.mainController.refreshLocationScreen();
        this.stepView.generateStep1();
        this.mainController.saveData();
    
    }
    //post step1
    step1(name, visitors) {
        Helper.clearErrors();
        if(visitors.length <= 0) {
            Helper.setErrors("Please fil in a amount of visitors");
            return;
        }
        visitors = parseInt(visitors);
        
        if(name.length <= 0) {
            Helper.setErrors("Please fill in a name");
            return;
        }
        
        if(visitors.length <= 0) {
            Helper.setErrors("Please fill in the amount of visitors");
             return;
        }
        if(name.length > 20) {
            Helper.setErrors("Name can't be longer than 20 characters");
            return;
        }
    
        if(visitors > 100000) {
            Helper.setErrors("There's a maximum of 100000 visitors");
            return;
        }
        this.data.getCurrentLocation().setName(name);
        this.data.getCurrentLocation().setVisitors(visitors);
        this.mainController.refreshNavigation();
        this.stepView.generateStep2();
        localStorage.setItem('data', JSON.stringify(this.data));
    }
    //post step2
    step2(tents) {
        Helper.clearErrors();
        if(tents.length <= 0) {
            Helper.setErrors("Please fill in an amount");
            return;
        }
        tents = parseInt(tents);
        
        if(tents < 0) { 
            Helper.setErrors("Please fill in an amount that's between 0 and 6");
            return
        }
        if(tents > 6) {
            Helper.setErrors("You can only have a maximum amonut of 6 tents");
            return;
        }
        this.data.getCurrentLocation().setAmountOfTents(tents);
        this.stepView.generateStep3();
        localStorage.setItem('data', JSON.stringify(this.data));
    }

    //post step3 
    step3 (eatingStands) {
        Helper.clearErrors();
        if(eatingStands.length <= 0) {
            Helper.setErrors("Please fill in an amount");
            return;
        }
        eatingStands = parseInt(eatingStands);
        let maxEatingStands;
        if(this.data.getCurrentLocation().tents >= 1) {
            maxEatingStands = 3;
        } else {
            maxEatingStands = 6;
        }
        if(eatingStands > maxEatingStands) {
            Helper.setErrors("You can only have a maximum of "+ maxEatingStands + " eating stands");
            return;
        }
        this.data.getCurrentLocation().setAmountOfEatingStands(eatingStands);
        this.stepView.generateStep4();
        localStorage.setItem('data', JSON.stringify(this.data));
    }

    //post step4
    step4 (drinkStands) {
        Helper.clearErrors();
        if(drinkStands.length <= 0) {
            Helper.setErrors("Please fill in an amount");
            return;
        }
        drinkStands = parseInt(drinkStands);
        let maxDrinkStands
        if(this.data.getCurrentLocation().tents >= 1) {
            maxDrinkStands = 2;
        } else {
            maxDrinkStands = 4;
        }
        if(drinkStands > maxDrinkStands) {
            Helper.setErrors("You can only have a maximum of "+ maxDrinkStands + " drink stands");
            return;
        }
        this.data.getCurrentLocation().setAmountOfDrinkStands(drinkStands);
        this.stepView.generateStep5();
        localStorage.setItem('data', JSON.stringify(this.data));
        
    }

    //post step5
    step5(highTrees, wideTrees, shadowTrees) {
        Helper.clearErrors();
        if(highTrees.length <= 0 || wideTrees.length <= 0 || shadowTrees.length <= 0) {
            Helper.setErrors("Please fill in an amount at every tree");
            return;
        }
        highTrees = parseInt(highTrees);
        wideTrees = parseInt(wideTrees);
        shadowTrees = parseInt(shadowTrees);
        
        let totalTrees = highTrees + wideTrees + shadowTrees;

        if(highTrees < 0 || wideTrees < 0 || shadowTrees < 0) {
            Helper.setErrors("You can't choose less than 0 trees of some sort");
            return;
        }
        if(totalTrees > 10) {
            Helper.setErrors("You can only have a maximum of 10 trees");
            return;
        }
        this.data.getCurrentLocation().setAmountOfHighTrees(highTrees);
        this.data.getCurrentLocation().setAmountOfWideTrees(wideTrees);
        this.data.getCurrentLocation().setAmountOfShadowTrees(shadowTrees);
        this.stepView.generateStep6();
        localStorage.setItem('data', JSON.stringify(this.data));

    }

    step6(toiletBuildings) {
        if(toiletBuildings.length <= 0) {
            Helper.setErrors("Please fill in an amount");
            return;
        }

        Helper.clearErrors();
        toiletBuildings = parseInt(toiletBuildings);
        if(toiletBuildings < 0) {
            Helper.setErrors("You cannot have a negative amount of toilet buildings");
            return;
        }
        if(toiletBuildings > 6) {
            Helper.setErrors("You cant have more than 6 toilet buildings");
            return;
        }

        this.data.getCurrentLocation().setAmountOfToiletBuildings(toiletBuildings);

        let filled = this.data.getCurrentLocation().getAmountOfFieldsFilled();
        let nonfilled = 15 * 15 - filled;
        let maximumAmountOfTrashcans = parseInt(filled * 0.05);
        this.stepView.generateStep7(maximumAmountOfTrashcans);
        localStorage.setItem('data', JSON.stringify(this.data));

    }

    step7(trashcans) {
        

        Helper.clearErrors();

        if(trashcans.length <= 0) {
            Helper.setErrors("Please fill in an amount");
            return;
        }
        trashcans = parseInt(trashcans);
        let filled = this.data.getCurrentLocation().getAmountOfFieldsFilled();
        let nonfilled = 15 * 15 - filled;
        let maximumAmountOfTrashcans = parseInt(filled * 0.05);
        if(trashcans > maximumAmountOfTrashcans) {
            Helper.setErrors("You can only have a maximum of " + maximumAmountOfTrashcans + " trashcans.");
            return;
        }

        this.data.getCurrentLocation().setAmountOfTrashCans(trashcans);
        this.data.getCurrentLocation().setStepsAreSet(true);
        localStorage.setItem('data', JSON.stringify(this.data));
        this.stepView.generateFinal();
        this.mainController.refreshLocationScreen();
    }
}
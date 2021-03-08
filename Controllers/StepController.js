class StepController {
    constructor(mainView) {
        this.mainView = mainView;
    }

    setStep(loc) {
        let location = data.getLocation(loc);

        console.log(location);

        if(location.name == null || locations.visitors == null) {
            mainView.generateStep(data,1, location);
        }
    }
}
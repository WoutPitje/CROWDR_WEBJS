class MainController {
    constructor(gridView) {
        this.gridView = gridView;
    }

    getData() {
        return data;
    }

    addLocation() {
        data.addLocation(new Location());
    }
}
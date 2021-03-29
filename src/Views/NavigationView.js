export default class NavigationView {
    constructor() {

    }
    init(mainController, navigationController, stepController) {
        this.mainController = mainController;
        this.navigationController = navigationController;
        this.stepController = stepController;
        const addLocationButton = document.getElementById('addLocation');
        
        addLocationButton.addEventListener('click', () => {this.navigationController.addLocation()});
        this.navigationController.refreshNavigation();
    }
    refreshNavigation(data) {
        
        this.generateLocationMenu(data);
        this.refreshLocationPage(data);
    }

    refreshLocationPage(data) {
        let name = "name unknown";
        if(data.getCurrentLocation().name != null)  name = data.getCurrentLocation().name;
        document.getElementById("location_name").innerHTML = name;
    }

    generateLocationMenu(data) {
        this.clearNavigation();
        const nav = document.getElementById("nav"); 
        let i = 1;
        data.locations.forEach((location) => {this.drawLocationButton(location, i,data); i++; });
        
    }

    drawLocationButton(location, i,data) {
            let name = "name unkown";
            if(location.name != null)  name = location.name;
            let navItem = document.createElement("div");
            navItem.className = "flex flex-row navItem";
            
            
            let navButton = document.createElement("button");
            navButton.innerHTML = name;
            navButton.addEventListener('click', () => { this.navigationController.setCurrentLocation(i); this.refreshLocationPage(data); this.stepController.setStep(); });

            navButton.className = `navbutton bg-gray-200 p-3 pb-2 hover:bg-gray-500 hover:text-white flex flex-row`;
                       
            let deleteButton = document.createElement("button");
            deleteButton.addEventListener('click', () => { if(confirm('Are you sure you want to delete this location?')) this.navigationController.deleteLocation(i); });
            deleteButton.className = ` bg-red-500 hover:bg-red-800 hover:text-white pl-3 pr-3`;
            deleteButton.innerHTML = `X`;

            navItem.appendChild(navButton);
            navItem.appendChild(deleteButton);
            nav.appendChild(navItem);
            
    }

    clearNavigation() {
        let elements = document.getElementsByClassName('navItem');
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}
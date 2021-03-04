class NavigationView {
    constructor() {

    }
    init() {
        const addLocationButton = document.getElementById('addLocation');
        
        addLocationButton.addEventListener('click', this.addLocation);
        this.refreshNavigation(data);
       
       
    }

    test() {
        console.log(navigationController.getData());
    }
    
    addLocation() {
        navigationController.addLocation();
        console.log(navigationController.getData());
    }

    deleteLocation(i) {
        navigationController.deleteLocation(i);
    }

    refreshNavigation(data) {
        this.generateLocationMenu(data);
    }

    generateLocationMenu(data) {
        this.clearNavigation();
        const nav = document.getElementById("nav");
        let i =1;
        data.locations.forEach( function(location) {
            let name = 'naam onbekend';
            if(location.name != null) {
                let name = location.name;
            }
            const navItem = document.createElement("button");
            navItem.innerHTML = `Naam`;
            navItem.className = `navbutton bg-gray-200 p-3 pb-2 hover:bg-gray-500 hover:text-white flex flex-row`;
            navItem.id = `location${i}`;
            
            const deleteButton = document.createElement("button");
            deleteButton.id = `deletelocation${i}`;
            deleteButton.className = ` bg-red-500 hover:bg-red-800 hover:text-white ml-4 pr-2 pl-2`;
            deleteButton.innerHTML = `X`;

            navItem.appendChild(deleteButton);
            nav.appendChild(navItem);
            i++;
        }
        )
        for(let i = 1; i <= data.locations.length; i++) {
            let deletebutton = document.getElementById(`deletelocation${i}`);
            console.log(deletebutton)
            deletebutton.addEventListener('click', this.deleteLocation.bind(i));
        }   
        
    }

    clearNavigation() {
        let elements = document.getElementsByClassName('navbutton');
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}
let amountOfLocations = 8;
let locations = [];


start();
function start() {
    locations = [];
    localStorage.setItem('currentLocation', 1)
    for(let i = 1; i <= amountOfLocations; i++) {
        let location = localStorage.getItem(`location${i}`);
        if(location != null) {
            locations.push(location);
        }
    }
    
    checkMaxLocations();
    generateLocationMenu();
    generateGrid();
    
    console.log(locations);
}

function checkMaxLocations() {
    if(locations.length >= amountOfLocations) {
        const addLocation = document.getElementById('addLocation');
        console.log(addLocation);
        addLocation.style.backgroundColor = "gray";
        addLocation.style.pointer = "not-allowed"
        addLocation.innerHTML = "maximale locaties bereikt";
        addLocation.style.color = "white";
    }
}

function generateLocationMenu() {
    clearNavigation();
    const nav = document.getElementById("nav");
    let i =1;
    locations.forEach( function(location) {
        let name = 'naam onbekend';
        if(location.name != null) {
            let name = location.name;
        }
        const navItem = document.createElement("button");
        navItem.innerHTML = `Naam onbekend`;
        navItem.className = `navbutton bg-gray-200 p-3 pb-2 hover:bg-gray-500 hover:text-white`;
        navItem.id = `location${i}`;
        navItem.onclick = navigateTo(i);
        nav.appendChild(navItem);
        i++;
    }
    )
    const currentNav = document.getElementById(`location${localStorage.getItem('currentLocation')}`)
    currentNav.style.backgroundColor = "Gray";
    currentNav.style.color = "White";
    
}

function addLocation() {
    let newlocation = new Location();
    localStorage.setItem(`location${locations.length + 1}`, newlocation);
    locations.push(newlocation);
    checkMaxLocations();
    generateLocationMenu();
    navigateTo(locations.length+1);
    generateGrid();
}

function clearNavigation() {
    let elements = document.getElementsByClassName('navbutton');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function navigateTo(location) {
    localStorage.setItem('currentLocation', location);
}
function nextStep() {

}

function generateGrid() {
    paneSize = 50;
    let rows = 15;
                let cols = 15;
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
                    const grid = document.getElementById("grid");
                    grid.appendChild(gridPane);
                }
}
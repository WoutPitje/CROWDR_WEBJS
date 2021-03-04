
// const data = localStorage.getItem('data');
const data = new Data();
// if(data == null) {
//     const data = new Data();
//     localStorage.setItem('data', data);
// }
const mainView = new MainView();
const navigationView = new NavigationView();

const mainController = new MainController(mainView);
const navigationController = new NavigationController(navigationView);


function test() {
    console.log(mainController.getData());
}

function addLocation() {
    mainController.addLocation();
}



let jsonString = localStorage.getItem('data');
let dataobject = JSON.parse(jsonString);
console.log(dataobject);

const data = new Data(dataobject);
localStorage.setItem('data', JSON.stringify(data));

const mainView = new MainView();
const navigationView = new NavigationView();

const mainController = new MainController(mainView);
const navigationController = new NavigationController(navigationView);

mainView.init();
navigationView.init();






start();

function start() {
    this.data = localStorage.getItem('data');
    if(data == null) {
        this.data = new Data();
        localStorage.setItem('data', data);
    }
    this.gridView = new GridView();
    this.navigationView = new NavigationView();

    this.gameController = new MainController(gridView);
    this.NavigationController = new NavigationController(navigationView);
}


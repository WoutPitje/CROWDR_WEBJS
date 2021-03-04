class MainController {
    constructor(gridView) {
        this.gridView = gridView;
    }

    
    getData() {
        return data;
    }

    generateGrid() {
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
    }
}

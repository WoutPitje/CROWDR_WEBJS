export default class Helper {
    static getButton(name, onclick) {
        let button = document.createElement("button");
        button.innerHTML = name;
        button.className = 'p-2 bg-green-500 hover:bg-green-800 hover:text-white w-full';
        button.onclick = onclick;
        return button;
    }
    static getLabel(text, forname) {
        let inputLabel = document.createElement("label");
        inputLabel.htmlFor = forname;
        inputLabel.innerHTML = text;
        return inputLabel;
    }
    static getInputField(id, type) {
        let input = document.createElement("input");
        input.setAttribute('type', type);
        input.attributes.required = "required";
        input.id = id;
        return input;
    }
    static getDivForInput(label, input) {
        let inputblock = document.createElement("div");
        inputblock.appendChild(label);
        inputblock.appendChild(input);
        inputblock.className = "mb-5 flex flex-col";
        return inputblock;
    }

    static appendChilds(childs, parent) {
        childs.forEach(child => {parent.appendChild(child)});
    }

    static clearErrors() {
        let errorbox = document.getElementById("errorbox");
        errorbox.style.display = "none";
        errorbox.innerHTML = "";
    }

    static setErrors(errors) {
        if(errors != null) {
                let errorbox = document.getElementById("errorbox");
                errorbox.style.display = "block";
                errorbox.innerHTML = errors;
        }
    }
    
}

let helper = new Helper();
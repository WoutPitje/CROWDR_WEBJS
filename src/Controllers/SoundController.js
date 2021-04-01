import Sound from "../Models/Sound.js"

export default class SoundController {
    constructor() {

        this.selectSound = new Sound("../src/sounds/select-sound.mp3");
        this.dropSound = new Sound("../src/sounds/drop-sound.mp3");
    }

    playSelectSound(){
        this.selectSound.playSound();
    }

    playDropSound(){
        this.dropSound.playSound();
    }
}
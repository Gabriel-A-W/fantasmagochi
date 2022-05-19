import { GameManager } from "./GameManager.js";
import { Fantasma } from "./componentes/fantasma/Fantasma.js";
import { BarAttrTracker } from "./componentes/gui/BarAttrTracker.js";
import { EmojiRepo } from "./utiles/EmojiRepo.js";
import { GuitaAttrTracker } from "./componentes/gui/GuitaAttrTracker.js";

export const Main = ()=>
{
    let fantasma = new Fantasma(document.getElementById("juancho"));
    
    
    document.getElementById("tualetracker").addEventListener("click", () => {
        fantasma.hacerPopo();
    });

    document.getElementById("cansanciotracker").addEventListener("click", () => {
        fantasma.dormir();
    });

    document.getElementById("morfitracker").addEventListener("click", () => {
        fantasma.alimentar({grafico:"🌭", saciedad: 50, ocupa: 80});
    });
 


    GameManager.actualizables.push(fantasma);
    GameManager.actualizables.push(
        new BarAttrTracker(document.getElementById("birratracker"), fantasma.felicidad,  {text:"🙂", tip:"Felicidad"}),
        new BarAttrTracker(document.getElementById("morfitracker"), fantasma.saciedad, {text:"🍴", tip:"Hambre"}),
        new BarAttrTracker(document.getElementById("tualetracker"), fantasma.espacioEnPanza, {text:"🚽", tip:"Ganas de ir"}),
        new BarAttrTracker(document.getElementById("cansanciotracker"), fantasma.energia, {text:"💤",  tip:"Energia"}),
        new GuitaAttrTracker(document.getElementById("guitaTracker"), fantasma.guita)
    );
    console.log(GameManager);
    GameManager.comenzar();
    return {fantasma: fantasma, emojis:EmojiRepo};
};
import { Escena } from "../Escena.js";
import { Fantasma } from "../../componentes/fantasma/Fantasma.js";
import { BarAttrTracker } from "../../componentes/gui/BarAttrTracker.js";
import { GuitaAttrTracker } from "../../componentes/gui/GuitaAttrTracker.js";
import { FantasDataService } from "../../servicios/FantasDataService.js";
import { FantasDataSaver } from "../../componentes/FantasDataSaver.js";
import { MorfiService } from "../../servicios/MorfiService.js";
import { MorfiMenu } from "../../componentes/gui/MorfiMenu.js";
import { EscenaMatch } from "./EscenaMatch.js";
import {EscenasManager} from "../EscenasManager.js";

export class EscenaPrincipal extends Escena
{

    constructor()
    {
        super();
    }

    async inicializar()
    {
        const morfi = await MorfiService.get();
        const morfiMenu = new MorfiMenu(morfi);
    
        const data = await FantasDataService.get();
      
        this.fantasma         = new Fantasma(this.elementoHtml.querySelector("#juancho"), data);
        this.guitaTracker     = new GuitaAttrTracker(this.elementoHtml.querySelector("#guitatracker"), this.fantasma.guita);
        this.morfiTracker     = new BarAttrTracker(this.elementoHtml.querySelector("#morfitracker"), this.fantasma.saciedad, {text:"🍴", tip:"Hambre"});
        this.tualeTracker     = new BarAttrTracker(this.elementoHtml.querySelector("#tualetracker"), this.fantasma.espacioEnPanza, {text:"🚽", tip:"Ganas de ir"});
        this.cansancioTracker = new BarAttrTracker(this.elementoHtml.querySelector("#cansanciotracker"), this.fantasma.energia, {text:"💤",  tip:"Energia"});
        this.felicidadTracker = new BarAttrTracker(this.elementoHtml.querySelector("#felicidadtracker"), this.fantasma.felicidad,  {text:"🙂", tip:"Felicidad"});
        this.fantasDataSaver  = new FantasDataSaver(this.fantasma);
    
        this.elementoHtml.appendChild(morfiMenu.elementoHtml);
    
        this.tualeTracker.addEventListener("click", () => {
            this.fantasma.hacerPopo();
        });
        
        this.cansancioTracker.addEventListener("click", () => {
            this.fantasma.dormir();
        });
        
        this.morfiTracker.addEventListener("click", async () => {
           morfiMenu.show(this.fantasma.guita.valor).then((seleccion) => {
                if(this.fantasma.guita.valor >= seleccion.precio)
                {
                    this.fantasma.alimentar(seleccion);
                    this.fantasma.guita.valor -= seleccion.precio;
                    console.log(this.fantasma.guita);
                }
           }); 
        });

        this.elementoHtml.querySelector("#btnJugar").onclick=() => {
            this.fantasDataSaver.enviar().then(()=>{
                EscenasManager.encolar(new EscenaMatch());
            });
        };

        //Registra todos las variables de instancia Actualizables para su actualizacion
        this.registrarHijos();
    }



}
import { TableroMatchView } from "../../componentes/match3/gui/TableroMatchView.js";
import { TableroMatch } from "../../componentes/match3/TableroMatch.js";
import { Escena } from "../Escena.js"; 
import { FaseCarga } from "./match/fases/FaseCarga.js";
import { FaseJuego } from "./match/fases/FaseJuego.js";
import { FaseLimpieza } from "./match/fases/FaseLimpieza.js";
import {FantasDataService} from  "../../servicios/FantasDataService.js";
import { Estadistica } from "../../componentes/fantasma/Estadistica.js";
import {GuitaAttrTracker} from "../../componentes/gui/GuitaAttrTracker.js";
import {EscenaPrincipal} from "./EscenaPrincipal.js";
import {EscenasManager} from "../EscenasManager.js";

export class EscenaMatch extends Escena
{

    constructor()
    {
        super();

    }

    async inicializar()
    {
        const data = await FantasDataService.get();
        console.log(data);
        this.guita = new Estadistica(data.guita, 0, 0, Number.MAX_SAFE_INTEGER);
        this.paso = 0;
        console.log(this.guita);
        this.modelo = new TableroMatch(8, 8);
        this.vista = new TableroMatchView(this.modelo, this.elementoHtml.querySelector("#tablero"));
        this.guitaTracker = new GuitaAttrTracker(this.elementoHtml.querySelector("#guitatracker"), this.guita);
        this.hubomatches = false;
        this.faseActual = new FaseCarga(this);

        this.elementoHtml.querySelector("#btnVolver").onclick = ()=>{
            data.guita = this.guita.valor;
            FantasDataService.post(data).then(()=> {
                EscenasManager.encolar(new EscenaPrincipal());
            });

            
        };
    }

    cargarGuita(ptos)
    {
        this.guita.valor += ptos * 0.5;
    }


    limpiar()
    {
        console.log("limpiando");
        this.faseActual = new FaseLimpieza(this);
    }

    completar()
    {
        console.log("completando");
        this.faseActual = new FaseCarga(this); 
    }

    idle()
    {
        console.log("idle");
        this.faseActual = new FaseJuego(this);
    }

    actualizar(elapsed)
    {
         
        if(this.faseActual)
        {
            this.faseActual.actualizar(elapsed);
            this.vista.actualizar();
            this.guitaTracker.actualizar(elapsed);
        }

    }


}
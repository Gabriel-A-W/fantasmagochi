import { Actualizable } from "../Actualizable.js";
import { Escena } from "./Escena.js";
import { EscenaCarga } from "./impl/EscenaCarga.js";

export class EscenasManagerSingleton extends Actualizable
{

    constructor()
    {
        super();
        this.actual = null; 
        this.elementoHtml = null;
        this.estaTransicionando = false;
        this.colaEscenas = [];
        this.estaPausado = false;
    }

    



    hayQueTransicionar()
    { 
        return !this.estaTransicionando && this.colaEscenas.length > 0;
    }


    encolar(escena)
    {
        if(escena instanceof Escena)
        {
            this.colaEscenas.push(new EscenaCarga(escena));
        }
    }

    encolarSinTransicion(escena)
    {
        this.colaEscenas.push(escena);
    }


    transicionar()
    {
        const siguiente = this.colaEscenas.shift();
       
        if(siguiente)
        {
            this.estaTransicionando = true;
            siguiente.cargar().then((e) => {
                this.actual = e; 
                this.estaTransicionando = false;
                this.elementoHtml.innerHTML = "";
                this.elementoHtml.appendChild(e.elementoHtml);
            });  
        } 
    }


    actualizar(elapsed)
    {

        if(this.hayQueTransicionar())
        {
            
            this.transicionar();
        }

        if(!this.estaTransicionando && !this.estaPausado && this.actual instanceof Escena)
        {
            this.actual.actualizar(elapsed);
        }
    }


}

export const EscenasManager = new EscenasManagerSingleton();
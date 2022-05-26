
import { Actualizable } from "../../../Actualizable.js";
import { HtmlElementBuilder } from "../../../utiles/HtmlElementBuilder.js";
import { EstadoOjoFantasma, FantasmaOjo } from "./FantasmaOjo.js";

export class FantasmaOjoCollection extends Actualizable 
{

    constructor(parent) 
    {
        super();
        this.elementoHtml = new HtmlElementBuilder("div").addClass("ojos").get();
        this.izquierdo = new FantasmaOjo(this.elementoHtml, "izquierdo");
        this.derecho = new FantasmaOjo(this.elementoHtml, "derecho");
        
        parent.appendChild(this.elementoHtml);

        //Registro hijos
        this.registrarHijo(this.izquierdo);
        this.registrarHijo(this.derecho);

        this.ojosArray = [this.izquierdo, this.derecho];
    }

    comoArray()
    {
        return this.ojosArray;
    }

    estanCerrados()
    {
        return this.izquierdo.estado === EstadoOjoFantasma.Cerrado && this.derecho.estado === EstadoOjoFantasma.Cerrado;
    }


    abrir()
    {
        this.izquierdo.abrir();
        this.derecho.abrir();
    }

    cerrar()
    {
        this.izquierdo.cerrar();
        this.derecho.cerrar();
    }

    matar()
    {
        this.izquierdo.matar();
        this.derecho.matar();
    }


}
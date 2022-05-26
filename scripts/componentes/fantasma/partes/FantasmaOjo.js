import { Actualizable } from "../../../Actualizable.js";
import { Enum } from "../../../utiles/Enum.js";
import { HtmlElementBuilder } from "../../../utiles/HtmlElementBuilder.js";

export const EstadoOjoFantasma = new Enum("Abierto", "Cerrado", "Muerto");

export class FantasmaOjo extends Actualizable
{

    constructor(parent, tipo) 
    {
        super();
        this.estado = EstadoOjoFantasma.Abierto;

        this.iris = new HtmlElementBuilder("div").addClass("iris").get();
        this.elementoHtml = new HtmlElementBuilder("div").addClass(tipo).appendChild(this.iris).get();
    
        parent.appendChild(this.elementoHtml);
    }

    abrir() 
    {
        this.iris.classList.remove("invisible");
        this.elementoHtml.classList.remove("cerrado");
        this.elementoHtml.classList.remove("muerto");
        this.estado = EstadoOjoFantasma.Abierto;
    }

    cerrar() 
    {
        this.abrir();
        this.iris.classList.add("invisible");
        this.elementoHtml.classList.add("cerrado");
        this.estado = EstadoOjoFantasma.Cerrado;
    }

    matar() 
    {
        this.abrir();
        this.iris.classList.add("invisible");
        this.elementoHtml.classList.add("muerto");
        this.estado = EstadoOjoFantasma.Cerrado;
    }

    

}
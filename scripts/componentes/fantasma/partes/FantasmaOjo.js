import { Actualizable } from "../../../Actualizable.js";
import { Enum } from "../../../utiles/Enum.js";

export const EstadoOjoFantasma = new Enum("Abierto", "Cerrado", "Muerto");

export class FantasmaOjo extends Actualizable
{

    constructor(parent, tipo) {
        super();
        this.estado = EstadoOjoFantasma.Abierto;



        this.elementoHtml = document.createElement("div");
        this.elementoHtml.classList.add(tipo);
        this.iris = document.createElement("div");
        this.iris.classList.add("iris");
        this.elementoHtml.appendChild(this.iris);

        parent.appendChild(this.elementoHtml);
    }

    abrir() {
        this.iris.classList.remove("invisible");
        this.elementoHtml.classList.remove("cerrado");
        this.elementoHtml.classList.remove("muerto");
        this.estado = EstadoOjoFantasma.Abierto;
    }

    cerrar() {
        this.abrir();
        this.iris.classList.add("invisible");
        this.elementoHtml.classList.add("cerrado");
        this.estado = EstadoOjoFantasma.Cerrado;
    }

    matar() {
        this.abrir();
        this.iris.classList.add("invisible");
        this.elementoHtml.classList.add("muerto");
        this.estado = EstadoOjoFantasma.Cerrado;
    }

    

}
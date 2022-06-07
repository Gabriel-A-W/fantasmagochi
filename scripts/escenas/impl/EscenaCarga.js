import { Escena } from "../Escena.js";
import { EscenasManager } from "../EscenasManager.js";

export class EscenaCarga extends Escena
{

    constructor(siguiente)
    {
        super();
        this.siguiente = siguiente;
    }

    async inicializar()
    {
        EscenasManager.encolarSinTransicion(this.siguiente);
    }

}
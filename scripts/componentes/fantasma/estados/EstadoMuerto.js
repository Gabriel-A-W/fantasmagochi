import { Estado } from "./Estado.js";

export class EstadoMuerto extends Estado
{
    constructor(fantasma)
    {
        super(fantasma);
    }

    estaVivo()
    {
        return false;
    }


    puedeTransicionar()
    {
        return false;
    }

    iniciar()
    {
        this.fantasma.ojos.matar();
        this.fantasma.boca.entristecer();
        this.fantasma.cuerpo.toggleMuerto();
    }

    finalizar()
    {
        
    }
    
}
import { Actualizable } from "../../../Actualizable.js";

 
export class Estado extends Actualizable
{
    constructor(fantasma)
    {
        super();
        this.fantasma = fantasma;
    }

    estaVivo()
    {
        return true;
    }


    puedeTransicionar()
    {
        return true;
    }

    iniciar()
    {
       
    }

    finalizar()
    {
        
    }
    
}
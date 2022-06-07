import { Actualizable } from "../../../../Actualizable.js";

 
export class Fase extends Actualizable
{
    constructor(escena)
    {
        super();
        this.escena = escena;
        this.modelo = this.escena.modelo;
        this.vista = this.escena.vista;

        this.vista.onBlockClick(()=>{});
    }
 
    iniciar()
    {
       
    }

    finalizar()
    {
        
    }
    
    
}
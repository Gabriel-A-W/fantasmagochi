import {Fase} from "./Fase.js";

export class FaseCarga extends Fase
{
    constructor(escena)
    {
        super(escena);
        this.hubomatches = false;
        this.delta = 0;
        this.duracionGravedad = 60;
        this.vista.setearHabilitacionDeBotones(false);
    }
 
    iniciar()
    {
       
    }

    finalizar()
    {
        
    }

    actualizar(elapsed)
    { 
        this.delta += elapsed;
        if(this.delta >= this.duracionGravedad)
        {
            this.delta = 0;
            console.log("asd"); 
            if(!this.modelo.intentarAplicarGravedad())
            {
                this.modelo.completar();
                this.escena.limpiar();
            }
        } 
    }
    
    
}
import {Fase} from "./Fase.js";

export class FaseLimpieza extends Fase
{
    constructor(escena)
    {
        super(escena);
        this.delta = 0;
        this.duracionGravedad = 0.5*1000;
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
            const ptos = this.modelo.limpiarCoincidencias();
            if(ptos > 0)
            {
                this.escena.cargarGuita(ptos);
                this.vista.actualizar();
                this.escena.completar();
            }
            else
            {
                this.escena.idle();
            }
        } 
    }
    
    
}
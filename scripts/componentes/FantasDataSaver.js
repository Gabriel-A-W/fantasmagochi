import { Actualizable } from "../Actualizable.js";
import { FantasDataService } from "../servicios/FantasDataService.js";

export class FantasDataSaver extends Actualizable
{
    constructor(tgt)
    {
        super();
        this.delta = 0;
        this.esperandoActualizacion = false;
        this.freq = 10*1000;
        this.tgt = tgt;
        
    }


    enviar()
    {
        return FantasDataService.post({
            felicidad: this.tgt.felicidad.valor,
            saciedad: this.tgt.saciedad.valor,
            espacioEnPanza: this.tgt.espacioEnPanza.valor,
            energia:this.tgt.energia.valor,
            guita: this.tgt.guita.valor
        });
    }

    actualizar(elapsed)
    {
        if(!this.esperandoActualizacion)
        {
            this.delta += elapsed;
            if(this.delta >= this.freq)
            {
                this.delta = 0;
                this.esperandoActualizacion = true;
                this.enviar().then(()=> {this.esperandoActualizacion = false;});
            }
        }
    }


}
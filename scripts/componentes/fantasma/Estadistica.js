import { Actualizable } from "../../Actualizable.js";

export class Estadistica extends Actualizable
{

    constructor(valorInicial, puntoPorTick, min = 0, max = 100)
    {
        super();
        this._valor = valorInicial;
        this.frenarActualizacion = false;
        this.puntoPorTick = puntoPorTick;
        this.min = min;
        this.max = max;
    }

   

    get valor()
    {
        return this._valor;
    }

    set valor(val)
    {
        this._valor = _.clamp(val, this.min, this.max);
    }

    obtenerFaltante()
    {
        return this.max - this.valor;
    }

    estaAlMax()
    {
        return this.valor >= this.max;
    }

    estaAlMin()
    {
        return this.valor <= this.min;
    }

    actualizar(elapsed)
    {
        
        if(!this.frenarActualizacion)
        {
            this.valor += this.puntoPorTick * elapsed;
        }
        
    }
}
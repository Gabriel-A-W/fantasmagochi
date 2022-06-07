import { Configs } from "../../../Configs.js";
import { Estado } from "./Estado.js";

export class EstadoCacona extends Estado
{
    constructor(fantasma)
    {
        super(fantasma);
        this.curOffset = 0;
        this.delta = 0;
        this.tiempoPorPunto = Configs.DELTA_CACONA;//por segundo
        this.difInicial = 0;  
    }

    iniciar()
    {
        this.difInicial = (100 - this.fantasma.espacioEnPanza.valor);
        this.fantasma.ojos.matar();
        this.fantasma.boca.sorprender();
        this.fantasma.togglePopo(true);
        this.resetPopo();
        this.fantasma.espacioEnPanza.frenarActualizacion = true;
      
    }

    resetPopo()
    {
        this.fantasma.popo.style.top = this.fantasma.pies.elementoHtml.offsetTop-30+"px";
        this.curOffset = this.fantasma.pies.elementoHtml.offsetTop;
        this.delta = (566 - this.fantasma.pies.elementoHtml.offsetTop -30);
      

    }

    finalizar()
    {
        this.fantasma.togglePopo(false);
        this.resetPopo();
        this.fantasma.espacioEnPanza.frenarActualizacion = false;
    }

    puedeTransicionar()
    {
        return this.fantasma.espacioEnPanza.estaAlMax();
    }

    actualizarGraficos(elapsed)
    {
        if(this.curOffset < 566)
        {
            this.curOffset += (this.tiempoPorPunto*elapsed)*2;
            this.fantasma.popo.style.top = this.curOffset+"px";
        }
        else
        {
            this.resetPopo();
        }
    }

    actualizarLogica(elapsed)
    {
        this.fantasma.espacioEnPanza.valor += this.tiempoPorPunto*elapsed;

        if(this.puedeTransicionar())
        {
            this.fantasma.idle();
        }
      
    }

    actualizar(elapsed)
    {
        this.actualizarGraficos(elapsed);
        this.actualizarLogica(elapsed);
    }
    


}
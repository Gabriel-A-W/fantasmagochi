import { Estado } from "./Estado.js";
import { MouseTracker } from "../../../utiles/MouseTracker.js";
import { Configs } from "../../../Configs.js";

export class EstadoIdle extends Estado
{
    constructor(fantasma)
    {
        super(fantasma);
 
        this.frecuenciaParpadeo = Configs.DURACION_OJOS_CERRADOS;
        this.deltaParpadeo = 0;
    
    }

    iniciar()
    {
        this.fantasma.ojos.abrir();
        this.fantasma.boca.cerrar();
    }

    parpadear(elapsed) 
    {

        this.deltaParpadeo += elapsed;
        if (this.deltaParpadeo >= this.frecuenciaParpadeo) {
     
            if (!this.fantasma.ojos.estanCerrados()) 
            {
                this.fantasma.ojos.cerrar();
                this.frecuenciaParpadeo = Configs.DURACION_OJOS_CERRADOS;
            }
            else
            {
                this.fantasma.ojos.abrir();
                this.frecuenciaParpadeo = Configs.DURACION_OJOS_ABIERTOS;
            }
            this.deltaParpadeo = 0;
        }
    }

    moverIris() 
    {
        let x = MouseTracker.clientX;
        let y = MouseTracker.clientY;  
        
        this.fantasma.ojos.comoArray().forEach((unOjo) =>
        {
            let offset = unOjo.elementoHtml.getBoundingClientRect();
 
            let estilo = "";
    
            if (x > offset.left) {
                estilo = "left:7px;";
    
            }
            else if (x < offset.left) {
                estilo = "left:2px;";
            }
    
    
            if (y > offset.top) {
                estilo += "top:7px;";
    
            }
            else if (y < offset.top) {
                estilo += "top:2px;";
            }
    
            unOjo.iris.style = estilo;

        });
    }

    actualizar(elapsed) 
    {
        this.parpadear(elapsed); 
        this.moverIris();
        
        if(this.fantasma.felicidad.valor > Configs.LIMITE_INFERIOR_FELIZ)
        {
            this.fantasma.boca.sonreir();
        }
        else if(this.fantasma.felicidad.valor < Configs.LIMITE_INFERIOR_NORMAL)
        {
            this.fantasma.boca.entristecer();
        }
        else
        {
            this.fantasma.boca.cerrar();
        } 
    }
}


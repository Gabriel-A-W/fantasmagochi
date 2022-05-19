import { Estado } from "./Estado.js";

export class EstadoDurmiendo extends Estado
{

    constructor(fantasma)
    {
        super(fantasma); 
        this.frecuenciaRonquido = 800;//ms
        this.deltaRonquido = 0;
        this.abrir = true;
   
        this.tiempoPorPunto = 3/1000;
    }

    iniciar()
    {
        this.fantasma.boca.setPlaceHolder("💤");
        
        this.fantasma.ojos.cerrar();
        this.fantasma.energia.frenarActualizacion = true;
    }

    finalizar()
    {
        this.fantasma.boca.esconderPlaceHolder();
        this.fantasma.ojos.abrir();
        this.fantasma.energia.frenarActualizacion = false;
    }

    actualizarGraficos(elapsed)
    {
        this.deltaRonquido += elapsed;
        if(this.deltaRonquido >= this.frecuenciaRonquido)
        {
            if(this.abrir)
            {
                this.fantasma.boca.mostrarPlaceHolder();
                this.fantasma.boca.abrir();  
            }
            else
            {
                this.fantasma.boca.cerrar();
                this.fantasma.boca.esconderPlaceHolder();
            }

            this.abrir = !this.abrir;

            this.deltaRonquido = 0;
        }
    }

    actualizarLogica(elapsed)
    {
        this.fantasma.energia.valor += this.tiempoPorPunto *elapsed;
        
        if(this.fantasma.energia.estaAlMax())
        {
            this.fantasma.idle();
        }
    }

    actualizar(elapsed)
    {
       // super.actualizar(elapsed);
       this.actualizarGraficos(elapsed);
       this.actualizarLogica(elapsed);
    }
}
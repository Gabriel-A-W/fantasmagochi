import { EstadoIdle } from "./EstadoIdle.js";

export class EstadoComiendo extends EstadoIdle
{

    constructor(fantasma, comida)
    {
        super(fantasma); 
        this.frecuenciaMasticado = 200;//ms
        this.deltaMasticado = 0;
        this.abrir = true;
        this.comida = Object.assign({}, comida);

        this.tiempoPorPunto = 5/1000;//ms

        this.relacionSO = this.comida.ocupa/this.comida.saciedad;
      
    }

    iniciar()
    {
        this.fantasma.boca.setPlaceHolder(this.comida.grafico);
        this.fantasma.boca.mostrarPlaceHolder();
        this.fantasma.boca.cerrar();
        this.fantasma.saciedad.frenarActualizacion = true;
    }

    finalizar()
    {
        this.fantasma.boca.cerrar();
        this.fantasma.boca.esconderPlaceHolder();
        this.fantasma.saciedad.frenarActualizacion = false;
        
    }     

    actualizarGraficos(elapsed)
    {
        super.parpadear(elapsed); 
        super.moverIris();
        this.deltaMasticado += elapsed;
        if(this.deltaMasticado >= this.frecuenciaMasticado)
        {
            if(this.abrir)
            {
                this.fantasma.boca.abrir();  
            }
            else
            {
                this.fantasma.boca.cerrar();
            }

            this.abrir = !this.abrir;

            this.deltaMasticado = 0;
        }
    }

 

    actualizarLogica(elapsed)
    {
        let ptosSaciedad = this.tiempoPorPunto * elapsed;
        let ptosOcupa = ptosSaciedad * this.relacionSO;

        this.fantasma.saciedad.valor += ptosSaciedad;
        this.fantasma.espacioEnPanza.valor -= ptosOcupa;
        this.comida.saciedad -= ptosSaciedad;
        this.comida.ocupa -= ptosOcupa;
        

        console.log(this.comida.saciedad, this.comida.ocupa);
        if(this.comida.saciedad <= 0 || this.fantasma.saciedad.estaAlMax() || this.fantasma.espacioEnPanza.estaAlMin())
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
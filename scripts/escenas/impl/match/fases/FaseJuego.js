import {Fase} from "./Fase.js";

export class FaseJuego extends Fase
{
    constructor(escena)
    {
        super(escena);
        
        this.delta = 0;
        this.duracionGravedad = 0.5*1000;
        this.primerBloque = null;
        this.segundoBloque = null;

        this.vista.onBlockClick( (f, c) => {
            
           this.seleccionarBloque(f,c);
        });

       
        this.vista.setearHabilitacionDeBotones(true);
    }

    seleccionarBloque(f, c)
    {
       
        if(!this.primerBloque)
        {
            
            this.primerBloque = {fila:f, col:c};
            this.vista.setSeleccion(f, c);
        }
        else if(this.primerBloque.fila === f && this.primerBloque.col === c)
        { 
            this.primerBloque = null;
            this.vista.limpiarSeleccion();
        }
        else
        {
          
            this.segundoBloque = {fila:f, col:c};
        }
    }
 
    iniciar()
    {
       
    }

    finalizar()
    {
        
    }

    actualizar(elapsed)
    { 
        
        if(this.primerBloque && this.segundoBloque)
        {
 
            const p = this.primerBloque;
            const s = this.segundoBloque;
            
            this.primerBloque = null;
            this.segundoBloque = null;

            this.vista.limpiarSeleccion();
            if(this.modelo.intentarIntercambio(p.fila, p.col, s.fila, s.col ))
            {
                 
                const ptos = this.modelo.limpiarCoincidencias();
                if(ptos > 0)
                {     
                    this.escena.cargarGuita(ptos);
                    this.escena.completar();
                }
                else
                {
                    //deshago el movimiento 
                    this.modelo.intentarIntercambio(p.fila, p.col, s.fila, s.col);
                }  
            } 
        }
        
    }
    
    
}
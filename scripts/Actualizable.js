export class Actualizable 
{
    constructor() 
    {
        this.hijos = [];
    }

    registrarHijos()
    {
        Object.entries(this).forEach((e) => 
        {
            const valor = e[1];
            if (valor instanceof Actualizable)
            {
                this.hijos.push(valor);
                
                
            }
        });
        
        
    }

    actualizar(elapsed) 
    {
        this.hijos.forEach((h) => 
        {
            if (typeof (h.actualizar) === "function") {
                h.actualizar(elapsed);
            }
        }
        );
    }


}
export class Actualizable 
{
    constructor() 
    {
        this.hijos = [];
    }

    registrarHijo(...hijos)
    {
        this.hijos.push(...hijos);
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
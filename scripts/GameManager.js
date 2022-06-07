
class GameManagerSingleton
{
    constructor()
    {
        this.lastUpdate = Date.now();
        this.elapsed = 0;
        this.actualizables = [];
      
        this.interval = null;
    }

    actualizar(elapsed)
    {
        this.actualizables.forEach((actualizable) => {
            typeof(actualizable.actualizar) === "function" && actualizable.actualizar(elapsed);
        });
 
    }

    comenzar()
    {
        if(!this.interval)
        {
            this.lastUpdate = Date.now();
            this.elapsed = 0;

            this.interval = setInterval(()=>
            {
                this.elapsed = Date.now() - this.lastUpdate;
                this.lastUpdate = Date.now();
                this.actualizar(this.elapsed);
    
            }, 60);
        }
        
    }

    parar()
    {
        clearInterval(this.interval);
        this.interval = null;
    }
}

export const GameManager = new GameManagerSingleton();
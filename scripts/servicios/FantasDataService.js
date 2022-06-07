class FantasDataServiceSingleton
{

    constructor()
    {
        this.storeAddr = "fantasDS";
        this.defaultVal = { 
            saciedad: 100,
            espacioEnPanza: 100,
            energia:100,
            guita: 9999.99
        };
    }


    internalGet()
    {
        let v = localStorage.getItem(this.storeAddr);
        //Si hay valor almacenado en el localstorage, usar ese
        if(v)
        {
            return JSON.parse(v);
        }
        
        //Si no, guardo el default en el localstorage y retorno una copia
        this.internalSet(this.defaultVal);
        return Object.assign({}, this.defaultVal);
    }

    internalSet(nv)
    {
        let sv = nv;
        if(typeof(nv) === "object")
        {
            sv = JSON.stringify(nv);
        }

        localStorage.setItem(this.storeAddr, sv);
    }

    get()
    {
        return new Promise((resolve)=>
        {
            resolve(this.internalGet());
        });
    }

    post(val)
    {
        return new Promise((resolve)=>
        {
            this.internalSet(val);
            resolve();
        });
    }

}


export const FantasDataService = new FantasDataServiceSingleton();
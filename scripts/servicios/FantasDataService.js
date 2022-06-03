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
        if(v)
        {
            return JSON.parse(v);
        }
        
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
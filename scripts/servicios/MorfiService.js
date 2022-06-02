const MORFI_URL = "";
class MorfiServiceSingleton
{

    constructor()
    {
           
    }

    async get()
    {
        const response = await fetch(MORFI_URL);
        const json = await response.json();
    
        return JSON.parse(json);
    }
  
}


export const MorfiService = new MorfiServiceSingleton();
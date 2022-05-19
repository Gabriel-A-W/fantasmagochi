class MouseTrackerClass
{
    constructor()
    {
        this.clientX = 0;
        this.clientY = 0;
        this.event = null;
        document.addEventListener("mousemove", (evt)=>{
            this.event = evt;
            this.clientX = evt.clientX;
            this.clientY = evt.clientY;
            
        });
    }
}

export const MouseTracker = new MouseTrackerClass();
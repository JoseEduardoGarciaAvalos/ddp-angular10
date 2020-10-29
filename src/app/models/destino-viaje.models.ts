export class DestinoViaje{
    private selected: boolean;
    constructor(public nombre:string, public imagenUrl:string){
    }

    isSeleccionado(): boolean{
        return this.selected;
    }

    setSeleccionado(selected: boolean){
        this.selected = selected;
    }
}
export class DestinoViaje{
    private selected: boolean;
    public servicios: string[];

    constructor(public nombre:string, public imagenUrl:string){
        this.servicios = ["desayuno", "spa"];
    }

    isSeleccionado(): boolean{
        return this.selected;
    }

    setSeleccionado(selected: boolean){
        this.selected = selected;
    }
}
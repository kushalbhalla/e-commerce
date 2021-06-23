export class Product {
    public id: number;
    public name:string ;
    public get_absolute_url: string;
    public description: string;
    public price: number;
    public get_image: string;
    public get_thumbnail: string;

    constructor(
        id: number, 
        name: string, 
        get_absolute_url: string, 
        description: string,
        price: number,
        get_image: string,
        get_thumbnail: string) 
        {

            this.id = id;
            this.name = name;
            this.get_absolute_url = get_absolute_url;
            this.description = description;
            this.price = price;
            this.get_image = get_image;
            this.get_thumbnail = get_thumbnail
    }
}
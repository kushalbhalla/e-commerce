import { Product } from "../product.model";

export class Category{
    public id: number;
    public name: string;
    public get_absolute_url: string;
    public products: Product[];

    constructor(id: number, name: string, get_absolute_url: string, products: Product[]) {
        this.id = id;
        this.name = name;
        this.get_absolute_url = get_absolute_url
        this.products = products;
    }
}
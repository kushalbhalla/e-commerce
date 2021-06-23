import { Product } from "../product/product.model";

export class Cart {
    public product: Product;
    public quantity: number;


    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
}
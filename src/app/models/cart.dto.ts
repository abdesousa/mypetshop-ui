import { ItemDTO } from "./item.dto";

export class CartDTO {
    cartId: number;
    userId: number;
    items: [];

    constructor() {
        this.items = [];
    }


}


import {Injectable} from '@angular/core';

import {Api} from './api';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    constructor(public api: Api) {
    }

    getCartByUserId(userid:number) {
        return this.api.get('cart/${userid}');
    }

    addToCart(itemDTO) {
        return this.api.post(`/cart/item`, itemDTO);
    }


    removeItemFromCart(itemDTO) {
        return this.api.post(`/cart/item`,itemDTO);
    }

}

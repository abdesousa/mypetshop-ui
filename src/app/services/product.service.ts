import {Injectable} from '@angular/core';

import {Api} from './api';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(public api: Api) {
    }

    findAll() {
        return this.api.get('cart/product');
    }

    create(productDTO) {
        return this.api.post(`cart/product`, productDTO);
    }

    update(productDTO) {
        return this.api.put(`cart/product/${productDTO.productId}`, productDTO);
    }


    delete(productId) {
        return this.api.delete(`cart/product/${productId}`);
    }

}

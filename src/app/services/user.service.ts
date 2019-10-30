import {Injectable} from '@angular/core';

import {Api} from './api';
import { tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(public api: Api) {
    }


    findAll() {
        return this.api.get('cart/user');
    }

    update(userDTO) {
        return this.api.put(`cart/user/${userDTO.userId}`, userDTO);
    }

    create(userDTO) {
        return this.api.post(`cart/user`, userDTO);
    }


    delete(userId) {
        return this.api.delete(`cart/user/${userId}`);
    }
}

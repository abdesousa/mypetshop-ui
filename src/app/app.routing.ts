import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './components/admin/admin-layout.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { ProductComponent } from './components/product/product.component';
import { StoreComponent } from './components/store/store.component';
import { CartComponent } from './components/cart/cart.component';


export const AppRoutes: Routes = [
    {
        path: '', component: AdminLayoutComponent, children: [
            {path: '', component: DashboardComponent},
            {path: 'dashboard', component: DashboardComponent},
            {path: 'user', component: UserComponent},
            {path: 'product', component: ProductComponent},
            {path: 'store', component: StoreComponent},
            {path: 'cart', component: CartComponent}


        ]
    }
];

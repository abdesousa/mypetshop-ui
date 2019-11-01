import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Util } from '../../services/util.service';
import { ProductDTO } from '../../models/product.dto';

import { AppConstants } from '../shared/constants/appconstants';

import { windowWhen } from 'rxjs/operators';
import { ItemDTO } from 'src/app/models/item.dto';
import { UserDTO } from 'src/app/models/user.dto';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { CartDTO } from 'src/app/models/cart.dto';

declare interface DataTable {
    headerRow: string[];
    footerRow?: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

    dataTable: DataTable = {
        headerRow: ['Image','Name', 'Price','Quantity',''],
        dataRows: []
    };

    has_user_selected = false;
    users = [];
    userDTO: UserDTO;
    user_selected: number; 
    items = [];
    itemDTO: ItemDTO;
    cartDTO: CartDTO;

    showForm = false;
    mode: string;
    has_error = false;
    error_message: string;
    loading:boolean;


    constructor(
        public userService: UserService,
        public cartService: CartService,
        public utilService: Util,
        public chRef: ChangeDetectorRef,
        private appConstants: AppConstants) {
    }


    ngOnInit() {

        this.has_user_selected = false;
        this.loading = true;

        this.loadUsers();
        this.mode = this.appConstants.mode_update;
        this.loading = false;
        this.cartDTO = new CartDTO();
        this.items = [];

    }
    loadUsers() {
        this.userService.findAll()
            .subscribe(
                (resp: any) => {
                    this.users = resp;
                }
            );

    }

    loadItems() {
        this.cartService.getCartByUserId(this.user_selected)
            .subscribe(
                (resp: any) => {
                    this.dataTable.dataRows = [];
                    this.items = resp.items;

                    this.items.forEach(
                        (itemDTO) => {
                            this.dataTable.dataRows.push([
                                itemDTO.cartId,
                                itemDTO.productId,
                                itemDTO.productItemQuantity,
                                itemDTO.productItemValue,
                                itemDTO.productItemName,
                                itemDTO.productItemUrl
                            ]);
                        });

                    $('#datatables').DataTable().destroy();
                    this.chRef.detectChanges();
                    this.createTable();

                }
            );

    }

    createTable() {
        $('#datatables').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [
                [10, 25, 50, -1],
                [10, 25, 50, 'All']
            ],
            responsive: true,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Buscar',
            }
        });

        const table = $('#datatables').DataTable();

        // Edit record
        table.on('click', '.edit', function (e) {
            e.preventDefault();
        });

        // Delete a record
        table.on('click', '.remove', function (e) {
            e.preventDefault();
        });

        $('.card .material-datatables label').addClass('form-group');
    }

    recreateTable() {
        $('#datatables').DataTable().destroy();
        this.chRef.detectChanges();
        this.createTable();
    }


    selectUser() {

        if (this.user_selected != null) {
            this.loadItems();
            this.has_user_selected = true;     

        } else {
            this.has_user_selected = false;
        }
    }

    selectItem(data) {

        this.showForm = true;

        $(document).scrollTop(0);

        this.itemDTO = this.items.find((item) => item.cartId === data[0]);   
        this.itemDTO.userId = this.user_selected;        
     
        this.mode = this.appConstants.mode_create;

    }

    updateCart() {

        this.cartService.addToCart(this.itemDTO)
            .subscribe(
                (resp: any) => {
                    this.utilService.showNotification('top', 'right', 'success', 'Item updated on my cart successfully!');
                    this.closeForm();
                    this.loadItems();
                }, (err) => {
                    this.utilService.error('Update My Cart', err.message);
                }
            );

    }

    deleteCart(data) {

        
        this.utilService.confirm('My Shopping Cart', 'Delete item?')
            .then((result) => {
                if (result.value) {

                    let itemDTO = new ItemDTO();
                    itemDTO.cartId = data[0];
                    itemDTO.userId = this.user_selected;
                    itemDTO.productId = data[1];
                    itemDTO.productItemQuantity = data[2];
                    itemDTO.productItemValue = data[3];
                    itemDTO.productItemName = data[4];
                    itemDTO.productItemUrl = data[5];

                    this.cartService.removeItemFromCart(itemDTO)
                        .subscribe(
                            (resp: any) => {
                                this.utilService.showNotification('top', 'right', 'success', 'Item removed successfully!');
                                this.loadItems();
                            }, (err) => {
                                this.utilService.error('My Cart Remove item', err.message);
                            }
                        );
                }
            }
        );

    }

    cancel() {

        this.closeForm();

    }

    closeForm() {

        this.showForm = false;
        this.recreateTable();
        $(document).scrollTop(0);

    }
}

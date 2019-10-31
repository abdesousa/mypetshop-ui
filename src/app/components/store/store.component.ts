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

declare interface DataTable {
    headerRow: string[];
    footerRow?: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html'
})
export class StoreComponent implements OnInit {

    dataTable: DataTable = {
        headerRow: ['Image','Name', 'Price',''],
        dataRows: []
    };

    users = [];
    userDTO: UserDTO;
    user_selected: number; 
    products = [];
    productDTO: ProductDTO;
    itemDTO: ItemDTO;
    showForm = false;
    mode: string;
    has_error = false;
    error_message: string;
    loading:boolean;


    constructor(public productService: ProductService, 
        public userService: UserService,
        public cartService: CartService,
        public utilService: Util,
        public chRef: ChangeDetectorRef,
        private appConstants: AppConstants) {
    }


    ngOnInit() {
        this.loading = true;

        this.loadUsers();
        this.loadProducts();
        this.mode = this.appConstants.mode_update;

        this.loading = false;

    }
    loadUsers() {
        this.userService.findAll()
            .subscribe(
                (resp: any) => {
                    this.users = resp;
                }
            );

    }

    loadProducts() {
        this.productService.findAll()
            .subscribe(
                (resp: any) => {
                    this.dataTable.dataRows = [];
                    this.products = resp;

                    this.products.forEach(
                        (productDTO) => {
                            this.dataTable.dataRows.push([
                                productDTO.productId,
                                productDTO.productName,
                                productDTO.productValue,
                                productDTO.productUrl
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

    selectProduct(data) {

        this.showForm = true;

        $(document).scrollTop(0);

        this.productDTO = this.products.find((item) => item.productId === data[0]);
        this.itemDTO = new ItemDTO();
        this.itemDTO.cartId = 0;
        this.itemDTO.productId = this.productDTO.productId;
        this.itemDTO.productItemValue = this.productDTO.productValue;
        this.itemDTO.productItemQuantity = 0;
        this.itemDTO.productItemUrl= this.productDTO.productUrl;
        
        this.mode = this.appConstants.mode_create;

    }

    addToCart() {

        this.cartService.addToCart(this.itemDTO)
            .subscribe(
                (resp: any) => {
                    this.utilService.showNotification('top', 'right', 'success', 'Item added to the cart successfully!');
                    this.closeForm();
                    this.loadProducts();
                }, (err) => {
                    this.utilService.error('Add To Cart', err.message);
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

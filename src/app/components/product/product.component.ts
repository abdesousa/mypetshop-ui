import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Util } from '../../services/util.service';
import { ProductDTO } from '../../models/product.dto';

import { AppConstants } from '../shared/constants/appconstants';

import { windowWhen } from 'rxjs/operators';

declare interface DataTable {
    headerRow: string[];
    footerRow?: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

    dataTable: DataTable = {
        headerRow: ['Nome', 'Value',''],
        dataRows: []
    };

    products = [];
    productDTO: ProductDTO;
    showForm = false;
    mode: string;
    has_error = false;
    error_message: string;
    loading:boolean;

    constructor(public productService: ProductService,
        public utilService: Util,
        public chRef: ChangeDetectorRef,
        private appConstants: AppConstants) {
    }


    ngOnInit() {
        this.loadProducts();
        this.mode = this.appConstants.mode_update;
    }


    loadProducts() {
        this.loading = true;
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
                                productDTO.productValue
                            ]);
                        });

                    $('#datatables').DataTable().destroy();
                    this.chRef.detectChanges();
                    this.createTable();
                    this.loading = false;

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

    addProduct() {
        this.productDTO = new ProductDTO();

        this.showForm = true;

        this.mode = this.appConstants.mode_create;

        $(document).scrollTop(0);
    }

    editProduct(data) {

        this.showForm = true;

        $(document).scrollTop(0);

        this.productDTO = this.products.find((item) => item.productId === data[0]);
        this.mode = this.appConstants.mode_update;

    }


    deleteProduct(productId) {

        
        this.utilService.confirm('Product information', 'Delete the product?')
            .then((result) => {
                if (result.value) {
                    this.productService.delete(productId)
                        .subscribe(
                            (resp: any) => {
                                this.utilService.showNotification('top', 'right', 'success', 'Product Information deleted successfully!');
                                this.loadProducts();
                            }, (err) => {
                                this.utilService.error('Product Information - Delete', err.message);
                            }
                        );
                }
            }
        );

    }

    saveProduct(mode: string) {

        if (mode === this.appConstants.mode_update) { // update

            this.productService.update(this.productDTO)
                .subscribe(
                    (resp: any) => {
                        this.utilService.showNotification('top', 'right', 'success', 'Product Information updated successfully!');
                        this.closeForm();
                        this.loadProducts();
                    }, (err) => {
                        this.utilService.error('Product Information - Update', err.message);
                    }
                );

        } else {  // create
            this.productService.create(this.productDTO)
                .subscribe(
                    (resp: any) => {
                        this.utilService.showNotification('top', 'right', 'success', 'Product Information created successfully!');
                        this.closeForm();
                        this.loadProducts();
                    }, (err) => {
                        this.utilService.error('Product Information - Create', err.message);
                    }
                );
        }

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

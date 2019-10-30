import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Util } from '../../services/util.service';
import { UserDTO } from '../../models/user.dto';

import { AppConstants } from '../shared/constants/appconstants';

import { windowWhen } from 'rxjs/operators';

declare interface DataTable {
    headerRow: string[];
    footerRow?: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

    dataTable: DataTable = {
        headerRow: ['Nome', 'E-Mail',''],
        dataRows: []
    };

    users = [];
    userDTO: UserDTO;
    showForm = false;
    mode: string;
    has_error = false;
    error_message: string;
    loading:boolean;

    constructor(public userService: UserService,
        public utilService: Util,
        public chRef: ChangeDetectorRef,
        private appConstants: AppConstants) {
    }


    ngOnInit() {
        this.loadUsers();
        this.mode = this.appConstants.mode_update;
    }


    loadUsers() {
        this.loading = true;
        this.userService.findAll()
            .subscribe(
                (resp: any) => {
                    this.dataTable.dataRows = [];
                    this.users = resp;

                    this.users.forEach(
                        (userDTO) => {
                            this.dataTable.dataRows.push([
                                userDTO.userId,
                                userDTO.userName,
                                userDTO.userEmail
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

    addUser() {
        this.userDTO = new UserDTO();

        this.showForm = true;

        this.mode = this.appConstants.mode_create;

        $(document).scrollTop(0);
    }

    editUser(data) {

        this.showForm = true;

        $(document).scrollTop(0);

        this.userDTO = this.users.find((item) => item.userId === data[0]);
        this.mode = this.appConstants.mode_update;

    }


    deleteUser(userId) {

        
        this.utilService.confirm('User information', 'Delete the user?')
            .then((result) => {
                if (result.value) {
                    this.userService.delete(userId)
                        .subscribe(
                            (resp: any) => {
                                this.utilService.showNotification('top', 'right', 'success', 'User Information deleted successfully!');
                                this.loadUsers();
                            }, (err) => {
                                this.utilService.error('User Information - Delete', err.message);
                            }
                        );
                }
            }
        );

    }

    saveUser(mode: string) {

        if (mode === this.appConstants.mode_update) { // update

            this.userService.update(this.userDTO)
                .subscribe(
                    (resp: any) => {
                        this.utilService.showNotification('top', 'right', 'success', 'User Information updated successfully!');
                        this.closeForm();
                        this.loadUsers();
                    }, (err) => {
                        this.utilService.error('User Information - Update', err.message);
                    }
                );

        } else {  // create
            this.userService.create(this.userDTO)
                .subscribe(
                    (resp: any) => {
                        this.utilService.showNotification('top', 'right', 'success', 'User Information created successfully!');
                        this.closeForm();
                        this.loadUsers();
                    }, (err) => {
                        this.utilService.error('User Information - Create', err.message);
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

import {Injectable} from '@angular/core';
import swal from 'sweetalert2';

declare const $: any;

@Injectable({
    providedIn: 'root'
})
export class Util {
    showNotification(from: any, align: any, type: any, message: any) {
        $.notify({
            message: message
        }, {
            type: type,
            timer: 1500,
            placement: {
                from: from,
                align: align
            },
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
                '<i class="material-icons" data-notify="icon">done</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '</div>'
        });
    }

    success(title: string, message: string) {
        swal({
            type: 'success',
            title: title,
            text: message,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success',
        });
    }

    error(title: string, message: string) {
        swal({
            type: 'error',
            title: title,
            text: message,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-danger'
        });
    }

    warning(title: string, message: string) {
        swal({
            type: 'warning',
            title: title,
            text: message,
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
        });
    }

    confirm(title: string, message: string) {
        return swal({
            type: 'warning',
            title: title,
            text: message,
            showConfirmButton:true,
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
        });
    }

}

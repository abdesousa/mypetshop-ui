import {Component, OnInit} from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { AppConstants } from '../constants/appconstants';
import { Router } from '@angular/router';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title?: string;
    type: string;
    icontype: string;
    show?: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
    context?: string;

}

//Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard',
        show: 'false'
    }, 
    {
        path: '/user',
        title: 'User',
        type: 'link',
        icontype: 'account_circle',
        show: 'true'
    },
    {
        path: '/product',
        title: 'Product',
        type: 'link',
        icontype: 'ballot',
        show: 'true'
    },
    {
        path: '/store',
        title: 'Store',
        type: 'link',
        icontype: 'shop',
        show: 'true'
    },
];

@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    constructor(private appConstants: AppConstants) {
    }

    ngOnInit() {

        this.menuItems = ROUTES.filter(menuItem => menuItem);

        // fixed plugin
        const $sidebar = $('.sidebar');
        const $sidebar_responsive = $('body > .navbar-collapse');

        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        if ($sidebar.length !== 0) {
            $sidebar.attr('data-color', 'purple');
        }

        if ($sidebar_responsive.length !== 0) {
            $sidebar_responsive.attr('data-color', 'purple');
        }

    }


    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, {wheelSpeed: 2, suppressScrollX: true});
        }
    }

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}

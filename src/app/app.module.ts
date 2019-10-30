import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatTreeModule} from '@angular/material/tree';

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {AppComponent} from './app.component';
import {AppRoutes} from './app.routing';

import {SidebarModule} from './components/shared/sidebar/sidebar.module';
import {FooterModule} from './components/shared/footer/footer.module';
import {NavbarModule} from './components/shared/navbar/navbar.module';

import {AdminLayoutComponent} from './components/admin/admin-layout.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

import {AppConstants} from './components/shared/constants/appconstants';
import { UserComponent } from './components/user/user.component';
import { ProductComponent } from './components/product/product.component';


@NgModule({
    exports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule
    ],
    declarations: []
})
export class MaterialModule {
}

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forRoot(AppRoutes),
        BrowserAnimationsModule,
        FormsModule,
        MatDatepickerModule,
        MaterialModule,
        MatTreeModule,
        MatNativeDateModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
    ],
    providers: [
        AppConstants

    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        DashboardComponent,
        UserComponent,
        ProductComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

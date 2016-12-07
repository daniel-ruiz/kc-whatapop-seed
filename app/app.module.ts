import { BrowserModule } from "@angular/platform-browser";
import { DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import {NgModule, LOCALE_ID} from "@angular/core";

import { ConfirmDialogModule, ConfirmationService } from "primeng/primeng";

import { AppComponent } from "./app.component";
import { AppRouting } from "./app.routing";
import { BackendUriProvider } from "./app.settings";
import { CategoryService } from "./services/category.service";
import { ProductComponent } from "./components/product/product.component";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { ProductDetailResolve } from "./services/product-detail-resolve.service";
import { ProductFilterComponent } from "./components/product-filter/product-filter.component";
import { ProductResetComponent } from "./components/product-reset/product-reset.component";
import { ProductsCollectionComponent } from "./components/products-collection/products-collection.component";
import { ProductService } from "./services/product.service";
import { SoldProductsResolve } from "./services/sold-products-resolve.service";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { UserService } from "./services/user.service";
import { FromNowPipe } from "./pipes/from-now.pipe";

@NgModule({
    imports: [
        AppRouting,
        BrowserModule,
        FormsModule,
        HttpModule,
        ConfirmDialogModule
    ],
    declarations: [
        AppComponent,
        FromNowPipe,
        ProductComponent,
        ProductDetailComponent,
        ProductFilterComponent,
        ProductResetComponent,
        ProductsCollectionComponent,
        UserProfileComponent
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'es-ES'},
        BackendUriProvider,
        CategoryService,
        ConfirmationService,
        DatePipe,
        ProductDetailResolve,
        ProductService,
        SoldProductsResolve,
        UserService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }

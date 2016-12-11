import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/switchMap";

import { Product } from "../../models/product";
import { ProductFilter } from "../../models/product-filter";
import { ProductService } from "../../services/product.service";
import {Router} from "@angular/router";

@Component({
    templateUrl: "./app/components/products-collection/products-collection.component.html",
    styleUrls: ["./app/components/products-collection/products-collection.component.css"]
})
export class ProductsCollectionComponent implements OnDestroy, OnInit {
    
    private _products: Product[];
    private _filterStream$: Subject<ProductFilter> = new Subject;

    constructor(
        private _productService: ProductService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._filterStream$
            .switchMap((filter: ProductFilter) => this._productService.getProducts(filter))
            .subscribe((products: Product[]) => this._products = products);
        this.filterCollection(null);
    }

    ngOnDestroy(): void {
        this._filterStream$.unsubscribe();
    }

    filterCollection(filter: ProductFilter): void {
        this._filterStream$.next(filter);
    }

    showProductDetails(product: Product): void {
        this._router.navigate(['products', product.id]);
    }
}

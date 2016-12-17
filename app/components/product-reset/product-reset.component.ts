import { Component, OnDestroy, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/switchMap";

import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";

@Component({
    templateUrl: "./app/components/product-reset/product-reset.component.html",
    styleUrls: ["./app/components/product-reset/product-reset.component.css"]
})
export class ProductResetComponent implements OnDestroy, OnInit {

    private _products: Product[];
    private _productStream$: Subject<number> = new Subject<number>();

    constructor(
        private _productService: ProductService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._productStream$
            .switchMap((productId: number) => this._productService.setProductAvailable(productId))
            .subscribe((product: Product) => this._updateProduct(product));
        this._route.data.forEach((data: { products: Product[] }) => this._products = data.products);
        window.scrollTo(0, 0);
    }

    ngOnDestroy(): void {
        this._productStream$.unsubscribe();
    }

    private _updateProduct(product: Product): void {
        this._products = this._products.filter((p: Product): boolean => p.id !== product.id);
    }

    setProductAvailable(productId: number): void {
        this._productStream$.next(productId);
    }

    goBack(): void {
        this._router.navigate(['products']);
    }
}

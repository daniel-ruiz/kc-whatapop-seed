import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { ConfirmationService } from "primeng/primeng";

import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";
import getPrototypeOf = Reflect.getPrototypeOf;

@Component({
    templateUrl: "./app/components/product-detail/product-detail.component.html",
    styleUrls: ["./app/components/product-detail/product-detail.component.css"]
})
export class ProductDetailComponent implements OnDestroy, OnInit {

    private _productLikeStorageKey: string;

    private _product: Product;
    private _productSubscription: Subscription;
    private _likedByUser: boolean = false;

    constructor(
        private _productService: ProductService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        this._route.data.forEach((data: { product: Product }) => {
            this._product = data.product;
            this._productLikeStorageKey = `whatapop-likes-product-${this._product.id}`;
            this._likedByUser = this._fetchProductLike();
        });
        window.scrollTo(0, 0);
    }

    ngOnDestroy(): void {
        if (this._productSubscription !== undefined) {
            this._productSubscription.unsubscribe();
        }
    }

    private _buyProduct(): void {
        this._productSubscription = this._productService
                                        .buyProduct(this._product.id)
                                        .subscribe(() => this._showPurchaseConfirmation())
    }

    private _showPurchaseConfirmation(): void {
        this._confirmationService.confirm({
            rejectVisible: false,
            message: "Producto comprado. ¡Enhorabuena!",
            accept: () => this._router.navigate(["/product"])
        });
    }
    
    getImageSrc(): string {
        return this._product && this._product.photos.length > 0 ? this._product.photos[0] : "";
    }

    showPurchaseWarning(): void {
        this._confirmationService.confirm({
            message: `Vas a comprar ${this._product.name}. ¿Estás seguro?`,
            accept: () => this._buyProduct()
        });
    }

    goBack(): void {
        this._router.navigate(['products']);
    }

    toggleLike(): void {
        this._likedByUser = !this._likedByUser;
        this._setProductLike(this._likedByUser);
    }

    private _fetchProductLike(): boolean {
        if (typeof(Storage) !== undefined) {
            return localStorage.getItem(this._productLikeStorageKey) === "true";
        } else {
            return false;
        }
    }

    private _setProductLike(like: boolean): void {
        if (typeof(Storage) !== undefined) {
            localStorage.setItem(this._productLikeStorageKey, (like ? "true" : "false"));
        }
    }
}

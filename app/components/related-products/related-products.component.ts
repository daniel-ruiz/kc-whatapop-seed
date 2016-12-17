import {Component, Input, SimpleChanges} from "@angular/core";
import {Product} from "../../models/product";
import {Subscription} from "rxjs";
import {User} from "../../models/user";
import {ProductService} from "../../services/product.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

import * as _ from "lodash";

@Component({
    selector: "related-products",
    templateUrl: "./app/components/related-products/related-products.component.html"
})
export class RelatedProductsComponent {

    @Input() mainProduct: Product;

    private _relatedProducts: Product[];
    private _relatedProductsSubscription: Subscription;
    private _user: User;
    private _userSubscription: Subscription;

    constructor(
        private _productService: ProductService,
        private _userService: UserService,
        private _router: Router
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["mainProduct"] && changes["mainProduct"]["currentValue"]) {
            this._fetchRelatedProducts();
            this._fetchUser();
        }
    }

    ngOnDestroy(): void {
        if (this._relatedProductsSubscription !== undefined) {
            this._relatedProductsSubscription.unsubscribe();
        }

        if (this._userSubscription !== undefined) {
            this._userSubscription.unsubscribe();
        }
    }

    showProductDetails(product: Product): void {
        this._router.navigate(['products', product.id]);
        window.scrollTo(0, 0);
    }

    private _fetchRelatedProducts(): void {
        this._relatedProductsSubscription = this._productService
            .getProducts({
                state: 'selling',
                seller: this.mainProduct.seller.nick
            })
            .subscribe((products: Product[]) => {
                _.remove(products, (product: Product) => {
                    return product.id === this.mainProduct.id;
                });
                this._relatedProducts = products;
            });
    }

    private _fetchUser(): void {
        this._userSubscription = this._userService
            .getUser(this.mainProduct.seller.id)
            .subscribe((user: User) => this._user = user);
    }
}

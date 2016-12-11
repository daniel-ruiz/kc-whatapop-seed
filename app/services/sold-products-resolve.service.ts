import { Injectable } from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Product} from "../models/product";
import {ProductService} from "./product.service";

@Injectable()
export class SoldProductsResolve implements Resolve<Product> {

    constructor(private _productService: ProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
        return this._productService.getProducts({state: 'sold'});
    }
}

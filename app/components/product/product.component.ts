import {Component, Input, Output, EventEmitter} from "@angular/core";

import { Product } from "../../models/product";

@Component({
    selector: "product",
    templateUrl: "./app/components/product/product.component.html"
})
export class ProductComponent {

    @Input() data: Product;

    @Output() productClicked: EventEmitter<Product> = new EventEmitter<Product>();

    notifyProductClicked(product: Product): void {
        this.productClicked.emit(product);
    }
}

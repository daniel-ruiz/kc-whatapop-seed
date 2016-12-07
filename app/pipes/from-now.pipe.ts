import * as moment from "moment";
import "moment/locale/es";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {

    transform(timestamp: number): string {
        return moment(timestamp).fromNow();
    }
}

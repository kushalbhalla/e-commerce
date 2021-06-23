import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DataService } from "../shared/data.service";

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

    myOrdersChanged = new Subject<any>();
    myOrders:any = [];

    constructor(private dbService: DataService) {
        this.initOrders();
    }

    initOrders() {
        this.dbService.getMyOrders().subscribe(
            myOrders => {
                this.myOrders = myOrders;
                this.myOrdersChanged.next(this.myOrders.slice());
            }
        )
    }

    getOrders() {
        return this.myOrders.slice();
    }
    
}
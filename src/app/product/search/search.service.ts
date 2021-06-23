import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchedResult = [];
  subscription: Subscription = new Subscription;
  searchedResultChanged = new Subject<any>();
  query!: string;

  constructor(private route: ActivatedRoute) {
  }

  setParams(searchedProducts: any) {
    this.query = this.route.snapshot.queryParams.query;
    this.searchedResult = searchedProducts;
    this.searchedResultChanged.next(this.searchedResult);
  }

  getParams() {
    return this.query,this.searchedResult
  }
}

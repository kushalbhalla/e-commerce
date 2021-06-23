import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { CommonService } from 'src/app/shared/common.service';
import { SearchService } from './search.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchedProducts = [];
  subscription: Subscription = new Subscription;
  query!: string;

  constructor(private commonService: CommonService, private searchService: SearchService, private route:ActivatedRoute, private dbService: DataService) {
  }

  ngOnInit(): void { 
    this.commonService.setTitle('Search')
    
    this.subscription = this.searchService.searchedResultChanged.subscribe(
      (products: []) => {
        this.searchedProducts = products        
      }
    )

    this.query, this.searchedProducts = this.searchService.getParams();      
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

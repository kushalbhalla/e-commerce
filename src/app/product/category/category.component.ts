import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { DataService } from '../../shared/data.service';
import { Category } from './category.model';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category!: string;
  categoryData!: any;
  nope!: Category;

  constructor(private route: ActivatedRoute,private commonService: CommonService, private dbService: DataService) {        
    this.route.params
      .subscribe( 
        (params: Params) => {
          this.category = params.category;     
          this.commonService.setTitle(this.category);
          this.dbService.getCategoryProducts(this.category).subscribe(
            data => {
              const data1 = data;  
              this.categoryData = data1;                 
            }
          );    
      });
  }

  ngOnInit(): void {
  }

}

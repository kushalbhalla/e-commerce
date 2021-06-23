import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: any;
  @Input() index: number | undefined;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onEdit() {    
    const category = this.product.get_absolute_url.split("/")[1];
    const name = this.product.get_absolute_url.split("/")[2];    
    this.router.navigate([category,this.product.id,name]);
  }

}

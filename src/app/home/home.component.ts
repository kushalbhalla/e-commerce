import { Component, OnInit } from '@angular/core';

import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dbService: DataService) { 
  }

  ngOnInit(): void {
    this.dbService.getLatestProucts().subscribe();
  }

}

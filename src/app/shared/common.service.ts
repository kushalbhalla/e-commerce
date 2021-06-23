import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private titleService: Title) { }

  public setTitle(newTitle: string) {
    newTitle = newTitle + " | " + "ShopKart"
    this.titleService.setTitle(newTitle);
  }

}

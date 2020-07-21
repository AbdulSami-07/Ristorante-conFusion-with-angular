import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish'
import { DISHES } from '../shared/dishes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

//class implements interface

export class MenuComponent implements OnInit {

  dishes : Dish[] = DISHES;

  selectedDish : Dish;

  constructor() { }

  ngOnInit() {
  }

  onSelect(dish : Dish) : void {
    this.selectedDish = dish;
  }

}

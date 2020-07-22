import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

//class implements interface

export class MenuComponent implements OnInit {
  
  dishes : Dish[];

  selectedDish : Dish;

  constructor(private dishService : DishService) { }

  ngOnInit() {  //this method is executed when component is created.
    this.dishes = this.dishService.getDishes();
  }

  onSelect(dish : Dish) : void {
    this.selectedDish = dish;
  }

}
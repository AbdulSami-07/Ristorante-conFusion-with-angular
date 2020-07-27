import { Component, OnInit, Inject } from '@angular/core';
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
  errMess : string;

  constructor(private dishService : DishService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {  //this method is executed when component is created.
    this.dishService.getDishes().subscribe(
       (dishes) => this.dishes = dishes,
       errmess => this.errMess = <any>errmess);

  }

}

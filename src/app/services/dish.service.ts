import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {   //Making this class as injectalble.

  constructor() { }

  getDishes() : Promise <Dish[]> { // just to stimulate latency of server. 
    return  new Promise( resolve => {
      setTimeout( () => resolve(DISHES), 2000);
    });
  }

  getDish(id: string) : Promise <Dish> {
    return  new Promise( resolve => {
      setTimeout( () => resolve(DISHES.filter( dish => { return dish.id === id})[0]), 2000);
    });
}

  getFeaturedDish(): Promise <Dish> {
    return  new Promise( resolve => {
      setTimeout( () => resolve(DISHES.filter( dish => dish.featured )[0]), 2000);
    });
  }

  
}

import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {   //Making this class as injectalble.

  constructor() { }

  getDishes() : Dish[] {
    return DISHES;
  }
}

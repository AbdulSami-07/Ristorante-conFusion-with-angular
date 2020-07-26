import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import  { Observable, of } from 'rxjs';
import  { delay } from  'rxjs/operators';
import  { Comment } from '../shared/comment';


@Injectable({
  providedIn: 'root'
})
export class DishService {   //Making this class as injectalble.

  constructor() { }

  // Obervable can what Promise can do.
  // then of Promise is equiv. to subscribe of Observable. 

  getDishes() : Observable <Dish[]> { // just to stimulate latency of server. 
    // of helps to sent to pick only one value. 
    return  of(DISHES).pipe(delay(2000)); 
  }

  getDish(id: string) : Observable <Dish> {
    return  of(DISHES.filter( dish => dish.id === id)[0]).pipe(delay(20));
}

  getFeaturedDish(): Observable <Dish> {
    return  of(DISHES.filter( dish => dish.featured )[0]).pipe(delay(2000));
  }

  getDishIds():  Observable <string[] | any> {
    return of(DISHES.map(dish => dish.id));
  }

  postDishComment(data : Comment, id : string) {
  const index: number = DISHES.indexOf(DISHES.filter( dish => dish.id === id)[0]); 
  DISHES[index].comments.push(data);
  }

  
}

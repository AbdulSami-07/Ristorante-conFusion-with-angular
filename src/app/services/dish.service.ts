import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import  { Observable, of } from 'rxjs';
import  { delay } from  'rxjs/operators';
import  { Comment } from '../shared/comment';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import  { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DishService {   //Making this class as injectalble.

  constructor( private http: HttpClient) { }

  // Obervable can what Promise can do.
  // then of Promise is equiv. to subscribe of Observable. 

  getDishes() : Observable <Dish[]> { // just to stimulate latency of server. 
    // of helps to sent to pick only one value. 
    return  this.http.get<Dish[]>(baseURL + 'dishes'); 
  }

  getDish(id: string) : Observable <Dish> {
    return  this.http.get<Dish>(baseURL + 'dishes/' + id);
}

  getFeaturedDish(): Observable <Dish> {
    return  this.http.get<Dish>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
  }

  getDishIds():  Observable <string[] | any> {
    return this.http.get<Dish[]>(baseURL + 'dishes').pipe(map(dishes => dishes.map(dish => dish.id)));
  }

  postDishComment(data : Comment, id : string) {
  const index: number = DISHES.indexOf(DISHES.filter( dish => dish.id === id)[0]); 
  DISHES[index].comments.push(data);
  }

  
}

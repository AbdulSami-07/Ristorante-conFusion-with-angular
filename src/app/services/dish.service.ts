import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import  { Observable, of } from 'rxjs';
import  { delay } from  'rxjs/operators';
import  { Comment } from '../shared/comment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import  { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {   //Making this class as injectalble.

  constructor( private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  // Obervable can what Promise can do.
  // then of Promise is equiv. to subscribe of Observable. 

  getDishes() : Observable <Dish[]> { 
    return  this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError)); 
  }

  getDish(id: string) : Observable <Dish> {
    return  this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
}

  getFeaturedDish(): Observable <Dish> {
    return  this.http.get<Dish>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds():  Observable <string[] | any> {
    return this.http.get<Dish[]>(baseURL + 'dishes').pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  putDish(dish: Dish): Observable <Dish>{
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish,httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  
}

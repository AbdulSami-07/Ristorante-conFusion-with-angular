import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions'
import  { Observable, of } from 'rxjs';
import  { delay } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions() : Observable <Promotion[]> { // just to stimulate latency of server. 
    // of helps to sent to pick only one value. 
    return  of(PROMOTIONS).pipe(delay(2000)); 
  }

  getPromotion(id: string) : Observable <Promotion> {
    return  of(PROMOTIONS.filter( dish => dish.id === id)[0]).pipe(delay(2000));
  }

  getFeaturedPromotion(): Observable <Promotion> {
    return  of(PROMOTIONS.filter( dish => dish.featured )[0]).pipe(delay(2000));
  }
  
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//my imported module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes} from '@angular/router';
import 'hammerjs';
//end

//my component
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
//end

//my services
import  { DishService } from './services/dish.service';
import  { PromotionService } from './services/promotion.service';
//end

import { AppRoutingModule } from './app-routing/app-routing.module';

@NgModule({
  declarations: [  //all the components that will comprise my website. 
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [
    DishService,
    PromotionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

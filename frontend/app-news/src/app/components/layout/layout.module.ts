import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from '../layout/layout.component';
import { MaterialModule } from 'src/app/shareds/material/material.module';
import { NewsComponent } from './pages/news/news.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { FavoriteTableComponent } from './tables/favorite-table/favorite-table.component';
import { FavoriteModalComponent } from './dialogs/favorite-modal/favorite-modal.component';
import { NewsTableComponent } from './tables/news-table/news-table.component';


@NgModule({
  declarations: [
    LayoutComponent,
    NewsComponent,
    FavoriteComponent,
    FavoriteTableComponent,
    FavoriteModalComponent,
    NewsTableComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MaterialModule
  ]
})
export class LayoutModule { }

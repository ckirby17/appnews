import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { NewsComponent } from './pages/news/news.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';

const routes: Routes = [
  { path: '',
    component: LayoutComponent,
    children: [
      { path: 'new', component: NewsComponent },
      { path: 'favorite', component: FavoriteComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

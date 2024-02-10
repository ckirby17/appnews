import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full'  },
  { path: 'pages', loadChildren:() => import('../app/components/layout/layout.module').then(m => m.LayoutModule) },
  { path: '**', redirectTo: 'pages', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

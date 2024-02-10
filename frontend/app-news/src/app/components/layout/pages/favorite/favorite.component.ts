import { Component, OnInit } from '@angular/core';
import { FavoriteHeader } from 'src/app/interfaces/favorite-header';
import { FavoriteList } from 'src/app/interfaces/favorite-list';
import { SweetAlertService } from 'src/app/services/alert/sweet-alert.service';
import { FavoriteService } from 'src/app/services/api/favorite.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  favoriteHeader!: FavoriteHeader;
  listFavorite: FavoriteList[] = []
  sizePageDefault: number = environment.sizePageDefault;
  pageDefault: number = environment.pageDefault;
  showLoading: boolean = true;

  constructor(
    private _favoriteService: FavoriteService,
    private _sweetService: SweetAlertService
  ){

  }

  ngOnInit(): void {
    this.getFavoritesPaginableInit();
  }

  onLoading(resp: boolean){
    this.showLoading = resp;
  }

  getFavoritesPaginableInit(){
    this._favoriteService.listPageable(this.pageDefault, this.sizePageDefault).subscribe({
      next: (resp) => {
        if(resp.success === 1){
          const dataHeader = resp.data as FavoriteHeader;
          this.favoriteHeader = dataHeader;
          this.listFavorite = dataHeader.listFavorites;
        }
        else{
          this._sweetService.showError('Error!!', resp.message);
        }
      },
      complete: () => {
        this.showLoading = false;
      },
      error: () => {
        this.showLoading = false;
        this._sweetService.showError('Error!!', 'Error en el sistema, por favor intente más tarde');
      }
    });
  }

}

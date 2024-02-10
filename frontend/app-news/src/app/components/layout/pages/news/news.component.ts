import { Component, OnInit } from '@angular/core';
import { NewHeader } from 'src/app/interfaces/new-header';
import { NewList } from 'src/app/interfaces/new-list';
import { SweetAlertService } from 'src/app/services/alert/sweet-alert.service';
import { NewService } from 'src/app/services/external-api/new.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  newHeader!: NewHeader;
  listNews: NewList[] = []
  showLoading: boolean = true;

  constructor(
    private _newService: NewService,
    private _sweetService: SweetAlertService
  ){}

  ngOnInit(): void {
    this.getNewsPaginableInit();
  }

  onLoading(resp: boolean){
    this.showLoading = resp;
  }

  getNewsPaginableInit(){
    this._newService.listNewsPageable('').subscribe({
      next: (resp) => {
        if(resp.results.length > 0){
          const dataHeader = resp as NewHeader;
          this.newHeader = dataHeader;
          this.listNews = dataHeader.results.map(resp => {
            let item: NewList = {
              id: resp.id,
              title: resp.title,
              news_site: resp.news_site,
              summary: resp.summary,
              published_at: resp.published_at
            };
            return item;
          });
          this.newHeader.results = this.listNews;
        }
        else{
          this._sweetService.showWarning('Aviso!!', 'Datos no encontrados');
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

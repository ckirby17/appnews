import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NewHeader } from './../../../../interfaces/new-header';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { NewList } from 'src/app/interfaces/new-list';
import { MatTableDataSource } from '@angular/material/table';
import { NewService } from 'src/app/services/external-api/new.service';
import { SweetAlertService } from 'src/app/services/alert/sweet-alert.service';
import { FavoriteCreate } from 'src/app/interfaces/favorite-create';
import { FavoriteService } from 'src/app/services/api/favorite.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss'],
  providers: [DatePipe]
})
export class NewsTableComponent implements OnInit, AfterViewInit {

  columnsTable: string[] = ['title', 'news_site', 'summary', 'published_at', 'actions'];
  length:number = 0;
  nextPage: string = '';
  previousPage: string = '';
  indexPage: number = 0;
  sizePage: number = 10;
  isLoading: boolean = true;


  @Input() dataSourceHeader: NewHeader = {
    count: 0,
    next: '',
    previous: '',
    results: []
  };

  @Output() showLoading: EventEmitter<boolean> = new EventEmitter();

  @ViewChild(MatPaginator) paginationTable!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataTableSource: MatTableDataSource<NewList> = new MatTableDataSource<NewList>([]);

  constructor(
    private _newsService: NewService,
    private _favoriteService: FavoriteService,
    private _sweetService: SweetAlertService,
    private datePipe: DatePipe
  ){  }

  ngOnInit(): void {
    this._configInitTablePaginator();
  }

  ngAfterViewInit(): void {
    this.dataTableSource.sort = this.sort;
  }

  private _configInitTablePaginator(){
    this.length = this.dataSourceHeader.count;
    this.nextPage = this.dataSourceHeader.next;
    this.previousPage = this.dataSourceHeader.previous;
    this.dataTableSource.data = this.dataSourceHeader.results;
    this.dataTableSource.paginator = this.paginationTable;
    this.isLoading = false;
  }

  handlePageEvent(e: PageEvent) {
    this.showLoading.emit(true);
    this.isLoading = true;
    let urlPage: string = '';
    let replaceStringUrl: string = `?limit=${e.pageSize}`;
    let searchStringUrl: string = `?limit=${this.sizePage}`;
    this.sizePage = e.pageSize;

    if(e.pageIndex > this.indexPage){
      urlPage = this.nextPage.replace(searchStringUrl, replaceStringUrl);
      this.getListNewsPageable(urlPage, e.pageSize);
    }
    else{
      urlPage = this.previousPage !== null ? this.previousPage.replace(searchStringUrl, replaceStringUrl) : '';
      this.getListNewsPageable(urlPage, e.pageSize);
    }

    this.indexPage = e.pageIndex;
  }

  getListNewsPageable(url: string, limit: number){
    this._newsService.listNewsPageable(url, limit).subscribe({
      next: (resp) => {
        if(resp.results.length > 0){
          const dataHeader = resp as NewHeader;
          this.dataTableSource.data = dataHeader.results;
          this.nextPage = resp.next;
          this.previousPage = resp.previous;
        }
        else{
          this._sweetService.showWarning('Aviso!!', 'Datos no encontrados');
        }
      },
      complete: () => {
        this.showLoading.emit(false);
        this.isLoading = false;
      },
      error: () => {
        this.showLoading.emit(false);
        this.isLoading = false;
        this._sweetService.showError('Error!!', 'Error en el sistema, por favor intente más tarde');
      }
    });
  }

  getListNewsSearchPageable(limit: number, value: string){
    this._newsService.listNewsSearchPageable(limit, value).subscribe({
      next: (resp) => {
        if(resp.results.length > 0){
          const dataHeader = resp as NewHeader;
          this.dataTableSource.data = dataHeader.results;
          this.length = resp.count;
          this.nextPage = resp.next;
          this.previousPage = resp.previous;
          this._filterTable(value);
        }
        else{
          this.length = 0;
          this.dataTableSource.data = [];
        }
      },
      complete: () => {
        this.isLoading = false;
        this.showLoading.emit(false);
      },
      error: () => {
        this.isLoading = false;
        this.showLoading.emit(false);
        this._sweetService.showError('Error!!', 'Error en el sistema, por favor intente más tarde');
      }
    });
  }

  applyFilterTable(event: Event){
    this.showLoading.emit(true);
    this.isLoading = true;
    const filterValue = (event.target as HTMLInputElement).value;
    this.getListNewsSearchPageable(this.sizePage, filterValue);
  }

  private _filterTable(filterValue: string){
    this.dataTableSource.filter = filterValue.trim().toLowerCase();

    if (this.dataTableSource.paginator) {
      this.dataTableSource.paginator.firstPage();
    }
  }

  addFavorite(data: NewList){
    this._sweetService.showQuery('Agregar a Favorito', '¿Desea agregar la Noticia a favoritos el título ' + data.title + '?')
    .then((result) => {
      if(result.isConfirmed){
        this.showLoading.emit(true);

        let dataFavorite: FavoriteCreate = {
          title: data.title,
          description: data.news_site,
          summary: data.summary,
          publishedAtText: this.datePipe.transform(data.published_at, 'yyyy-MM-dd') + ' ' + new Date(data.published_at).toLocaleTimeString('es-CL')
        }

        this._favoriteService.create(dataFavorite).subscribe({
          next: (resp) => {
            if(resp.success === 1){
              this._sweetService.showSuccess('Éxito!!', 'Noticia agregada correctamente a favoritos');
            }
            else{
              this._sweetService.showError('Error!!', resp.message);
            }
          },
          complete: () => {
            this.showLoading.emit(false);
          },
          error: () => {
            this._sweetService.showError('Error!!', 'Error en el sistema, por favor intente más tarde');
          }
        });
      }
    });
  }

}

import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FavoriteEdit } from 'src/app/interfaces/favorite-edit';
import { FavoriteHeader } from 'src/app/interfaces/favorite-header';
import { FavoriteList } from 'src/app/interfaces/favorite-list';
import { SweetAlertService } from 'src/app/services/alert/sweet-alert.service';
import { FavoriteService } from 'src/app/services/api/favorite.service';
import { environment } from 'src/environments/environment';
import { FavoriteModalComponent } from '../../dialogs/favorite-modal/favorite-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-favorite-table',
  templateUrl: './favorite-table.component.html',
  styleUrls: ['./favorite-table.component.scss']
})
export class FavoriteTableComponent implements OnInit, AfterViewInit {

  columnsTable: string[] = ['title', 'description', 'summary', 'publishedAt', 'actions'];

  @Input() dataSourceHeader!: FavoriteHeader;
  @Output() showLoading: EventEmitter<boolean> = new EventEmitter();

  length:number = 0;
  pageSize: number = 0;
  pageIndex: number = 0;
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginationTable!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private listFavoriteInit: FavoriteList[] = [];
  dataTableSource!: MatTableDataSource<FavoriteList>;

  constructor(
    private dialog: MatDialog,
    private _favoriteService: FavoriteService,
    private _sweetService: SweetAlertService
  ){
    this.dataTableSource = new MatTableDataSource<FavoriteList>(this.listFavoriteInit);
  }

  ngOnInit(): void {
    this._configInitTablePaginator();
  }

  ngAfterViewInit(): void {
    this.dataTableSource.sort = this.sort;
  }

  private _configInitTablePaginator(){
    this.pageSize = environment.sizePageDefault;
    this.length = this.dataSourceHeader.count * this.pageSize;
    this.dataTableSource.data = this.dataSourceHeader.listFavorites;
    this.dataTableSource.paginator = this.paginationTable;
    this.isLoading = false;
  }

  applyFilterTable(event: Event){
    this.showLoading.emit(true);
    this.isLoading = true;
    const filterValue = (event.target as HTMLInputElement).value;
    this.getListFavoriteSearchPageable(this.pageIndex, this.pageSize, filterValue.trim());
  }

  getListFavoriteSearchPageable(page: number, size: number, value: string){
    this._favoriteService.listSearchTitlePageable(page, size, value).subscribe({
      next: (resp) => {
        if(resp.success === 1){
          const dataHeader = resp.data as FavoriteHeader;
          this.dataTableSource.data = dataHeader.listFavorites;
          this.length = dataHeader.count * this.pageSize;
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

  private _filterTable(filterValue: string){
    this.dataTableSource.filter = filterValue;

    if (this.dataTableSource.paginator) {
      this.dataTableSource.paginator.firstPage();
    }
  }

  handlePageEvent(e: PageEvent) {
    this.showLoading.emit(true);
    this.isLoading = true;
    this.getListFavoritePageable(e.pageIndex, e.pageSize);
  }

  getListFavoritePageable(page:number, size:number){
    this.showLoading.emit(true);
    this.pageSize = size;
    this.pageIndex = page;
    this._favoriteService.listPageable(page, size).subscribe({
      next: (resp) => {
        if(resp.success === 1){
          const dataHeader = resp.data as FavoriteHeader;
          this.length = dataHeader.count * this.pageSize;
          this.dataTableSource.data = dataHeader.listFavorites;
        }
        else{
          this._sweetService.showError('Error!!', resp.message);
        }
      },
      complete: () => {
        this.showLoading.emit(false);
        this.isLoading = false;
      },
      error: () => {
        this._sweetService.showError('Error!!', 'Error en el sistema, por favor intente más tarde');
        this.showLoading.emit(false);
        this.isLoading = false;
      }
    });
  }

  onEditFavorite(data: FavoriteList){
    let dataEdit: FavoriteEdit = {
      id: data.id,
      title: data.title,
      description: data.description,
      summary: data.summary,
      publishedAtText: data.publishedAt.toString()
    };

    this.dialog.open(FavoriteModalComponent, {
      disableClose: true,
      data: dataEdit,
      width: '100%'
    }).afterClosed().subscribe((resp) => {
      if(resp == 'true') this.getListFavoritePageable(this.pageIndex, this.pageSize);
    });
  }

  onDeleteFavorite(data: FavoriteList){
    this._sweetService.showQuery('Eliminar Favorito!!', '¿Desea eliminar favorito ' + data.title + '?')
    .then((result) => {
      if(result.isConfirmed){
        this._favoriteService.delete(data.id).subscribe({
          next: resp => {
            if(resp.success === 1){
              this._sweetService.showSuccess('Éxito!!', 'Favorito eliminado');
              this.getListFavoritePageable(this.pageIndex, this.pageSize);
            }
            else {
              this._sweetService.showError('Error!!', resp.message);
            }
          },
          error: () => {
            this._sweetService.showError('Error!!', 'Error en el sistema, por favor intente más tarde');
          }
        });
      }
    });
  }
}

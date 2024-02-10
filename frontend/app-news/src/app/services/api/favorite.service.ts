import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FavoriteCreate } from 'src/app/interfaces/favorite-create';
import { FavoriteEdit } from 'src/app/interfaces/favorite-edit';
import { ResponseApi } from 'src/app/interfaces/response-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private urlApi: string = environment.apiUrl;
  private module: string = 'favorite';
  private subModule: string = '/pageable'
  private orderPageColumn: string = environment.orderPageColumn;

  constructor(
    private http: HttpClient
  ) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
  };

  listPageable(page:number, size:number): Observable<ResponseApi> {
    const urlEnd = this.urlApi + this.module + this.subModule + `?page=${page}&size=${size}&sort=${this.orderPageColumn}`;
    return this.http.get<ResponseApi>(urlEnd, this.httpOptions);
  }

  listSearchTitlePageable(page:number, size:number, title: string): Observable<ResponseApi> {
    const urlEnd = this.urlApi + this.module + this.subModule + `?page=${page}&size=${size}&sort=${this.orderPageColumn}&title=${title}`;
    return this.http.get<ResponseApi>(urlEnd, this.httpOptions);
  }

  create(modelo: FavoriteCreate): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(this.urlApi + this.module, modelo, this.httpOptions);
  }

  edit(modelo: FavoriteEdit): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(this.urlApi + this.module, modelo, this.httpOptions);
  }

  delete(id: number): Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(this.urlApi + this.module + '/' + id, this.httpOptions);
  }
}

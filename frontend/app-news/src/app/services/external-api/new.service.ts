import { NewHeader } from './../../interfaces/new-header';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewService {

  private urlAexternalpi: string = environment.externalApiUrl;
  private offset: number = 0;
  private titleContains: string = '';

  constructor(
    private http: HttpClient
  ) { }

  listNewsPageable(url: string, limit: number = 10): Observable<NewHeader>{
    const urlEnd = url !== '' ? url : this.urlAexternalpi + `?limit=${limit}&offset=${this.offset}&title_contains=${this.titleContains}`;
    return this.http.get<NewHeader>(urlEnd);
  }

  listNewsSearchPageable(limit: number = 10, value: string = ''): Observable<NewHeader> {
    const urlEnd = this.urlAexternalpi + `?limit=${limit}&title_contains=${value}`;
    return this.http.get<NewHeader>(urlEnd);
  }
}

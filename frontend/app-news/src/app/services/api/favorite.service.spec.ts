import { TestBed } from '@angular/core/testing';

import { FavoriteService } from './favorite.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FavoriteCreate } from 'src/app/interfaces/favorite-create';
import { ResponseApi } from 'src/app/interfaces/response-api';
import { of } from 'rxjs';
import { FavoriteEdit } from 'src/app/interfaces/favorite-edit';
import { FavoriteList } from 'src/app/interfaces/favorite-list';

describe('FavoriteService', () => {
  let service: FavoriteService;

  let httpClientSpy: { post: jasmine.Spy, delete: jasmine.Spy, put: jasmine.Spy,
  get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'delete', 'put',
  'get']);
    service = new FavoriteService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return ResponseApi object (Favorite created successfully)',
  (done: DoneFn) => {

    const mockDataBody: FavoriteCreate = {
      title: 'Titulo 01',
      description: 'Descripcion 01',
      summary: 'Resumen 01',
      publishedAtText: '2024-02-11 18:22:00'
    }

    const mockResponseApiDto: ResponseApi = {
      success: 1,
      code: '200 OK',
      message: '',
      data: {
        id: 1,
        title: 'Titulo 01',
        description: 'Descripcion 01',
        summary: 'Resumen 01',
        publishedAt: '2024-02-11 18:22:00'
      }
    }

    httpClientSpy.post.and.returnValue(of(mockResponseApiDto));

    service.create(mockDataBody).subscribe(result => {
      expect(result).toEqual(mockResponseApiDto),
      done()
    });

  });

  it('Should return ResponseApi object (Favorite deleted successfully)',
  (done: DoneFn) => {

    const mockDataId:number = 1;

    const mockResponseApiDto: ResponseApi = {
      success: 1,
      code: '200 OK',
      message: '',
      data: 1
    }

    httpClientSpy.delete.and.returnValue(of(mockResponseApiDto));

    service.delete(mockDataId).subscribe(result => {
      expect(result).toEqual(mockResponseApiDto),
      done()
    });

  });

  it('Should return ResponseApi object (Favorite updated successfully)',
  (done: DoneFn) => {

    const mockDataBody: FavoriteEdit = {
      id: 1,
      title: 'Titulo 01',
      description: 'Descripcion 01',
      summary: 'Resumen 01',
      publishedAtText: '2024-02-11 18:22:00'
    }

    const mockResponseApiDto: ResponseApi = {
      success: 1,
      code: '200 OK',
      message: '',
      data: {
        id: 1,
        title: 'Titulo 01',
        description: 'Descripcion 01',
        summary: 'Resumen 01',
        publishedAt: '2024-02-11 18:22:00'
      }
    }

    httpClientSpy.put.and.returnValue(of(mockResponseApiDto));

    service.edit(mockDataBody).subscribe(result => {
      expect(result).toEqual(mockResponseApiDto),
      done()
    });

  });

  it('Should return ResponseApi object (Favorite list data successfully)',
  (done: DoneFn) => {

    let mockDataListReturn: FavoriteList[] = [];

    const mockDataFavoriteList: FavoriteList =
    {
      id: 1,
      title: 'Titulo 01',
      description: 'Descripcion 01',
      summary: 'Resumen 01',
      publishedAt: new Date('2024-02-11 18:22:00')
    }

    mockDataListReturn.push(mockDataFavoriteList);

    const mockResponseApiDto: ResponseApi = {
      success: 1,
      code: '200 OK',
      message: '',
      data: {
        count: 1,
        listFavorites: mockDataListReturn
      }
    }

    httpClientSpy.get.and.returnValue(of(mockResponseApiDto));

    service.listPageable(0, 10).subscribe(result => {
      expect(result).toEqual(mockResponseApiDto),
      done()
    });

  });

});

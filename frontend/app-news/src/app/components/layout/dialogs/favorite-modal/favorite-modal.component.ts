import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FavoriteEdit } from 'src/app/interfaces/favorite-edit';
import { SweetAlertService } from 'src/app/services/alert/sweet-alert.service';
import { FavoriteService } from 'src/app/services/api/favorite.service';

export const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD-MM-YYYY HH:mm:ss'
  },
  display: {
    dateInput: 'DD-MM-YYYY HH:mm:ss',
    monthYearLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-favorite-modal',
  templateUrl: './favorite-modal.component.html',
  styleUrls: ['./favorite-modal.component.scss'],
  providers: [
    DatePipe,
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
  ]
})
export class FavoriteModalComponent implements OnInit {

  formFavorite!: FormGroup;
  dataEdit!: FavoriteEdit;


  constructor(
    private modal: MatDialogRef<FavoriteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _favoriteService: FavoriteService,
    private _sweetService: SweetAlertService,
    private datePipe: DatePipe
  ){
    this.formFavorite = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(2000)]],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
      summary: ['', [Validators.required, Validators.maxLength(5000)]],
      publishedAt: ['', [Validators.required]]
    });

    this.dataEdit = this.data as FavoriteEdit;
  }

  ngOnInit(): void {
    this.formFavorite.setValue({
      title: this.dataEdit.title,
      description: this.dataEdit.description,
      summary: this.dataEdit.summary,
      publishedAt: this.dataEdit.publishedAtText
    });
  }

  onSave(){
    this.dataEdit.id = this.data.id;
    this.dataEdit.title = this.formFavorite.value.title;
    this.dataEdit.description = this.formFavorite.value.description;
    this.dataEdit.summary = this.formFavorite.value.summary;
    this.dataEdit.publishedAtText = this.datePipe.transform(this.formFavorite.value.publishedAt, 'yyyy-MM-dd')
    + ' ' + new Date(this.formFavorite.value.publishedAt).toLocaleTimeString('es-CL');
    this.editFavorite(this.dataEdit);
  }

  editFavorite(data: FavoriteEdit){
    this._favoriteService.edit(data).subscribe({
      next: resp => {
        if(resp.success= 1){
          this._sweetService.showSuccess('Éxito!!', 'Favorito actualizado correctamente');
          this.modal.close('true');
        }
        else{
          this._sweetService.showError('Error!!', resp.message);
        }
      },
      error: () => {
        this._sweetService.showError('Error!!', 'Error sistema, intente más tarde');
      }
    });
  }

}

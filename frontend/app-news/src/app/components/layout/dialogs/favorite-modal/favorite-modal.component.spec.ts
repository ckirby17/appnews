import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteModalComponent } from './favorite-modal.component';
import { MaterialModule } from 'src/app/shareds/material/material.module';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';

describe('FavoriteModalComponent', () => {
  let component: FavoriteModalComponent;
  let fixture: ComponentFixture<FavoriteModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteModalComponent],
      imports: [MaterialModule, HttpClientModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule,
        MatDatepickerModule, MatDialogModule],

      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { myData: [] } }
    ]
    });
    fixture = TestBed.createComponent(FavoriteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

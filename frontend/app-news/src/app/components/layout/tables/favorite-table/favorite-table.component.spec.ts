import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteTableComponent } from './favorite-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shareds/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FavoriteTableComponent', () => {
  let component: FavoriteTableComponent;
  let fixture: ComponentFixture<FavoriteTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteTableComponent],
      imports: [HttpClientModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule]//MatDialogModule, HttpClientModule, ReactiveFormsModule, MatFormFieldModule
    });
    fixture = TestBed.createComponent(FavoriteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

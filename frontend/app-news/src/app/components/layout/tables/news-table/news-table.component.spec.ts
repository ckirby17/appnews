import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsTableComponent } from './news-table.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

describe('NewsTableComponent', () => {
  let component: NewsTableComponent;
  let fixture: ComponentFixture<NewsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsTableComponent],
      imports: [HttpClientModule, ReactiveFormsModule, MatFormFieldModule, MatPaginatorModule, BrowserAnimationsModule, MatTableModule,
      MatFormFieldModule, MatInputModule]
    });
    fixture = TestBed.createComponent(NewsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

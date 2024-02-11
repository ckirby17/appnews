import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shareds/material/material.module';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsComponent],
      imports: [HttpClientModule, MaterialModule]
    });
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

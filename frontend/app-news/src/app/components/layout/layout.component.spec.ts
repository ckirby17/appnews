import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { MaterialModule } from 'src/app/shareds/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutRoutingModule } from './layout-routing.module';
import { ActivatedRoute } from '@angular/router';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      imports: [MaterialModule, BrowserAnimationsModule, LayoutRoutingModule],
      providers: [
        {
          provide: ActivatedRoute, useFactory: () => ActivatedRoute
        }
      ]
    });
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

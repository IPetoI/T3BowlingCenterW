import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdatokComponent } from './adatok.component';

describe('AdatokComponent', () => {
  let component: AdatokComponent;
  let fixture: ComponentFixture<AdatokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdatokComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdatokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

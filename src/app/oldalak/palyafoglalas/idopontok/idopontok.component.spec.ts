import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdopontokComponent } from './idopontok.component';

describe('IdopontokComponent', () => {
  let component: IdopontokComponent;
  let fixture: ComponentFixture<IdopontokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdopontokComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdopontokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

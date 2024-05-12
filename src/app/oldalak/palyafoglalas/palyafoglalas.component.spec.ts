import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalyafoglalasComponent } from './palyafoglalas.component';

describe('PalyafoglalasComponent', () => {
  let component: PalyafoglalasComponent;
  let fixture: ComponentFixture<PalyafoglalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalyafoglalasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalyafoglalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

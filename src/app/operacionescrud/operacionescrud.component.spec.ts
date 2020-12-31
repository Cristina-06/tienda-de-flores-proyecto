import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionescrudComponent } from './operacionescrud.component';

describe('OperacionescrudComponent', () => {
  let component: OperacionescrudComponent;
  let fixture: ComponentFixture<OperacionescrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperacionescrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacionescrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FelicitationsComponent } from './felicitations.component';

describe('FelicitationsComponent', () => {
  let component: FelicitationsComponent;
  let fixture: ComponentFixture<FelicitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FelicitationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FelicitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

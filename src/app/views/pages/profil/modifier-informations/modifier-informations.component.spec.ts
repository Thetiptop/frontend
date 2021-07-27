import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierInformationsComponent } from './modifier-informations.component';

describe('ModifierInformationsComponent', () => {
  let component: ModifierInformationsComponent;
  let fixture: ComponentFixture<ModifierInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierInformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

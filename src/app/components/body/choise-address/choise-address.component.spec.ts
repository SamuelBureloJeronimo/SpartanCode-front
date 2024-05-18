import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiseAddressComponent } from './choise-address.component';

describe('ChoiseAddressComponent', () => {
  let component: ChoiseAddressComponent;
  let fixture: ComponentFixture<ChoiseAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoiseAddressComponent]
    });
    fixture = TestBed.createComponent(ChoiseAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

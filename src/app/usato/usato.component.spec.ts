import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsatoComponent } from './usato.component';

describe('UsatoComponent', () => {
  let component: UsatoComponent;
  let fixture: ComponentFixture<UsatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

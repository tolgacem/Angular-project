import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsequenceComponent } from './csequence.component';

describe('CsequenceComponent', () => {
  let component: CsequenceComponent;
  let fixture: ComponentFixture<CsequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsequenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

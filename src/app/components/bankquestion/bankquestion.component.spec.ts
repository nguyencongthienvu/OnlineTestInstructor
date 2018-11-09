import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankquestionComponent } from './bankquestion.component';

describe('BankquestionComponent', () => {
  let component: BankquestionComponent;
  let fixture: ComponentFixture<BankquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

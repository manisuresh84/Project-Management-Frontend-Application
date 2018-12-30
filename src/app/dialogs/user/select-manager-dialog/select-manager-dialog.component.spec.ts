import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectManagerDialogComponent } from './select-manager-dialog.component';

describe('SelectManagerDialogComponent', () => {
  let component: SelectManagerDialogComponent;
  let fixture: ComponentFixture<SelectManagerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectManagerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectManagerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectParentTaskDialogComponent } from './select-parent-task-dialog.component';

describe('SelectParentTaskDialogComponent', () => {
  let component: SelectParentTaskDialogComponent;
  let fixture: ComponentFixture<SelectParentTaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectParentTaskDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectParentTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

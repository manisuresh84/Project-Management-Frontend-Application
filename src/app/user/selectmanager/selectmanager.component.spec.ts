import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectmanagerComponent } from './selectmanager.component';

describe('SelectmanagerComponent', () => {
  let component: SelectmanagerComponent;
  let fixture: ComponentFixture<SelectmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

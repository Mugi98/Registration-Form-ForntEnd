import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUsersDataComponent } from './update-users-data.component';

describe('UpdateUsersDataComponent', () => {
  let component: UpdateUsersDataComponent;
  let fixture: ComponentFixture<UpdateUsersDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUsersDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUsersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

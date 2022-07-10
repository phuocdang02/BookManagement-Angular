import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBookListComponent } from './update-book-list.component';

describe('UpdateBookListComponent', () => {
  let component: UpdateBookListComponent;
  let fixture: ComponentFixture<UpdateBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBookListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookListComponent } from './add-book-list.component';

describe('AddBookListComponent', () => {
  let component: AddBookListComponent;
  let fixture: ComponentFixture<AddBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

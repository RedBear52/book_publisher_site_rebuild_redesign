import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksByTitleComponent } from './books-by-title.component';

describe('BooksByTitleComponent', () => {
  let component: BooksByTitleComponent;
  let fixture: ComponentFixture<BooksByTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksByTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooksByTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

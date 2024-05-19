import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBookComponent } from './upload-book.component';

describe('UploadBookComponent', () => {
  let component: UploadBookComponent;
  let fixture: ComponentFixture<UploadBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadBookComponent]
    });
    fixture = TestBed.createComponent(UploadBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

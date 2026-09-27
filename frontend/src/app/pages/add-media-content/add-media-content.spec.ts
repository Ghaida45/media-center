import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMediaContent } from './add-media-content';

describe('AddMediaContent', () => {
  let component: AddMediaContent;
  let fixture: ComponentFixture<AddMediaContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMediaContent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddMediaContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

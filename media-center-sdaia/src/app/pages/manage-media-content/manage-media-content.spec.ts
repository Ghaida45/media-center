import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageMediaContent } from './manage-media-content';

describe('ManageMediaContent', () => {
  let component: ManageMediaContent;
  let fixture: ComponentFixture<ManageMediaContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMediaContent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageMediaContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

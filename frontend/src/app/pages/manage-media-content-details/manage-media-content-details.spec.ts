import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageMediaContentDetails } from './manage-media-content-details';

describe('ManageMediaContentDetails', () => {
  let component: ManageMediaContentDetails;
  let fixture: ComponentFixture<ManageMediaContentDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMediaContentDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageMediaContentDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantLinkComponentComponent } from './participant-link-component.component';

describe('ParticipantLinkComponentComponent', () => {
  let component: ParticipantLinkComponentComponent;
  let fixture: ComponentFixture<ParticipantLinkComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantLinkComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantLinkComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

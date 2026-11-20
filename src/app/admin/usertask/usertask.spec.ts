import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Usertask } from './usertask';

describe('Usertask', () => {
  let component: Usertask;
  let fixture: ComponentFixture<Usertask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Usertask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Usertask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

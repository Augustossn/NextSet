import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportWourkoutComponent } from './import-wourkout.component';

describe('ImportWourkoutComponent', () => {
  let component: ImportWourkoutComponent;
  let fixture: ComponentFixture<ImportWourkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportWourkoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportWourkoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

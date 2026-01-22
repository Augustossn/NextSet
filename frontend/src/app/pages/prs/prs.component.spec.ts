import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PrsComponent } from './prs.component';
import { ApiService } from '../../services/api.service';

describe('PrsComponent', () => {
  let component: PrsComponent;
  let fixture: ComponentFixture<PrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrsComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ ApiService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
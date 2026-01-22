import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PersonalRecordDTO } from '../../models/models';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-prs',
  standalone: false,
  templateUrl: './prs.component.html',
  styleUrls: ['./prs.component.css']
})
export class PrsComponent implements OnInit {

  prs: PersonalRecordDTO[] = [];
  isLoading = true;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPRs();
  }

  loadPRs(): void {
    this.isLoading = true;

    this.api.getPRs()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          // 🔥 força o Angular a atualizar a tela
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          this.prs = data;
        },
        error: (err) => {
          console.error('Erro ao carregar PRs', err);
        }
      });
  }
}

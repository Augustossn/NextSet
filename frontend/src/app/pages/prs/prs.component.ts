import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PersonalRecord } from '../../models/models';

@Component({
  selector: 'app-prs',
  standalone: false, // Obrigatório
  templateUrl: './prs.component.html',
  styleUrls: ['./prs.component.css']
})
export class PrsComponent implements OnInit {

  prs: PersonalRecord[] = [];
  loading = true;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadPRs();
  }

  loadPRs() {
    this.loading = true;
    this.api.getPRs().subscribe({
      next: (data) => {
        this.prs = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar PRs', err);
        this.loading = false;
      }
    });
  }
}
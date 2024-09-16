import {Component, OnInit} from '@angular/core';
import {PostService} from "../../service/post.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatFormField, MatInputModule, MatLabel} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe, NgForOf, NgIf, NgOptimizedImage, SlicePipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule
} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-search-by-name',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    NgIf,
    NgForOf,
    MatInputModule,
    MatIcon,
    MatCardActions,
    MatGridTile,
    MatGridList,
    MatCard,
    MatCardHeader,
    FormsModule,
    DatePipe,
    MatCardContent,
    MatButton,
    SlicePipe,
    MatCardImage,
    NgOptimizedImage,
    RouterLink,
    MatCardModule
  ],
  templateUrl: './search-by-name.component.html',
  styleUrl: './search-by-name.component.css'
})
export class SearchByNameComponent {


  constructor(private postService: PostService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder) {
  }

  result: any = [];
  name: any = "";

  searchByName() {
    if (!this.name.trim()) {
      this.snackBar.open("Please enter a keyword to search", "Ok");
      return;
    }

    this.postService.searchByName(this.name).subscribe(
      (res) => {
        this.result = res;
        if (this.result.length === 0) {
          this.snackBar.open("No results found", "Ok");
        }
      },
      (error) => {
        this.snackBar.open("Something went wrong. Please try again!", "Ok");
      }
    );
  }

  trackById(index: number, item: any) {
    return item.id;  // Optimizes *ngFor by tracking unique IDs
  }
  // searchForm!: FormGroup;
  // searchResults: any[] = [];
  // ngOnInit() {
  //   // Initialize the form
  //   this.searchForm = this.fb.group({
  //     searchTerm: [''],
  //   });
  // }
  // searchByName() {
  //   const searchTerm = this.searchForm.get('searchTerm')?.value;
  //
  //   this.postService.searchByName(searchTerm).subscribe((results) => {
  //     this.searchResults = results;
  //   });
  // }
}

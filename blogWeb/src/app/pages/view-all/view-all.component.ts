import {Component, OnInit} from '@angular/core';
import {PostService} from "../../service/post.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe, NgForOf, NgOptimizedImage} from "@angular/common";
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
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-view-all',
  standalone: true,
  imports: [
    NgForOf,
    MatCard,
    MatCardHeader,
    DatePipe,
    MatGridList,
    MatGridTile,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatIconModule,
    MatCardModule,
    MatButton,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.css'
})
export class ViewAllComponent implements OnInit{

  allPost: any;
  constructor(private postService: PostService,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getAllPosts();
  }
  getAllPosts() {
    this.postService.getAllPosts().subscribe(res => {
      console.log(res);
      this.allPost = res;
    }, error => {
      this.snackBar.open("Something Went Wrong !!", "Ok");
    })
  }

}

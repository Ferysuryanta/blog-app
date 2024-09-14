import {Component, OnInit} from '@angular/core';
import {PostService} from "../../service/post.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardModule
} from "@angular/material/card";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {MatButton} from "@angular/material/button";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommentService} from "../../service/comment.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [
    NgIf,
    MatCard,
    MatCardHeader,
    MatCardAvatar,
    DatePipe,
    MatCardImage,
    MatCardContent,
    MatChipSet,
    MatChip,
    NgForOf,
    MatCardActions,
    MatButton,
    MatIcon,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatInputModule
  ],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent implements OnInit{

  postId = this.activatedRoute.snapshot.params['id'];
  postData: any;
  commentForm!: FormGroup;
  comments: any;
  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private commentService: CommentService) {}

  ngOnInit() {
    console.log(this.postId);
    this.getPostById();

    this.commentForm = this.fb.group({
      postedBy: [null, Validators.required],
      content: [null, Validators.required]
    })
  }

  publishComment() {
    const postedBy = this.commentForm.get('postedBy')?.value;
    const content = this.commentForm.get('content')?.value;

    this.commentService.createComment(this.postId, postedBy, content).subscribe( res => {
      this.snackBar.open("Comment Published Successfully", "Ok");
      this.getCommentsByPost();
    }, error => {
      this.snackBar.open("Something Went Wrong!!", "Ok");
    })
  }

  getCommentsByPost() {
    this.commentService.getAllCommentsByPost(this.postId).subscribe(res => {
      this.comments = res;
    }, error => {
      this.snackBar.open("Something Went Wrong!!", "Ok");
    })
  }

  getPostById() {
    this.postService.getPostById(this.postId).subscribe(res => {
      this.postData = res;
      console.log(res);
      this.getCommentsByPost();
    }, error => {
      this.snackBar.open("Something Went Wrong !!!", "Ok");
    })
  }

  likePost() {
    this.postService.likePost(this.postId).subscribe((res) => {
      this.snackBar.open("Post like successfully", "Ok");
      this.getPostById();
    }, (error) => {
      this.snackBar.open("Something Went Wrong !!", "Ok")
    })
  }
}

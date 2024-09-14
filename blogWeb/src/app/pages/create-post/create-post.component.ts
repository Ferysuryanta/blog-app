import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatChipGrid, MatChipInput, MatChipRow} from "@angular/material/chips";
import {NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {PostService} from "../../service/post.service";

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    MatCard,
    MatFormFieldModule,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatChipGrid,
    MatChipRow,
    NgForOf,
    MatIcon,
    MatChipInput
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit{

  postForm! : FormGroup;
  tags:string[] = [];
  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private postService: PostService,) {}

  ngOnInit() {
    this.postForm = this.fb.group({
      name: [null, Validators.required],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
      img: [null, Validators.required],
      postedBy: [null, Validators.required]
    })
  }

  add(event:any) {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  remove(tag:any) {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  createPost() {
    const data = this.postForm.value;
    data.tags = this.tags;

    this.postService.createNewPost(data).subscribe(res => {
      this.snackBar.open("Post Created Successfully !!!", "Ok");
      this.router.navigateByUrl("/").then(r => window.location.reload());
    }, error => {
      this.snackBar.open("Something Went Wrong !!!", "Ok")
    })
  }
}

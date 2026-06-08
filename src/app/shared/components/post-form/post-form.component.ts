import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ipost } from '../../models/posts';
import { PostService } from '../../services/post.services';
import { SnackBarService } from '../../services/snackBar.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  editMode: boolean = false;
  @ViewChild('postForm') postForm !: NgForm
  editPostObj !: Ipost

  constructor(
    private _postService: PostService,
    private _snackbar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.patchPostData()
  }

  patchPostData() {
    this._postService.editPostSub$.subscribe({
      next: resp => {
        this.editPostObj = resp
        this.postForm.form.patchValue(resp);
        this.editMode = true
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    })
  }

  onSubmit() {
    if (this.postForm.valid) {
      let newPost: Ipost = {
        ...this.postForm.form.value, postID: Date.now().toString()
      }
      this._postService.addNewPost(newPost)
        .subscribe({
          next: resp => {
            this._snackbar.openSnackBar(resp.msg);
            this.postForm.resetForm();
          },
          error: err => {
            this._snackbar.openSnackBar(err.msg);
          }
        })
    }
  }

  onUpdatePost() {
    if (this.postForm.valid) {
      let updatedPost: Ipost = {
        ...this.postForm.form.value, postID: this.editPostObj.postID
      }
      this._postService.updatePost(updatedPost)
        .subscribe({
          next: resp => {
            this._snackbar.openSnackBar(resp.msg);
            this.postForm.resetForm();
            this.editMode = false;
          },
          error: err => {
            this._snackbar.openSnackBar(err.msg);
          }
        })
    }
  }
}

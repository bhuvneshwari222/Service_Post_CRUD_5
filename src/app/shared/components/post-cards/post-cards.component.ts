import { Component, OnInit } from '@angular/core';
import { Ipost } from '../../models/posts';
import { PostService } from '../../services/post.services';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { SnackBarService } from '../../services/snackBar.service';

@Component({
  selector: 'app-post-cards',
  templateUrl: './post-cards.component.html',
  styleUrls: ['./post-cards.component.scss']
})
export class PostCardsComponent implements OnInit {
  postArr: Ipost[] = []

  constructor(
    private _postService: PostService,
    private _matDialog: MatDialog,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.fetchPostArr()
  }

  fetchPostArr() {
    this._postService.fetchPostArr()
      .subscribe({
        next: resp => {
          this.postArr = resp
        }
      })
  }
  trackByPostId(index: number, post: Ipost) {
    return post.postID;
  }

  onRemove(removeID: string) {
    let config = new MatDialogConfig()
    config.data = `Are you sure you want to remove this post with id ${removeID}`
    config.disableClose = true;
    config.width = '400px'
    let dialogRef = this._matDialog.open(GetConfirmComponent, config)
    dialogRef.afterClosed()
      .subscribe({
        next: resp => {
          if (resp) {
            this._postService.removePost(removeID)
              .subscribe({
                next: resp => {
                  this._snackBar.openSnackBar(resp.msg);
                }
              })
          }
        },
        error: err => {
          this._snackBar.openSnackBar(err.msg);
        }
      })
  }

  onEdit(editPost:Ipost){
    this._postService.editPostSub$.next(editPost)
  }
}

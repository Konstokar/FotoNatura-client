import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../service/notification.service';
import {PostService} from '../../service/post.service';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

  public profileEditForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<AlarmComponent>,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data,
              private postService: PostService) {
  }

  ngOnInit(): void {
    this.profileEditForm = this.createProfileForm();
  }

  createProfileForm(): FormGroup {
    return this.fb.group({
      alarmCode: [
        this.data.user.alarmCode,
        Validators.compose([Validators.required])
      ]
    });
  }

  submit(): void {
    this.postService.alarmPost()
      .subscribe(() => {
        this.notificationService.showSnackBar('Alarm sent successfully');
        this.dialogRef.close();
      });
  }


  closeDialog() {
    this.dialogRef.close();
  }

}

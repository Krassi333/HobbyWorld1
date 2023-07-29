import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditPostComponent } from './edit-post/edit-post.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';






@NgModule({
  declarations: [
    CatalogComponent,
    DetailsComponent,
    CreatePostComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  exports:[
    CatalogComponent,
    DetailsComponent
  ]
})
export class FeaturesModule { }

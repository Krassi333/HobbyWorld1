import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { AuthActivate } from '../auth/guards/auth.activate';
import { EditPostComponent } from './edit-post/edit-post.component';

const routes: Routes = [
    {
        path: 'catalog',
        title: 'HobbyWorld-All Posts',

        component: CatalogComponent
    },
    {
        path: 'details/:postId',
        title: 'HobbyWorld-Details',

        component: DetailsComponent,
        canActivate: [AuthActivate],

    },
    {
        path: 'create',
        title: 'HobbyWorld-Add Post',
        component: CreatePostComponent,
        canActivate: [AuthActivate],

    },
    {
        path: 'edit/:postId',
        title: 'HobbyWorld-Edit Post',
        component: EditPostComponent,
         canActivate: [AuthActivate],

    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeaturesRoutingModule { }

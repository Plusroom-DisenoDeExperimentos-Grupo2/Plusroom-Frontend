import { Routes } from '@angular/router';
import { PostFormComponent } from './post/components/post-form/post-form.component';


export const routes: Routes = [
    {path: '', redirectTo: 'post-form', pathMatch: 'full'},
    {path: 'post-form', component: PostFormComponent},
];

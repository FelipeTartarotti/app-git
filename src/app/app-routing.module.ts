import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { BodyComponent } from './body/body.component';


const routes: Routes = [
  { path: ' ', component: AppComponent },
  { path: 'body', component: BodyComponent },
  { path: 'details', component: DetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

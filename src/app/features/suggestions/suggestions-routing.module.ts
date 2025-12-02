import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// CES TROIS IMPORTS MANQUAIENT → c’est pour ça que ça plantait !
import { SuggestionsComponent } from './suggestions.component';
import { SuggestionListComponent } from './suggestion-list/suggestion-list.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';

const routes: Routes = [
  {
    path: '',                    // /suggestions
    component: SuggestionListComponent
  },
  {
    path: ':id',                 // /suggestions/3
    component: SuggestionDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionsRoutingModule { }
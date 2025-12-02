import { Component } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.scss']
})
export class ListSuggestionComponent {

  suggestions: Suggestion[] = [
    { id: 1, title: 'Organiser une journée team building', description: 'Suggestion pour organiser une journée...', category: 'Événements', date: new Date('2025-01-20'), status: 'acceptee', likes: 0 },
    { id: 2, title: 'Améliorer le système de réservation', description: 'Proposition pour améliorer...', category: 'Technologie', date: new Date('2025-01-15'), status: 'refusee', likes: 0 },
    { id: 3, title: 'Créer un système de récompenses', description: 'Mise en place...', category: 'Ressources Humaines', date: new Date('2025-01-25'), status: 'refusee', likes: 0 },
    { id: 4, title: 'Moderniser l\'interface utilisateur', description: 'Refonte complète...', category: 'Technologie', date: new Date('2025-01-30'), status: 'en_attente', likes: 0 },
    { id: 5, title: 'Formation à la sécurité informatique', description: 'Organisation d\'une formation...', category: 'Formation', date: new Date('2025-02-05'), status: 'acceptee', likes: 0 }
  ];

  filteredSuggestions: Suggestion[] = [...this.suggestions];
  searchTerm: string = '';
  favorites: number[] = [];

  like(suggestion: Suggestion) {
    suggestion.likes!++;
  }

  toggleFavorite(id: number) {
    const index = this.favorites.indexOf(id);
    if (index === -1) this.favorites.push(id);
    else this.favorites.splice(index, 1);
  }

  setStatus(id: number, status: 'acceptee' | 'refusee' | 'en_attente') {
    const s = this.suggestions.find(x => x.id === id);
    if (s) {
      s.status = status;
      this.filteredSuggestions = [...this.suggestions]; // rafraîchit l'affichage
    }
  }

  search() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredSuggestions = [...this.suggestions];
    } else {
      this.filteredSuggestions = this.suggestions.filter(s =>
        s.title.toLowerCase().includes(term) || s.category.toLowerCase().includes(term)
      );
    }
  }
}
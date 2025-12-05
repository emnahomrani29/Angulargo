import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Ajout de Router pour la navigation
import { Subscription } from 'rxjs'; // Ajout de Subscription pour la propreté
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
// Implémente OnDestroy pour nettoyer les souscriptions (bonne pratique)
export class SuggestionDetailsComponent implements OnInit, OnDestroy {

  suggestion!: Suggestion;
  
  // PROPRIÉTÉS MANQUANTES CAUSANT LES ERREURS :
  currentSuggestionIndex: number = -1;
  routeSubscription: Subscription | undefined;
  
  // Liste statique (simule le service pour le moment)
  private suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: 'Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l\'équipe.',
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee'
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee'
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: 'Mise en place d\'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.',
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee'
    },
    {
      id: 4,
      title: 'Moderniser l\'interface utilisateur',
      description: 'Refonte complète de l\'interface utilisateur pour une meilleure expérience utilisateur.',
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente'
    },
    {
      id: 5,
      title: 'Formation à la sécurité informatique',
      description: 'Organisation d\'une formation sur les bonnes pratiques de sécurité informatique pour tous les employés.',
      category: 'Formation',
      date: new Date('2025-02-05'),
      status: 'acceptee'
    }
  ];

  // Injection du Router (non utilisé mais utile si 'goBack' était conservé)
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // ⚠️ IMPORTANT : Utiliser paramMap.subscribe() pour être réactif aux changements d'ID (navigation Précédent/Suivant)
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = Number(idParam);
        this.loadSuggestionDetails(id);
      }
    });
  }

  // Fonction pour charger les détails et mettre à jour l'index
  loadSuggestionDetails(id: number): void {
    // 1. Recherche de la suggestion correspondante
    const foundSuggestion = this.suggestions.find(s => s.id === id);

    if (foundSuggestion) {
      this.suggestion = foundSuggestion;
      
      // 2. Mise à jour de l'index
      this.currentSuggestionIndex = this.suggestions.findIndex(s => s.id === id);
    } else {
      // Gérer le cas où la suggestion n'est pas trouvée
      this.suggestion = undefined as any; // Cast pour désactiver l'affichage dans le template
      this.currentSuggestionIndex = -1;
      console.error('Suggestion non trouvée pour l\'id', id);
    }
  }

  // Accesseur pour obtenir l'ID de la suggestion suivante
  get nextSuggestionId(): number | undefined {
    // Si l'index actuel n'est pas le dernier de la liste
    if (this.currentSuggestionIndex !== -1 && this.currentSuggestionIndex < this.suggestions.length - 1) {
      return this.suggestions[this.currentSuggestionIndex + 1].id;
    }
    return undefined; // Pas de suggestion suivante
  }

  // Accesseur pour obtenir l'ID de la suggestion précédente
  get previousSuggestionId(): number | undefined {
    // Si l'index actuel n'est pas le premier de la liste
    if (this.currentSuggestionIndex > 0) {
      return this.suggestions[this.currentSuggestionIndex - 1].id;
    }
    return undefined; // Pas de suggestion précédente
  }

  // Méthode de nettoyage (OnDestroy)
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      // Nettoie l'abonnement pour éviter les fuites de mémoire (très important !)
      this.routeSubscription.unsubscribe();
    }
  }

  // La méthode 'goBack()' n'est plus strictement nécessaire si vous utilisez routerLink dans le template
  // goBack(): void {
  //   window.history.back();
  // }
}
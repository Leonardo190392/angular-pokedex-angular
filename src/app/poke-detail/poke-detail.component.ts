import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss'],
})
export class PokeDetailComponent {
  
  pokemonNext: any = '';
  pokemonBefore: any = '';
  pokemon: any = '';
  pokemonType = [];
  pokemonImg = '';

  constructor(
    private pokemonService: PokemonService,
    private activatedRouter: ActivatedRoute,
    private router:Router
  ) {
    this.activatedRouter.params.subscribe((params) => {
      this.getPokemon(params['id']);
      this.getNextPokemon(params['id']);
      if(params['id'] >= 2) {
        this.getPreviousPokemon(params['id']);
      }
    });
  }

  ngOnInit() {}

  getPokemon(id: any) {
    this.pokemonService.getPokemons(id).subscribe(
      (res) => {
        this.pokemon = res;
        this.pokemonImg = this.pokemon.sprites.other.home.front_default;
        for (let i = 0; i < this.pokemon.types.length; i++) {
          this.pokemonType = res.types[i].type.name;
          console.log(res) 
        } 
      },
    );
  }

  getNextPokemon(id: number) {
    this.pokemonService.getPokemons(+id+1).subscribe(
      (res) => {
        this.pokemonNext = res;      
      },
    );
  }

  getPreviousPokemon(id: number) {
    this.pokemonService.getPokemons(+id-1).subscribe(
      (res) => {
        this.pokemonBefore = res;  
      },
    );
  }

  nextPokemon(add: any) {
      this.router.navigateByUrl(`pokeDetail/${add+1}`)
  }

  previousPokemon(add: any) {
    if(add >= 2) {
      this.router.navigateByUrl(`pokeDetail/${add-1}`)
    }
    
  }
}

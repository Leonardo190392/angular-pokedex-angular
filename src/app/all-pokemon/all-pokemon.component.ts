import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-all-pokemon',
  templateUrl: './all-pokemon.component.html',
  styleUrls: ['./all-pokemon.component.scss']
})
export class AllPokemonComponent {

  public test: string | undefined;
  displayedColumns: string[] = ['position', 'image', 'name'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  pokemons = [];
  limit = 30;
  start = 1;
  id: any[] = [];
  searchText = '';


  @ViewChild(MatPaginator ,{static: true}) paginator!: MatPaginator;

  constructor(private pokeService: PokemonService, private router:Router) {

  }

  ngOnInit() {
    this.getPokemons();
    console.log();
  }

  getPokemons(){
    let pokemonData;
    for(let i = this.start; i<=this.limit ; i++){
      this.pokeService.getPokemons(i).subscribe(
        res => {
          pokemonData = {
            position: i,
            image: res.sprites.other.home.front_default,
            name: res.name,
            types: res.types
          };
          this.data.push(pokemonData);     
        },
      )
    }
  }


  showSinglePokemon(row: any) {
    console.log(row)
    this.router.navigateByUrl(`pokeDetail/${row}`);
  }

  loadMorePokemon() {
    this.limit+= 30 ;
    this.start+= 30;
    this.getPokemons();
  }

}

import Champion from './champion.js';
import TeamComp from './team_comp.js';
import GeneticAlgorithm from './genetic_algorithm.js';
import cloneDeep from 'lodash/cloneDeep';

let champion_information = require('../data/full_champion_data.json'); //with path

// Change these as you wish :)
const POPULATION = 100;
const CROSSOVER_RATE = 0.4;
const MUTATION_RATE = 0.8;
const NUM_GENERATIONS = 100;

function filter_champion_information(champion_ids, champ_info) {
  /*
  Given a list of champion ids, remove those from the
  champion information dict. This makes sure the Gen Alg
  cant pick champions from the enemy team comp
  :param champion_ids: List of champions from enemy team
  :param champion_information: All champion information
  :return: champion information without enemy champions
  */

  // Remove unavailable champions
  let filtered_info = cloneDeep(champion_information);
  champion_ids.forEach(function(id, index){
    delete filtered_info[id];
  });

  // Only get winrates information for the enemy team
  for (var key in filtered_info) {
    let win_rates = filtered_info[key].win_rates;
    let filtered_winrates = {}
    champion_ids.forEach(function(id, index){
      let enemy_winrate = win_rates[id];
      if (enemy_winrate !== undefined) {
        filtered_winrates[id] = enemy_winrate;
      }
    });
    filtered_info[key].win_rates = filtered_winrates;
  }
  return filtered_info;
}

function create_enemy_team_comp(champion_ids, champ_info){
  // Given a list of champion_ids, let me the base enemy team comp
  let champions = []
  champion_ids.forEach(function(id, index){
    let champion_details = champ_info[id];
    champions.push(new Champion(
      id, champion_details.name,
      champion_details.win_rates,
      champion_details.overall_win_rate,
      champion_details.total_games));
  });
  return new TeamComp(champ_info, champions);
}

function run_gen_alg(gen_alg, generations){
  for (let i = 0; i < generations; i++){
    gen_alg.iterate_population()
  }
}

export function full_gen_alg(enemy_ids, params){
  let enemy_team = create_enemy_team_comp(enemy_ids, champion_information);
  let filtered_champ_info = filter_champion_information(enemy_ids, champion_information);
  let gen_alg = new GeneticAlgorithm(
    params.population,
    params.crossover_rate,
    params.mutation_rate,
    enemy_team,
    filtered_champ_info,
    params.meta);
  run_gen_alg(gen_alg, params.generations);

  // console.log("enemy team");
  // enemy_team.champions.forEach(function(champion, index){
  //   console.log(champion.id, champion.name, champion.total_games);
  //   console.log("------------------------------------")
  // });

  // console.log("your team");
  // gen_alg.best_individuals[0].champions.forEach(function(champion, index){
  //   console.log(champion.id, champion.name);
  //   console.log(champion.total_games, champion.overall_win_rate);
  //   console.log(champion.matchups);
  //   console.log("------------------------------------")
  // });

  return gen_alg.best_individuals[0].champions
}

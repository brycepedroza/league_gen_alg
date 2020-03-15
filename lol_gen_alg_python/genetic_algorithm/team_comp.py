import random
import logging
import math
import copy
from genetic_algorithm.champion import Champion
logger = logging.getLogger()


class TeamComp:
    def __init__(self, champion_information: dict, champions: [Champion],
                 mutation_rate=0.9):
        """
        Create a new team comp. Champions either supplied or list of avilable
        champions is provided
        :param champion_information: information for available champions
        :param champions: Given champion list for the team Comp
        :param mutation_rate: rate to mutate. 9% by default
        """
        if champions:
            self.champions = champions
        else:
            self.champions = TeamComp.generate_team_comp(champion_information)
        self.fitness = -1
        self.mutation_rate = mutation_rate

    def mutate(self, available_champions: dict, individual=-1):
        """
        We mutate one of the champions. This means replacing a current champion.
        The list of available champions is all champions minus base team comp
        and this current team comp If our mutation rate is .9,
        and the random is less or equal then we mutate, thus simulating a
        90% mutation rate.
        :return:
        """
        if random.uniform(0, 1) <= self.mutation_rate:

            # Then we mutate one of the champions!
            index = random.randint(0, 4)
            current_champion_ids = [x.id for x in self.champions]
            new_champion = TeamComp.make_new_champion(
                available_champions, current_champion_ids)

            logger.debug(f"Replacing individual {individual}'s "
                         f"{self.champions[index].name} with {new_champion.name}")
            self.champions[index] = new_champion

    def calculate_fitness(self, base_team_composition: [Champion]):
        avg_winrate = 0
        total_calculated = 0

        for your_champion in self.champions:
            for enemy_champion in base_team_composition:
                win_rate = your_champion.check_winrate(enemy_champion.id)
                if win_rate:
                    avg_winrate += win_rate
                    total_calculated += 1

        avg_winrate = avg_winrate/total_calculated
        # Log base 10 calculation supports teams with more available winrates
        fitness = avg_winrate * math.log(total_calculated, 10)
        self.fitness = fitness

    def is_on_team(self, champion_id) -> bool:
        """
        Given a champion_id, check if it is on current team
        :param champion_id: ID to check for
        :return: true if on team, else false
        """
        for champion in self.champions:
            if champion.id == champion_id:
                return True
        return False

    @staticmethod
    def generate_team_comp(champion_details: dict) -> [Champion]:
        """
        Given all matchup information. Create a random team comp
        :param champion_details: Dict containing all matchup information for all champions
        :return: list of Champions
        """
        champions = []
        ids_chosen = []
        for i in range(5):
            new_champion = TeamComp.make_new_champion(champion_details, ids_chosen)
            champions.append(new_champion)
            ids_chosen.append(new_champion.id)
        return champions

    @staticmethod
    def make_new_champion(champion_details: dict, current_ids: list) -> Champion:
        """
        Make a new RANDOM champion
        :param current_ids: Current IDs
        :param champion_details: Dict containing all mactchup information for all champions
        :return: A new champion
        """
        # Make sure champion selected isn't in the list of current champions
        champion_id = random.choice(list(champion_details))
        while champion_id in current_ids and len(current_ids) > 0:
            champion_id = random.choice(list(champion_details))
        champion_details = champion_details.get(champion_id)
        return Champion(
            champion_id, champion_details.get("name"),
            champion_details.get("win_rates"))

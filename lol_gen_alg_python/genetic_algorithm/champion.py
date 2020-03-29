import json
import math
import logging
logger = logging.getLogger()


class Champion:
    def __init__(self, id, name, matchups):
        self.id = id
        self.name = name
        self.matchups = matchups

    def check_winrate(self, id_to_check):
        """
        Given a champion ID and the current champions matchups,
        get back their win rate against the given champion.
        If there is no data for this champion return None
        :param id_to_check: ID to check as a string
        :return: Win rate as a float or None
        """
        champion = self.matchups.get(id_to_check)
        if champion:
            win_rate = champion.get("winrate")/100
            log_games = math.log(champion.get("games"), 10)
            res = win_rate * log_games
            return res
        else:
            return None
        # return champion.get("winrate")/100 * math.log(champion.get("games"), 10) \
        #     if champion else None
        # return champion.get("winrate")/100  \
        #     if champion else None

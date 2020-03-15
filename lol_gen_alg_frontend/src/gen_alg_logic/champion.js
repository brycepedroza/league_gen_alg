export default class Champion {
	constructor(id, name, matchups){
		this.id = id;
		this.name = name;
		this.matchups = matchups;
	}

	check_winrate(id_to_check){
		/*
        Given a champion ID and the current champions matchups,
        get back their win rate against the given champion.
        If there is no data for this champion return null
        :param id_to_check: ID to check as a string
        :return: Win rate as a float or None
		*/
		champion = this.matchups[id_to_check];
		var win_rate = champion === undefined ? null :  
		champion.winrate/100 * Math.log10(champion.games);
		return win_rate
	}

	
}
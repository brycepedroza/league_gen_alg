import React, { Component } from 'react';
import { Button, List, Input, Row, Col, Spin } from 'antd';

let gen_alg = require("../gen_alg_logic/main.js");


const champion_json = require("../data/full_champion_data.json");

let champion_list = [];
for (var id in champion_json) {
	champion_list.push({
		id: id, 
		name: champion_json[id].name,
		total_games: champion_json[id].total_games,
		overall_win_rate: champion_json[id].overall_win_rate
	});	
}
champion_list.sort((a,b) => (a.name > b.name) ? 1:-1)

function filter_champions(filter){
	if (filter.trim() === "") {
		return champion_list;
	}
	else {
		filter = filter.toLowerCase();
		let filtered_list = [];
		champion_list.forEach(function(item, index){
			if (item.name.toLowerCase().includes(filter)){
				filtered_list.push(item);
			}
		})
		return filtered_list;
	}
}

export default class ChampionList extends Component{
	constructor(props) {
		super(props);
		this.state = {
			available_champs:champion_list,
			selected_champs: new Set(),
			returned_champs: [],
			loading: false,
			count:0
		}
	}

	handle_filter(e){
		this.setState({
			available_champs: filter_champions(e.target.value)
		})
	}

	select_champion(item){
		let champs = this.state.selected_champs;
		let size = champs.size;
		champs.add(item);
		if(champs.size === size) {
			champs.delete(item);
		}
		else if (champs.size > 5) {
			let first_champ = champs.values().next().value;
			champs.delete(first_champ);
		}
		this.setState({
			selected_champs: champs
		})
	}

	lock_team(){
		this.setState({loading: true}, () => {
			let champion_ids = [];
			for (let item of this.state.selected_champs) {champion_ids.push(item.id)}
			this.setState({loading: false, returned_champs: gen_alg.full_gen_alg(champion_ids)})			
		})	
	}


	render(){
		let spinner;
		if (this.state.loading) {
			console.log("I SHOULD SAY LOADING")
			spinner = <p> LOADING {this.state.count} </p>
		}
		else {
			console.log("I SHOULD NOT SAY LOADING")
			spinner = <p> NOT LOADING {this.state.count} </p>
		}
		return(
			<div className="box">
				{spinner}
				<Input 
					style={{maxWidth: 400, margin: 10}}
					placeholder="Search for a Champion"
					onChange={this.handle_filter.bind(this)}/>

				<Row gutter={8}>

					<Col style={{minHeight: "100%"}} className="box" xs={{span:24, order:2}} sm={{span:6, order:1}} lg={{span:5, order:1}}>
					 	{Array.from(this.state.selected_champs).map((champ)=>
				 			<Row className="your_champions" key={champ.id} gutter={4}>
				 				<Col span={8} className="center_div"> 
					 				<img className="sidebar_champ_image" src={require('../images/'+champ.name+'.png')}/>
				 				</Col>
				 				<Col span={16} className="center_div" style={{textAlign: "left"}}> 
									<h3 style={{margin:0}}>{champ.name}</h3>
				 					<p style={{margin:0}}>{champ.total_games}</p>
				 					<p style={{margin:0}}>{champ.overall_win_rate}</p>				 				
			 					</Col>
				 			</Row>
				 		)}
					</Col>

					<Col style={{height: "100%"}} className="box" xs={{span:24, order:1}} sm={{span:12, order:2}} lg={{span:14, order:2}}>
					 	<List className="champ_select"
						    grid={{
						      gutter: 0,
						      xs: 3,
						      sm: 3,
						      md: 4,
						      lg: 5,
						      xl: 5,
						      xxl: 6,
						    }}
						    dataSource={this.state.available_champs}
						    renderItem={item => (
					      		<List.Item className="champion_select_box" onClick={this.select_champion.bind(this, item)}>
					 				<img className="champ_select_image" src={require('../images/'+item.name+'.png')}/>
				      				<p>{item.name}</p>
					      		</List.Item>
						    )}
					  	/>
					</Col>

					<Col style={{minHeight: "100%"}} className="box" xs={{span:24, order:4}} sm={{span:6, order:3}} lg={{span:5, order:3}}>
					 	{this.state.loading ? <p> loading </p> : <p> loading f </p>}
					 	{Array.from(this.state.returned_champs).map((champ)=>
				 			<Row className="your_champions" key={champ.id} gutter={8}>

				 				<Col span={10} className="center_div"> 
									{Object.entries(champ.matchups).map(([id, enemy]) => 
										<Row key={id}>
											<Col span={3}>
					 							<img className="inline_champ_image" src={require('../images/'+champion_json[id].name+'.png')}/>
											</Col>
											<Col span={21}>
				 								<p style={{margin:0, textAlign: "left"}} key={id}>{enemy.winrate} | {enemy.games}  </p>				 				
											</Col>
										</Row>
									)}
								</Col>

				 				<Col span={6} className="center_div" style={{textAlign: "right"}}> 
									<h3 style={{margin:0}}>{champ.name}</h3>
				 					<p style={{margin:0}}>{champ.total_games}</p>
				 					<p style={{margin:0}}>{champ.overall_win_rate}</p>				 				
			 					</Col>

				 				<Col span={8} className="center_div"> 
					 				<img className="sidebar_champ_image" src={require('../images/'+champ.name+'.png')}/>
				 				</Col>

				 			</Row>
				 		)}	

				 	</Col>

					<Col className="box" xs={{span:24, order:3}} md={{span:24, order:4}}>

						<div style={{margin: 20}}>
							<Button 
								type="primary" 
								shape="round" 
								size="large"
								disabled = {this.state.selected_champs.size < 5 ? true : false}
								onClick={this.lock_team.bind(this)}
							> 
								Lock In 
							</Button>
						</div>

					</Col>

				</Row>

			</div>
		)
	}
}

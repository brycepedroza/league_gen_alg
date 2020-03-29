import React, { Component } from 'react';
import { Button, Layout, List, Card, Input, Row, Col} from 'antd';

let gen_alg = require("../gen_alg_logic/main.js");


const champion_json = require("../data/full_champion_data.json");

let champion_list = [];
for (var key in champion_json) {
	champion_list.push({key: key, name: champion_json[key].name});	
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
			selected_champs: new Set()
		}
	}

	handle_filter(e){
		console.log(e.target.value);
		this.setState({
			available_champs: filter_champions(e.target.value)
		})
	}

	select_champion(item){
		console.log(item);
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
		}, () => {for (let item of this.state.selected_champs) console.log(item.name)})
	}

	lock_team(){
		let champion_ids = [];
		for (let item of this.state.selected_champs) champion_ids.push(item.key)
		console.log(gen_alg.full_gen_alg(champion_ids));

	}



	render(){
		return(
			<div className="box">
				<Input 
					style={{maxWidth: 400, margin: 10}}
					placeholder="Search for a Champion"
					onChange={this.handle_filter.bind(this)}/>
				<Row style={{height: "100%"}}>
					<Col className="box" sm={24} md={6} lg={5}>
					 	{Array.from(this.state.selected_champs).map((champ)=>
					 			<div className="box" style={{height: "20%"}} key={champ.key}>{champ.name}</div>
					 		)}
					</Col>
					<Col className="box" sm={24} md={12} lg={14}>
					 	<List style={{maxHeight: 700, overflowY: "scroll", overflowX: "hidden"}}
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
						      <List.Item className="champion_box" onClick={this.select_champion.bind(this, item)}>
						      	<p>{item.name}</p>
						      </List.Item>
						    )}
						  />
					</Col>
					<Col className="box" xs={24} sm={24} md={6} lg={5}>
					 	Col
					</Col>
				</Row>
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
			</div>
		)
	}
}

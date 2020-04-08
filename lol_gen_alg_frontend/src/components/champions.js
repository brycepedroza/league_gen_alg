import React, { Component } from 'react';
import { Button, List, Input, Row, Col, Spin } from 'antd';

let gen_alg = require("../gen_alg_logic/main.js");

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

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
		this.setState({loading: true}, () => setTimeout(this.select_team.bind(this), 0))
	}

	select_team(){
		let champion_ids = [];

		for (let item of this.state.selected_champs) {champion_ids.push(item.id)}
		this.setState({loading: false, returned_champs: gen_alg.full_gen_alg(champion_ids)})
	}


	render(){
		return(
			<div className="box">
				<Input
          			className="champion_input"
					placeholder="Search for a Champion"
					onChange={this.handle_filter.bind(this)}/>

				<Row gutter={5}>

					<Col style={{minHeight: "100%"}} className="box" xs={{span:24, order:2}} sm={{span:6, order:1}} lg={{span:6, order:1}}>
					 	{Array.from(this.state.selected_champs).map((champ)=>
				 			<Row className="your_champions" key={champ.id} gutter={5}>
				 				<Col span={5} className="center_div">
					 				<img className="sidebar_your_champ_image" src={require('../images/'+champ.name+'.png')}/>
				 				</Col>
				 				<Col span={19} className="center_div" style={{textAlign: "left"}}>
									<h3 style={{margin:0}}>{champ.name}</h3>
				 					<p style={{margin:0}}>{champ.total_games}</p>
				 					<p style={{margin:0}}>{champ.overall_win_rate}</p>
			 					</Col>
				 			</Row>
				 		)}
					</Col>

					<Col style={{minHeight: "100%"}} className="box" xs={{span:24, order:1}} sm={{span:10, order:2}} lg={{span:12, order:2}}>
			            <div className="center_div">
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
					</Col>

          { this.state.loading?
            <Col style={{minHeight: "100%"}} className="center_div" xs={{span:24, order:4}} sm={{span:8, order:3}} lg={{span:6, order:3}}>
                <Spin size="large" />
            </Col>
            :
            <Col style={{minHeight: "100%"}} className="box" xs={{span:24, order:4}} sm={{span:8, order:3}} lg={{span:6, order:3}}>
              {Array.from(this.state.returned_champs).map((champ)=>
                <Row className="your_champions" key={champ.id} gutter={2}>

                  <Col span={12} className="center_div">
                    {Object.entries(champ.matchups).map(([id, enemy]) =>
                      <Row key={id} gutter={5}>
                        <Col span={3}>
                          <img className="inline_champ_image" src={require('../images/'+champion_json[id].name+'.png')}/>
                        </Col>
                        <Col span={21}>
                          <p style={{margin:0, textAlign: "left"}} key={id}>{enemy.winrate} | {enemy.games}  </p>
                        </Col>
                      </Row>
                    )}
                  </Col>

                  <Col span={7} className="center_div" style={{textAlign: "right"}}>
                    <h3 style={{margin:0}}>{champ.name}</h3>
                    <p style={{margin:0}}>{champ.total_games}</p>
                    <p style={{margin:0}}>{champ.overall_win_rate}</p>
                  </Col>

                  <Col span={5} className="center_div">
                    <img className="sidebar_enemy_champ_image" src={require('../images/'+champ.name+'.png')}/>
                  </Col>

                </Row>
              )}
            </Col>
          }

				</Row>

			</div>
		)
	}
}

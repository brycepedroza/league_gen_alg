import React from 'react';
import { Button, List, Input, Row, Col, Spin, Checkbox, Card, Slider, InputNumber, Collapse } from 'antd';

const { Panel } = Collapse;

export default class Mychart extends React.Component {
   constructor(props) {
     super(props);
   }

   render() {
     return (
       <Collapse bordered={false} style={{textAlign: "left", margin: 10}}>
         <Panel style={{borderBottomWidth: "0px"}} header="Advanced Options" key="1">
           <div className="center_div" style={{textAlign: 'left'}}>
             <Row  style={{marginBottom: 10}}>
               <Col span={12}>
                 <Checkbox onChange={() => this.props.update(!this.props.params.meta, "meta")} checked={this.props.params.meta}>Meta Team Comp?</Checkbox>
               </Col>
             </Row>
             <p style={{margin: 0}}> Population Size </p>
             <Row style={{marginBottom: 10}}>
               <Col span={8}>
                 <Slider min={50} max={200} value={this.props.params.population} onChange={(value) => this.props.update(value, "population")}/>
               </Col>
               <Col span={4}>
                 <InputNumber min={50} max={200} value={this.props.params.population} onChange={(value) => this.props.update(value, "population")}/>
               </Col>
             </Row>
             <p style={{margin: 0}}> Number of Generations </p>
             <Row style={{marginBottom: 10}}>
               <Col span={8}>
                 <Slider min={10} max={1000} />
               </Col>
               <Col span={4}>
                 <InputNumber min={10} max={1000} />
               </Col>
             </Row>
             <p style={{margin: 0}}> Crossover Rate </p>
             <Row style={{marginBottom: 10}}>
               <Col span={8}>
                 <Slider min={0} max={1} step={0.01} />
               </Col>
               <Col span={4}>
                 <InputNumber min={0} max={1} step={0.01} />
               </Col>
             </Row>
             <p style={{margin: 0}}> Mutation Rate </p>
             <Row style={{marginBottom: 10}}>
               <Col span={8}>
                 <Slider min={0} max={1} step={0.01} />
               </Col>
               <Col span={4}>
                 <InputNumber min={0} max={1} step={0.01} />
               </Col>
             </Row>
             <p><i> warning: the higher the values, the longer calculations will take.</i></p>

           </div>
         </Panel>
       </Collapse>
     )
   }
}

// /*<Checkbox onChange={this.change_meta.bind(this)} checked={this.state.meta}>Meta Team Comp?</Checkbox>*/

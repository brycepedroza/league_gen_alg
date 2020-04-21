import Chart from "react-apexcharts";
import React from 'react';
import { Button, Typography } from 'antd';
const { Title } = Typography;
const { Text } = Typography;

export default class Header extends React.Component {

       render() {
         return (
            <div className="header_div">
              <Title> Counter Pick </Title>
              <div style={{margin: 10}}><Text> Using a genetic algorithm for advanced team composition analysis. </Text></div>
              <div style={{margin: 10}}>
                <Button onClick={this.props.executeScroll}> Learn More </Button>
              </div>
            </div>
         )}
}

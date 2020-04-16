import Chart from "react-apexcharts";
import React from 'react';


export default class Mychart extends React.Component {
       constructor(props) {
         super(props);
         console.log(props)
         this.state = {
           series: [
             {
               name: 'Frequency',
               type: 'area',
               data: this.props.graph_data.frequencies
             },
             {
               name: 'Percentile',
               type: 'scatter',
               data: this.props.graph_data.percentiles
             },
             {
               name: 'TeamWr',
               type: 'column',
               data: this.props.graph_data.team_wr
             }
           ],
           options: {
             chart: {
               zoom: {
                 enabled: false
               },
               height: 350,
               toolbar: {
                 show: false,
               }
             },
             fill: {
               type:'solid',
               opacity: [0.35, 0.35, 1],
             },
             markers: {
               size: [0, 0, 0]
             },
             tooltip: {
              shared: true,
            },
             legend: {
               show: false
             },
             xaxis: {
               type: 'numeric',
               tickAmount: 12,
               min: this.props.graph_data.x_low,
               max:this.props.graph_data.x_high,
             },
             yaxis: {
               min: this.props.graph_data.y_low,
               max:this.props.graph_data.y_high,
             }
           }
         };
       }

       componentDidUpdate(prevProps) {
         if (this.props.graph_data.team_wr !== prevProps.graph_data.team_wr) {
           let series = JSON.parse(JSON.stringify(this.state.series));
           console.log("here")
           series[2].data = this.props.graph_data.team_wr
           this.setState({
             series: series
           })
         }
       }

       render() {
         console.log(this.state.series[0])
         return (
             <div id="chart">
         <Chart options={this.state.options} series={this.state.series} type="line" height={350} />
        </div>
)}
}

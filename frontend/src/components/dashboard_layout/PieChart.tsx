import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Import the variable-pie module
import VariablePie from 'highcharts/modules/variable-pie';

// Initialize the variable-pie module
if (typeof VariablePie === 'function') {
  VariablePie(Highcharts);
}

// Chart options
const options = {
  chart: {
    type: 'variablepie',
  },
  title: {
    text: 'Highcharts Variable Pie Chart',
  },
  tooltip: {
    headerFormat: '',
    pointFormat:
      '<span style="color:{point.color}">\u25CF</span> <b>{point.name}</b><br/>' +
      'Area (y): <b>{point.y}</b><br/>' +
      'Radius (z): <b>{point.z}</b><br/>',
  },
  series: [
    {
      minPointSize: 10,
      innerSize: '20%',
      zMin: 0,
      name: 'countries',
      data: [
        { name: 'Spain', y: 505370, z: 92.9 },
        { name: 'France', y: 551500, z: 118.7 },
        { name: 'Poland', y: 312685, z: 124.6 },
        { name: 'UK', y: 243610, z: 101.5 },
        { name: 'Italy', y: 301230, z: 120 },
      ],
    },
  ],
};

const VariablePieChart = () => {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default VariablePieChart;
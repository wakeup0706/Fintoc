import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import VariablePie from 'highcharts/modules/variable-pie';
if (typeof VariablePie === 'function') {
  VariablePie(Highcharts);
}

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
        { name: '30%', y: 30, z: 92.9 },
        { name: '15%', y: 15, z: 118.7 },
        { name: '45%', y: 45, z: 124.6 },
        { name: '50%', y: 50, z: 101.5 },
      ],
    },
  ],
};

const VariablePieChart = () => {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default VariablePieChart;
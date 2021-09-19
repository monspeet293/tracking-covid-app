import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import moment from 'moment';
import { Button, ButtonGroup } from '@material-ui/core';

const generateOptions = (data) => {
    const categories = data.map(item => moment(item.Date).format('DD/MM/YYYY'));

    return {
        chart: {
            height: 500,
        },
        title: {
            text: 'Total cases',
        },
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        colors: ['#feda6a'],
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: 'Total Cases',
                data: data.map((item) => item.Confirmed),
            },
        ],

    }
}

export default function LineChart({ data }) {
    const [options, setOptions] = useState({});
    const [reportType, setReportType] = useState('all');

    useEffect(() => {
        let customData = [];

        switch (reportType) {
            case 'all':
                customData = data;
                break;
            case '30':
                customData = data.slice(data.length - 30);
                break;
            case '7':
                customData = data.slice(data.length - 7);
                break;
            default:
                customData = data;
                break;
        }

        setOptions(generateOptions(customData));
    }, [data, reportType]);

    return (
        <div>
            <ButtonGroup size="small" style={{ display: 'flex', justifyContent: 'flex-end' }} >
                <Button color={reportType === 'all' ? 'secondary' : ''} variant="contained" style={reportType === 'all' ? { background: '#2b2e37' } : { background: '#feda6a' }} onClick={() => setReportType('all')}>
                    All
                </Button>
                <Button color={reportType === '30' ? 'secondary' : ''} variant="contained" style={reportType === '30' ? { background: '#2b2e37' } : { background: '#feda6a' }} onClick={() => setReportType('30')}>
                    30 days
                </Button>
                <Button color={reportType === '7' ? 'secondary' : ''} variant="contained" style={reportType === '7' ? { background: '#2b2e37' } : { background: '#feda6a' }} onClick={() => setReportType('7')}>
                    7 days
                </Button>
            </ButtonGroup>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

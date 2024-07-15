import React from 'react';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard({ profile }) {
  const weightData = {
    labels: profile?.weightEntries?.slice(-7).map(entry => new Date(entry.date).toLocaleDateString()) || [],
    datasets: [
      {
        label: 'Weight (kg)',
        data: profile?.weightEntries?.slice(-7).map(entry => entry.weight) || [],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const hormoneData = {
    labels: profile?.hormoneEntries?.slice(-7).map(entry => new Date(entry.date).toLocaleDateString()) || [],
    datasets: [
      {
        label: 'Hormone Levels',
        data: profile?.hormoneEntries?.slice(-7).map(entry => entry.level) || [],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Last 7 Entries',
      },
    },
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Dashboard</CardTitle>
        <Row>
          <Col md={6}>
            <Line options={options} data={weightData} />
          </Col>
          <Col md={6}>
            <Line options={options} data={hormoneData} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default Dashboard;
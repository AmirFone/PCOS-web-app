import React from 'react';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { LineChart, Line as RechartsLine, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend as RechartsLegend, ResponsiveContainer } from 'recharts';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const symptoms = ['Acne', 'Mood', 'Pain', 'Fatigue', 'Bloating'];

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

  const analyzeTrends = () => {
    const trends = {};
    symptoms.forEach(symptom => {
      const values = profile?.symptomEntries?.map(entry => entry[symptom]).filter(v => v !== undefined) || [];
      if (values.length > 0) {
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        const recentAvg = values.slice(-7).reduce((a, b) => a + b, 0) / Math.min(values.length, 7);
        trends[symptom] = recentAvg > avg ? 'increasing' : recentAvg < avg ? 'decreasing' : 'stable';
      }
    });
    return trends;
  };

  const trends = analyzeTrends();

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Dashboard</CardTitle>
        <Row>
          <Col md={4}>
            <Line options={options} data={weightData} />
          </Col>
          <Col md={4}>
            <Line options={options} data={hormoneData} />
          </Col>
          <Col md={4}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={profile?.symptomEntries?.slice(-30) || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                <YAxis />
                <RechartsTooltip />
                <RechartsLegend />
                {symptoms.map((symptom, index) => (
                  <RechartsLine 
                    type="monotone" 
                    dataKey={symptom} 
                    stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} 
                    key={index} 
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-3">
              <h6>Symptom Trends:</h6>
              <ul>
                {Object.entries(trends).map(([symptom, trend]) => (
                  <li key={symptom}>{symptom}: {trend}</li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default Dashboard;
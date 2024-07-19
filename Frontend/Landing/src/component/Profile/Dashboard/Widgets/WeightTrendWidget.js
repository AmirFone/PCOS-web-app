import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useAuth } from '../../../../context/AuthContext';
import { db } from '../../../../firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

const WeightTrendWidget = ({ onRemove, widgetId }) => {
  const [weightData, setWeightData] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchWeightData = async () => {
      if (currentUser) {
        try {
          const q = query(
            collection(db, 'weightEntries'),
            where('userId', '==', currentUser.uid),
            orderBy('date', 'desc'),
            limit(30)
          );
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map(doc => ({
            date: doc.data().date.toDate(),
            weight: doc.data().weight
          }));
          setWeightData(data.reverse());
        } catch (error) {
          console.error("Error fetching weight data:", error);
        }
      }
    };
    fetchWeightData();
  }, [currentUser]);

  const chartData = {
    labels: weightData.map(entry => entry.date.toLocaleDateString()),
    datasets: [
      {
        label: 'Weight (kg)',
        data: weightData.map(entry => entry.weight),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="widget">
      <h3>Weight Trend</h3>
      <Line data={chartData} options={options} id={`weight-chart-${widgetId}`} />
      <button onClick={onRemove}>Remove Widget</button>
    </div>
  );
};

export default WeightTrendWidget;
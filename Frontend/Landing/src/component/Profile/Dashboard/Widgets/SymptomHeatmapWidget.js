import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { db } from '../../../../firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { HeatMapGrid } from 'react-grid-heatmap';

const SymptomHeatmapWidget = ({ onRemove }) => {
  const [symptomData, setSymptomData] = useState([]);
  const { currentUser } = useAuth();
  const symptoms = ['Acne', 'Mood', 'Pain', 'Fatigue', 'Bloating'];

  useEffect(() => {
    const fetchSymptomData = async () => {
      if (currentUser) {
        const q = query(
          collection(db, 'symptomEntries'),
          where('userId', '==', currentUser.uid),
          orderBy('date', 'desc'),
          limit(7)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());
        setSymptomData(data.reverse());
      }
    };
    fetchSymptomData();
  }, [currentUser]);

  const xLabels = symptomData.map(entry => new Date(entry.date).toLocaleDateString());
  const yLabels = symptoms;
  const data = symptoms.map(symptom =>
    symptomData.map(entry => entry[symptom] || 0)
  );

  return (
    <div className="widget">
      <h3>Symptom Heatmap</h3>
      <HeatMapGrid
        data={data}
        xLabels={xLabels}
        yLabels={yLabels}
        cellRender={(x, y, value) => (
          <div title={`${yLabels[y]} on ${xLabels[x]}: ${value}`}>{value}</div>
        )}
        xLabelsStyle={() => ({
          fontSize: '0.8rem',
          textTransform: 'uppercase',
        })}
        yLabelsStyle={() => ({
          fontSize: '0.8rem',
          textTransform: 'uppercase',
        })}
        cellStyle={(_x, _y, ratio) => ({
          background: `rgb(12, 160, 44, ${ratio})`,
          fontSize: '0.8rem',
          color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
        })}
        cellHeight="2rem"
        xLabelsPos="top"
        yLabelsPos="left"
      />
      <button onClick={onRemove}>Remove Widget</button>
    </div>
  );
};

export default SymptomHeatmapWidget;
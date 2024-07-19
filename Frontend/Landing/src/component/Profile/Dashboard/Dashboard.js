import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useAuth } from '../../../context/AuthContext';
import { db } from '../../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import WeightTrendWidget from './Widgets/WeightTrendWidget';
import SymptomHeatmapWidget from './Widgets/SymptomHeatmapWidget';
// import MenstrualCycleWidget from './Widgets/MenstrualCycleWidget';
// import MedicationAdherenceWidget from './Widgets/MedicationAdherenceWidget';
// import HormoneLevelWidget from './Widgets/HormoneLevelWidget';
// import MoodVsSymptomWidget from './Widgets/MoodVsSymptomWidget';
// import SleepQualityWidget from './Widgets/SleepQualityWidget';
// import ExerciseFrequencyWidget from './Widgets/ExerciseFrequencyWidget';
// import NutritionalBalanceWidget from './Widgets/NutritionalBalanceWidget';
// import WaterIntakeWidget from './Widgets/WaterIntakeWidget';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const widgetComponents = {
  weightTrend: WeightTrendWidget,
  symptomHeatmap: SymptomHeatmapWidget,
  // menstrualCycle: MenstrualCycleWidget,
  // medicationAdherence: MedicationAdherenceWidget,
  // hormoneLevel: HormoneLevelWidget,
  // moodVsSymptom: MoodVsSymptomWidget,
  // sleepQuality: SleepQualityWidget,
  // exerciseFrequency: ExerciseFrequencyWidget,
  // nutritionalBalance: NutritionalBalanceWidget,
  // waterIntake: WaterIntakeWidget,
};

const Dashboard = () => {
  const [layout, setLayout] = useState([]);
  const [widgets, setWidgets] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setLayout(data.dashboardLayout || []);
            setWidgets(data.dashboardWidgets || []);
          }
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        }
      }
    };
    fetchDashboard();
  }, [currentUser]);

  const updateFirestore = async (data) => {
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid);
      try {
        await setDoc(userRef, data, { merge: true });
      } catch (error) {
        console.error("Error updating Firestore:", error);
      }
    }
  };

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
    updateFirestore({ dashboardLayout: newLayout });
  };

  const handleAddWidget = (widgetType) => {
    if (!widgetType) return;
    const newWidget = {
      i: `${widgetType}-${Date.now()}`,
      x: (widgets.length * 2) % 12,
      y: 0,  // Use 0 instead of Infinity
      w: 2,
      h: 2,
      type: widgetType,
    };
    const updatedWidgets = [...widgets, newWidget];
    setWidgets(updatedWidgets);
    updateFirestore({ dashboardWidgets: updatedWidgets });
  };

  const handleRemoveWidget = (widgetId) => {
    const updatedWidgets = widgets.filter((widget) => widget.i !== widgetId);
    setWidgets(updatedWidgets);
    updateFirestore({ dashboardWidgets: updatedWidgets });
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <select onChange={(e) => handleAddWidget(e.target.value)}>
        <option value="">Add Widget</option>
        {Object.keys(widgetComponents).map((key) => (
          <option key={key} value={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </option>
        ))}
      </select>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        onLayoutChange={handleLayoutChange}
      >
        {widgets.map((widget) => {
          const WidgetComponent = widgetComponents[widget.type];
          return (
            <div key={widget.i} data-grid={widget}>
              <WidgetComponent
                onRemove={() => handleRemoveWidget(widget.i)}
                widgetId={widget.i}
              />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
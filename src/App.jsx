import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Coping from './pages/Coping';
import Medication from './pages/Medication';

import Contact from './pages/Contact';
import QuickHelpButton from './components/QuickHelpButton';
import Breathing from './components/CopingTechniques/Breathing';
import Mindfulness from './components/CopingTechniques/Mindfulness';
import Relaxation from './components/CopingTechniques/Relaxation';
import Visualisation from './components/CopingTechniques/Visualization';
import Affirmations from './components/CopingTechniques/Affirmations';
import Activity from './components/CopingTechniques/Activity';
import Journaling from './components/CopingTechniques/Journaling';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/relevia/" element={<Home />} />
        <Route path="/relevia/about" element={<About />} />
        <Route path="/relevia/coping" element={<Coping />} />
        <Route path="/relevia/medication" element={<Medication />} />
        <Route path="/relevia/contact" element={<Contact />} />



    
        <Route path="/relevia/coping/mindfulness" element={<Mindfulness />} />
        <Route path="/relevia/coping/breathing" element={<Breathing />} />
        <Route path="/relevia/coping/relaxation" element={<Relaxation />} />
        <Route path="/relevia/coping/visualization" element={<Visualisation />} />
        <Route path="/relevia/coping/affirmations" element={<Affirmations />} />
        <Route path="/relevia/coping/activity" element={<Activity />} />
        <Route path="/relevia/coping/journaling" element={<Journaling />} />



      </Routes>
      <QuickHelpButton />
    </Router>
  );
}

export default App;
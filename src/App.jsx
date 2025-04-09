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
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/coping" element={<Coping />} />
        <Route path="/medication" element={<Medication />} />
        <Route path="/contact" element={<Contact />} />



        <Route path="/coping/breathing" element={<Breathing />} />
        <Route path="/coping/mindfulness" element={<Mindfulness />} />
        <Route path="/coping/breathing" element={<Breathing />} />
        <Route path="/coping/relaxation" element={<Relaxation />} />
        <Route path="/coping/visualization" element={<Visualisation />} />
        <Route path="/coping/affirmations" element={<Affirmations />} />
        <Route path="/coping/activity" element={<Activity />} />
        <Route path="/coping/journaling" element={<Journaling />} />



      </Routes>
      <QuickHelpButton />
    </Router>
  );
}

export default App;
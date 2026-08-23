import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
// Add page imports here
import Home from './pages/Home';
import AcademicPaths from './pages/AcademicPaths';
import ExtracurricularTracks from './pages/ExtracurricularTracks';
import SummerPrograms from './pages/SummerPrograms';
import ScholarshipFinder from './pages/ScholarshipFinder';
import OutreachLab from './pages/OutreachLab';
import OurMission from './pages/OurMission';
import Layout from './components/Layout';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/academic-paths" element={<AcademicPaths />} />
            <Route path="/extracurricular-tracks" element={<ExtracurricularTracks />} />
            <Route path="/summer-programs" element={<SummerPrograms />} />
            <Route path="/scholarship-finder" element={<ScholarshipFinder />} />
            <Route path="/outreach-lab" element={<OutreachLab />} />
            <Route path="/our-mission" element={<OurMission />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Enter from "../components/enter";
import Timeline from "../components/timeline";
import TimelineV2 from "../components/timelinev2";
import Music from "../components/music";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Enter />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/timeline2" element={<TimelineV2 />} />
        <Route path="/music" element={<Music />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

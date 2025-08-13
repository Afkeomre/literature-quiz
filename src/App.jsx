import { Route, Routes } from 'react-router';
import Welcome from './pages/Welcome';
import Quiz from './pages/Quiz';
import Result from './pages/Result';

function App() {
  return (
    <Routes>
      <Route index element={<Welcome />} />
      <Route path="quiz" element={<Quiz />} />
      <Route path="result" element={<Result />} />
    </Routes>
  );
}

export default App;

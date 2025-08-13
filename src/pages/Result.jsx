import { useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../layouts/Layout';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import Error from '../components/ui/Error';
import { saveProgress, loadProgress } from '../helpers/storageProgress';
import { setProgress, fetchResult } from '../store/progressSlice';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!location.state?.fromQuizEnd) {
    return <Navigate to="/" replace />;
  }

  const dispatch = useDispatch();
  const { progress, status, error } = useSelector((state) => state.progress);

  const layoutClasses = {
    sectionClass: 'result',
    containerClass: 'result__container',
    contentClass: 'result__content',
  };

  useEffect(() => {
    const saved = loadProgress();

    if (saved) {
      dispatch(setProgress(saved));
    }
  }, []);

  useEffect(() => {
    if (progress.questionsQuantity === 0) return;

    const knowledgeLevel =
      progress.score <= progress.questionsQuantity * 0.33
        ? 'low'
        : progress.score > progress.questionsQuantity * 0.33 &&
          progress.score < progress.questionsQuantity * 0.66
        ? 'middle'
        : progress.score >= progress.questionsQuantity * 0.66
        ? 'high'
        : '';

    dispatch(fetchResult(knowledgeLevel));
  }, [progress.score, progress.questionsQuantity]);

  useEffect(() => {
    if (status === 'resolved') saveProgress(progress);
  }, [progress, status]);

  return (
    <Layout {...layoutClasses}>
      {error && <Error message={error} />}
      {status === 'loading' && <Loader />}
      {status === 'resolved' && (
        <>
          <h1 className="result__title">Ваш результат</h1>
          <div className="result__score-group">
            <div className="result__score">
              {progress.score}/{progress.questionsQuantity}
            </div>
            <p className="result__text">{progress.scoreText}</p>
          </div>
          <Button onClick={() => navigate('/', { replace: true })}>
            Играть снова
          </Button>
        </>
      )}
    </Layout>
  );
};

export default Result;

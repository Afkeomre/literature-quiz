import { useRef, useEffect } from 'react';
import {
  useNavigate,
  useLocation,
  useSearchParams,
  Navigate,
} from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../layouts/Layout';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import Error from '../components/ui/Error';
import OptionsList from '../components/question/OptionsList';
import { setProgress, postSessionData } from '../store/progressSlice';
import { saveProgress, loadProgress } from '../helpers/storageProgress';
import { fetchQuestions } from '../store/questionsSlice';

const Quiz = () => {
  const location = useLocation();

  if (!location.state?.fromHome) {
    return <Navigate to="/" replace />;
  }

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  const dispatch = useDispatch();

  const {
    questions,
    status: questionsStatus,
    error: questionsError,
  } = useSelector((state) => state.questions);

  const {
    progress,
    status: progressStatus,
    error: progressError,
  } = useSelector((state) => state.progress);

  const btnNextRef = useRef(null);

  const layoutClasses = {
    sectionClass: 'quiz',
    containerClass: 'quiz__container',
    contentClass: 'quiz__content',
  };

  const activeQuestion = questions.find((q) => q.id === progress.active);

  const chooseAnswer = (i) => {
    const isCorrect = i === activeQuestion.correct;

    dispatch(
      setProgress({
        ...progress,
        mode,
        questionsQuantity: questions.length,
        answers: { ...progress.answers, [progress.active]: i },
        score: isCorrect ? progress.score + 1 : progress.score,
      })
    );
  };

  const goNext = () => {
    if (progress.active === questions.length) {
      dispatch(postSessionData());
      return;
    }

    dispatch(
      setProgress({
        ...progress,
        active: progress.active + 1,
      })
    );
  };

  useEffect(() => {
    const saved = loadProgress();

    if (saved) {
      dispatch(setProgress(saved));
    }
  }, []);

  useEffect(() => {
    if (progress.serverId) {
      navigate('/result', {
        state: { fromQuizEnd: true },
        replace: true,
      });
    }
  }, [progress.serverId]);

  useEffect(() => {
    if (mode === 'normal') {
      dispatch(fetchQuestions('simpleQuestions'));
    } else if (mode === 'hard') {
      dispatch(fetchQuestions('hardQuestions'));
    }
  }, [mode]);

  useEffect(() => {
    if (questionsStatus === 'resolved') saveProgress(progress);
  }, [progress, questionsStatus]);

  useEffect(() => {
    if (progress.answers[progress.active] !== undefined && btnNextRef.current) {
      btnNextRef.current.scrollIntoView(true);
    }
  }, [progress.answers]);

  return (
    <Layout {...layoutClasses}>
      {(questionsError || progressError) && (
        <Error message={questionsError ? questionsError : progressError} />
      )}
      {(questionsStatus === 'loading' || progressStatus === 'loading') && (
        <Loader />
      )}
      {questionsStatus === 'resolved' && progressStatus === null && (
        <>
          <div className="quiz__question">
            <h1 className="quiz__question-number">
              Вопрос {progress.active}/{questions.length}
            </h1>
            <h2 className="quiz__question-wording">
              {activeQuestion.question}
            </h2>
          </div>

          <span className="quiz__separator"></span>

          <div className="quiz__options">
            <div className="quiz__img-wrapper">
              <img
                src={activeQuestion.img}
                className="quiz__img"
                alt="Иллюстрация"
              />
            </div>

            <OptionsList
              listClass="quiz__list"
              itemClass="quiz__option"
              options={activeQuestion.options}
              selectedAnswer={progress.answers[progress.active]}
              activeQuestion={activeQuestion}
              onClick={chooseAnswer}
            />
          </div>

          <Button
            onClick={goNext}
            disabled={progress.answers[progress.active] === undefined}
            ref={btnNextRef}
          >
            {progress.active < questions.length && 'Следующий вопрос'}
            {progress.active === questions.length && 'Узнать результат'}
          </Button>
        </>
      )}
    </Layout>
  );
};

export default Quiz;

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';
import Layout from '../layouts/Layout';
import RadioButton from '../components/ui/RadioButton';
import { clearProgress } from '../helpers/storageProgress';
import { resetProgress } from '../store/progressSlice';

const Welcome = () => {
  const [mode, setMode] = useState('normal');
  const dispatch = useDispatch();

  const layoutClasses = {
    sectionClass: 'welcome',
    containerClass: 'welcome__container',
    contentClass: 'welcome__content',
  };

  useEffect(() => {
    clearProgress();
    dispatch(resetProgress());
  }, []);

  return (
    <Layout {...layoutClasses}>
      <h1 className="welcome__title">Литературный квиз</h1>

      <fieldset className="welcome__mode">
        <legend className="welcome__legend">Выберите режим:</legend>
        <RadioButton
          onChange={setMode}
          parentClass="welcome__radio-button"
          id="normal"
          radioName="mode"
          radioValue="normal"
          checked="true"
        >
          Обычный
        </RadioButton>

        <RadioButton
          onChange={setMode}
          parentClass="welcome__radio-button"
          id="hard"
          radioName="mode"
          radioValue="hard"
        >
          Продвинутый
        </RadioButton>
      </fieldset>

      <Link
        to={{ pathname: '/quiz', search: `?mode=${mode}` }}
        state={{ fromHome: true }}
        className="welcome__link link"
      >
        Начать квиз!
      </Link>
    </Layout>
  );
};

export default Welcome;

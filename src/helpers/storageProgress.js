export const saveProgress = (data) => {
  localStorage.setItem('quizProgress', JSON.stringify(data));
};

export const loadProgress = () => {
  const raw = localStorage.getItem('quizProgress');
  return raw ? JSON.parse(raw) : null;
};

export const clearProgress = () => {
  localStorage.removeItem('quizProgress');
};

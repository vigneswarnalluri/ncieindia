import React, { useState } from 'react';
import { CheckCircle2, XCircle, Award, HelpCircle, ArrowRight, RotateCcw, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { LMSLesson } from '../data/curriculumData';

interface Props {
  lesson: LMSLesson;
  isOpen: boolean;
  onClose: () => void;
  onPass: (lessonId: string, score: number) => void;
}

export const QuizModal: React.FC<Props> = ({ lesson, isOpen, onClose, onPass }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const questions = lesson.quiz || [];

  if (questions.length === 0) {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-dialog max-w-md p-6 text-center" onClick={(e) => e.stopPropagation()}>
          <HelpCircle className="w-10 h-10 text-blue-500 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base mb-2">Practice Reading Unit</h3>
          <p className="text-xs text-slate-500 mb-4">
            This orientation unit is an introductory reading module. Please continue to the next video lecture for weekly graded assignments.
          </p>
          <button type="button" onClick={onClose} className="btn btn-primary btn-sm">
            Close
          </button>
        </div>
      </div>
    );
  }

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    if (score >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      onPass(lesson.id, score);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const score = isSubmitted ? calculateScore() : 0;
  const isPassed = score >= 70;
  const allAnswered = questions.every((_, idx) => selectedAnswers[idx] !== undefined);

  return (
    <div className="modal-backdrop-overlay">
      <div className="modal-container-card animate-scale-up">
        {/* Modal Header */}
        <div className="modal-header-row">
          <div className="flex-align-center gap-2">
            <span className="badge badge-primary">Checkpoint Assessment</span>
            <span className="text-xs text-muted">Module {lesson.moduleIndex}.{lesson.lessonIndex}</span>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="modal-body-scrollable">
          <h3 className="text-lg font-bold text-heading mb-1">
            {lesson.title}: Comprehension Check
          </h3>
          <p className="text-xs text-muted mb-6">
            Answer the following questions based on the masterclass lecture. Scoring 70% or higher marks this lesson as officially verified and unlocks subsequent modules.
          </p>

          {/* Questions List */}
          <div className="quiz-questions-list">
            {questions.map((q, qIdx) => {
              const userAnswer = selectedAnswers[qIdx];
              const hasAnswered = userAnswer !== undefined;
              const isCorrect = isSubmitted && userAnswer === q.correctIndex;
              const isWrong = isSubmitted && hasAnswered && userAnswer !== q.correctIndex;

              return (
                <div key={q.id} className="quiz-question-item">
                  <div className="flex-align-start gap-2 mb-3">
                    <span className="question-number-badge">{qIdx + 1}</span>
                    <h4 className="text-sm font-semibold text-heading leading-snug">
                      {q.question}
                    </h4>
                  </div>

                  <div className="quiz-options-group">
                    {q.options.map((option, optIdx) => {
                      let optionClass = "quiz-option-btn";
                      if (!isSubmitted) {
                        if (userAnswer === optIdx) optionClass += " selected";
                      } else {
                        if (optIdx === q.correctIndex) {
                          optionClass += " correct";
                        } else if (userAnswer === optIdx && optIdx !== q.correctIndex) {
                          optionClass += " incorrect";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelect(qIdx, optIdx)}
                          className={optionClass}
                          disabled={isSubmitted}
                        >
                          <span className="option-letter">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="option-text">{option}</span>
                          {isSubmitted && optIdx === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald ml-auto" />
                          )}
                          {isSubmitted && userAnswer === optIdx && optIdx !== q.correctIndex && (
                            <XCircle className="w-4 h-4 text-danger ml-auto" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Box */}
                  {isSubmitted && (
                    <div className={`quiz-explanation-box ${isCorrect ? 'bg-success-subtle' : 'bg-warning-subtle'}`}>
                      <div className="flex-align-center gap-1.5 font-bold text-xs mb-1">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{isCorrect ? 'Correct Analysis:' : 'Key Learning Point:'}</span>
                      </div>
                      <p className="text-xs text-body">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Results Summary Box */}
          {isSubmitted && (
            <div className={`quiz-result-banner ${isPassed ? 'result-passed' : 'result-failed'}`}>
              <div className="flex-align-center gap-3">
                <div className="result-icon-box">
                  {isPassed ? <Award className="w-7 h-7 text-emerald" /> : <RotateCcw className="w-7 h-7 text-warning" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-heading">
                    {isPassed ? 'Verification Checkpoint Passed!' : 'Review Needed (Below 70%)'}
                  </h4>
                  <p className="text-xs text-muted">
                    {isPassed
                      ? `Congratulations! You scored ${score}%. Lesson ${lesson.moduleIndex}.${lesson.lessonIndex} is marked verified.`
                      : `You scored ${score}%. Please review the lecture notes and retry to unlock progression.`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer-row">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`btn btn-primary ml-auto ${!allAnswered ? 'disabled' : 'btn-pulse'}`}
            >
              <span>Submit for Verification</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <div className="flex-align-center gap-2 ml-auto">
              {!isPassed && (
                <button onClick={handleRetry} className="btn btn-outline">
                  <RotateCcw className="w-4 h-4 mr-1" />
                  <span>Retry Quiz</span>
                </button>
              )}
              <button onClick={onClose} className="btn btn-primary">
                {isPassed ? 'Continue Curriculum' : 'Close & Re-watch'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

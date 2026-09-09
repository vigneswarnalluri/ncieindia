import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Clock, 
  ThumbsUp, 
  Bell, 
  Download,
  BookOpen
} from 'lucide-react';
import type { LMSLesson } from '../data/curriculumData';

interface Props {
  lesson: LMSLesson;
  isCompleted: boolean;
  onMarkCompleted: (lessonId: string) => void;
  onOpenQuiz: () => void;
}

export const YouTubePlayer: React.FC<Props> = ({
  lesson,
  isCompleted,
  onOpenQuiz,
}) => {
  const [secondsWatched, setSecondsWatched] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasUnlockedCheckpoint, setHasUnlockedCheckpoint] = useState<boolean>(isCompleted);

  const targetWatchSeconds = 45; 
  const progressPercent = Math.min(100, Math.round((secondsWatched / targetWatchSeconds) * 100));

  useEffect(() => {
    setSecondsWatched(isCompleted ? targetWatchSeconds : 0);
    setHasUnlockedCheckpoint(isCompleted);
    setIsPlaying(false);
  }, [lesson.id, isCompleted]);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying && secondsWatched < targetWatchSeconds) {
      interval = setInterval(() => {
        setSecondsWatched((prev) => {
          const next = prev + 1;
          if (next >= targetWatchSeconds) {
            setHasUnlockedCheckpoint(true);
          }
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, secondsWatched]);

  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${lesson.youtubeId}`;
  const youtubeSubscribeUrl = `https://www.youtube.com/@NCIEIndia?sub_confirmation=1`;

  return (
    <div className="classroom-player-wrapper">
      {/* Video Container */}
      <div className="video-viewport-card">
        <div className="video-responsive-ratio">
          <iframe
            src={`https://www.youtube.com/embed/${lesson.youtubeId}?rel=0&modestbranding=1&enablejsapi=1`}
            title={lesson.youtubeTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setIsPlaying(true)}
            className="video-iframe"
          />
        </div>

        {/* Minimal Watch Progress Bar */}
        <div className="playback-engagement-bar">
          <div className="flex-align-center gap-2">
            <Clock className="w-3.5 h-3.5 text-muted" />
            <span className="text-xs font-semibold text-body">
              Progress: {progressPercent}%
            </span>
          </div>

          <div className="playback-progress-track">
            <div 
              className="playback-progress-fill" 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>

          <div>
            {!isCompleted ? (
              <button
                onClick={onOpenQuiz}
                className="btn btn-primary btn-sm"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                <span>Take Quiz</span>
              </button>
            ) : (
              <div className="badge badge-success">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                <span>Completed</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clean YouTube Channel Row */}
      <div className="youtube-channel-growth-banner">
        <div className="flex-align-center gap-2.5">
          <img src="/logo-new.png" alt="NCIE Official" className="channel-crest-img" />
          <div>
            <div className="text-xs font-bold text-heading">NCIE Official Channel</div>
            <div className="text-xxs text-muted">Viksit Bharat Internship Series on YouTube</div>
          </div>
        </div>

        <div className="flex-align-center gap-2">
          <a
            href={youtubeSubscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-danger btn-sm"
          >
            <Bell className="w-3 h-3 mr-1" />
            <span>Subscribe</span>
            <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
          </a>

          <a
            href={youtubeWatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
          >
            <ThumbsUp className="w-3 h-3 mr-1" />
            <span>Discussion</span>
          </a>
        </div>
      </div>

      {/* Lesson Details */}
      <div className="lesson-meta-dossier">
        <div className="flex-between flex-wrap gap-2 mb-2">
          <h2 className="text-lg font-bold text-heading">
            {lesson.title}
          </h2>
          <span className="text-xs text-muted flex-align-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {lesson.duration}
          </span>
        </div>

        <p className="text-xs text-body leading-relaxed">
          {lesson.summary}
        </p>

        {/* Objectives & Takeaways Grid */}
        <div className="grid-2-col gap-4 mt-4">
          <div className="card p-3.5">
            <h4 className="text-xs font-bold text-heading mb-2">
              Key Objectives
            </h4>
            <ul className="bullet-list-custom">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="text-xs text-body mb-1.5 flex gap-1.5">
                  <span className="bullet-dot">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-3.5">
            <h4 className="text-xs font-bold text-heading mb-2">
              Takeaways
            </h4>
            <ul className="bullet-list-custom">
              {lesson.takeaways.map((takeaway, i) => (
                <li key={i} className="text-xs text-body mb-1.5 flex gap-1.5">
                  <span className="bullet-dot text-emerald">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Downloadable Reference Resources */}
        {lesson.resources && lesson.resources.length > 0 && (
          <div className="mt-4">
            <h4 className="text-xs font-bold text-heading mb-2 flex-align-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-muted" /> Lesson Resources
            </h4>
            <div className="resources-grid">
              {lesson.resources.map((res, i) => (
                <a
                  key={i}
                  href={res.url}
                  download
                  className="resource-card-item"
                >
                  <Download className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="resource-title text-truncate">{res.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

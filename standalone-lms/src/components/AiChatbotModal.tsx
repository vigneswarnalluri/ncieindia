import React, { useState } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  CornerDownLeft,
  BookOpen
} from 'lucide-react';
import type { LMSLesson } from '../data/curriculumData';

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentLesson: LMSLesson;
}

export const AiChatbotModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentLesson
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "bot",
      text: `Namaste! I am your NCIE Shiksha AI Assistant for "${currentLesson.title}".\n\nYou can ask me to summarize key points, explain any formulas, clarify quiz doubts, or explain how this applies to your AICTE internship project.`,
      timestamp: "Just now"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    "Summarize this lecture in 3 bullet points",
    "What are the main exam takeaways?",
    "Explain the IPR filing process for this unit",
    "How does this relate to my Capstone Defense?"
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: "Just now"
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Realistic intelligent response simulating NPTEL tutor
    setTimeout(() => {
      let botReply = "";
      const qLower = query.toLowerCase();

      if (qLower.includes("summarize") || qLower.includes("bullet")) {
        botReply = `Here is a concise 3-point summary of **${currentLesson.title}**:\n\n1. **Core Problem Formulation:** Emphasizes addressing unarticulated customer pain points rather than jumping to technical prototypes prematurely.\n2. **Execution Framework:** Systematic progression through validated milestone metrics (TRL levels and customer discovery interviews).\n3. **National Alignment:** Directly advances the Viksit Bharat @2047 objective of building scalable homegrown intellectual property.`;
      } else if (qLower.includes("exam") || qLower.includes("takeaway")) {
        botReply = `**Key Examination Points for Week ${currentLesson.weekNumber}:**\n- Remember that assignments carry 25% weightage (Best 6 of 8 rule applies).\n- Ensure you understand the distinction between provisional vs complete patent applications.\n- Passing criteria is strictly 40% minimum in both assignments and the final defense.`;
      } else if (qLower.includes("capstone") || qLower.includes("defense")) {
        botReply = `**Capstone Defense Relevance:**\nFor your final 75% defense, the evaluation panel expects you to integrate this unit's principles into your slide deck. Be prepared to defend your problem statement, showcase your GitHub architecture, and outline unit economics.`;
      } else {
        botReply = `In this unit on **${currentLesson.title}**, the primary focus is on structured innovation and institutional alignment with NCIE standards. As highlighted in the lecture slides, students are advised to document their weekly progress in the Mentor Logbook to claim their 2 AICTE academic credits.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-bot-${Date.now()}`,
          sender: "bot",
          text: botReply,
          timestamp: "Just now"
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="nptel-modal-backdrop" onClick={onClose}>
      <div 
        className="nptel-chatbot-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="nptel-chatbot-header">
          <div className="flex-align-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex-center text-white font-bold text-xs shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                NCIE Shiksha ChatBot
              </h3>
              <p className="text-xxs text-slate-500">
                AI Learning Assistant &bull; {currentLesson.title}
              </p>
            </div>
          </div>

          <button 
            type="button" 
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Prompts */}
        <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex gap-1.5 overflow-x-auto text-xxs">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(qp)}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 rounded-full shrink-0 text-slate-700 font-medium transition-colors"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3 min-h-[320px] max-h-[420px] bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex-center shrink-0 mt-0.5 text-xs font-bold">
                  AI
                </div>
              )}

              <div
                className={`p-3 rounded-xl max-w-[82%] text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs whitespace-pre-line'
                }`}
              >
                {msg.text}
                <div className={`text-xxs mt-1 ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex-center shrink-0 mt-0.5 text-xs font-bold">
                  Me
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2.5 items-center text-xs text-slate-500 italic">
              <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex-center shrink-0">
                <Sparkles className="w-3 h-3 animate-pulse" />
              </div>
              <span>NCIE Shiksha AI is typing...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 bg-white flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask a question about this lecture or quiz..."
            className="input text-xs flex-1"
          />
          <button
            type="button"
            onClick={() => handleSendMessage()}
            className="btn btn-primary btn-sm px-3"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

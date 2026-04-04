export type StoryDifficulty = 'easy' | 'medium' | 'hard';

export interface Story {
  id: string;
  title: string;
  difficulty: StoryDifficulty;
  surface: string;
  bottom: string;
}

export interface AIResponse {
  judgment: '是' | '不是' | '不相关';
  is_solved: boolean;
  reply_text: string;
  hint?: string;
}

export interface ChatRequest {
  question: string;
  story: Story;
  questionCount: number;
}

export interface ChatResponse {
  reply: string;
  isSolved: boolean;
}

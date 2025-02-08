export interface Question {
  question: string;
  type: 'multiple-select' | 'single-select' | 'rating';
  options: Array<string | RatingOption>;
}

export interface RatingOption {
  text: string;
  min: number;
  max: number;
}

export interface CourseRecommendation {
  rank: number;
  course: string;
  score: number;
  institute: string;
  details: string[];
}

export interface UserResponse {
  [key: string]: any[];
}
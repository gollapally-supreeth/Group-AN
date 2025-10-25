
-- Insert sample learning resources for different tasks and skills
INSERT INTO public.learning_resources (
  task_id,
  skill_name,
  title,
  url,
  resource_type,
  source,
  description,
  quality_score,
  difficulty_level,
  estimated_time_minutes,
  tags,
  metadata,
  is_official
) VALUES
-- React resources
('w1-t1', 'React', 'React Official Documentation - Getting Started', 'https://react.dev/learn', 'reading', 'React.dev', 'Official React documentation with comprehensive examples and best practices', 5, 'beginner', 45, ARRAY['react', 'documentation', 'official'], '{"type": "documentation", "updated": "2024"}', true),
('w1-t1', 'React', 'React Tutorial for Beginners', 'https://www.youtube.com/watch?v=SqcY0GlETPk', 'video', 'YouTube', 'Complete React tutorial covering fundamentals and practical examples', 4, 'beginner', 120, ARRAY['react', 'tutorial', 'beginner'], '{"duration": "2 hours", "views": "1M+"}', false),
('w1-t1', 'React', 'Interactive React Tutorial', 'https://scrimba.com/learn/learnreact', 'interactive', 'Scrimba', 'Hands-on React course with coding exercises and projects', 5, 'beginner', 180, ARRAY['react', 'interactive', 'hands-on'], '{"platform": "scrimba", "exercises": 50}', false),
('w1-t1', 'React', 'React Podcast - Getting Started', 'https://reactpodcast.com/episodes/1', 'audio', 'React Podcast', 'Audio discussion about React fundamentals and best practices', 4, 'beginner', 30, ARRAY['react', 'podcast', 'discussion'], '{"episode": 1, "host": "React Team"}', false),

-- JavaScript resources
('w1-t2', 'JavaScript', 'MDN JavaScript Guide', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', 'reading', 'MDN', 'Comprehensive JavaScript guide covering all language features', 5, 'intermediate', 90, ARRAY['javascript', 'mdn', 'guide'], '{"updated": "2024", "comprehensive": true}', true),
('w1-t2', 'JavaScript', 'JavaScript Crash Course', 'https://www.youtube.com/watch?v=hdI2bqOjy3c', 'video', 'YouTube', 'Fast-paced JavaScript tutorial covering modern features', 4, 'intermediate', 60, ARRAY['javascript', 'crash-course', 'modern'], '{"duration": "1 hour", "topics": "ES6+"}', false),
('w1-t2', 'JavaScript', 'JavaScript30 Challenge', 'https://javascript30.com/', 'interactive', 'JavaScript30', '30 day vanilla JavaScript coding challenge with projects', 5, 'intermediate', 30, ARRAY['javascript', 'challenge', 'projects'], '{"projects": 30, "vanilla": true}', false),

-- Python resources
('python-basics', 'Python', 'Python Official Tutorial', 'https://docs.python.org/3/tutorial/', 'reading', 'Python.org', 'Official Python tutorial covering language basics and advanced features', 5, 'beginner', 120, ARRAY['python', 'official', 'tutorial'], '{"version": "3.x", "comprehensive": true}', true),
('python-basics', 'Python', 'Python for Everybody Course', 'https://www.coursera.org/specializations/python', 'video', 'Coursera', 'University of Michigan Python course for beginners', 5, 'beginner', 240, ARRAY['python', 'university', 'coursera'], '{"university": "UMich", "certification": true}', false),
('python-basics', 'Python', 'Codecademy Python Course', 'https://www.codecademy.com/learn/learn-python-3', 'interactive', 'Codecademy', 'Interactive Python course with hands-on exercises', 4, 'beginner', 150, ARRAY['python', 'interactive', 'exercises'], '{"exercises": 100, "projects": 10}', false),

-- Data Science resources
('data-analysis', 'Data Science', 'Pandas Documentation', 'https://pandas.pydata.org/docs/', 'reading', 'Pandas', 'Official pandas library documentation for data manipulation', 5, 'intermediate', 60, ARRAY['pandas', 'data-science', 'documentation'], '{"library": "pandas", "examples": true}', true),
('data-analysis', 'Data Science', 'Data Science with Python', 'https://www.youtube.com/watch?v=LHBE6Q9XlzI', 'video', 'YouTube', 'Complete data science tutorial using Python and popular libraries', 4, 'intermediate', 180, ARRAY['data-science', 'python', 'tutorial'], '{"duration": "3 hours", "libraries": "pandas,numpy,matplotlib"}', false),
('data-analysis', 'Data Science', 'Kaggle Learn Data Science', 'https://www.kaggle.com/learn/intro-to-machine-learning', 'interactive', 'Kaggle', 'Hands-on data science course with real datasets', 5, 'intermediate', 120, ARRAY['data-science', 'kaggle', 'datasets'], '{"datasets": "real", "competitions": true}', false);

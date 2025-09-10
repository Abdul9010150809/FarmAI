import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  ArrowBack,
  Add,
  ThumbUp,
  ExpandMore,
  QuestionAnswer
} from '@mui/icons-material';

export default function QnASection() {
  const router = useRouter();
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      user: 'New Farmer',
      avatar: 'N',
      time: '3 hours ago',
      question: 'What is the ideal spacing for planting wheat seeds?',
      answers: [
        {
          user: 'Experienced Farmer',
          avatar: 'E',
          time: '2 hours ago',
          answer: 'For wheat, maintain 20-25 cm between rows and 5-7 cm between plants within a row for optimal growth.',
          likes: 8
        }
      ],
      tags: ['Wheat', 'Planting', 'Spacing']
    },
    {
      id: 2,
      user: 'Organic Grower',
      avatar: 'O',
      time: '1 day ago',
      question: 'Best natural fertilizers for vegetable gardens?',
      answers: [
        {
          user: 'Agriculture Expert',
          avatar: 'A',
          time: '12 hours ago',
          answer: 'Compost, vermicompost, bone meal, and neem cake are excellent organic fertilizers. Also consider green manure crops.',
          likes: 15
        },
        {
          user: 'Seasoned Gardener',
          avatar: 'S',
          time: '8 hours ago',
          answer: 'I\'ve had great results with compost tea and fish emulsion for quick nutrient boost.',
          likes: 6
        }
      ],
      tags: ['Organic', 'Fertilizers', 'Vegetables']
    }
  ]);

  const handleAskQuestion = () => {
    if (newQuestion.trim()) {
      const newQuesObj = {
        id: questions.length + 1,
        user: 'Current User',
        avatar: 'U',
        time: 'Just now',
        question: newQuestion,
        answers: [],
        tags: ['New Question']
      };
      setQuestions([newQuesObj, ...questions]);
      setNewQuestion('');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static" sx={{ bgcolor: '#2e7d32' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => router.push('/community')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Q&A Section
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Ask Question */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Ask a Question
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="What farming question would you like to ask?"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAskQuestion}
              disabled={!newQuestion.trim()}
              sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
            >
              Ask Question
            </Button>
          </CardContent>
        </Card>

        {/* Questions List */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Recent Questions
          </Typography>
          
          {questions.map((question) => (
            <Card key={question.id} sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#2e7d32', mr: 2 }}>
                    {question.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {question.user}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {question.time}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32' }}>
                  {question.question}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  {question.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      sx={{ mr: 1, mb: 1, bgcolor: '#e8f5e8' }}
                    />
                  ))}
                </Box>

                {/* Answers */}
                {question.answers.length > 0 && (
                  <Accordion sx={{ mt: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle2">
                        {question.answers.length} Answer(s)
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {question.answers.map((answer, index) => (
                        <Box key={index} sx={{ mb: 3, p: 2, bgcolor: '#f9f9f9', borderRadius: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Avatar sx={{ bgcolor: '#ff9800', width: 32, height: 32, mr: 1 }}>
                              {answer.avatar}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" fontWeight="bold">
                                {answer.user}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {answer.time}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="body2">
                            {answer.answer}
                          </Typography>
                          <Button
                            size="small"
                            startIcon={<ThumbUp />}
                            sx={{ mt: 1, color: 'text.secondary' }}
                          >
                            Helpful ({answer.likes})
                          </Button>
                        </Box>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                )}

                {question.answers.length === 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    No answers yet. Be the first to answer!
                  </Typography>
                )}
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  startIcon={<QuestionAnswer />}
                  sx={{ color: '#2e7d32' }}
                >
                  Answer
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
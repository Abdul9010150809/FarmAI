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
  Grid
} from '@mui/material';
import {
  ArrowBack,
  Add,
  ThumbUp,
  Comment,
  Share
} from '@mui/icons-material';

export default function DiscussionForum() {
  const router = useRouter();
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Rajesh Kumar',
      avatar: 'R',
      time: '2 hours ago',
      content: 'Has anyone tried organic pest control methods for tomato crops? Looking for effective natural alternatives.',
      likes: 12,
      comments: 5,
      tags: ['Organic Farming', 'Pest Control', 'Tomatoes']
    },
    {
      id: 2,
      user: 'Priya Singh',
      avatar: 'P',
      time: '5 hours ago',
      content: 'Just harvested my first batch of hydroponic lettuce! The yield was amazing compared to traditional methods.',
      likes: 24,
      comments: 8,
      tags: ['Hydroponics', 'Lettuce', 'Success Story']
    },
    {
      id: 3,
      user: 'Expert Farmer',
      avatar: 'E',
      time: '1 day ago',
      content: 'Important reminder: Monitor soil moisture levels regularly during this dry season. Consider drip irrigation for water conservation.',
      likes: 18,
      comments: 3,
      tags: ['Irrigation', 'Water Conservation', 'Tips']
    }
  ]);

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const newPostObj = {
        id: posts.length + 1,
        user: 'Current User',
        avatar: 'U',
        time: 'Just now',
        content: newPost,
        likes: 0,
        comments: 0,
        tags: ['New Post']
      };
      setPosts([newPostObj, ...posts]);
      setNewPost('');
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
            Discussion Forum
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Create Post */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Start a Discussion
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Share your thoughts, questions, or experiences..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleCreatePost}
              disabled={!newPost.trim()}
              sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
            >
              Post
            </Button>
          </CardContent>
        </Card>

        {/* Posts List */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Recent Discussions
          </Typography>
          
          {posts.map((post) => (
            <Card key={post.id} sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#2e7d32', mr: 2 }}>
                    {post.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {post.user}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {post.time}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body1" paragraph>
                  {post.content}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  {post.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      sx={{ mr: 1, mb: 1, bgcolor: '#e8f5e8' }}
                    />
                  ))}
                </Box>
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  startIcon={<ThumbUp />}
                  sx={{ color: 'text.secondary' }}
                >
                  Like ({post.likes})
                </Button>
                <Button
                  size="small"
                  startIcon={<Comment />}
                  sx={{ color: 'text.secondary' }}
                >
                  Comment ({post.comments})
                </Button>
                <Button
                  size="small"
                  startIcon={<Share />}
                  sx={{ color: 'text.secondary' }}
                >
                  Share
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
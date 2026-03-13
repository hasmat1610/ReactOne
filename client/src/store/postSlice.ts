import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Author {
  name: string;
  role: string;
  avatar: string;
}

interface PostMetadata {
  id: string;
  title: string;
  description: string;
  category: string;
  author: Author;
  date: string;
  readingTime: string;
  tags: string[];
}

interface PostState {
  activePost: PostMetadata | null;
  allPosts: PostMetadata[];
}

const initialState: PostState = {
  activePost: null,
  allPosts: [
    {
      id: 'zustand-guide',
      title: 'Zustand Master Guide: Scalable State Management',
      description: 'Master Zustand for production-grade React applications.',
      category: 'React',
      author: {
        name: 'ReactOne Team',
        role: 'Core Contributors',
        avatar: 'https://i.pravatar.cc/150?img=32'
      },
      date: 'March 12, 2026',
      readingTime: '12 min read',
      tags: ['react', 'zustand', 'state-management']
    },
    {
      id: 'figma-mcp',
      title: 'Bridging Design and Development',
      description: 'Master the Figma MCP for isolated design-to-code execution.',
      category: 'Figma',
      author: {
        name: 'Hasmat Patel',
        role: 'UI Developer',
        avatar: 'https://i.pravatar.cc/150?img=33'
      },
      date: 'Mar 06, 2026',
      readingTime: '6 min read',
      tags: ['figma', 'mcp', 'design']
    }
  ]
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setActivePost: (state, action: PayloadAction<string>) => {
      state.activePost = state.allPosts.find(p => p.id === action.payload) || null;
    }
  }
});

export const { setActivePost } = postSlice.actions;
export default postSlice.reducer;

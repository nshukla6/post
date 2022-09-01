import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POST_URL = `https://jsonplaceholder.typicode.com/posts`;

const postsAdapter = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
//   posts: [],
  status: "idle", // idle, loading, succeeded, failed,
  error: null,
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POST_URL);
  return response.data;
});

export const addPost = createAsyncThunk("posts/addPost", async (post) => {
  const response = await axios.post(POST_URL, post);
  return response.data;
});

export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
  const { id } = post;
  try {
    const response = await axios.put(`${POST_URL}/${id}`, post);
    return response.data;
  } catch (err) {
    return post;
  }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (post) => {
  const { id } = post;
  const response = await axios.delete(`${POST_URL}/${id}`);
  if (response?.status === 200) return post;
  return response?.status;
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, { payload }) {
        state.posts.push(payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            body: content,
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    addReactions: (state, action) => {
      const { postId, reaction } = action.payload;
    //   const post = state.posts.find((post) => post.id === postId);
    const post = state.entities[postId];
      if (post) {
        post.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        // state.posts = state.posts.concat(loadedPosts);
        postsAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        // state.posts.push(action.payload);
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        postsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const { id } = action.payload;
        // state.posts = state.posts.filter((post) => post.id != id);
        postsAdapter.removeOne(state, id);
      });
  },
});

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostsIds
} = postsAdapter.getSelectors(state => state.posts)

// export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

// export const selectPostById = (state, postId) =>
//   state.posts.posts.find((post) => post.id == postId);

export const selecPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user == userId)
);

export const { postAdded, addReactions } = postSlice.actions;
export default postSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { useCreateArticleMutation, useGetArticlesQuery, useGetArticlesByIdQuery, useUpdateArticleMutation, useDeleteArticleMutation } from './beltmarAPI';

const initialState = {
  articles: [],
  article: null,
  loading: false,
  error: null,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all articles
    builder.addCase(useGetArticlesQuery.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useGetArticlesQuery.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload.articles; // Assuming the payload contains articles data
    });
    builder.addCase(useGetArticlesQuery.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Get article by ID
    builder.addCase(useGetArticlesByIdQuery.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useGetArticlesByIdQuery.fulfilled, (state, action) => {
      state.loading = false;
      state.article = action.payload.article; // Assuming the payload contains the article data
    });
    builder.addCase(useGetArticlesByIdQuery.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Create article
    builder.addCase(useCreateArticleMutation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useCreateArticleMutation.fulfilled, (state, action) => {
      state.loading = false;
      state.articles.push(action.payload.article); // Assuming the payload contains the created article
    });
    builder.addCase(useCreateArticleMutation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Update article
    builder.addCase(useUpdateArticleMutation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useUpdateArticleMutation.fulfilled, (state, action) => {
      state.loading = false;
      const updatedArticle = action.payload.article; // Assuming the payload contains the updated article
      state.articles = state.articles.map((article) =>
        article.id === updatedArticle.id ? updatedArticle : article
      );
    });
    builder.addCase(useUpdateArticleMutation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Delete article
    builder.addCase(useDeleteArticleMutation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(useDeleteArticleMutation.fulfilled, (state, action) => {
      state.loading = false;
      const deletedArticleId = action.payload.id; // Assuming the payload contains the ID of the deleted article
      state.articles = state.articles.filter((article) => article.id !== deletedArticleId);
    });
    builder.addCase(useDeleteArticleMutation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default articlesSlice.reducer;


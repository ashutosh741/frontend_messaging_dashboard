import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTemplatesContent = createAsyncThunk(
  "/leads/content",
  async () => {
    const response = await axios.get("/api/users?page=2", {});
    return response.data;
  }
);

export const templatesSlice = createSlice({
  name: "templates",
  initialState: {
    isLoading: false,
    templates: [],
  },
  reducers: {
    addNewTemplate: (state, action) => {
      let { newTemplateObj } = action.payload;
      state.templates = [...state.templates, newTemplateObj];
    },

    deleteTemplate: (state, action) => {
      let { index } = action.payload;
      state.templates.splice(index, 1);
    },
    updateTemplate: (state, action) => {
      // console.log("state console of update",state)
      let { index, updatedTemplateObj } = action.payload;
      state.templates[index] = {
        ...state.templates[index],
        ...updatedTemplateObj,
      };
    },
  },

  extraReducers: {
    [getTemplatesContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getTemplatesContent.fulfilled]: (state, action) => {
      state.leads = action.payload.data;
      state.isLoading = false;
    },
    [getTemplatesContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewTemplate,updateTemplate, deleteTemplate } = templatesSlice.actions;

export default templatesSlice.reducer;

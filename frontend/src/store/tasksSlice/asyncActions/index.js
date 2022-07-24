import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createTasksActionHelper,
  getTasksActionHelper,
  deleteTasksActionHelper,
} from './helpers';

export const getTasksAction = createAsyncThunk(
  'tasks/getTasksAction',
  getTasksActionHelper
);

export const createTasksAction = createAsyncThunk(
  'tasks/createTasksAction',
  createTasksActionHelper
);

export const deleteTasksAction = createAsyncThunk(
  'tasks/deleteTasksAction',
  deleteTasksActionHelper
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Dependencies } from './dependencies.js';

/** Keep the helper independent of AppDispatch to avoid circular inferred store types. */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  extra: Dependencies;
  rejectValue: { message: string };
}>();

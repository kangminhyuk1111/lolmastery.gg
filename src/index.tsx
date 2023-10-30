import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} />
          <App />
      </QueryClientProvider>
  </React.StrictMode>
);
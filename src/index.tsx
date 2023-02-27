import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  RouterProvider,
} from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "react-toastify/dist/ReactToastify.css";
import router from "./router";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'


const client = new QueryClient()

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
      <QueryClientProvider client={client}>
      <RouterProvider router={router}/>
      </QueryClientProvider>
    </React.StrictMode>
);



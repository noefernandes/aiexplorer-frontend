import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qnjxipgbbzdpirnuxhla.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuanhpcGdiYnpkcGlybnV4aGxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzODA5OTEsImV4cCI6MjAyODk1Njk5MX0.mGoGk0CgylfgZI6380FJlbjLeNr8AgUhkODSH6BYch0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
)

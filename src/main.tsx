import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TesloApp } from './TesloApp';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TesloApp />
  </StrictMode>,
);

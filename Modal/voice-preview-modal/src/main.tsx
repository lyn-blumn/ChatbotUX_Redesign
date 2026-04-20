import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@blumnai-studio/blumnai-design-system/styles';
import './styles.css';
import VoicePreviewModal from '../VoicePreviewModal';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <VoicePreviewModal />
    </div>
  </StrictMode>,
);

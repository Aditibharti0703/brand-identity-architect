import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { synthesizeBrandWithGemini } from './src/server/geminiBrandService';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route FIRST
  app.post('/api/generate-brand', async (req, res) => {
    try {
      const input = req.body;
      const result = await synthesizeBrandWithGemini(input);
      res.json(result);
    } catch (error: any) {
      console.error('Server error generating brand:', error);
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Brand Bible Generator Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();


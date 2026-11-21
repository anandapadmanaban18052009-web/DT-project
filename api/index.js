/**
 * Vercel Serverless Function Handler for /api/*
 * Handles resume extraction, authentication, profile sync, and jobs
 */
import mammoth from 'mammoth';
import { PDFParse } from 'pdf-parse';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = req.url || '';

  // 1. Resume Extraction Endpoint
  if (url.includes('/api/resume/extract') && req.method === 'POST') {
    try {
      const { filename, base64Data } = req.body || {};
      if (!base64Data || !filename) {
        return res.status(400).json({ success: false, message: 'File data and filename are required.' });
      }

      const buffer = Buffer.from(base64Data, 'base64');
      const ext = filename.split('.').pop()?.toLowerCase();
      let extractedText = '';

      if (ext === 'pdf') {
        const parser = new PDFParse({ data: buffer });
        await parser.load();
        const textData = await parser.getText();
        extractedText = typeof textData === 'string' ? textData : textData?.text || '';
      } else if (ext === 'docx' || ext === 'doc') {
        const result = await mammoth.extractRawText({ buffer });
        extractedText = result.value || '';
      } else {
        extractedText = buffer.toString('utf-8');
      }

      const cleanText = extractedText.trim();
      if (cleanText.length < 15) {
        return res.status(422).json({
          success: false,
          message: 'Unable to extract selectable text from this resume. The file may be an image-only scan or empty. Please provide a text-based PDF or DOCX resume.'
        });
      }

      return res.status(200).json({
        success: true,
        text: cleanText,
        filename,
        sizeBytes: buffer.length
      });
    } catch (err) {
      console.error('Extraction error:', err);
      return res.status(500).json({ success: false, message: 'Server error processing resume: ' + err.message });
    }
  }

  // 2. Health & Status
  if (url.includes('/api/health')) {
    return res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
  }

  // Fallback for API routes handled through Supabase or backend
  return res.status(200).json({
    success: true,
    message: 'AI Career Intelligence API is active. Connect to Supabase Cloud for cross-device database synchronization.'
  });
}

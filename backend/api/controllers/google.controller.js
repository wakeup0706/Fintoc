const htmlToText = require('html-to-text');

// Extract text from Gmail payload
function extractEmailText(payload) {
  let body = '';
  const parts = payload.parts || [];
  for (const part of parts) {
    if (part.mimeType === 'text/plain') {
      body = Buffer.from(part.body.data, 'base64').toString('utf-8');
    } else if (part.mimeType === 'text/html') {
      const html = Buffer.from(part.body.data, 'base64').toString('utf-8');
      body = htmlToText.convert(html);
    }
  }
  return body;
}
exports.extractEmailText = extractEmailText;

// Parse amount using regex
function extractAmount(text) {
  const match = text.match(/\$[\d,]+\.\d{2}/);
  return match ? match[0] : null;
}
exports.extractAmount = extractAmount;

// Parse frequency from keywords
function extractFrequency(text) {
  if (/monthly/i.test(text)) return 'Monthly';
  if (/yearly|annual/i.test(text)) return 'Yearly';
  if (/weekly/i.test(text)) return 'Weekly';
  return 'One-time';
}
exports.extractFrequency = extractFrequency;

// Guess subscription name
function extractName(from, subject) {
  const match = from.match(/"?([^"<]+)"?\s*<.*>/);
  return match ? match[1] : subject.split(' ')[0];
}
exports.extractName = extractName;

// Simple category guesser (expandable)
function guessCategory(from, subject, body) {
  const all = (from + subject + body).toLowerCase();
  if (all.includes('netflix') || all.includes('hulu')) return 'Entertainment';
  if (all.includes('github') || all.includes('aws')) return 'Developer Tools';
  if (all.includes('spotify') || all.includes('music')) return 'Music';
  if (all.includes('google') || all.includes('drive')) return 'Cloud';
  return 'Other';
}
exports.guessCategory = guessCategory;
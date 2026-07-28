import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

router.post('/chat', async (req: Request, res: Response) => {
  const { message, language, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({
      error: 'API key missing',
      response: 'Server configuration error. GEMINI_API_KEY not set.'
    });
  }

  const langInstruction =
    language === 'Hindi'   ? 'हमेशा हिंदी में जवाब दो। सरल और स्पष्ट भाषा use करो।' :
    language === 'Marathi' ? 'नेहमी मराठीत उत्तर द्या. सोपी भाषा वापरा.' :
    'Always reply in English. Keep it simple and clear.';

  const systemPrompt = `You are AgriVerse AI — an expert Indian farming assistant.
${langInstruction}
Help farmers with: crop diseases, weather advice, mandi prices, government schemes (PM-KISAN, PMFBY, KCC), fertilizers, seeds, irrigation.
Keep answers practical and helpful. Use emojis where appropriate. Keep responses concise (2-4 sentences).`;

  try {
    const contents: any[] = [];

    if (history && Array.isArray(history)) {
      for (const msg of history) {
        if (msg.sender && msg.text) {
          contents.push({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 400,
        }
      },
      { timeout: 15000 }
    );

    const aiText =
      geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'माफ करें, अभी जवाब नहीं दे पा रहा। कृपया दोबारा कोशिश करें। 🙏';

    return res.json({
      response: aiText,
      language: language || 'Hindi'
    });

  } catch (error: any) {
    console.error('Gemini Error:', error?.response?.data || error.message);

    const fallback =
      language === 'Hindi'   ? 'माफ करें, AI अभी उपलब्ध नहीं है। थोड़ी देर बाद कोशिश करें। 🙏' :
      language === 'Marathi' ? 'माफ करा, AI सध्या उपलब्ध नाही. थोड्या वेळाने प्रयत्न करा. 🙏' :
      'Sorry, AI is not available right now. Please try again later. 🙏';

    return res.status(500).json({ response: fallback });
  }
});

router.get('/suggestions/:language', (req: Request, res: Response) => {
  const lang = req.params.language;

  const suggestions: Record<string, string[]> = {
    Hindi:   ['आज का मौसम', 'फसल की बीमारी', 'मंडी भाव', 'सरकारी योजना', 'खाद की जानकारी', 'बीज की सलाह'],
    Marathi: ['आजचे हवामान', 'पीक रोग', 'बाजारभाव', 'सरकारी योजना', 'खत माहिती', 'बियाणे सल्ला'],
    English: ["Today's weather", 'Crop disease', 'Mandi prices', 'Govt schemes', 'Fertilizer info', 'Seed advice'],
  };

  return res.json(suggestions[lang] || suggestions['Hindi']);
});

export default router;

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
      response: 'Server error: GEMINI_API_KEY not configured on Render.'
    });
  }

  const langInstruction =
    language === 'Hindi'   ? 'हमेशा सरल हिंदी में जवाब दो। 2-3 वाक्य में।' :
    language === 'Marathi' ? 'नेहमी सोप्या मराठीत उत्तर द्या. 2-3 वाक्यात.' :
    'Always reply in simple English. 2-3 sentences max.';

  const systemPrompt = `You are AgriVerse AI — an expert Indian farming assistant.
${langInstruction}
Help with: crop diseases, weather, mandi prices, PM-KISAN, PMFBY, KCC schemes, fertilizers, seeds, irrigation.
Be practical, helpful, use emojis naturally.`;

  try {
    const contents: any[] = [];

    if (history && Array.isArray(history)) {
      history.slice(-6).forEach((msg: any) => {
        if (msg.sender && msg.text) {
          contents.push({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          });
        }
      });
    }

    contents.push({ role: 'user', parts: [{ text: message }] });

    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 400 }
      },
      { timeout: 15000 }
    );

    const aiText =
      geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'माफ करें, जवाब नहीं मिला। दोबारा try करें। 🙏';

    return res.json({ response: aiText, language });

  } catch (error: any) {
    console.error('Gemini Error:', error?.response?.data || error.message);
    const fallback =
      language === 'Hindi'   ? 'माफ करें, AI अभी उपलब्ध नहीं है। थोड़ी देर बाद try करें। 🙏' :
      language === 'Marathi' ? 'माफ करा, AI सध्या उपलब्ध नाही. 🙏' :
      'Sorry, AI is unavailable right now. Try again later. 🙏';
    return res.status(500).json({ response: fallback });
  }
});

router.get('/suggestions/:language', (req: Request, res: Response) => {
  const lang = req.params.language;
  const map: Record<string, string[]> = {
    Hindi:   ['आज का मौसम', 'फसल की बीमारी', 'मंडी भाव', 'PM-KISAN योजना', 'खाद की जानकारी', 'बीज की सलाह'],
    Marathi: ['आजचे हवामान', 'पीक रोग', 'बाजारभाव', 'PM-KISAN योजना', 'खत माहिती', 'बियाणे सल्ला'],
    English: ["Today's weather", 'Crop disease help', 'Mandi prices', 'PM-KISAN scheme', 'Fertilizer advice', 'Seed guidance'],
  };
  return res.json(map[lang] || map['Hindi']);
});

export default router;

import { Router, Request, Response } from 'express';

const router = Router();

router.post('/chat', (req: Request, res: Response) => {
  const { message, language } = req.body;
  
  let responseText = "I am a virtual assistant. How can I help with your farming today?";
  
  const msgLower = (message || '').toLowerCase();
  
  if (msgLower.includes('weather')) {
    responseText = "The weather today is expected to be sunny with mild winds.";
  } else if (msgLower.includes('disease') || msgLower.includes('pest')) {
    responseText = "Please upload an image of the affected plant for disease analysis.";
  } else if (msgLower.includes('price')) {
    responseText = "Market prices are stable today. Which commodity are you looking for?";
  }
  
  if (language === 'hi') {
    responseText = "मैं एक वर्चुअल असिस्टेंट हूँ। मैं आपकी खेती में कैसे मदद कर सकता हूँ?";
  } else if (language === 'mr') {
    responseText = "मी एक आभासी सहाय्यक आहे. मी आज आपल्या शेतीत कशी मदत करू शकेन?";
  }
  
  res.json({
    response: responseText,
    language: language || 'en'
  });
});

router.get('/suggestions/:language', (req: Request, res: Response) => {
  const lang = req.params.language;
  let suggestions = [
    "Check weather forecast",
    "Identify crop disease",
    "Check Mandi prices",
    "Calculate fertilizer needed"
  ];
  
  if (lang === 'hi') {
    suggestions = ["मौसम पूर्वानुमान", "फसल रोग की पहचान", "मंडी भाव", "उर्वरक गणना"];
  } else if (lang === 'mr') {
    suggestions = ["हवामान अंदाज", "पीक रोग ओळख", "बाजारभाव तपासा", "खत गणना"];
  }
  
  res.json(suggestions);
});

export default router;

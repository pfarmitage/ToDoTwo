const API_KEY = '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';
const API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci-codex/completions';

export const sendToChatGPT = async (message) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-002',
        prompt: message,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].text.trim();
    } else {
      throw new Error('No response from ChatGPT');
    }
  } catch (error) {
    console.error('Error while sending message to ChatGPT:', error);
    return 'Sorry, an error occurred while processing your request.';
  }
};
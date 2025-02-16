
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content } = await req.json();
    
    // Get the OpenAI key from environment
    const openAIKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Remove the sk-proj prefix if present
    const actualKey = openAIKey.startsWith('sk-proj') 
      ? openAIKey.replace('sk-proj', 'sk-') 
      : openAIKey;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${actualKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert at creating engaging hooks for social media videos. Generate two hooks for the given content: one visual-focused hook perfect for video captions, and one verbal hook ideal for speaking at the start of the video. Keep each hook under 150 characters. Format as JSON array with 'type' (visual/verbal) and 'content' fields."
          },
          {
            role: "user",
            content: content
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const hookText = data.choices[0].message.content;
    
    // Parse the JSON string from GPT's response
    let hooks;
    try {
      hooks = JSON.parse(hookText);
    } catch (e) {
      // If parsing fails, format the response manually
      hooks = [
        { type: 'visual', content: hookText.split('\n')[0] },
        { type: 'verbal', content: hookText.split('\n')[1] || hookText.split('\n')[0] }
      ];
    }

    return new Response(
      JSON.stringify({ hooks }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});

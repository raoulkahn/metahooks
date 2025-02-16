
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content } = await req.json();
    
    // Get the OpenAI key from environment
    const openAIKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIKey) {
      throw new Error('OpenAI API key not found in environment variables');
    }

    console.log('Attempting to call OpenAI API with content:', content);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert at creating engaging hooks for social media videos. Your task is to generate two hooks and return them in a specific JSON format. You must ONLY return a JSON array containing exactly two objects with 'type' and 'content' fields. Example format: [{\"type\":\"visual\",\"content\":\"hook text\"},{\"type\":\"verbal\",\"content\":\"hook text\"}]. Keep each hook under 150 characters. The visual hook should be perfect for video captions, and the verbal hook should be ideal for speaking at the start of the video."
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
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('OpenAI API response:', data);
    
    const hookText = data.choices[0].message.content;
    console.log('Raw hook text:', hookText);
    
    // Parse the JSON string from GPT's response
    let hooks;
    try {
      hooks = JSON.parse(hookText);
      if (!Array.isArray(hooks) || hooks.length !== 2) {
        throw new Error('Invalid response format');
      }
    } catch (e) {
      console.error('Error parsing GPT response:', e);
      // Provide default hooks if parsing fails
      hooks = [
        { 
          type: 'visual', 
          content: 'Unable to generate hook. Please try again.' 
        },
        { 
          type: 'verbal', 
          content: 'Unable to generate hook. Please try again.' 
        }
      ];
    }

    console.log('Processed hooks:', hooks);

    return new Response(
      JSON.stringify({ hooks }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error in generate-hooks function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});

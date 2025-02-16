
import { supabase } from "@/integrations/supabase/client";

interface PixabayMediaResponse {
  total: number;
  totalHits: number;
  hits: PixabayHit[];
}

interface PixabayHit {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  duration?: number;
  picture_id?: string;
  videos?: {
    tiny: { url: string; size: number };
    small: { url: string; size: number };
    medium: { url: string; size: number };
    large: { url: string; size: number };
  };
  userImageURL: string;
  previewURL?: string;
  previewWidth?: number;
  previewHeight?: number;
  webformatURL?: string;
  webformatWidth?: number;
  webformatHeight?: number;
  largeImageURL?: string;
  imageURL?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageSize?: number;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export async function searchPixabayMedia(query: string, type: 'image' | 'video' = 'image', page: number = 1) {
  try {
    // Check cache first
    const { data: cachedData, error: cacheError } = await supabase
      .from('media_cache')
      .select('*')
      .eq('media_type', type)
      .textSearch('title', query)
      .order('created_at', { ascending: false })
      .limit(20);

    if (cachedData && cachedData.length > 0) {
      const mostRecentTimestamp = new Date(cachedData[0].created_at).getTime();
      const now = Date.now();
      
      if (now - mostRecentTimestamp < CACHE_DURATION) {
        return cachedData;
      }
    }

    // If not in cache or cache is old, fetch from Pixabay
    const { PIXABAY_API_KEY } = await supabase.functions.invoke('get-secret', {
      body: { key: 'PIXABAY_API_KEY' }
    });

    if (!PIXABAY_API_KEY) {
      throw new Error('Pixabay API key not found');
    }

    const baseUrl = 'https://pixabay.com/api';
    const endpoint = type === 'video' ? `${baseUrl}/videos` : baseUrl;
    
    const response = await fetch(
      `${endpoint}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&page=${page}&per_page=20`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Pixabay');
    }

    const data: PixabayMediaResponse = await response.json();

    // Transform and cache the results
    const transformedResults = data.hits.map(hit => ({
      pixabay_id: hit.id.toString(),
      media_type: type,
      title: hit.tags,
      url: type === 'video' ? hit.videos?.medium.url || hit.videos?.small.url || '' : hit.largeImageURL || hit.webformatURL || '',
      preview_url: type === 'video' ? hit.videos?.tiny.url : hit.previewURL,
      thumbnail_url: hit.userImageURL,
      duration: hit.duration || null
    }));

    // Cache the results
    const { error: insertError } = await supabase
      .from('media_cache')
      .upsert(transformedResults, { 
        onConflict: 'pixabay_id,media_type',
        ignoreDuplicates: true 
      });

    if (insertError) {
      console.error('Error caching results:', insertError);
    }

    return transformedResults;
  } catch (error) {
    console.error('Error fetching from Pixabay:', error);
    throw error;
  }
}

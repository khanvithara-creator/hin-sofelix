
import { GoogleGenAI, Type } from "@google/genai";
import type { VideoPrompt } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const videoPromptSchema = {
  type: Type.OBJECT,
  properties: {
    scene_description: {
      type: Type.STRING,
      description: "A rich, detailed, and cinematic description of the scene, focusing on visual elements. Should be at least 2-3 sentences.",
    },
    visual_style: {
      type: Type.STRING,
      description: "The artistic or visual style of the video (e.g., 'cinematic, 8k, hyperrealistic', 'anime aesthetic, Ghibli-inspired', 'vintage 1980s film look').",
    },
    mood_and_atmosphere: {
      type: Type.STRING,
      description: "The emotional tone and atmosphere of the scene (e.g., 'mysterious and suspenseful', 'joyful and vibrant', 'serene and melancholic').",
    },
    camera_details: {
      type: Type.OBJECT,
      properties: {
        shot_type: { type: Type.STRING, description: "e.g., 'wide shot', 'medium close-up', 'point-of-view (POV)'." },
        movement: { type: Type.STRING, description: "e.g., 'slow dolly zoom in', 'dynamic tracking shot', 'static tripod'." },
        angle: { type: Type.STRING, description: "e.g., 'low angle shot', 'high angle', 'eye-level'." },
      },
      required: ["shot_type", "movement", "angle"],
    },
    lighting: {
      type: Type.STRING,
      description: "Description of the lighting. e.g., 'golden hour, soft volumetric light', 'dramatic neon lighting', 'dark, moody, cinematic lighting'.",
    },
    primary_subjects: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "A list of the main subjects or characters in the scene.",
    },
    setting: {
      type: Type.STRING,
      description: "The environment or location of the scene. e.g., 'A bustling cyberpunk market in Angkor Wat', 'a tranquil Cambodian rice paddy at dawn'.",
    },
    negative_prompt: {
        type: Type.STRING,
        description: "Optional. List of elements to exclude, e.g., 'blurry, low quality, watermark'."
    }
  },
  required: ["scene_description", "visual_style", "mood_and_atmosphere", "camera_details", "lighting", "primary_subjects", "setting"],
};


export const generateVideoPromptJson = async (userDescription: string): Promise<VideoPrompt> => {
  const systemInstruction = `You are an expert prompt engineer for an advanced text-to-video AI model. Your task is to take a user's description, which may be in English or Khmer (ភាសាខ្មែរ), and convert it into a detailed, structured JSON object that conforms to the provided schema. Be creative and elaborate on the user's idea to help them generate a stunning video. Fill all fields of the JSON schema with vivid and imaginative details inspired by the user's input.`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userDescription,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: videoPromptSchema,
      },
    });

    const jsonString = response.text;
    if (!jsonString) {
      throw new Error("Received an empty response from the API.");
    }

    const parsedJson = JSON.parse(jsonString);
    return parsedJson as VideoPrompt;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate video prompt. The model may be unable to process the request.");
  }
};

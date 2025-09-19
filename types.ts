
export interface VideoPrompt {
  scene_description: string;
  visual_style: string;
  mood_and_atmosphere: string;
  camera_details: {
    shot_type: string;
    movement: string;
    angle: string;
  };
  lighting: string;
  primary_subjects: string[];
  setting: string;
  negative_prompt?: string;
}

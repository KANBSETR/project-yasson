export interface Species {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[];
  cycle: string;
  watering: string;
  sunlight: string[];
  default_image: {
    thumbnail: string;
    medium_url: string;
  };
  type: string;
}

//Ignorar de momento pero el comentario del component.ts se entiende el porque
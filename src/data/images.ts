import { ImageCategory } from '../types';

// Helper function (can be removed if not needed elsewhere)
const getPublicIdFromUrl = (url: string): string | null => {
  const match = url.match(/\/v\d+\/(.+?)(\.[^.]+)?$/);
  return match ? match[1] : null;
};

// Using Cloudinary Public IDs - Manually curated list
export const images: ImageCategory = {
  'senior-grads': [
    { publicId: "senior-grads/_E3A3364_qb1ovi", alt: "Senior graduate sitting outdoors on wooden steps, smiling.", orientation: "landscape" },
    { publicId: "senior-grads/7Y5A0066-2_e2xl5n", alt: "Senior graduate portrait outdoors with lush green background.", orientation: "landscape" },
    { publicId: "senior-grads/_E3A0487_sybgyz", alt: "Senior graduate standing in front of a textured wall.", orientation: "portrait" },
    { publicId: "senior-grads/7Y5A0128-2_vadcax", alt: "Senior graduate sitting by a lake, looking towards the water.", orientation: "landscape" },
    { publicId: "senior-grads/_E3A1422_sltncd", alt: "Senior graduate sitting casually on grass in sunlight.", orientation: "landscape" },
    { publicId: "senior-grads/7Y5A0129_xt85oj", alt: "Senior graduate standing in a sunlit field.", orientation: "landscape" },
    { publicId: "senior-grads/_E3A8053_uncropped_algn4w", alt: "Black and white portrait of a thoughtful senior graduate.", orientation: "portrait" },
    { publicId: "senior-grads/7Y5A0049_ntdcea", alt: "Senior graduate portrait with dramatic side lighting.", orientation: "portrait" },
    { publicId: "senior-grads/7Y5A0064-2_yp2jxc", alt: "Candid shot of a laughing senior graduate outdoors.", orientation: "landscape" },
    { publicId: "senior-grads/7Y5A0161_vbr2ph", alt: "Smiling senior graduate close-up portrait.", orientation: "portrait" },
    { publicId: "senior-grads/7Y5A0163-2_cfqoqw", alt: "Senior graduate portrait outdoors, looking away.", orientation: "landscape" },
    { publicId: "senior-grads/7Y5A0204-2_tji6yo", alt: "Senior graduate walking through tall grass.", orientation: "landscape" },
    { publicId: "senior-grads/7Y5A0159_ancfuz", alt: "Senior graduate portrait with a blurred green background.", orientation: "landscape" },
    { publicId: "senior-grads/7Y5A1327_azyvgz", alt: "Smiling senior graduate portrait outdoors.", orientation: "portrait" },
    { publicId: "senior-grads/7Y5A0437-2_n5rijp", alt: "Senior graduate leaning against a large tree trunk.", orientation: "portrait" },
    { publicId: "senior-grads/7Y5A1372-2_ky4anf", alt: "Senior graduate portrait looking directly at camera.", orientation: "portrait" },
    { publicId: "senior-grads/7Y5A0390-3_ysxmak", alt: "Senior graduate portrait in front of a rustic building.", orientation: "landscape" },
    { publicId: "senior-grads/7Y5A0769_hzdadg", alt: "Formal senior graduate portrait looking at camera.", orientation: "portrait" },
    { publicId: "senior-grads/7Y5A0816_ngx58f", alt: "Senior graduate portrait with hands clasped.", orientation: "portrait" },
    { publicId: "senior-grads/7Y5A1217_zy7qrf", alt: "Senior graduate portrait in an urban setting with brick wall.", orientation: "portrait" }
  ],
  nature: [
    { publicId: "nature/7Y5A9026", alt: "Tall waterfall cascading down mossy rocks into a pool.", orientation: "portrait" },
    { publicId: "nature/_E3A3024", alt: "Sunset over a calm lake, silhouetting trees on the far shore.", orientation: "landscape" },
    { publicId: "nature/_E3A0572", alt: "Sunbeams shining through tall trees in a foggy forest.", orientation: "landscape" },
    { publicId: "nature/7Y5A4905", alt: "Macro photograph of water droplets clinging to green leaves.", orientation: "landscape" },
    { publicId: "nature/_E3A5862_1", alt: "Waves crashing against a rocky coastline under a dramatic sky.", orientation: "portrait" },
    { publicId: "nature/_E3A0657", alt: "Panoramic view of snow-capped mountains under a clear blue sky.", orientation: "landscape" },
    { publicId: "nature/_E3A0536", alt: "Still lake reflecting trees and a colorful sunrise sky.", orientation: "landscape" },
    { publicId: "nature/7Y5A4885", alt: "Intricate patterns of frost crystals on a dark surface.", orientation: "landscape" },
    { publicId: "nature/7Y5A4907", alt: "Close-up of dew drops on a spider web.", orientation: "landscape" },
    { publicId: "nature/7Y5A4880", alt: "Detailed view of ice crystal formations.", orientation: "portrait" },
    { publicId: "nature/7Y5A4688", alt: "Ocean waves breaking on a sandy beach.", orientation: "landscape" },
    { publicId: "nature/7Y5A4879", alt: "Sharp icicles hanging from a snow-dusted branch.", orientation: "portrait" },
    { publicId: "nature/7Y5A4872", alt: "Abstract macro shot of air bubbles frozen in ice.", orientation: "portrait" },
    { publicId: "nature/7Y5A4726", alt: "Clear water flowing over smooth, dark rocks in a stream.", orientation: "portrait" },
    { publicId: "nature/7Y5A4544", alt: "Seascape with dramatic clouds reflected in wet sand.", orientation: "landscape" },
    { publicId: "nature/7Y5A0913", alt: "Wide river flowing through a green valley.", orientation: "landscape" },
    { publicId: "nature/_E3A2147", alt: "Close-up of a bright pink flower blossom.", orientation: "landscape" },
    { publicId: "nature/7Y5A0753", alt: "Snow-covered landscape with trees under a winter sky.", orientation: "landscape" },
    { publicId: "nature/7Y5A0668", alt: "Forest path covered in colorful autumn leaves.", orientation: "landscape" },
    { publicId: "nature/3E3A1828", alt: "Desert landscape with sand dunes under a clear sky.", orientation: "landscape" }
  ],
  family: [
    { publicId: "families/-Kp8_bODRd2hTRlQgXQjjg", alt: "Family portrait in outdoor woodland setting", orientation: "landscape" },
    { publicId: "families/1CvB_yMhTWGQk7uTZRSFNQ", alt: "Family photo with parents and two children", orientation: "landscape" },
    { publicId: "families/460962500_8924869537526337_2529396259360654145_n", alt: "Candid family moment outdoors", orientation: "landscape" },
    { publicId: "families/461159343_8940489162631041_3104956276245805809_n", alt: "Smiling family portrait outdoors", orientation: "landscape" },
    { publicId: "families/461237372_8940489132631044_4476979802288483586_n", alt: "Family portrait with natural background", orientation: "landscape" },
    { publicId: "families/461237575_8940489579297666_361445881444474309_n", alt: "Family portrait in autumn setting", orientation: "landscape" },
    { publicId: "families/461270518_8940489565964334_7581580201913562661_n", alt: "Candid family moment in outdoor setting", orientation: "landscape" },
    { publicId: "families/461322819_8940489895964301_1852738555745267231_n", alt: "Family with children in natural setting", orientation: "landscape" },
    { publicId: "families/461362299_8940489569297667_5083766929577629329_n", alt: "Multi-generational family portrait", orientation: "landscape" },
    { publicId: "families/7Y5A1194", alt: "Professional family portrait outdoors", orientation: "portrait" },
    { publicId: "families/F1jUPOb4QQiQvYYn86wKGA", alt: "Family portrait with autumn colors", orientation: "landscape" },
    { publicId: "families/HJKz0aNjTriiOKasjX3PrQ", alt: "Family portrait with artistic composition", orientation: "landscape" },
    { publicId: "families/le5Uu3BTS1qbNQCGkkuSqA", alt: "Intimate family moment captured", orientation: "landscape" },
    { publicId: "families/MyGTVtIdSfiSQncs9CQqoA", alt: "Outdoor family portrait with natural composition", orientation: "landscape" },
    { publicId: "families/zRwV9LAOTAuxqQqOlwPnPA", alt: "Family portrait with artistic framing", orientation: "landscape" }
  ]
};

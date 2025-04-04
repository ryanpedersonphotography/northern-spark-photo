import { ImageCategory } from '../types';
import familyImages from './all_family.json'; // Import the new family data

// Using Cloudinary URLs for optimized images - Curated for uniqueness
export const images: ImageCategory = {
  family: familyImages, // Add the family category
  'senior-grads': [
    // Selected images with f_auto,q_auto,e_auto_color optimization and refined alt text
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743650292/senior-grads/_E3A3364_qb1ovi.avif", alt: "Smiling female senior graduate sitting casually on outdoor wooden steps.", orientation: "landscape" }, // Index 0
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743650288/senior-grads/7Y5A0066-2_e2xl5n.avif", alt: "Female senior graduate portrait outdoors against blurred green foliage.", orientation: "landscape" }, // Index 1
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743650292/senior-grads/_E3A0487_sybgyz.avif", alt: "Female senior graduate portrait standing against a grey textured wall.", orientation: "portrait" },  // Index 2
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743650282/senior-grads/7Y5A0128-2_vadcax.avif", alt: "Female senior graduate sitting on rocks by a calm lake, looking thoughtfully towards the water.", orientation: "landscape" }, // Index 3 // Kept as the one "girl near water"
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743650253/senior-grads/7Y5A1318_ah5ztf.avif", alt: "Female senior graduate portrait outdoors, looking slightly away.", orientation: "portrait" },  // Index 4
    // Image 7Y5A0204-2_tji6yo.avif (index 5) is removed.
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743650277/senior-grads/7Y5A0159_ancfuz.avif", alt: "Outdoor portrait of a female senior graduate with soft green background blur.", orientation: "landscape" }, // Now Index 5
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743650255/senior-grads/7Y5A1327_azyvgz.avif", alt: "Smiling female senior graduate portrait outdoors wearing a white top.", orientation: "portrait" }, // Now Index 6 // Replaced index 13
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743650270/senior-grads/7Y5A0437-2_n5rijp.avif", alt: "Smiling female senior graduate leaning against a large tree trunk outdoors.", orientation: "portrait" }, // Now Index 7
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743650255/senior-grads/7Y5A1372-2_ky4anf.avif", alt: "Close-up portrait of a female senior graduate looking at the camera.", orientation: "portrait" }, // Now Index 8 // Replaced index 15
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743650266/senior-grads/7Y5A0390-3_ysxmak.avif", alt: "Male senior graduate standing outdoors in front of a rustic wooden building.", orientation: "landscape" }, // Now Index 9
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743650264/senior-grads/7Y5A0769_hzdadg.avif", alt: "Formal studio portrait of a female senior graduate looking at camera.", orientation: "portrait" }, // Now Index 10
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743650263/senior-grads/7Y5A0816_ngx58f.avif", alt: "Thoughtful portrait of a female senior graduate with hands clasped.", orientation: "portrait" } // Now Index 11
    // Removed last image (index 19)
  ],
  nature: [
    // Selected images with f_auto,q_auto,e_auto_color optimization and refined alt text
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651443/nature/7Y5A9026.jpg", alt: "Tall waterfall cascading down mossy rocks in a lush forest.", orientation: "portrait" },
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651443/nature/_E3A3024.jpg", alt: "Vibrant sunset reflecting on a calm lake with silhouetted trees.", orientation: "landscape" },
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651442/nature/_E3A0572.jpg", alt: "Sunbeams shining through fog among tall forest trees.", orientation: "landscape" },
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651439/nature/7Y5A4905.jpg", alt: "Macro photo of sparkling water droplets on green leaves.", orientation: "landscape" },
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651438/nature/_E3A5862_1.jpg", alt: "Dramatic view of waves crashing on a rocky shoreline.", orientation: "portrait" },
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651437/nature/_E3A0657.jpg", alt: "Panoramic view of a snow-capped mountain range under a blue sky.", orientation: "landscape" },
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651434/nature/_E3A0536.jpg", alt: "Calm lake reflecting a colorful sunrise sky and shoreline trees.", orientation: "landscape" },
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651431/nature/7Y5A4885.jpg", alt: "Abstract close-up of intricate frost patterns on a dark surface.", orientation: "landscape" },
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651430/nature/7Y5A4907.jpg", alt: "Glistening dew drops on a delicate spider web, macro view.", orientation: "landscape" },
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651421/nature/7Y5A4880.jpg", alt: "Detailed macro view of ice crystal formations.", orientation: "portrait" },
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651416/nature/7Y5A4688.jpg", alt: "Ocean wave curling and breaking onto a sandy beach.", orientation: "landscape" },
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651415/nature/7Y5A4879.jpg", alt: "Sharp icicles hanging from a snow-covered tree branch.", orientation: "portrait" },
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651407/nature/7Y5A4872.jpg", alt: "Abstract macro photo of air bubbles frozen in ice.", orientation: "portrait" },
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651403/nature/7Y5A4726.jpg", alt: "Clear stream water flowing over smooth, dark rocks.", orientation: "portrait" },
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651391/nature/7Y5A4544.jpg", alt: "Dramatic sky reflected on wet beach sand at low tide.", orientation: "landscape" },
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651368/nature/7Y5A0913.jpg", alt: "Wide river flowing through a green valley under a blue sky.", orientation: "landscape" },
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651368/nature/_E3A2147.jpg", alt: "Vibrant pink flower with yellow center, close-up view.", orientation: "landscape" },
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651365/nature/7Y5A0753.jpg", alt: "Expansive snow-covered landscape with bare trees in winter.", orientation: "landscape" },
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651364/nature/7Y5A0668.jpg", alt: "Forest path covered in colorful fallen autumn leaves.", orientation: "landscape" },
    { src: "https://res.cloudinary.com/dtszzijrd/image/upload/f_auto,q_auto,e_auto_color/v1743651341/nature/3E3A1828.jpg", alt: "Rolling sand dunes in a desert under a clear blue sky.", orientation: "landscape" }
  ]
};

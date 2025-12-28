// ===============================
// Vite dynamic image loader
// ===============================

// AI images (.png)
const aiImages = import.meta.glob(
  "../images/ai_images/*.png",
  { eager: true }
);

// Real images (.jpg)
const realImages = import.meta.glob(
  "../images/real_images/*.jpg",
  { eager: true }
);

// ===============================
// Convert imports to array
// ===============================

const aiImageArray = Object.entries(aiImages).map(([path, module], index) => ({
  id: `ai-${index + 1}`,
  url: module.default,
  type: "ai",
  hint: "Detaylara dikkat et: simetri, ışık ve arka plan yapay olabilir."
}));

const realImageArray = Object.entries(realImages).map(([path, module], index) => ({
  id: `real-${index + 1}`,
  url: module.default,
  type: "real"
}));

// ===============================
// Export combined pool
// ===============================

export const IMAGE_POOL = [
  ...aiImageArray,
  ...realImageArray
];

import { CanvasObject } from '../types';

export const exportToPNG = (objects: CanvasObject[], canvasWidth = 1200, canvasHeight = 900) => {
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  objects.forEach(obj => {
    ctx.save();
    ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
    ctx.rotate((obj.rotation * Math.PI) / 180);
    ctx.globalAlpha = obj.opacity;

    if (obj.svg) {
      const img = new Image();
      const svgBlob = new Blob([obj.svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        ctx.drawImage(img, -obj.width / 2, -obj.height / 2, obj.width, obj.height);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }

    ctx.restore();
  });

  setTimeout(() => {
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'diagram.png';
        link.click();
        URL.revokeObjectURL(url);
      }
    });
  }, 500);
};

export const exportToSVG = (objects: CanvasObject[], canvasWidth = 1200, canvasHeight = 900) => {
  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}" viewBox="0 0 ${canvasWidth} ${canvasHeight}">`;
  svgContent += `<rect width="100%" height="100%" fill="#FFFFFF"/>`;

  objects.forEach(obj => {
    const transform = `translate(${obj.x}, ${obj.y}) rotate(${obj.rotation}, ${obj.width / 2}, ${obj.height / 2})`;
    svgContent += `<g transform="${transform}" opacity="${obj.opacity}">`;

    if (obj.svg) {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(obj.svg, 'image/svg+xml');
      const svgElement = svgDoc.documentElement;

      svgElement.setAttribute('width', obj.width.toString());
      svgElement.setAttribute('height', obj.height.toString());

      svgContent += svgElement.outerHTML;
    }

    svgContent += `</g>`;
  });

  svgContent += `</svg>`;

  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'diagram.svg';
  link.click();
  URL.revokeObjectURL(url);
};

export const exportToPDF = async (objects: CanvasObject[]) => {
  console.log('PDF export requires additional library. Using PNG export instead.');
  exportToPNG(objects);
};

export const exportToJSON = (objects: CanvasObject[]) => {
  const dataStr = JSON.stringify(objects, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'diagram.json';
  link.click();
  URL.revokeObjectURL(url);
};

export const importFromJSON = (jsonString: string): CanvasObject[] => {
  try {
    const objects = JSON.parse(jsonString);
    return Array.isArray(objects) ? objects : [];
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return [];
  }
};

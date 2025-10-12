import { ComponentCategory } from '../types';

export const biologyComponents: ComponentCategory[] = [
  {
    id: 'cell-structures',
    name: 'Cell Structures',
    expanded: true,
    items: [
      {
        id: 'nucleus',
        name: 'Nucleus',
        category: 'cell-structures',
        defaultWidth: 80,
        defaultHeight: 80,
        svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/><circle cx="50" cy="50" r="30" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1.5"/><circle cx="45" cy="45" r="8" fill="#81C784"/></svg>'
      },
      {
        id: 'mitochondria',
        name: 'Mitochondria',
        category: 'cell-structures',
        defaultWidth: 100,
        defaultHeight: 60,
        svg: '<svg viewBox="0 0 120 70" xmlns="http://www.w3.org/2000/svg"><ellipse cx="60" cy="35" rx="55" ry="30" fill="#FFE0B2" stroke="#FF9800" stroke-width="2"/><path d="M20 35 Q30 20, 40 35 T60 35 T80 35 T100 35" fill="none" stroke="#FF9800" stroke-width="1.5"/><path d="M20 35 Q30 50, 40 35 T60 35 T80 35 T100 35" fill="none" stroke="#FF9800" stroke-width="1.5"/></svg>'
      },
      {
        id: 'ribosome',
        name: 'Ribosome',
        category: 'cell-structures',
        defaultWidth: 40,
        defaultHeight: 40,
        svg: '<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="18" r="15" fill="#BBDEFB" stroke="#2196F3" stroke-width="2"/><circle cx="25" cy="35" r="12" fill="#90CAF9" stroke="#2196F3" stroke-width="2"/></svg>'
      },
      {
        id: 'er',
        name: 'Endoplasmic Reticulum',
        category: 'cell-structures',
        defaultWidth: 120,
        defaultHeight: 80,
        svg: '<svg viewBox="0 0 140 90" xmlns="http://www.w3.org/2000/svg"><path d="M10 20 Q30 10, 50 20 T90 20 T130 20" fill="none" stroke="#9C27B0" stroke-width="2"/><path d="M10 40 Q30 30, 50 40 T90 40 T130 40" fill="none" stroke="#9C27B0" stroke-width="2"/><path d="M10 60 Q30 50, 50 60 T90 60 T130 60" fill="none" stroke="#9C27B0" stroke-width="2"/><circle cx="35" cy="20" r="4" fill="#BA68C8"/><circle cx="75" cy="40" r="4" fill="#BA68C8"/><circle cx="115" cy="60" r="4" fill="#BA68C8"/></svg>'
      },
      {
        id: 'golgi',
        name: 'Golgi Apparatus',
        category: 'cell-structures',
        defaultWidth: 100,
        defaultHeight: 70,
        svg: '<svg viewBox="0 0 110 80" xmlns="http://www.w3.org/2000/svg"><ellipse cx="55" cy="20" rx="45" ry="12" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2"/><ellipse cx="55" cy="35" rx="45" ry="12" fill="#FFF59D" stroke="#FBC02D" stroke-width="2"/><ellipse cx="55" cy="50" rx="45" ry="12" fill="#FFF176" stroke="#FBC02D" stroke-width="2"/><ellipse cx="55" cy="65" rx="45" ry="12" fill="#FFEE58" stroke="#FBC02D" stroke-width="2"/></svg>'
      },
      {
        id: 'lysosome',
        name: 'Lysosome',
        category: 'cell-structures',
        defaultWidth: 50,
        defaultHeight: 50,
        svg: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="25" fill="#F8BBD0" stroke="#E91E63" stroke-width="2"/><circle cx="20" cy="25" r="4" fill="#EC407A"/><circle cx="35" cy="22" r="3" fill="#EC407A"/><circle cx="28" cy="35" r="5" fill="#EC407A"/></svg>'
      },
      {
        id: 'chloroplast',
        name: 'Chloroplast',
        category: 'cell-structures',
        defaultWidth: 110,
        defaultHeight: 70,
        svg: '<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg"><ellipse cx="60" cy="40" rx="55" ry="35" fill="#A5D6A7" stroke="#388E3C" stroke-width="2"/><ellipse cx="30" cy="30" rx="15" ry="8" fill="#66BB6A" stroke="#388E3C" stroke-width="1"/><ellipse cx="60" cy="35" rx="15" ry="8" fill="#66BB6A" stroke="#388E3C" stroke-width="1"/><ellipse cx="90" cy="30" rx="15" ry="8" fill="#66BB6A" stroke="#388E3C" stroke-width="1"/><ellipse cx="45" cy="48" rx="15" ry="8" fill="#66BB6A" stroke="#388E3C" stroke-width="1"/><ellipse cx="75" cy="48" rx="15" ry="8" fill="#66BB6A" stroke="#388E3C" stroke-width="1"/></svg>'
      },
      {
        id: 'vacuole',
        name: 'Vacuole',
        category: 'cell-structures',
        defaultWidth: 90,
        defaultHeight: 90,
        svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="#E1F5FE" stroke="#0288D1" stroke-width="2"/><circle cx="35" cy="40" r="8" fill="#B3E5FC" opacity="0.7"/><circle cx="65" cy="55" r="12" fill="#B3E5FC" opacity="0.7"/></svg>'
      },
      {
        id: 'cell-membrane',
        name: 'Cell Membrane',
        category: 'cell-structures',
        defaultWidth: 120,
        defaultHeight: 30,
        svg: '<svg viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="15" width="130" height="10" fill="#FFCCBC" stroke="#FF5722" stroke-width="1"/><circle cx="20" cy="10" r="6" fill="#FF8A65"/><circle cx="50" cy="10" r="6" fill="#FF8A65"/><circle cx="80" cy="10" r="6" fill="#FF8A65"/><circle cx="110" cy="10" r="6" fill="#FF8A65"/><circle cx="20" cy="30" r="6" fill="#FF8A65"/><circle cx="50" cy="30" r="6" fill="#FF8A65"/><circle cx="80" cy="30" r="6" fill="#FF8A65"/><circle cx="110" cy="30" r="6" fill="#FF8A65"/></svg>'
      }
    ]
  },
  {
    id: 'molecules',
    name: 'Molecules',
    expanded: false,
    items: [
      {
        id: 'dna',
        name: 'DNA Helix',
        category: 'molecules',
        defaultWidth: 60,
        defaultHeight: 120,
        svg: '<svg viewBox="0 0 70 140" xmlns="http://www.w3.org/2000/svg"><path d="M15 10 Q35 30, 15 50 T15 90 T15 130" fill="none" stroke="#3F51B5" stroke-width="3"/><path d="M55 10 Q35 30, 55 50 T55 90 T55 130" fill="none" stroke="#3F51B5" stroke-width="3"/><line x1="15" y1="20" x2="55" y2="20" stroke="#E91E63" stroke-width="2"/><line x1="15" y1="40" x2="55" y2="40" stroke="#4CAF50" stroke-width="2"/><line x1="15" y1="60" x2="55" y2="60" stroke="#FF9800" stroke-width="2"/><line x1="15" y1="80" x2="55" y2="80" stroke="#2196F3" stroke-width="2"/><line x1="15" y1="100" x2="55" y2="100" stroke="#E91E63" stroke-width="2"/><line x1="15" y1="120" x2="55" y2="120" stroke="#4CAF50" stroke-width="2"/></svg>'
      },
      {
        id: 'protein',
        name: 'Protein',
        category: 'molecules',
        defaultWidth: 100,
        defaultHeight: 80,
        svg: '<svg viewBox="0 0 110 90" xmlns="http://www.w3.org/2000/svg"><path d="M10 45 Q20 20, 40 30 T70 40 T100 45" fill="none" stroke="#9C27B0" stroke-width="3" stroke-linecap="round"/><path d="M10 45 Q20 70, 40 60 T70 50 T100 45" fill="none" stroke="#9C27B0" stroke-width="3" stroke-linecap="round"/><circle cx="25" cy="30" r="8" fill="#BA68C8"/><circle cx="55" cy="35" r="10" fill="#BA68C8"/><circle cx="85" cy="45" r="9" fill="#BA68C8"/></svg>'
      },
      {
        id: 'enzyme',
        name: 'Enzyme',
        category: 'molecules',
        defaultWidth: 80,
        defaultHeight: 80,
        svg: '<svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg"><path d="M45 10 L70 35 L45 60 L20 35 Z" fill="#FFE082" stroke="#F57C00" stroke-width="2"/><circle cx="45" cy="35" r="12" fill="#FFF" stroke="#F57C00" stroke-width="2"/><path d="M35 35 L40 35 L40 40" fill="none" stroke="#F57C00" stroke-width="2"/></svg>'
      },
      {
        id: 'atp',
        name: 'ATP Molecule',
        category: 'molecules',
        defaultWidth: 90,
        defaultHeight: 60,
        svg: '<svg viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="35" r="20" fill="#FFEB3B" stroke="#F57F17" stroke-width="2"/><circle cx="55" cy="35" r="18" fill="#FDD835" stroke="#F57F17" stroke-width="2"/><circle cx="80" cy="35" r="16" fill="#FBC02D" stroke="#F57F17" stroke-width="2"/><text x="25" y="40" text-anchor="middle" font-size="12" fill="#000">P</text><text x="55" y="38" text-anchor="middle" font-size="12" fill="#000">P</text><text x="80" y="38" text-anchor="middle" font-size="12" fill="#000">P</text></svg>'
      },
      {
        id: 'glucose',
        name: 'Glucose',
        category: 'molecules',
        defaultWidth: 70,
        defaultHeight: 70,
        svg: '<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><polygon points="40,10 65,25 65,55 40,70 15,55 15,25" fill="#C5E1A5" stroke="#689F38" stroke-width="2"/><circle cx="40" cy="15" r="5" fill="#558B2F"/><circle cx="62" cy="27" r="5" fill="#558B2F"/><circle cx="62" cy="53" r="5" fill="#558B2F"/><circle cx="40" cy="65" r="5" fill="#558B2F"/><circle cx="18" cy="53" r="5" fill="#558B2F"/><circle cx="18" cy="27" r="5" fill="#558B2F"/></svg>'
      },
      {
        id: 'lipid',
        name: 'Lipid',
        category: 'molecules',
        defaultWidth: 80,
        defaultHeight: 100,
        svg: '<svg viewBox="0 0 90 110" xmlns="http://www.w3.org/2000/svg"><circle cx="45" cy="20" r="15" fill="#FFCCBC" stroke="#FF5722" stroke-width="2"/><line x1="30" y1="35" x2="30" y2="95" stroke="#FF5722" stroke-width="3"/><line x1="45" y1="35" x2="45" y2="95" stroke="#FF5722" stroke-width="3"/><line x1="60" y1="35" x2="60" y2="95" stroke="#FF5722" stroke-width="3"/><path d="M26 50 L34 50" stroke="#FF8A65" stroke-width="2"/><path d="M41 65 L49 65" stroke="#FF8A65" stroke-width="2"/><path d="M56 55 L64 55" stroke="#FF8A65" stroke-width="2"/></svg>'
      }
    ]
  },
  {
    id: 'pathways',
    name: 'Pathways & Processes',
    expanded: false,
    items: [
      {
        id: 'arrow-straight',
        name: 'Straight Arrow',
        category: 'pathways',
        defaultWidth: 100,
        defaultHeight: 20,
        svg: '<svg viewBox="0 0 110 30" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="15" x2="85" y2="15" stroke="#424242" stroke-width="3"/><polygon points="85,15 95,10 105,15 95,20" fill="#424242"/></svg>'
      },
      {
        id: 'arrow-curved',
        name: 'Curved Arrow',
        category: 'pathways',
        defaultWidth: 100,
        defaultHeight: 60,
        svg: '<svg viewBox="0 0 110 70" xmlns="http://www.w3.org/2000/svg"><path d="M10 60 Q30 10, 85 20" fill="none" stroke="#424242" stroke-width="3"/><polygon points="85,20 92,15 100,22 90,25" fill="#424242"/></svg>'
      },
      {
        id: 'inhibitor',
        name: 'Inhibitor',
        category: 'pathways',
        defaultWidth: 100,
        defaultHeight: 20,
        svg: '<svg viewBox="0 0 110 30" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="15" x2="95" y2="15" stroke="#D32F2F" stroke-width="3"/><line x1="95" y1="8" x2="95" y2="22" stroke="#D32F2F" stroke-width="4"/></svg>'
      },
      {
        id: 'catalyst',
        name: 'Catalyst',
        category: 'pathways',
        defaultWidth: 60,
        defaultHeight: 60,
        svg: '<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg"><circle cx="35" cy="35" r="25" fill="none" stroke="#1976D2" stroke-width="3" stroke-dasharray="5,5"/><text x="35" y="42" text-anchor="middle" font-size="20" fill="#1976D2" font-weight="bold">+</text></svg>'
      }
    ]
  },
  {
    id: 'lab-equipment',
    name: 'Lab Equipment',
    expanded: false,
    items: [
      {
        id: 'beaker',
        name: 'Beaker',
        category: 'lab-equipment',
        defaultWidth: 60,
        defaultHeight: 80,
        svg: '<svg viewBox="0 0 70 90" xmlns="http://www.w3.org/2000/svg"><path d="M15 10 L15 70 Q15 80, 25 80 L45 80 Q55 80, 55 70 L55 10 Z" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/><line x1="10" y1="10" x2="60" y2="10" stroke="#1976D2" stroke-width="2"/><line x1="15" y1="30" x2="55" y2="30" stroke="#90CAF9" stroke-width="1" stroke-dasharray="3,3"/><line x1="15" y1="50" x2="55" y2="50" stroke="#90CAF9" stroke-width="1" stroke-dasharray="3,3"/></svg>'
      },
      {
        id: 'microscope',
        name: 'Microscope',
        category: 'lab-equipment',
        defaultWidth: 70,
        defaultHeight: 100,
        svg: '<svg viewBox="0 0 80 110" xmlns="http://www.w3.org/2000/svg"><rect x="25" y="90" width="30" height="8" fill="#616161"/><rect x="35" y="70" width="10" height="20" fill="#757575"/><circle cx="40" cy="60" r="15" fill="#BDBDBD" stroke="#424242" stroke-width="2"/><rect x="35" y="30" width="10" height="30" fill="#757575"/><circle cx="40" cy="25" r="8" fill="#90A4AE"/><path d="M30 25 L20 15 L25 10" fill="none" stroke="#546E7A" stroke-width="3"/></svg>'
      },
      {
        id: 'petri-dish',
        name: 'Petri Dish',
        category: 'lab-equipment',
        defaultWidth: 80,
        defaultHeight: 80,
        svg: '<svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg"><circle cx="45" cy="45" r="35" fill="#E8EAF6" stroke="#3F51B5" stroke-width="2"/><circle cx="45" cy="45" r="30" fill="none" stroke="#3F51B5" stroke-width="1" opacity="0.3"/><ellipse cx="35" cy="40" rx="8" ry="6" fill="#5C6BC0" opacity="0.6"/><ellipse cx="55" cy="48" rx="10" ry="7" fill="#5C6BC0" opacity="0.6"/><ellipse cx="42" cy="55" rx="6" ry="5" fill="#5C6BC0" opacity="0.6"/></svg>'
      },
      {
        id: 'test-tube',
        name: 'Test Tube',
        category: 'lab-equipment',
        defaultWidth: 40,
        defaultHeight: 100,
        svg: '<svg viewBox="0 0 50 110" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="5" width="20" height="80" rx="0" ry="0" fill="#E1F5FE" stroke="#0288D1" stroke-width="2"/><path d="M15 85 Q25 95, 35 85" fill="#B3E5FC" stroke="#0288D1" stroke-width="2"/><line x1="10" y1="5" x2="40" y2="5" stroke="#0288D1" stroke-width="2"/></svg>'
      }
    ]
  }
];

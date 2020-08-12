const ACTION_TYPES = {
  CREATE: 'create',
};

const TEMPLATE_TYPES: {
  [key: string]: string;
  REACT: string;
  REACT_TS: string;
  VANILLAJS_TS: string;
  TOOL_TS: string;
} = {
  REACT: 'REACT',
  REACT_TS: 'REACT_TS',
  VANILLAJS_TS: 'VANILLAJS_TS',
  TOOL_TS: 'TOOL_TS',
};

const TEMPLATE_URLS = {
  [TEMPLATE_TYPES.REACT]: 'https://github.com/xiaobao66/react-skeleton.git',
  [TEMPLATE_TYPES.REACT_TS]:
    'https://github.com/xiaobao66/react-skeleton-ts.git',
  [TEMPLATE_TYPES.VANILLAJS_TS]:
    'https://github.com/xiaobao66/vanillajs-skeleton-ts.git',
  [TEMPLATE_TYPES.TOOL_TS]: 'https://github.com/xiaobao66/tool-skeleton-ts.git',
};

export { ACTION_TYPES, TEMPLATE_TYPES, TEMPLATE_URLS };

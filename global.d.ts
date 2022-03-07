declare module '*.scss';

declare module 'colorbrewer' {
  interface SchemeGroups {
    sequential: [
      'BuGn',
      'BuPu',
      'GnBu',
      'OrRd',
      'PuBu',
      'PuBuGn',
      'PuRd',
      'RdPu',
      'YlGn',
      'YlGnBu',
      'YlOrBr',
      'YlOrRd',
    ];
    singlehue: ['Blues', 'Greens', 'Greys', 'Oranges', 'Purples', 'Reds'];
    diverging: [
      'BrBG',
      'PiYG',
      'PRGn',
      'PuOr',
      'RdBu',
      'RdGy',
      'RdYlBu',
      'RdYlGn',
      'Spectral',
    ];
    qualitative: [
      'Accent',
      'Dark2',
      'Paired',
      'Pastel1',
      'Pastel2',
      'Set1',
      'Set2',
      'Set3',
    ];
  }

  export const colorbrewer: ColorBrewer.Base & { schemeGroups: SchemeGroups };
}

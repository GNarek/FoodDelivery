import Config from '../configs';

export const getImageUrl = (relPath: string) => {
  return `${Config.getBaseImageUrl()}/${relPath}`;
};

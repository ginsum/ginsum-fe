import { atom } from 'recoil';

export const userInfoState = atom<{ id: string; name: string }>({
  key: 'userInfoState',
  default: {
    id: '',
    name: '',
  },
});

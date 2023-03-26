import { uniqueId } from 'lodash';

export const options = [
  {
    id: uniqueId(),
    img: {
      backgroundImage: 'url(src/assets/images/option/khamchuyenkhoa.png)',
    },
    text1: 'home.banner.specialized.text1',
    text2: 'home.banner.specialized.text2',
  },
  {
    id: uniqueId(),
    img: {
      backgroundImage: 'url(src/assets/images/option/khamtuxa.png)',
    },
    text1: 'home.banner.remote.text1',
    text2: 'home.banner.remote.text2',
  },
  {
    id: uniqueId(),
    img: {
      backgroundImage: 'url(src/assets/images/option/khamtongquat.png)',
    },
    text1: 'home.banner.general.text1',
    text2: 'home.banner.general.text2',
  },
  {
    id: uniqueId(),
    img: {
      backgroundImage: 'url(src/assets/images/option/dichvuxetnghiem.png)',
    },
    text1: 'home.banner.medicalTest.text1',
    text2: 'home.banner.medicalTest.text2',
  },
  {
    id: uniqueId(),
    img: {
      backgroundImage: 'url(src/assets/images/option/suckhoetinhthan.png)',
    },
    text1: 'home.banner.health.text1',
    text2: 'home.banner.health.text2',
  },
  {
    id: uniqueId(),
    img: {
      backgroundImage: 'url(src/assets/images/option/khamnhakhoa.png)',
    },
    text1: 'home.banner.dentist.text1',
    text2: 'home.banner.dentist.text2',
  },
];

import { RandomEnName } from '@/libs/common/random';

import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { IFormData } from '../type';

const useRandomInfo = () => {
  const nameMinLength = 4,
    nameMaxLength = 24,
    symbolMinLength = 2,
    symbolMaxLength = 8;
  const { setValue, resetField } = useFormContext<IFormData>();
  const random = useCallback(() => {
    const randomName = RandomEnName();
    if (randomName.length > nameMaxLength || randomName.length < nameMinLength) {
      random();
      return
    }
    const tmpArr = randomName.split(' ');
    const randomSymbol = `${tmpArr[0].substring(0, 2)}${tmpArr[1].substring(0, 2)}`.toLocaleUpperCase();
    if (randomSymbol.length > symbolMaxLength || randomSymbol.length < symbolMinLength) {
      random();
      return
    }
    resetField('name');
    resetField('symbol');
    setValue('name', randomName);
    setValue('symbol', randomSymbol);
  }, [resetField, setValue]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      random();
    }
  }, [random]);
  return {
    random
  };
};

export default useRandomInfo;

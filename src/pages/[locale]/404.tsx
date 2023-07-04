import type { NextPage } from 'next/types';
import { useTranslation } from 'next-i18next';

import CLink from '@/components/locale-link';
import { getStaticPaths, makeStaticProps } from '@/utils/getI18nStatic';
import { Player } from '@lottiefiles/react-lottie-player';


export type ErrorProps = { statusCode: number | undefined };

// Error page
const Error: NextPage<ErrorProps> = ({ statusCode = 404 }: ErrorProps) => {
  const { t } = useTranslation(['common']);
  return (
    <div className="flex min-h-[82%] flex-col items-center justify-center space-y-6 text-center">
      {/* <p>{statusCode ? t('error_code', { code: statusCode }) : t('error_unknown')}</p> */}
      <Player
        autoplay
        loop
        src="https://lottie.host/855d1b73-63be-4b0e-9c73-a88b0face463/bWYPl50DYf.json"
        style={{ height: '100%', width: '100%' }}
        className="w-10 md:w-20"
      ></Player>
      <CLink href="/" className="btn-primary btn">
        {t('back_home')}
      </CLink>
    </div>
  );
};
const getStaticProps = makeStaticProps(['common']);

export { getStaticPaths, getStaticProps };
export default Error;

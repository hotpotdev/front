
import { getStaticPaths, makeStaticProps } from '@/utils/getI18nStatic';
import CreateView from '@/views/create';
import type { NextPage } from 'next/types';

const CreatePage: NextPage = () => {
  return (
    <>
      <CreateView/>
    </>
  );
};

const getStaticProps = makeStaticProps(['common','create']);
export { getStaticPaths, getStaticProps };
export default CreatePage;

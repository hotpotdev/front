
import { getStaticPaths, makeStaticProps } from '@/utils/getI18nStatic';
import ProjectView from '@/views/project';
import type { NextPage } from 'next/types';

const ProjectPage: NextPage = () => {
  return (
    <>
      <ProjectView/>
    </>
  );
};

const getStaticProps = makeStaticProps(['common','project']);
export { getStaticPaths, getStaticProps };
export default ProjectPage;


import { getStaticPaths, makeStaticProps } from '@/utils/getI18nStatic';
import ProjectsView from '@/views/projects';
import type { NextPage } from 'next/types';

const ProjectsPage: NextPage = () => {
  return (
    <>
      <ProjectsView/>
    </>
  );
};

const getStaticProps = makeStaticProps(['common','projects']);
export { getStaticPaths, getStaticProps };
export default ProjectsPage;

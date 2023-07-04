import { makeStaticProps } from '@/utils/getI18nStatic';
import { Redirect } from '@/utils/i18nRedirect';

const getStaticProps = makeStaticProps(['common']);
export { getStaticProps };
export default Redirect;

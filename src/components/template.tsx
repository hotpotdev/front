import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

type TemplateProps = React.HTMLAttributes<HTMLElement> & PropsWithChildren<{

}>;
// 模板
const Template = ({ children, ...attrs }: TemplateProps) => {
  return (
    <div {...attrs} className={clsx('', attrs.className)}>
      {children}
    </div>
  );
};

export default Template;

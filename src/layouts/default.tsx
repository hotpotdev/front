import type { PropsWithChildren } from 'react';

// 默认布局
const TheDefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full overflow-auto">
      {children}
    </div>
  );
};

export default TheDefaultLayout;

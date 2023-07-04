import clsx from 'clsx';


type TheLandingMobileSidebarProps = React.HTMLAttributes<HTMLElement> & {}

const TheLandingMobileSidebar = ({ ...attrs }: TheLandingMobileSidebarProps) => {
  return (
    <aside {...attrs} className={clsx('', attrs.className)}>

    </aside>
  );
};

export default TheLandingMobileSidebar;

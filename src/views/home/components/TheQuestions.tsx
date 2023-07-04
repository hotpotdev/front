import AnimationOnScroll from '@/components/animation-on-scroll';
import { LAYOUT_ID } from '@/conf';


export type TheQuestionsProps = {
  items: { title: string; text: string }[];
};

const TheQuestions = ({ items }: TheQuestionsProps) => {
  return (
    <>
      {items && items.length > 0 && typeof items === 'object'
        ? items.map((item, index) => {
          return (
            <AnimationOnScroll
              duration={2}
              delay={index}
              key={item.title}
              animateOnce={true}
              scrollableParentSelector={`#${LAYOUT_ID}`}

              animateIn={'animate-fadeInUp'}
            >
              <div tabIndex={0} className="collapse collapse-plus md:max-w-screen-lg mx-auto bg-base-200">
                <input type="checkbox" className="peer" />
                <div className="collapse-title text-xl font-medium">
                  {item.title}
                </div>
                <div className="collapse-content">
                  <p
                    className="text-sm text-text2 leading-5 break-words"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  ></p>
                </div>
              </div>
            </AnimationOnScroll>
          );
        })
        : null}
    </>
  );
};

export default TheQuestions;

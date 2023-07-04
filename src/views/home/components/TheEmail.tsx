import { useState } from 'react';
import { useForm } from 'react-hook-form';

import AnimationOnScroll from '@/components/animation-on-scroll';


import { EmailBgIcon } from '@/assets';
import { LAYOUT_ID } from '@/conf';
import customToast from '@/utils/customToast';
import { SubscribeEmail } from '@/utils';


type InputProps = {
  placeholder: string;
  error: string;
};

type SubscribeProps = {
  text: string;
  loading: string;
  success: string;
  error: string;
};

export type TheEmailProps = {
  title: string;
  name: InputProps;
  email: InputProps;
  subscribe: SubscribeProps;
};
type Inputs = {
  name: string;
  email: string;
};

const TheEmail = ({ title, name, email, subscribe }: TheEmailProps) => {
  const [isDisable, setDisable] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>({ mode: 'onChange' });
  const onSubmit = async (values: Inputs) => {
    setDisable(true);
    await customToast.promise(SubscribeEmail(values), {
      loading: subscribe.loading,
      success: subscribe.success,
      error: subscribe.error
    });
    setDisable(false);
    reset();
  };
  return (
    <AnimationOnScroll
      duration={1}
      delay={1}
      animateOnce={true}
      scrollableParentSelector={`#${LAYOUT_ID}`}

      animateIn={'animate-fadeInUp'}
    >
      <div className="rounded-xl flex mx-auto space-x-4 bg-base-200 py-8 px-11 items-center justify-center md:flex-row md:max-w-screen-lg md:py-16 md:px-22 md:justify-between">
        <div>
          <h3 className="font-bold text-center mb-6 tracking-tight text-2xl whitespace-nowrap  md:text-left">
            {title}
          </h3>
          {/* subscribe */}
          <form className="flex-col flex space-y-6 items-start" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="" className="w-full max-w-100">
              <input
                type="text"
                placeholder={name && name.placeholder}
                className="border-transparent rounded-xl outline-none bg-bg-base-100  border-2 w-full py-3 px-5 placeholder-text2 focus:border-primary disabled:cursor-not-allowed"
                {...register('name', {
                  maxLength: 20,
                  minLength: 0,
                  disabled: isDisable
                })}
                disabled={isDisable}
              />
              {errors.name && <p className="text-xs text-error pt-2 text-text2">{name && name.error}</p>}
            </label>
            <label htmlFor="" className="w-full max-w-100">
              <input
                type="email"
                placeholder={email && email.placeholder}
                className="border-transparent rounded-xl outline-none bg-bg-base-100  border-2 w-full py-3 px-5 placeholder-text2 focus:border-primary disabled:cursor-not-allowed"
                {...register('email', {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  disabled: isDisable
                })}
                disabled={isDisable}
              />
              {errors.email && <p className="text-error text-xs pt-2 text-text2">{email.error}</p>}
            </label>
            <button type="submit" className="btn btn-primary normal-case " disabled={isDisable}>
              <>
                {isDisable && <span className="mr-1 loading loading-spinner"></span>}
                {subscribe && subscribe.text}
              </>
            </button>
          </form>
        </div>
        <EmailBgIcon className="hidden !h-65 !fill-transparent !stroke-transparent !w-75 md:block" />
      </div>
    </AnimationOnScroll>
  );
};

export default TheEmail;

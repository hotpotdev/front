import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import TheBanner from './components/TheBanner';
import TheStatistics from './components/TheStatistics';
import TheBooster from './components/TheBooster';
import TheUseCase from './components/TheUseCase';
import TheQuestions from './components/TheQuestions';
import TheTimeScroll from './components/TheTimeScroll';
import TheEcosystems from './components/TheEcosystems';
import TheCommunity from './components/TheCommunity';
import TheEmail from './components/TheEmail';

type HomeViewProps = React.HTMLAttributes<HTMLElement> & {

};

const HomeView = ({ ...attrs }: HomeViewProps) => {
  const { t } = useTranslation(['home']);
  return (
    <main {...attrs} className={clsx('space-y-16 lg:space-y-32 container mx-auto', attrs.className)}>
      {/* section banner */}
      <section className="flex w-full pt-12 justify-between items-start md:pt-20 ">
        <TheBanner item={t('banner', { interpolation: { escapeValue: false } }) as any} />
      </section>
      {/* section statistics data */}
      <section className="space-y-16">
        <div>
          <h2 className="text-center text-text2 md:text-xl">{t('statistics.title')}</h2>
        </div>
        <TheStatistics items={t('statistics.items') as any} />
      </section>
      {/* section community booster */}
      <section className="space-y-16">
        <h2 className="font-bold text-center text-3xl lg:text-6xl">{t('booster.title')}</h2>
        <TheBooster items={t('booster.items') as any} />
      </section>
      {/*  section use case */}
      <section className="space-y-8">
        <h2 className="font-bold text-center pb-8 text-3xl lg:text-6xl">{t('use.title')}</h2>
        <TheUseCase items={t('use.items') as any} />
      </section>
      {/* section frequently asked questions */}
      <section className="space-y-8">
        <h2 className="font-bold text-center pb-8 text-3xl lg:text-6xl">{t('questions.title')}</h2>
        <TheQuestions items={t('questions.items') as any} />
      </section>
      {/* our road map */}
      <section className="space-y-8">
        <h2 className="font-bold text-center pb-8 text-3xl lg:text-6xl">{t('roadmap.title')}</h2>
        <TheTimeScroll
          className="mx-auto md:max-w-screen-lg"
          init={t('roadmap.init') as any}
          items={t('roadmap.items') as any}
        />
      </section>
      {/* ecosystems */}
      <section className="space-y-8">
        <h2 className="font-bold text-center pb-8 text-3xl lg:text-6xl">{t('ecosystems.title')}</h2>
        <TheEcosystems items={t('ecosystems.items') as any} />
      </section>
      {/* community */}
      <section className="space-y-8">
        <h2 className="font-bold text-center pb-8 text-3xl lg:text-6xl">{t('community.title')}</h2>
        <TheCommunity items={t('community.items') as any} />
        {/* email */}
        <TheEmail
          title={t('email.title') as any}
          name={t('email.name') as any}
          email={t('email.email') as any}
          subscribe={t('email.subscribe') as any}
        />
      </section>
    </main>
  );
};

export default HomeView;

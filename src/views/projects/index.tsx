
import clsx from 'clsx'
import AllProject from './components/all-projects'
import Search from './components/search'
import { FormProvider, useForm } from 'react-hook-form'
import Link from 'next/link'

type ProjectsViewProps = React.HTMLAttributes<HTMLElement> & {}

const ProjectsView = ({ ...attrs }: ProjectsViewProps) => {
  const methods = useForm({
    defaultValues: {
      search: '',
    }
  })
  return (
    <main {...attrs} className={clsx('mx-auto max-w-screen-xl space-y-12 lg:my-16', attrs.className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">All Projects</h2>
        <Link className="btn-xs btn normal-case md:h-10 md:px-6" href="/">
          Create Project
        </Link>
      </div>
      <FormProvider {...methods}>
        <Search />
        {/* table */}
        <AllProject />
      </FormProvider>
    </main>
  )
}

export default ProjectsView

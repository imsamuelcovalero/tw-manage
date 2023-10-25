/* File: src/app/page.tsx */
import Home from './home'
import AuthenticatedLayout from './authenticatedLayout'

export default function Page() {
  console.log('pageX');

  return (
    <AuthenticatedLayout>
      <main >
        <Home />
      </main>
    </AuthenticatedLayout>
  )
}

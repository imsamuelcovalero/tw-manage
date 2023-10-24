/* File: src/app/login/page.tsx */
import { Login } from "../components/Login"
import PublicLayout from "../publicLayout";

export default function Page() {
  // console.log('process.env.SUPABASE_URL_login', process.env.SUPABASE_URL);

  return (
    <PublicLayout>
      <main >
        <Login />
      </main>
    </PublicLayout>
  )
}

import ReownLoginView from 'src/sections/auth/reown-login-view';
import DynamicLoginView from 'src/sections/auth/dynamic-login-view';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return process.env.NEXT_PUBLIC_AUTH_MODE === 'REOWN' ? <ReownLoginView /> : <DynamicLoginView />;
}

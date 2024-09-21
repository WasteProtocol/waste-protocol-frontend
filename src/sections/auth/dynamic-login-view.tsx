'use client';

import { useState, useEffect } from 'react';
import {
  useIsLoggedIn,
  useDynamicContext,
  DynamicEmbeddedWidget,
} from '@dynamic-labs/sdk-react-core';

import Box from '@mui/system/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext();
  const { primaryWallet } = useDynamicContext();

  const isLoggedIn = useIsLoggedIn();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        await signMessage();
        await onSubmit();
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const signMessage = async () => {
    if (!primaryWallet) return;

    const signature = await primaryWallet.signMessage('msg from backend');

    console.log('signature', signature);
  };

  const onSubmit = async () => {
    try {
      await login?.('demo@minimals.cc', 'demo1234');
      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);

      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  };

  return (
    <>
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}
      {!isLoggedIn ? (
        <DynamicEmbeddedWidget />
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

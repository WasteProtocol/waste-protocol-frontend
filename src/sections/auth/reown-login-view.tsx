'use client';

import { useAccount } from 'wagmi';
import { signMessage } from '@wagmi/core';
import { useState, useEffect } from 'react';
import { useAppKit } from '@reown/appkit/react';

import Box from '@mui/system/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { config } from 'src/libs/reown/config';
import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext();
  const { open } = useAppKit();

  const { isConnected } = useAccount();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  useEffect(() => {
    (async () => {
      if (isConnected) {
        await signWalletMessage();
        await onSubmit();
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  const signWalletMessage = async () => {
    const signature = await signMessage(config, { message: 'hello world' });

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

      {!isConnected ? (
        <Button type="button" onClick={() => open()}>
          Connect
        </Button>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

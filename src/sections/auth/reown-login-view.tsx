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

import axios from 'src/utils/axios';

import { config } from 'src/libs/reown/config';
import { useAuthContext } from 'src/auth/hooks';
import { HOST_API, PATH_AFTER_LOGIN } from 'src/config-global';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login, authenticated } = useAuthContext();
  const { open } = useAppKit();

  const { isConnected, address } = useAccount();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  useEffect(() => {
    (async () => {
      if (isConnected && !authenticated) {
        await onSubmit();
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  const onSubmit = async () => {
    try {
      if (!address) return;

      const { data } = await axios.post(`${HOST_API!}/auth/signin/public-address`, {
        publicAddress: address,
      });

      const signature = await signMessage(config, { message: data.data.msg });

      console.log('signature', signature);

      await login?.(signature, address);
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

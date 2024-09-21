/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import {
  useIsLoggedIn,
  useDynamicContext,
  DynamicEmbeddedWidget,
} from '@dynamic-labs/sdk-react-core';

import Alert from '@mui/material/Alert';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import axios from 'src/utils/axios';

import { useAuthContext } from 'src/auth/hooks';
import { HOST_API, PATH_AFTER_LOGIN } from 'src/config-global';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login, authenticated } = useAuthContext();
  const { primaryWallet } = useDynamicContext();
  const { address } = useAccount();

  const isLoggedIn = useIsLoggedIn();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  // useEffect(() => {
  //   if (isConnected) {
  //     disconnect();
  //   }
  // }, []);

  useEffect(() => {
    (async () => {
      if (isLoggedIn && !authenticated) {
        await onSubmit();
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const onSubmit = async () => {
    try {
      console.log({ primaryWallet, address, isLoggedIn });
      if (!primaryWallet) return;

      const { data } = await axios.post(`${HOST_API!}/auth/signin/public-address`, {
        publicAddress: primaryWallet.address,
      });

      const signature = await primaryWallet.signMessage(data.data.msg);

      console.log('signature', signature);
      await login?.(signature!, primaryWallet.address);
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
      {/* {!primaryWallet ? ( */}
      <DynamicEmbeddedWidget />
      {/* ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )} */}
    </>
  );
}

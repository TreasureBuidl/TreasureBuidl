import { useMemo, useState } from "react";

/*
  ~ What it does? ~

  Gets user provider

  ~ How can I use? ~

  const userProvider = useUserProvider(injectedProvider);

  ~ Features ~

  - Specify the injected provider from Metamask
  - Specify the local provider
  - Usage examples:
    const tx = Transactor(userSigner, gasPrice)
*/

const useUserSigner = (injectedProvider) => {
  const [signer, setSigner] = useState(null);

  useMemo(() => {
    if (injectedProvider) {
      const injectedSigner = injectedProvider._isProvider ? injectedProvider.getSigner() : injectedProvider;
      setSigner(injectedSigner);
    } else {
      // #TODO: use burner signer here potentially
    }
  }, [injectedProvider]);

  return signer;
};

export default useUserSigner;

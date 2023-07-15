import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { lorelei, loreleiNeutral } from '@dicebear/collection';


function Logo() {
  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      size: 64,

    }).toDataUriSync();
  }, []);

  return <img src={avatar} alt="Avatar" />;
}

export default Logo;
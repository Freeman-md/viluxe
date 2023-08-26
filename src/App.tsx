import React from 'react';
import { ReactComponent as Logo} from './assets/svgs/logo.svg'

function App() {
  return (
    <>
      <header className='w-full flex items-center justify-center py-2'>
        <Logo className='w-60' />
      </header>

      <main className='h-[80vh] w-full flex items-center justify-center'>
        <p className='text-3xl text-center w-1/2 text-primary'>Elevating Shopping Through Seamless Tech and Style Fusion.</p>
      </main>
    </>
  );
}

export default App;

import React from 'react'
import signatureEthblock from '../../images/signature_ethblock.png'
import HorizontalRule from '../common/HorizontalRule'

const FootNotes = () => {
  return (
    <div>
      <div className='selection:bg-green-300 selection:text-green-900'>
        <div className='mx-auto flex flex-col px-8 md:px-0 py-16 w-full md:w-[800px] gap-y-12 text-md md:text-2xl font-garamond text-justify items-center justify-center'>
          <div className='text-4xl'>
            Sign to get access to genesis caps
          </div>
        </div>

        <div className='mx-auto flex flex-col px-8 md:px-0 py-5 w-full md:w-[800px] gap-y-12 text-md md:text-2xl font-garamond text-justify items-center justify-center'>
          <div>
            Our genesis capsule features the MF70 anti-surveillance suit. Collaboration curated by Metafactory as the brand.
          </div>
        </div>

        <div className='mx-auto flex flex-col px-8 md:px-0 py-5 w-full md:w-[800px] gap-y-12 text-md md:text-2xl font-garamond text-justify items-center justify-center'>
          <div>
            Produced and designed by the reputable [a]industri designer collective and micro-factory in Sweden.
          </div>
        </div>

        <div className='mx-auto flex flex-col px-8 md:px-0 py-5 w-full md:w-[800px] gap-y-12 text-md md:text-2xl font-garamond text-justify items-center justify-center'>
          <div>
            Product set pattern is production ready and the open-source pattern is provided by lead designers Rickard Lindqvist and Hugh Clarck. Signature Capsules is partnering to bring together a designer community to utilize the open-source pattern and design their own identities as part of the MF70 themed collection.
          </div>
        </div>
      </div>

      <HorizontalRule />

      <div className='flex flex-col py-16 items-center justify-center'>
        <div className='relative group z-10 '>
          <img
            src={signatureEthblock}
            alt='logo'
          />
        </div>
        <div>
          The{' '}
          <a
            target='_blank' rel='noreferrer'
            className='underline font-bold'
            href='https://ethblock.art/create/1/910815'
          >
            signature style
          </a>{' '}
          for Ethereum block 910815
        </div>
      </div>
    </div>
  )
}

export default FootNotes

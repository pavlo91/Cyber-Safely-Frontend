import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Config } from '../helpers/config'
import { useUser } from './context/auth'

// prettier-ignore
function loadIntercom() {
  // @ts-ignore
  (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/' + Config.intercom.appId;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
}

function bootIntercom(options = {}) {
  // @ts-ignore
  window && window.Intercom && window.Intercom('boot', { app_id: Config.intercom.appId, ...options })
}

function updateIntercom() {
  // @ts-ignore
  window && window.Intercom && window.Intercom('update')
}

type IntercomProviderProps = {
  children: React.ReactNode
}

export function IntercomProvider({ children }: IntercomProviderProps) {
  const router = useRouter()

  const { user } = useUser()

  useEffect(() => {
    loadIntercom()
    bootIntercom({
      name: user.name,
      email: user.email,
    })
  }, [user])

  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== 'undefined') {
        updateIntercom()
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.events])

  return children as JSX.Element
}

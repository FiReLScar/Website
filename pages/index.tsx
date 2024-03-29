import Head from 'next/head'
import Image from 'next/image'
import { JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'
import axios from 'axios'

const jbnf = JetBrains_Mono({ subsets: ['latin'] })

export default function Home() {
  useEffect(() => {
    const pi1 = document.getElementById('pi1')
    const pia = document.getElementById('pia')
    const pil = document.getElementById('pil')
    if (pi1 == null || pia == null || pil == null) return

    pia.style.top = pi1.offsetTop - pi1.offsetHeight - 3 + 'px'
    pia.style.left = pi1.offsetLeft - pi1.offsetWidth - 3 + 'px'
    pia.classList.add('transition-all', 'duration-500')

    let scrolling = false

    let body = document.getElementById('body')
    let arrow = document.getElementById('arrow')
    if (body == null) return
    body.onscroll = () => {
      if (scrolling) return
      if (body == null) return
      let page = body.scrollTop / window.innerHeight
      let currentPi = document.getElementById('pi' + Math.round(page + 1))
      if (currentPi == null) return
      // center progress indicator
      pia.style.top = currentPi.offsetTop - currentPi.offsetHeight - 3 + 'px'
      pia.style.left = currentPi.offsetLeft - currentPi.offsetWidth - 3 + 'px'
      // remove arrow at bottom
      if (arrow == null || body.lastElementChild == null) return
      let last = body.lastChild as HTMLElement
      if (last.offsetTop - body.scrollTop < window.innerHeight) {
        arrow.classList.add('transition-all', 'duration-500', 'opacity-0', "pointer-events-none")
      } else arrow.classList.remove('opacity-0', "pointer-events-none")
      // add logo
      let logo = document.getElementById('levi')
      let logolg = document.getElementById('levi-lg')
      if (logo == null || logolg == null) return
      if (body.scrollTop > 0) {
        logo.classList.add('opacity-100')
        logolg.classList.add('opacity-0')
      } else {
        logo.classList.remove('opacity-100')
        logolg.classList.remove('opacity-0')
      }
    }

    // add click event to progress indicators
    for (let i = 0; i < pil.children.length; i++) {
      if (pil.children[i] == null) return
      pil.children[i].addEventListener("click", () => {
        scrolling = true
        if (body == null) return
        body.scrollTop = (i-1) * window.innerHeight
        let currentPi = document.getElementById('pi' + i)
        if (currentPi == null) return
        // center progress indicator
        pia.style.top = currentPi.offsetTop - currentPi.offsetHeight - 3 + 'px'
        pia.style.left = currentPi.offsetLeft - currentPi.offsetWidth - 3 + 'px'
        setTimeout(() => {
          scrolling = false
        }, 500)
      })
    }

    // add click event to arrow
    if (arrow == null) return
    arrow.onclick = () => {
      if (body == null) return
      body.scrollTop += window.innerHeight
    }

    let btn = document.getElementById('send-email')
    if (btn == null) return
    let Error = () => {
      let form = document.getElementById('form-email')
      let error = document.getElementById('error-email')
      if (form == null || error == null) return
      form.classList.add('opacity-0', 'pointer-events-none')
      if (error.style.height == "") error.style.height = form.offsetHeight + 'px'
      setTimeout(() => {
        form?.classList.add('hidden')
        error?.classList.remove('hidden')
        error?.classList.add('opacity-100')
      }, 500)
    }

    let SendEmail = () => {
      let email = document.getElementById('email-email') as HTMLInputElement
      let message = document.getElementById('message-email') as HTMLInputElement
      if (email == null || message == null) return
      let loader = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-spin"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>'
      let retry = document.getElementById('retry-email')
      if (retry == null) return
      retry.innerHTML = "Retry " + loader
      if (btn == null) return
      btn.innerHTML = "Sending " + loader
      let req = new XMLHttpRequest()
      req.open("POST", "https://api.levihicks.dev/api/email", true)
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      req.onreadystatechange = () => {
        if (req.readyState == 4) {
          let btn = document.getElementById('send-email')
          let retry = document.getElementById('retry-email')
          if (btn == null || retry == null) return
          btn.innerHTML = "Send"
          retry.innerHTML = "Retry"
          if (req.status == 200) {
            let form = document.getElementById('form-email')
            let success = document.getElementById('success-email')
            let error = document.getElementById('error-email')
            if (form == null || success == null || error == null) return
            if (error.style.height != "") success.style.height = error.offsetHeight + 'px'
            error.classList.add('opacity-0', 'pointer-events-none')
            form.classList.add('opacity-0', 'pointer-events-none')
            if (success.style.height == "") success.style.height = form.offsetHeight + 'px'
            setTimeout(() => {
              form?.classList.add('hidden')
              error?.classList.add('hidden')
              success?.classList.remove('hidden')
              success?.classList.add('opacity-100')
            }, 500)
            email.value = ""
            message.value = ""
          } else {
            Error()
          }
        }
      }
      req.send("email=" + email.value + "&message=" + message.value)
    }
    btn.onclick = SendEmail

    let retry = document.getElementById('retry-email')
    if (retry == null) return
    retry.onclick = SendEmail
  }, [])
  return (
    <>
      <Head>
        <title>Levi Hicks</title>
        <meta name="description" content="Fullstack Developer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#e7e5e4" />
      </Head>
      <div className="snap-y snap-mandatory overflow-y-scroll scroll-smooth h-screen max-w-screen" id="body">
        <div className={`flex flex-col justify-center lg:pl-96 pl-12 gap-6 bg-stone-200 h-screen snap-center ${jbnf.className}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 399.61 232.88" className="animate-slide-in lg:w-48 w-28 fill-stone-600 transition-opacity duration-500" id="levi-lg">
            <path d="M23.72,39.85C13.16,75.61,5.13,112.47,1.04,149.55c-1.64,14.91-1.94,31.09,3.72,45.25,3.14,7.87,7.65,15.19,14.17,20.74s14.55,9.72,23,12.34c7.93,2.46,16.27,3.59,24.52,4.29,9.54,.81,19.13,.87,28.7,.47,18.92-.8,37.75-3.25,56.52-5.66,38.32-4.92,76.48-10.9,114.54-17.52,37.43-6.51,74.77-13.6,112.08-20.75,4.65-.89,9.3-1.78,13.95-2.67,5.15-.99,8.56-7.44,6.98-12.3-1.78-5.49-6.79-8.04-12.3-6.98-36.7,7.04-73.41,14.08-110.2,20.64-36.54,6.51-73.17,12.53-109.93,17.58-1.23,.17-2.47,.34-3.7,.51-.49,.07-.99,.12-1.48,.2,2.38-.37,.96-.13,.44-.06-2.47,.33-4.94,.66-7.41,.98-4.57,.59-9.14,1.17-13.71,1.73-9.28,1.14-18.56,2.24-27.87,3.09-9.18,.83-18.38,1.41-27.6,1.46-4.72,.03-9.45-.08-14.16-.36-2.24-.13-4.47-.3-6.7-.52-.88-.08-1.75-.18-2.63-.28-.49-.06-.98-.12-1.46-.18-1.92-.23,2.37,.36,.32,.04-3.52-.56-7.01-1.19-10.45-2.1-1.71-.45-3.4-.96-5.07-1.53-.92-.32-1.84-.65-2.74-1.01-.36-.14-.72-.3-1.08-.44,2.81,1.08,.84,.34,.26,.07-1.57-.73-3.11-1.53-4.6-2.42-.74-.44-1.47-.9-2.19-1.38-.4-.27-.79-.54-1.18-.82l-.46-.34c-.83-.63-.61-.46,.66,.51-.43-.57-1.22-1.01-1.76-1.5-.72-.65-1.41-1.32-2.08-2.02-.53-.55-1.04-1.12-1.54-1.7-.31-.36-.6-.73-.9-1.09-.77-.94,1.34,1.88,.38,.46s-1.86-2.75-2.66-4.21c-.44-.8-.86-1.62-1.26-2.45-.16-.33-.31-.67-.46-1-.86-1.87,.88,2.28,.16,.35-1.24-3.33-2.21-6.71-2.86-10.21-.14-.74-.25-1.49-.38-2.24-.34-2.02,.24,2.07,.09,.68-.05-.47-.11-.95-.16-1.42-.19-1.82-.32-3.65-.4-5.48-.15-3.61-.1-7.22,.09-10.83s.53-7.4,.95-11.08c.09-.77,.18-1.53,.28-2.3,.07-.57,.45-3.95,.13-1.07,.25-2.3,.64-4.59,.97-6.87,1.32-9.03,2.83-18.04,4.52-27.01,3.36-17.82,7.44-35.51,12.23-53,1.19-4.34,2.43-8.67,3.7-12.99,1.48-5.02-1.79-11.12-6.98-12.3s-10.72,1.61-12.3,6.98h0Z"/><path d="M54.2,93.74c-5.03,12.33-8.98,25.08-11.76,38.11-1.48,6.92-3.03,14.11-3.2,21.19-.2,7.95,2.19,15.83,7.83,21.6,4.72,4.82,11.34,7.95,17.98,8.93,4.1,.61,8.11,.83,12.24,.46s8.16-1.01,12.22-1.67c13.28-2.16,26.47-4.83,39.55-8,14.79-3.59,29.41-7.82,43.84-12.66,2.47-.83,4.63-2.3,5.98-4.6,1.25-2.14,1.79-5.3,1.01-7.71s-2.28-4.75-4.6-5.98-5.15-1.87-7.71-1.01c-22.62,7.6-45.75,13.68-69.19,18.16-6.61,1.26-13.25,2.47-19.91,3.39l2.66-.36c-4.46,.59-8.94,.91-13.42,.33l2.66,.36c-2.33-.34-4.58-.92-6.75-1.82l2.39,1.01c-1.74-.75-3.36-1.67-4.87-2.81l2.02,1.56c-1.17-.92-2.23-1.95-3.16-3.12l1.56,2.02c-.88-1.15-1.59-2.36-2.16-3.69l1.01,2.39c-.63-1.55-1.04-3.15-1.29-4.81l.36,2.66c-.42-3.26-.22-6.53,.2-9.77l-.36,2.66c2.38-17.63,7.46-35.06,14.17-51.51,.91-2.24,.15-5.72-1.01-7.71s-3.59-4.05-5.98-4.6c-2.56-.58-5.43-.46-7.71,1.01l-2.02,1.56c-1.24,1.25-2.1,2.72-2.57,4.41h0Z"/><path d="M56.53,138.4c12.6,1.06,25.69-.79,37.5-5.32,2.5-.96,4.58-2.21,5.98-4.6,1.25-2.14,1.79-5.3,1.01-7.71s-2.28-4.75-4.6-5.98-5.23-1.96-7.71-1.01c-5.75,2.21-11.72,3.73-17.82,4.56l2.66-.36c-5.65,.74-11.34,.88-17.02,.4-2.43-.2-5.4,1.26-7.07,2.93s-3.04,4.58-2.93,7.07,.97,5.27,2.93,7.07,4.3,2.7,7.07,2.93h0Z"/><path d="M63.27,102.64l75.85-4.4,21.46-1.24-8.63-15.05c-3.07,6.8-4.86,13.63-5.37,21.1-.45,6.5,.34,13.24,2.06,19.52,3.69,13.48,12.17,25.7,24.09,33.15,6.6,4.13,14.88,6.82,22.73,6.15,4.49-.39,8.28-1.41,12.4-3.18,3.14-1.35,5.83-3.28,8.5-5.39,5.04-3.99,9.13-9.33,12.28-14.9,3.42-6.05,5.88-12.68,7.56-19.41,4.34-17.41,4.14-35.93-.65-53.23-.67-2.43-2.42-4.7-4.6-5.98s-5.3-1.79-7.71-1.01c-5.15,1.67-8.48,6.9-6.98,12.3,1.15,4.15,2.01,8.37,2.6,12.64l-.36-2.66c1.1,8.4,1.09,16.9-.03,25.3l.36-2.66c-.98,7.07-2.65,14.12-5.4,20.72l1.01-2.39c-1.85,4.39-4.18,8.56-7.09,12.34l1.56-2.02c-1.97,2.52-4.18,4.82-6.69,6.79l2.02-1.56c-2,1.54-4.15,2.84-6.48,3.83l2.39-1.01c-2.03,.83-4.13,1.41-6.3,1.7l2.66-.36c-2.09,.26-4.17,.25-6.26,0l2.66,.36c-2.55-.35-5.02-1.04-7.4-2.02l2.39,1.01c-3.04-1.29-5.85-2.99-8.46-5l2.02,1.56c-2.87-2.26-5.43-4.86-7.68-7.74l1.56,2.02c-2.5-3.26-4.56-6.81-6.19-10.58l1.01,2.39c-1.79-4.24-3-8.68-3.63-13.24l.36,2.66c-.58-4.44-.59-8.92,0-13.35l-.36,2.66c.57-4.07,1.64-8.03,3.24-11.82l-1.01,2.39c.14-.33,.29-.66,.44-1,.9-1.56,1.36-3.24,1.37-5.05,0-1.81-.46-3.49-1.37-5.05-1.7-2.91-5.18-5.15-8.63-4.95l-75.85,4.4-21.46,1.24c-2.65,.15-5.15,1.01-7.07,2.93-1.73,1.73-3.04,4.58-2.93,7.07s.97,5.27,2.93,7.07,4.42,3.08,7.07,2.93h0Z"/><path d="M227.09,76.66c19.48,.09,38.95-1.13,58.27-3.67,1.38,.05,2.66-.24,3.85-.86,1.24-.4,2.31-1.09,3.22-2.07,1.73-1.73,3.04-4.58,2.93-7.07s-.97-5.27-2.93-7.07c-1.81-1.66-4.52-3.26-7.07-2.93-19.32,2.53-38.79,3.76-58.27,3.67-5.23-.02-10.24,4.62-10,10s4.39,9.97,10,10h0Z"/><path d="M278.04,60.44c-4.28,20.62-5.92,41.84-4.48,62.86,.45,6.49,1.22,12.94,2.15,19.37,.33,2.3,2.69,4.86,4.6,5.98,2.14,1.25,5.3,1.79,7.71,1.01s4.75-2.28,5.98-4.6l1.01-2.39c.48-1.77,.48-3.54,0-5.32-.11-.79-.23-1.59-.33-2.38l.36,2.66c-2.62-19.54-2.61-39.37-.01-58.91l-.36,2.66c.71-5.24,1.6-10.45,2.67-15.62,.55-2.64,.39-5.32-1.01-7.71-1.21-2.07-3.59-4.05-5.98-4.6-2.56-.58-5.43-.46-7.71,1.01-2.11,1.36-4.07,3.43-4.6,5.98h0Z"/><path d="M268.51,2.84c-3.32,2.96-6.72,6.31-8.72,10.33-2.86,5.75-3.39,11.88-.87,17.85,2.06,4.89,6.06,9.2,10.85,11.55,5.16,2.53,10.77,3.5,16.5,3.38,10.81-.23,22.8-2.15,29.24-11.84,1.74-2.62,2.81-6.2,2.66-9.36-.2-4.24-1.96-7.96-4.86-11.03-1.79-1.89-4.04-3.43-6.22-4.85-1.64-1.08-3.37-2.03-5.15-2.85-2.68-1.24-5.45-2.38-8.29-3.2s-5.84-1.26-8.83-1.63c-5.22-.65-10.45-.23-15.6,.77-2.35,.45-4.8,2.59-5.98,4.6-1.25,2.14-1.79,5.3-1.01,7.71s2.28,4.75,4.6,5.98c2.48,1.31,4.94,1.54,7.71,1.01,.8-.15,1.6-.29,2.41-.4l-2.66,.36c3.64-.47,7.3-.44,10.94,.04l-2.66-.36c3.63,.52,7.17,1.5,10.55,2.92l-2.39-1.01c3.11,1.34,6.04,3.04,8.73,5.1l-2.02-1.56c.81,.64,1.56,1.32,2.23,2.11l-1.56-2.02c.39,.51,.71,1.02,.99,1.6l-1.01-2.39c.19,.47,.32,.93,.4,1.43l-.36-2.66c.05,.49,.05,.95,0,1.44l.36-2.66c-.09,.61-.25,1.18-.47,1.75l1.01-2.39c-.31,.7-.68,1.33-1.12,1.94l1.56-2.02c-.63,.8-1.34,1.5-2.14,2.13l2.02-1.56c-1.11,.81-2.29,1.45-3.56,1.99l2.39-1.01c-2.19,.87-4.48,1.36-6.8,1.69l2.66-.36c-4.32,.57-8.77,.91-13.11,.36l2.66,.36c-1.88-.27-3.7-.72-5.46-1.45l2.39,1.01c-1.23-.55-2.36-1.23-3.43-2.05l2.02,1.56c-.95-.77-1.79-1.61-2.54-2.58l1.56,2.02c-.57-.77-1.05-1.57-1.45-2.44l1.01,2.39c-.37-.88-.62-1.76-.77-2.7l.36,2.66c-.1-.86-.1-1.69-.01-2.55l-.36,2.66c.14-.99,.4-1.92,.77-2.85l-1.01,2.39c.55-1.28,1.27-2.45,2.1-3.56l-1.56,2.02c1.6-2.06,3.5-3.85,5.44-5.58s2.93-4.66,2.93-7.07-1.09-5.38-2.93-7.07c-4.18-3.84-9.96-3.72-14.14,0h0Z"/>
          </svg>
          <span className="lg:text-4xl text-2xl font-black text-stone-500 animate-typing">Fullstack Engineer</span>
        </div>
        <div className={`flex flex-col w-full py-36 lg:px-32 px-8 gap-8 bg-stone-200 h-screen snap-center ${jbnf.className}`}>
          <span className="text-2xl 2xl:text-3xl font-black text-stone-700">Projects:</span>
          <div className="flex lg:flex-col flex-row h-full w-full gap-2 lg:gap-4 xl:gap-8">
            <div className="flex lg:flex-row flex-col h-full gap-2 lg:gap-4 w-full xl:gap-8">
              <Link href="https://github.com/n11software/hydra" className="bg-stone-300 rounded-lg flex-1 expand flex flex-col justify-end">
                <div className="bg-stone-300 rounded-lg flex-1 expand flex flex-col justify-end" style={{backgroundImage: "url('/hydra-hero.png')"}}>
                  <span className="lg:text-2xl text-lg font-black text-stone-200 ml-4 mt-4">Hydra</span>
                  <span className="lg:text-lg text-sm font-bold text-stone-300 ml-4 mb-4">64 bit kernel written in C++</span>
                </div>
              </Link>
              <Link href="https://github.com/n11software/link" className="bg-stone-300 rounded-lg flex-1 expand flex flex-col justify-end">
                <div className="bg-stone-300 rounded-lg flex-1 expand flex flex-col justify-end" style={{backgroundImage: "url('/link-hero.png')"}}>
                  <span className="lg:text-2xl text-lg font-black text-stone-200 ml-4 mt-4">Link</span>
                  <span className="lg:text-lg text-sm font-bold text-stone-300 ml-4 mb-4">Webserver written in C++</span>
                </div>
              </Link>
            </div>
            <div className="flex lg:flex-row flex-col h-full gap-2 lg:gap-4 w-full xl:gap-8">
              <Link href="https://github.com/n11software/website" className="bg-stone-300 rounded-lg flex-1 expand flex flex-col justify-end">
                <div className="bg-stone-300 rounded-lg flex-1 expand flex flex-col justify-end" style={{backgroundImage: "url('/null-hero.png')"}}>
                  <span className="lg:text-2xl text-lg font-black text-stone-200 ml-4 mt-4">N11</span>
                  <span className="lg:text-lg text-sm font-bold text-stone-300 ml-4 mb-4">Search Engine written in C++</span>
                </div>
              </Link>
              <Link href="https://github.com/FiReLScar/bank-api" className="bg-stone-300 rounded-lg flex-1 expand flex flex-col justify-end">
                <div className="bg-stone-300 rounded-lg flex-1 expand flex flex-col justify-end" style={{backgroundImage: "url('/bank-hero.png')"}}>
                  <span className="lg:text-2xl text-lg font-black text-stone-200 ml-4 mt-4">Bank</span>
                  <span className="lg:text-lg text-sm font-bold text-stone-300 ml-4 mb-4">API for local bank</span>
                </div>
              </Link>
              <Link href="https://github.com/FiReLScar/Lights" className="bg-stone-300 rounded-lg flex-1 expand flex flex-col justify-end">
                <div className="bg-stone-300 rounded-lg flex-1 expand flex flex-col justify-end" style={{backgroundImage: "url('/lights-hero.png')"}}>
                  <span className="lg:text-2xl text-lg font-black text-stone-200 ml-4 mt-4">Lights</span>
                  <span className="lg:text-lg text-sm font-bold text-stone-300 ml-4 mb-4">API for smart lights</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className={`flex flex-col gap-8 py-36 lg:px-32 px-8 bg-stone-200 h-screen overflow-hidden snap-center ${jbnf.className}`}>
          <span className="text-2xl 2xl:text-3xl font-black text-stone-700">About Me:</span>
          <div className="flex lg:flex-row flex-col-reverse lg:gap-0 gap-4 justify-center items-center">
            <span className="2xl:text-2xl text-lg font-bold w-full text-stone-500">
              I am a fullstack developer, I work with C++, NextJS, and basically anything else, I pick up new things very quickly and I am always looking for new challenges.
            </span>
            <div className="w-full flex justify-center items-center">
              <img src="/me.png" className="lg:w-64 lg:h-64 h-32 w-32 rounded-full" />
            </div>
          </div>
        </div>
        <div className={`flex flex-col gap-8 py-36 lg:px-32 px-8 bg-stone-200 snap-center h-screen overflow-y-auto ${jbnf.className}`}>
          <div className="flex lg:flex-row flex-col lg:w-full h-full gap-8">
            <div className="flex lg:w-full h-full flex-col lg:gap-8 gap-4">
              <span className="text-2xl 2xl:text-3xl font-black text-stone-700">Socials:</span>
              <div className="flex flex-col justify-center gap-2 w-fit lg:mx-0 mx-auto">
                <Link href="https://github.com/FiReLScar">
                  <div className="flex flex-row justify-center items-center gap-4 2xl:text-2xl text-lg font-bold bg-stone-800 rounded-full px-8 py-2 text-stone-200">
                    <span>
                      GitHub
                    </span>
                    <img src="/github.svg" alt="" className="w-6 h-6" />
                  </div>
                </Link>
                <Link href="https://www.linkedin.com/in/firelscar/">
                  <div className="flex flex-row justify-center items-center gap-4 2xl:text-2xl text-lg font-bold bg-blue-700 rounded-full px-8 py-2 text-stone-200">
                    <span>
                      LinkedIn
                    </span>
                    <img src="/linkedin.png" alt="" className="w-4 h-4" />
                  </div>
                </Link>
                <Link href="https://twitter.com/FiReLScar">
                  <div className="flex flex-row justify-center items-center gap-4 2xl:text-2xl text-lg font-bold bg-sky-500 rounded-full px-8 py-2 text-stone-200">
                    <span>
                      Twitter
                    </span>
                    <img src="/twitter.svg" alt="" className="w-6 h-6" />
                  </div>
                </Link>
                <Link href="https://discord.com/users/382192202991796224">
                  <div className="flex flex-row justify-center items-center gap-4 2xl:text-2xl text-lg font-bold bg-indigo-700 rounded-full px-8 py-2 text-stone-200">
                    <span>
                      Discord
                    </span>
                    <img src="/discord.svg" alt="" className="w-6 h-6" />
                  </div>
                </Link>
                <Link href="https://youtube.com/@FiReLScar">
                  <div className="flex flex-row justify-center items-center gap-4 2xl:text-2xl text-lg font-bold bg-red-500 rounded-full px-8 py-2 text-stone-200">
                    <span>
                      YouTube
                    </span>
                    <img src="/youtube.png" alt="" className="w-6 h-6" />
                  </div>
                </Link>
                <Link href="https://twitch.tv/FiReLScar">
                  <div className="flex flex-row justify-center items-center gap-4 2xl:text-2xl text-lg font-bold bg-violet-800 rounded-full px-8 py-2 text-stone-200">
                    <span>
                      Twitch
                    </span>
                    <img src="/twitch.svg" alt="" className="w-6 h-6" />
                  </div>
                </Link>
              </div>
            </div>
            <div className="h-full rounded-full bg-stone-100 lg:block hidden" style={{width: '2px'}}>&nbsp;</div>
              <div className="flex lg:w-full h-full flex-col lg:gap-8 gap-4">
                <span className="text-2xl 2xl:text-3xl font-black text-stone-700">Contact Me:</span>
                <div className="flex flex-col gap-4 transition-opacity duration-500" id="form-email">
                  <input type="email" placeholder="johnd@business.org" className="bg-stone-100 rounded-lg py-2 px-4 text-gray-800 outline-none" id="email-email" />
                  <textarea placeholder="Your message" className="bg-stone-100 rounded-lg py-2 px-4 text-gray-800 outline-none lg:h-48 h-24" id="message-email" />
                  <button className="bg-stone-800 rounded-lg py-2 px-4 text-gray-200 outline-none mb-4 flex gap-2 justify-center" id="send-email">
                    Send
                  </button>
                </div>
                <div className="flex flex-row justify-center items-center gap-4 hidden opacity-0 transition-opacity duration-500" id="success-email">
                  <CheckCircleIcon className="w-8 h-8 text-green-500" />
                  <span className="text-2xl 2xl:text-3xl font-black text-green-500">Email sent!</span>
                </div>
                <div className="flex flex-col justify-center items-center gap-8 hidden opacity-0 transition-opacity duration-500" id="error-email">
                  <div className="flex flex-row gap-4">
                    <ExclamationTriangleIcon className="w-8 h-8 text-yellow-500" />
                    <span className="text-2xl 2xl:text-3xl font-black text-yellow-500">Error sending email!</span>
                  </div>
                  <button className="bg-stone-800 rounded-lg py-2 px-4 text-gray-200 outline-none mb-4 flex gap-2" id="retry-email">
                    Retry
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div className="lg:flex hidden flex-col h-screen gap-6 w-8 fixed right-4 top-0 justify-center items-center" id="pil">
        <div className="w-6 h-6 border-4 z-0 border-stone-600 rounded-full absolute" id="pia"></div>
        <div className="w-1.5 h-1.5 cursor-pointer z-10 bg-stone-600 rounded-full" id="pi1"></div>
        <div className="w-1.5 h-1.5 cursor-pointer z-10 bg-stone-600 rounded-full" id="pi2"></div>
        <div className="w-1.5 h-1.5 cursor-pointer z-10 bg-stone-600 rounded-full" id="pi3"></div>
        <div className="w-1.5 h-1.5 cursor-pointer z-10 bg-stone-600 rounded-full" id="pi4"></div>
      </div>
      <ArrowDownCircleIcon className="h-12 w-12 text-stone-700 cursor-pointer hover:animate-bounce fixed bottom-4 left-1/2 lg:block hidden" id="arrow" />
      <div className="fixed top-0 left-0 bg-stone-200 h-32 w-screen py-8 lg:px-32 px-8 opacity-0 transition-opacity duration-500 flex" id="levi">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 399.61 232.88" className="w-24 fill-stone-600">
          <path d="M23.72,39.85C13.16,75.61,5.13,112.47,1.04,149.55c-1.64,14.91-1.94,31.09,3.72,45.25,3.14,7.87,7.65,15.19,14.17,20.74s14.55,9.72,23,12.34c7.93,2.46,16.27,3.59,24.52,4.29,9.54,.81,19.13,.87,28.7,.47,18.92-.8,37.75-3.25,56.52-5.66,38.32-4.92,76.48-10.9,114.54-17.52,37.43-6.51,74.77-13.6,112.08-20.75,4.65-.89,9.3-1.78,13.95-2.67,5.15-.99,8.56-7.44,6.98-12.3-1.78-5.49-6.79-8.04-12.3-6.98-36.7,7.04-73.41,14.08-110.2,20.64-36.54,6.51-73.17,12.53-109.93,17.58-1.23,.17-2.47,.34-3.7,.51-.49,.07-.99,.12-1.48,.2,2.38-.37,.96-.13,.44-.06-2.47,.33-4.94,.66-7.41,.98-4.57,.59-9.14,1.17-13.71,1.73-9.28,1.14-18.56,2.24-27.87,3.09-9.18,.83-18.38,1.41-27.6,1.46-4.72,.03-9.45-.08-14.16-.36-2.24-.13-4.47-.3-6.7-.52-.88-.08-1.75-.18-2.63-.28-.49-.06-.98-.12-1.46-.18-1.92-.23,2.37,.36,.32,.04-3.52-.56-7.01-1.19-10.45-2.1-1.71-.45-3.4-.96-5.07-1.53-.92-.32-1.84-.65-2.74-1.01-.36-.14-.72-.3-1.08-.44,2.81,1.08,.84,.34,.26,.07-1.57-.73-3.11-1.53-4.6-2.42-.74-.44-1.47-.9-2.19-1.38-.4-.27-.79-.54-1.18-.82l-.46-.34c-.83-.63-.61-.46,.66,.51-.43-.57-1.22-1.01-1.76-1.5-.72-.65-1.41-1.32-2.08-2.02-.53-.55-1.04-1.12-1.54-1.7-.31-.36-.6-.73-.9-1.09-.77-.94,1.34,1.88,.38,.46s-1.86-2.75-2.66-4.21c-.44-.8-.86-1.62-1.26-2.45-.16-.33-.31-.67-.46-1-.86-1.87,.88,2.28,.16,.35-1.24-3.33-2.21-6.71-2.86-10.21-.14-.74-.25-1.49-.38-2.24-.34-2.02,.24,2.07,.09,.68-.05-.47-.11-.95-.16-1.42-.19-1.82-.32-3.65-.4-5.48-.15-3.61-.1-7.22,.09-10.83s.53-7.4,.95-11.08c.09-.77,.18-1.53,.28-2.3,.07-.57,.45-3.95,.13-1.07,.25-2.3,.64-4.59,.97-6.87,1.32-9.03,2.83-18.04,4.52-27.01,3.36-17.82,7.44-35.51,12.23-53,1.19-4.34,2.43-8.67,3.7-12.99,1.48-5.02-1.79-11.12-6.98-12.3s-10.72,1.61-12.3,6.98h0Z"/><path d="M54.2,93.74c-5.03,12.33-8.98,25.08-11.76,38.11-1.48,6.92-3.03,14.11-3.2,21.19-.2,7.95,2.19,15.83,7.83,21.6,4.72,4.82,11.34,7.95,17.98,8.93,4.1,.61,8.11,.83,12.24,.46s8.16-1.01,12.22-1.67c13.28-2.16,26.47-4.83,39.55-8,14.79-3.59,29.41-7.82,43.84-12.66,2.47-.83,4.63-2.3,5.98-4.6,1.25-2.14,1.79-5.3,1.01-7.71s-2.28-4.75-4.6-5.98-5.15-1.87-7.71-1.01c-22.62,7.6-45.75,13.68-69.19,18.16-6.61,1.26-13.25,2.47-19.91,3.39l2.66-.36c-4.46,.59-8.94,.91-13.42,.33l2.66,.36c-2.33-.34-4.58-.92-6.75-1.82l2.39,1.01c-1.74-.75-3.36-1.67-4.87-2.81l2.02,1.56c-1.17-.92-2.23-1.95-3.16-3.12l1.56,2.02c-.88-1.15-1.59-2.36-2.16-3.69l1.01,2.39c-.63-1.55-1.04-3.15-1.29-4.81l.36,2.66c-.42-3.26-.22-6.53,.2-9.77l-.36,2.66c2.38-17.63,7.46-35.06,14.17-51.51,.91-2.24,.15-5.72-1.01-7.71s-3.59-4.05-5.98-4.6c-2.56-.58-5.43-.46-7.71,1.01l-2.02,1.56c-1.24,1.25-2.1,2.72-2.57,4.41h0Z"/><path d="M56.53,138.4c12.6,1.06,25.69-.79,37.5-5.32,2.5-.96,4.58-2.21,5.98-4.6,1.25-2.14,1.79-5.3,1.01-7.71s-2.28-4.75-4.6-5.98-5.23-1.96-7.71-1.01c-5.75,2.21-11.72,3.73-17.82,4.56l2.66-.36c-5.65,.74-11.34,.88-17.02,.4-2.43-.2-5.4,1.26-7.07,2.93s-3.04,4.58-2.93,7.07,.97,5.27,2.93,7.07,4.3,2.7,7.07,2.93h0Z"/><path d="M63.27,102.64l75.85-4.4,21.46-1.24-8.63-15.05c-3.07,6.8-4.86,13.63-5.37,21.1-.45,6.5,.34,13.24,2.06,19.52,3.69,13.48,12.17,25.7,24.09,33.15,6.6,4.13,14.88,6.82,22.73,6.15,4.49-.39,8.28-1.41,12.4-3.18,3.14-1.35,5.83-3.28,8.5-5.39,5.04-3.99,9.13-9.33,12.28-14.9,3.42-6.05,5.88-12.68,7.56-19.41,4.34-17.41,4.14-35.93-.65-53.23-.67-2.43-2.42-4.7-4.6-5.98s-5.3-1.79-7.71-1.01c-5.15,1.67-8.48,6.9-6.98,12.3,1.15,4.15,2.01,8.37,2.6,12.64l-.36-2.66c1.1,8.4,1.09,16.9-.03,25.3l.36-2.66c-.98,7.07-2.65,14.12-5.4,20.72l1.01-2.39c-1.85,4.39-4.18,8.56-7.09,12.34l1.56-2.02c-1.97,2.52-4.18,4.82-6.69,6.79l2.02-1.56c-2,1.54-4.15,2.84-6.48,3.83l2.39-1.01c-2.03,.83-4.13,1.41-6.3,1.7l2.66-.36c-2.09,.26-4.17,.25-6.26,0l2.66,.36c-2.55-.35-5.02-1.04-7.4-2.02l2.39,1.01c-3.04-1.29-5.85-2.99-8.46-5l2.02,1.56c-2.87-2.26-5.43-4.86-7.68-7.74l1.56,2.02c-2.5-3.26-4.56-6.81-6.19-10.58l1.01,2.39c-1.79-4.24-3-8.68-3.63-13.24l.36,2.66c-.58-4.44-.59-8.92,0-13.35l-.36,2.66c.57-4.07,1.64-8.03,3.24-11.82l-1.01,2.39c.14-.33,.29-.66,.44-1,.9-1.56,1.36-3.24,1.37-5.05,0-1.81-.46-3.49-1.37-5.05-1.7-2.91-5.18-5.15-8.63-4.95l-75.85,4.4-21.46,1.24c-2.65,.15-5.15,1.01-7.07,2.93-1.73,1.73-3.04,4.58-2.93,7.07s.97,5.27,2.93,7.07,4.42,3.08,7.07,2.93h0Z"/><path d="M227.09,76.66c19.48,.09,38.95-1.13,58.27-3.67,1.38,.05,2.66-.24,3.85-.86,1.24-.4,2.31-1.09,3.22-2.07,1.73-1.73,3.04-4.58,2.93-7.07s-.97-5.27-2.93-7.07c-1.81-1.66-4.52-3.26-7.07-2.93-19.32,2.53-38.79,3.76-58.27,3.67-5.23-.02-10.24,4.62-10,10s4.39,9.97,10,10h0Z"/><path d="M278.04,60.44c-4.28,20.62-5.92,41.84-4.48,62.86,.45,6.49,1.22,12.94,2.15,19.37,.33,2.3,2.69,4.86,4.6,5.98,2.14,1.25,5.3,1.79,7.71,1.01s4.75-2.28,5.98-4.6l1.01-2.39c.48-1.77,.48-3.54,0-5.32-.11-.79-.23-1.59-.33-2.38l.36,2.66c-2.62-19.54-2.61-39.37-.01-58.91l-.36,2.66c.71-5.24,1.6-10.45,2.67-15.62,.55-2.64,.39-5.32-1.01-7.71-1.21-2.07-3.59-4.05-5.98-4.6-2.56-.58-5.43-.46-7.71,1.01-2.11,1.36-4.07,3.43-4.6,5.98h0Z"/><path d="M268.51,2.84c-3.32,2.96-6.72,6.31-8.72,10.33-2.86,5.75-3.39,11.88-.87,17.85,2.06,4.89,6.06,9.2,10.85,11.55,5.16,2.53,10.77,3.5,16.5,3.38,10.81-.23,22.8-2.15,29.24-11.84,1.74-2.62,2.81-6.2,2.66-9.36-.2-4.24-1.96-7.96-4.86-11.03-1.79-1.89-4.04-3.43-6.22-4.85-1.64-1.08-3.37-2.03-5.15-2.85-2.68-1.24-5.45-2.38-8.29-3.2s-5.84-1.26-8.83-1.63c-5.22-.65-10.45-.23-15.6,.77-2.35,.45-4.8,2.59-5.98,4.6-1.25,2.14-1.79,5.3-1.01,7.71s2.28,4.75,4.6,5.98c2.48,1.31,4.94,1.54,7.71,1.01,.8-.15,1.6-.29,2.41-.4l-2.66,.36c3.64-.47,7.3-.44,10.94,.04l-2.66-.36c3.63,.52,7.17,1.5,10.55,2.92l-2.39-1.01c3.11,1.34,6.04,3.04,8.73,5.1l-2.02-1.56c.81,.64,1.56,1.32,2.23,2.11l-1.56-2.02c.39,.51,.71,1.02,.99,1.6l-1.01-2.39c.19,.47,.32,.93,.4,1.43l-.36-2.66c.05,.49,.05,.95,0,1.44l.36-2.66c-.09,.61-.25,1.18-.47,1.75l1.01-2.39c-.31,.7-.68,1.33-1.12,1.94l1.56-2.02c-.63,.8-1.34,1.5-2.14,2.13l2.02-1.56c-1.11,.81-2.29,1.45-3.56,1.99l2.39-1.01c-2.19,.87-4.48,1.36-6.8,1.69l2.66-.36c-4.32,.57-8.77,.91-13.11,.36l2.66,.36c-1.88-.27-3.7-.72-5.46-1.45l2.39,1.01c-1.23-.55-2.36-1.23-3.43-2.05l2.02,1.56c-.95-.77-1.79-1.61-2.54-2.58l1.56,2.02c-.57-.77-1.05-1.57-1.45-2.44l1.01,2.39c-.37-.88-.62-1.76-.77-2.7l.36,2.66c-.1-.86-.1-1.69-.01-2.55l-.36,2.66c.14-.99,.4-1.92,.77-2.85l-1.01,2.39c.55-1.28,1.27-2.45,2.1-3.56l-1.56,2.02c1.6-2.06,3.5-3.85,5.44-5.58s2.93-4.66,2.93-7.07-1.09-5.38-2.93-7.07c-4.18-3.84-9.96-3.72-14.14,0h0Z"/>
        </svg>
      </div>
    </>
  )
}

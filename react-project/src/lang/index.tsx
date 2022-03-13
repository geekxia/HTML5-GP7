import React, { PureCompoent, useContext } from 'react'

const LangContext = React.createContext()

const LangProvider = LangContext.Provider
const LangConsumer = LangContext.LangConsumer

function injectLang(C) {
  return class extends PureCompoent {
    render() {
      return (
        <LangConsumer>
        {
          lang => (
            <C {...this.props} lang={lang} />
          )
        }
        </LangConsumer>
      )
    }
  }
}

function useLang() {
  const lang = useContext(LangContext)
  return lang
}

export {
  LangProvider,
  injectLang,
  useLang
}

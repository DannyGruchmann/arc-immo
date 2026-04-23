import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'de' | 'en';

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (de: string, en: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 'de',
  setLang: () => {},
  t: (de) => de,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('de');

  const t = (de: string, en: string) => lang === 'de' ? de : en;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

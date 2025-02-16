import { useTranslation } from 'react-i18next'

const languages = [
  { 
    code: 'pt', 
    flag: 'https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/br.svg',
    name: 'Português'
  },
  { 
    code: 'en', 
    flag: 'https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/us.svg',
    name: 'English'
  },
  { 
    code: 'es', 
    flag: 'https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/es.svg',
    name: 'Español'
  },
  { 
    code: 'fr', 
    flag: 'https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/fr.svg',
    name: 'Français'
  },
  { 
    code: 'de', 
    flag: 'https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/de.svg',
    name: 'Deutsch'
  }
]

export function LanguageSelector() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('language', lng)
  }

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  return (
    <div className="fixed top-4 right-16 flex items-center">
      <div className="relative group">
        <button
          className="flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden"
          aria-label={`Current language: ${currentLanguage.name}`}
        >
          <img 
            src={currentLanguage.flag} 
            alt={currentLanguage.name}
            className="w-8 h-6 object-cover"
          />
        </button>
        
        <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2 grid gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-8 h-6 rounded overflow-hidden hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600 ${
                i18n.language === lang.code ? 'ring-2 ring-blue-500' : ''
              }`}
              aria-label={lang.name}
            >
              <img 
                src={lang.flag} 
                alt={lang.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

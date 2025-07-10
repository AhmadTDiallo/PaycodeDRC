import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={language === 'fr' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('fr')}
        className="px-3 py-1 text-sm font-medium"
      >
        FR
      </Button>
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="px-3 py-1 text-sm font-medium"
      >
        EN
      </Button>
    </div>
  );
}
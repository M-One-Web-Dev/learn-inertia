import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/components/theme/theme-provider';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    // Function to toggle theme between "dark" and "light"
    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            title={`Current theme: ${theme}. Click to switch.`}
        >
            <Sun
                className={`h-[1.2rem] w-[1.2rem] transition-all ${
                    theme === 'light'
                        ? 'rotate-0 scale-100'
                        : '-rotate-90 scale-0'
                }`}
            />
            <Moon
                className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
                    theme === 'dark'
                        ? 'rotate-0 scale-100'
                        : 'rotate-90 scale-0'
                }`}
            />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}

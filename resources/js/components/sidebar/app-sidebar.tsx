import {
    AudioWaveform,
    BookOpen,
    Bot,
    GalleryVerticalEnd,
    Settings2,
    SquareTerminal,
} from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/sidebar/nav-main';
import { NavUser } from '@/components/sidebar/nav-user';
import { TeamSwitcher } from '@/components/sidebar/team-switcher';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    teams: [
        {
            name: 'Backoffice',
            logo: GalleryVerticalEnd,
            plan: 'Dashboard Page for Admin',
        },
        {
            name: 'Frontpage',
            logo: AudioWaveform,
            plan: 'Page for Users',
        },
    ],
    navMain: [
        {
            title: 'Users',
            url: '#',
            icon: Bot,
            items: [
                {
                    title: 'User',
                    url: '#',
                },
                {
                    title: 'Bot',
                    url: '#',
                },
            ],
        },
        {
            title: 'Programming',
            url: '#',
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: 'Languange',
                    url: '#',
                },
                {
                    title: 'Database',
                    url: '#',
                },
                {
                    title: 'Framework',
                    url: '#',
                },
            ],
        },

        {
            title: 'Crypto Currency',
            url: '#',
            icon: BookOpen,
            items: [
                {
                    title: 'Currency',
                    url: '#',
                },
            ],
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: 'General',
                    url: '#',
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}

import {
    AudioWaveform,
    GalleryVerticalEnd,
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
            title: 'Programming',
            url: '#',
            icon: SquareTerminal,
            // isActive: true,
            items: [
                {
                    title: 'Languange',
                    url: '/dashboard/languange',
                },

                {
                    title: 'Framework',
                    url: '/dashboard/framework',
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

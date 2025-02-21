import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import OCC_LOGO from '../../images/OCC_LOGO.png'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

export function TeamSwitcher({ teams }) {
    const { isMobile } = useSidebar();
    const [activeTeam, setActiveTeam] = React.useState(teams[0]);

    return (
        <SidebarMenuButton
            size="lg"
            className="hover:bg-transparent cursor-auto active:bg-transparent"
        >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                <img src={OCC_LOGO} alt="illustration" className="illustration" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                    OCC
                </span>
                <span className="truncate text-xs">Opol Community College</span>
            </div>
        </SidebarMenuButton>
    );
}
import { usePage } from "@inertiajs/react";
import { CalendarRange, BookOpen, User, Presentation } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain() {
    const { user } = usePage().props.auth;
    const currentUrl = usePage().url;

    // Define menu items based on user role
    const menuItems = [
        ...(user.user_role === "registrar" || user.user_role === "program_head"
            ? [{ name: "School Year", route: "dashboard", icon: CalendarRange }]
            : []
        ),
        ...(user.user_role === "program_head"
            ? [
                { name: "Courses", route: "dashboard", icon: BookOpen },
                { name: "Faculty List", route: "dashboard", icon: User },
            ]
            : []
        ),  
        ...(["registrar", "program_head", "evaluator", "faculty"].includes(user.user_role)
            ? [{ name: "Classes", route: "dashboard", icon: Presentation }]
            : []
        ),
    ];
    
    return (
        <SidebarGroup>
            <SidebarMenu>
                {menuItems.map((item, index) => (
                    <SidebarMenuItem key={index}>
                        <SidebarMenuButton
                            tooltip={item.name}
                            className={cn("h-10 text-md", currentUrl.startsWith(`/${item.route}`) && "bg-sidebar-accent text-sidebar-accent-foreground")}
                            asChild
                        >
                            <Link href={route(item.route)} className="w-full flex items-center">
                                <item.icon className="mr-2" /> {/* Render the icon dynamically */}
                                <span>{item.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

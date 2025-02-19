import { usePage } from "@inertiajs/react";
import { LayoutDashboard, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils"; // Ensure you have a utility for class merging
import { Link } from "@inertiajs/react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
    const { user, courses } = usePage().props.auth;
    const currentUrl = usePage().url; // Get the current route

    return (
        <SidebarGroup>
            {(user.user_role == "registrar" || user.user_role == "evaluator" || user.user_role == "program_head") && (
                <>
                    <SidebarGroupLabel>Enrollment</SidebarGroupLabel>
                    <SidebarMenu>
                        {courses.map((course) => {
                            const courseUrl = route("enrollment.view", course.hashed_course_id);
                            const isActive = currentUrl === `/enrollment/${course.hashed_course_id}`; // Compare current route

                            return (
                                <SidebarMenuItem key={course.hashed_course_id}>
                                    <SidebarMenuButton
                                        tooltip={course.course_name_abbreviation}
                                        className={cn("h-10 text-md", isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}
                                        asChild
                                    >
                                        <Link href={courseUrl} className="w-full flex items-center">
                                            <BookOpen />
                                            <span>{course.course_name_abbreviation}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                        {/* Dashboard */}
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip="Dashboard"
                                className={cn("h-10 text-md", currentUrl === "/dashboard" && "bg-sidebar-accent text-sidebar-accent-foreground")}
                                asChild
                            >
                                <Link
                                    href={route("dashboard")}
                                    className="w-full flex items-center">
                                    <LayoutDashboard />
                                    <span>Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </>
            )}
        </SidebarGroup>
    );
}

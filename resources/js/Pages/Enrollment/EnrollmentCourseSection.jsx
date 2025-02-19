import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react"; // Import Inertia's hook
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { BellRing } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function EnrollmentCourseSection() {
    const { yearLevels } = usePage().props;
    const user = usePage().props.auth.user;

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {yearLevels && yearLevels.length > 0 ? (
                    yearLevels.map((yearLevel) => (
                        <Card key={yearLevel.id} className={cn("w-full")}>
                            <div className="flex justify-between items-center mb-2">
                                <CardHeader className="px-6 mt-4">
                                    <CardTitle className="text-2xl">{yearLevel.year_level_name}</CardTitle>
                                </CardHeader>
                                {user.userRole != 'registrar' &&
                                    <CardHeader className="px-6 mt-4">
                                        <Button
                                            onClick={() => { createNewSection(yearLevel.id) }}>
                                            Add Section
                                        </Button>
                                    </CardHeader>
                                }
                            </div>
                            <CardContent className="grid gap-4">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-min">Section</TableHead>
                                            <TableHead className="w-max">Students</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {yearLevel.year_section.map((section, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">{section.section}</TableCell>
                                                <TableCell
                                                    className={`p-2 ${section.student_count > section.max_students
                                                        ? "text-red-600 font-bold" // Overload
                                                        : section.student_count === section.max_students
                                                            ? "text-green-600 font-bold" // Complete
                                                            : section.student_count + 5 >= section.max_students
                                                                && "text-orange-400 font-bold" // Almost complete (87.5% or higher)
                                                        }`}
                                                >
                                                    {section.student_count}/{section.max_students}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="link">Class</Button>
                                                    <Button variant="link">Students</Button>
                                                    <Button variant="link">Enroll Student</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-gray-500">No year levels found.</p>
                )}
            </div>
        </div>
    );
}

EnrollmentCourseSection.layout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;

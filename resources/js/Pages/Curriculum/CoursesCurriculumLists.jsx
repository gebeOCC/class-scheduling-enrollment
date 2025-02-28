import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/Components/ui/button';
import PreLoader from '@/Components/preloader/PreLoader';
import { Head } from '@inertiajs/react';
import { Eye, SquarePlus } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function CoursesCurriculumLists() {
    const [coursesCurriculums, setCoursesCurriculums] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [currActiveOpen, setCurrActiveOpen] = useState(false)

    const [selectedCourse, serSelectedCourse] = useState({
        courseId: 0,
        course_name: '',
        course_name_abb: ''
    })

    useEffect(() => {
        axios.post(route('courses.curriculum.list'))
            .then(response => {
                setCoursesCurriculums(response.data);
            })
            .finally(() => {
                setFetching(false);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const handleAddCurriculum = (courseId) => {
        alert(`Add Curriculum for Course ID: ${courseId}`);
        // Implement your add curriculum logic here
    };

    const handleActiveCurriculum = (courseId) => {
        alert(`Active Curriculum for Course ID: ${courseId}`);
        // Implement your active curriculum logic here
    };

    const openActiveCurriculum = (courseId, course_name, course_name_abb) => {
        serSelectedCourse({
            courseId: courseId,
            course_name: course_name,
            course_name_abb: course_name_abb
        })
        setCurrActiveOpen(true)
    }

    if (fetching) return <PreLoader title="Curriculum List" />;

    return (
        <>
            <Head title="Curriculum List" />
            {coursesCurriculums.length === 0 ? (
                <p className="text-gray-500">No courses available.</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {coursesCurriculums.map((course) => (
                        <Card key={course.id}>
                            <CardHeader className="mb-2">
                                <CardTitle>{course.course_name} ({course.course_name_abbreviation})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-60 overflow-y-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>School Year</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {course.curriculum.length === 0 ? (
                                                <TableRow>
                                                    <TableCell className="text-center text-gray-500" colSpan={2}>
                                                        No curriculums available.
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                course.curriculum.map((curriculum) => (
                                                    <TableRow key={curriculum.id}>
                                                        <TableCell>
                                                            {curriculum.school_year_start} - {curriculum.school_year_end}
                                                        </TableCell>
                                                        <TableCell>
                                                            <a
                                                                href={`/curriculum/${course.hashed_course_id}/${curriculum.school_year_start}-${curriculum.school_year_end}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <Button variant="link" size="sm">Open</Button>
                                                            </a>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex justify-end gap-2 mb-2">
                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() => openActiveCurriculum(course.id)}>
                                        Add Curriculum
                                        <SquarePlus className="w-5 h-5" />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => openActiveCurriculum(course.id, course.course_name, course.course_name_abbreviation)}>
                                        Active Curriculum
                                        <Eye className="w-5 h-5" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
            <AlertDialog open={currActiveOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Active Curriculum</AlertDialogTitle>
                        <AlertDialogDescription>
                            {selectedCourse.course_name} ({selectedCourse.course_name_abb})
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Year Level</TableHead>
                                <TableHead>School Year</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>First Year</TableCell>
                                <Select>
                                    <SelectTrigger className="w-1/2 border-0 focus:ring-0">
                                        <SelectValue placeholder="School Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="est">2019-2020</SelectItem>
                                        <SelectItem value="cst">2023-2024</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableRow>
                            <TableRow>
                                <TableCell>Second Year</TableCell>
                                <Select>
                                    <SelectTrigger className="w-1/2 border-0 focus:ring-0">
                                        <SelectValue placeholder="School Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="est">2019-2020</SelectItem>
                                        <SelectItem value="cst">2023-2024</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableRow>
                            <TableRow>
                                <TableCell>Third Year</TableCell>
                                <Select>
                                    <SelectTrigger className="w-1/2 border-0 focus:ring-0">
                                        <SelectValue placeholder="School Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="est">2019-2020</SelectItem>
                                        <SelectItem value="cst">2023-2024</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableRow>
                            <TableRow>
                                <TableCell>Fourth Year</TableCell>
                                <Select>
                                    <SelectTrigger className="w-1/2 border-0 focus:ring-0">
                                        <SelectValue placeholder="School Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="est">2019-2020</SelectItem>
                                        <SelectItem value="cst">2023-2024</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setCurrActiveOpen(false)}>Done</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

CoursesCurriculumLists.layout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;

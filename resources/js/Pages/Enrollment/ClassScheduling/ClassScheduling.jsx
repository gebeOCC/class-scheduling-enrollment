import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pencil,
    Trash
} from 'lucide-react';
import axios from 'axios';
import PreLoader from '@/Components/preloader/PreLoader';
import { convertToAMPM, formatFullName } from '@/utilities/utils';
import { Head, usePage, useForm } from '@inertiajs/react';

export default function ClassScheduling() {
    const [fetching, setFetching] = useState(true);
    const { yearSectionId, courseName, yearlevel, section } = usePage().props;

    const [classes, setClasses] = useState([])

    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm({
        id: 0,
        year_section_id: yearSectionId,
        faculty_id: 0,
        room_id: 0,
        subject_id: 0,
        class_code: 0,
        day: "Monday",
        start_time: '7:30',
        end_time: '10:30',
    });

    const getCLasses = async () => {
        console.log('helloo')
        await axios.post('/api/enrollment/get-classes', {
            yearSectionId: yearSectionId,
        })
            .then(response => {
                setClasses(response.data.classes)
            })
            .finally(() => {
                setFetching(false)
            })
    }

    useEffect(() => {
        getCLasses()
    }, [])

    if (fetching) return <PreLoader title="Class" />

    return (
        <>
            <Head title="Class" />
            <Card className="">
                <CardHeader className="px-6 mt-4">
                    <CardTitle className="text-4xl font-bold" >{courseName} - {yearlevel}{section}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {/* <TableHead>Class Code</TableHead> */}
                                <TableHead className="w-28">Subject Code</TableHead>
                                <TableHead>Descriptive Title</TableHead>
                                <TableHead className="w-12">Day</TableHead>
                                <TableHead className="w-40">Time</TableHead>
                                <TableHead className="w-14">Room</TableHead>
                                <TableHead className="w-32">Instructor</TableHead>
                                <TableHead className="w-12"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {classes.map((classInfo) => (
                                <>
                                    <TableRow>
                                        {/* <TableCell className="font-medium">{classInfo.class_code}</TableCell> */}
                                        <TableCell>{classInfo.subject.subject_code}</TableCell>
                                        <TableCell className="">{classInfo.subject.descriptive_title}</TableCell>
                                        <TableCell>{classInfo.day}</TableCell>
                                        <TableCell>
                                            {classInfo.start_time !== "TBA"
                                                ? convertToAMPM(classInfo.start_time) + ' - ' + convertToAMPM(classInfo.end_time)
                                                : "TBA"}
                                        </TableCell>
                                        <TableCell>
                                            {classInfo.room != null ? (
                                                classInfo.room.room_name
                                            ) : (
                                                <>TBA</>
                                            )}
                                        </TableCell>
                                        <TableCell className="truncate max-w-32 overflow-hidden whitespace-nowrap">
                                            {classInfo.instructor != null ? (
                                                <>{formatFullName(classInfo.instructor.instructor_info)}</>
                                            ) : (
                                                <>TBA</>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-start space-x-1 h-full ">
                                                <Pencil size={15} className='cursor-pointer text-green-400' />
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                    {classInfo.secondary_schedule &&
                                        <TableRow>
                                            {/* <TableCell className="font-medium">{classInfo.class_code}</TableCell> */}
                                            <TableCell>{classInfo.subject.subject_code}</TableCell>
                                            <TableCell className="">{classInfo.subject.descriptive_title}</TableCell>
                                            <TableCell>{classInfo.secondary_schedule.day}</TableCell>
                                            <TableCell>
                                                {classInfo.secondary_schedule.start_time !== "TBA"
                                                    ? convertToAMPM(classInfo.secondary_schedule.start_time) + ' - ' + convertToAMPM(classInfo.secondary_schedule.end_time)
                                                    : "TBA"}
                                            </TableCell>
                                            <TableCell>
                                                {classInfo.secondary_schedule.room != null ? (
                                                    classInfo.secondary_schedule.room.room_name
                                                ) : (
                                                    <>TBA</>
                                                )}
                                            </TableCell>
                                            <TableCell className="truncate max-w-32 overflow-hidden whitespace-nowrap">
                                                {classInfo.instructor != null ? (
                                                    <>{formatFullName(classInfo.instructor.instructor_info)}</>
                                                ) : (
                                                    <>TBA</>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex justify-evenly space-x-1 h-full ">
                                                    <Pencil size={15} className='cursor-pointer text-green-400' />
                                                    <Trash size={15} className='cursor-pointer text-red-400' />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    }
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}

ClassScheduling.layout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;
import React from 'react'
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

export default function ClassScheduling() {
    return (
        <>
            <Card className="">
                <CardHeader className="px-6 mt-4">
                    <CardTitle className="text-4xl font-bold">BSIT - 1A</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Class Code</TableHead>
                                <TableHead>Subject Code</TableHead>
                                <TableHead>Descriptive Title</TableHead>
                                <TableHead>Day</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Room</TableHead>
                                <TableHead>Instructor</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">1AIT-1</TableCell>
                                <TableCell>IT104</TableCell>
                                <TableCell>Programming 2</TableCell>
                                <TableCell>Monday</TableCell>
                                <TableCell>7:30 AM - 10:30 AM</TableCell>
                                <TableCell>CL1-A</TableCell>
                                <TableCell>Daculan, Novelyn Joy</TableCell>
                                <TableCell>
                                    <div className="flex justify-evenly space-x-1 h-full ">
                                        <Pencil size={15} className='cursor-pointer text-green-400' />
                                        <Trash size={15} className='cursor-pointer text-red-400' />
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}

ClassScheduling.layout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;
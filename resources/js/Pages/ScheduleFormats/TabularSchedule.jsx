import React from "react";
import { convertToAMPM, formatFullName } from "../../utilities/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
function TabularSchedule({ data }) {
    const sortSchedule = (data) => {
        const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        return data.sort((a, b) => {
            const getRank = (day) => {
                if (day === "TBA") return 11;
                const daysArray = day.split(",");
                if (daysArray.length > 1) return 10; // Consecutive/Alternating days

                return dayOrder.indexOf(day) !== -1 ? dayOrder.indexOf(day) : 9; // Single days first
            };

            return getRank(a.day) - getRank(b.day);
        });
    };

    const sortedData = sortSchedule(data);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Class Code</TableHead>
                    <TableHead>Descriptive Title</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Instructor</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sortedData.length > 0 ? (
                    sortedData.map((sched, index) => (
                        <TableRow key={`sched-${index}`}>
                            <TableCell className="w-32 max-w-28">{sched.class_code}</TableCell>
                            <TableCell>{sched.descriptive_title}</TableCell>
                            <TableCell className="w-32 max-w-36">{sched.day}</TableCell>
                            <TableCell className="w-48 max-w-48">
                                {sched.start_time === "TBA" ? "TBA" : `${convertToAMPM(sched.start_time)} - ${convertToAMPM(sched.end_time)}`}
                            </TableCell>
                            <TableCell className="w-48 truncate max-w-48 overflow-hidden whitespace-nowrap">
                                {sched.first_name ? formatFullName(sched) : "TBA"}
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                            No schedules available.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>

    )
}

export default TabularSchedule

import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ClassScheduling() {
    return (
        <>
            <Card className="w-[350px]">
                <CardHeader className="px-6 mt-4">
                    <CardTitle className="text-4xl font-bold">BSIT - 1A</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Name of your project" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="framework">Framework</Label>

                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Deploy</Button>
                </CardFooter>
            </Card>
        </>
    )
}


ClassScheduling.layout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;
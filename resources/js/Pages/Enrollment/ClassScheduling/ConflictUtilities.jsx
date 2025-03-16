import { hasTimeConflict24Hours, identifyDayType } from "@/utilities/utils"


export function singleAndSingle(editingSchedule, schedule) {
    if (schedule.day == 'TBA' || schedule.start_time == 'TBA') return

    if (editingSchedule.day == schedule.day) {
        // console.log(`1start: ${editingSchedule.start_time} 1end: ${editingSchedule.end_time}`)
        // console.log(`2start: ${schedule.start_time} 2end: ${schedule.end_time}`)
        // console.log(hasTimeConflict24Hours(editingSchedule.start_time, editingSchedule.end_time, schedule.start_time, schedule.end_time))
        // console.log('==========')
        return hasTimeConflict24Hours(editingSchedule.start_time, editingSchedule.end_time, schedule.start_time, schedule.end_time)
    } else {
        return false
    }
}

export function singleAndConsecutive(editingSchedule, schedule) {
    console.log('singleAndConsecutive')
}


export function singleAndAlternating(editingSchedule, schedule) {
    console.log('singleAndAlternating')
}


export function consecutiveAndSingle(editingSchedule, schedule) {
    console.log('consecutiveAndSingle')
}


export function consecutiveAndConsecutive(editingSchedule, schedule) {
    console.log('consecutiveAndConsecutive')
}


export function consecutiveAndAlternating(editingSchedule, schedule) {
    console.log('consecutiveAndAlternating')
}


export function alternatingAndSingle(editingSchedule, schedule) {
    console.log('alternatingAndSingle')
}


export function alternatingAndConsecutive(editingSchedule, schedule) {
    console.log('alternatingAndConsecutive')
}


export function alternatingAndAlternating(editingSchedule, schedule) {
    console.log('alternatingAndAlternating')
}

export const detectMainScheduleConflict = (editingSchedule, cls) => {
    if (editingSchedule.day == 'TBA' || editingSchedule.start_time == 'TBA') return

    if (identifyDayType(editingSchedule.day) == 'Single' && identifyDayType(cls.day) == 'Single') {
        return singleAndSingle(editingSchedule, cls)
    } else if (identifyDayType(editingSchedule.day) == 'Single' && identifyDayType(cls.day)) {
        singleAndConsecutive()

    } else if (identifyDayType(editingSchedule.day) == 'Single' && identifyDayType(cls.day)) {
        singleAndAlternating()

    } else if (identifyDayType(editingSchedule.day) == 'Consecutive' && identifyDayType(cls.day)) {
        consecutiveAndSingle()

    } else if (identifyDayType(editingSchedule.day) == 'Consecutive' && identifyDayType(cls.day)) {
        consecutiveAndConsecutive()

    } else if (identifyDayType(editingSchedule.day) == 'Consecutive' && identifyDayType(cls.day)) {
        consecutiveAndAlternating()

    } else if (identifyDayType(editingSchedule.day) == 'Alternating' && identifyDayType(cls.day)) {
        alternatingAndSingle()

    } else if (identifyDayType(editingSchedule.day) == 'Alternating' && identifyDayType(cls.day)) {
        alternatingAndConsecutive()

    } else if (identifyDayType(editingSchedule.day) == 'Alternating' && identifyDayType(cls.day)) {
        alternatingAndAlternating()

    }
}

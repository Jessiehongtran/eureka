export const PUBLISH_COURSE = 'PUBLISH_COURSE';

export const publishCourse = isPublished => {
    return {
        type: PUBLISH_COURSE,
        payload: isPublished
    }
}
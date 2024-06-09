exports.BaseApiResponse = (message, data) => ({
    message: message,
    data: data
});

exports.ApplicationUserResponse = (data) =>  ({
    id: data.id,
    status: data.status,
    project: {
        id: data.project_id,
        name: data.name,
        description: data.description
    }
})

exports.ApplicationOwnerResponse = (data) => ({
    id: data.id,
    status: data.status,
    role: data.role,
    project: {
        id: data.project_id,
        name: data.project_name
    },
    user: {
        id: data.user_id,
        name: data.user_name,
        email: data.email
    }
})

exports.ProjectDetailResponse = (projectData, userData, collaboratorsData) => ({
    name: projectData.name,
    description: projectData.description,
    status: projectData.status,
    progress: projectData.progress,
    started_at: projectData.started_at,
    ended_at: projectData.ended_at,
    owner: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        profile_pic: userData.profile_pic
    },
    collaborator: collaboratorsData
});

exports.RatingByUserResponse = (data) => ({
    id: data.rating_id,
    rating: data.rating,
    review: data.review,
    status: data.status,
    project: {
        id: data.project_id,
        name: data.project_name
    },
    user: {
        id: data.user_id,
        profile_pic: data.profile_pic,
        name: data.user_name,
        role: data.role
    }
})

exports.RatingForUserResponse = (data) => ({
    rating: data.rating,
    review: data.review,
    status: data.status,
    project: {
        id: data.project_id,
        name: data.project_name
    },
    reviewer: {
        id: data.user_id,
        profile_pic: data.profile_pic,
        name: data.user_name
    }
})
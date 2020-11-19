export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const UPDATE_CHOICE = 'UPDATE_CHOICE';

export const updateQuestion = newQuestion => {
    return {
        type: UPDATE_QUESTION,
        payload: newQuestion
    }
}

export const updateChoice = choiceToUpdate => {
    return {
        type: UPDATE_CHOICE,
        payload: choiceToUpdate
    }
}

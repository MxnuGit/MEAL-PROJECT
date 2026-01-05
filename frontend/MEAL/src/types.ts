export interface Recipe {
    USERS_username: string
    course: string
    people: string
    description: string
    difficulty: string
    isGlutenFree: boolean
    isLactoseFree: boolean
    isProteinRich: boolean
    isVegan: boolean
    name: string
    prep_time: number
    recipe_id: string
    recipe_image?: { type: "Buffer"; data: number[] } | string | null
}

export interface User {
    username: string
}

export interface Ingredient {
    name: string,
    quantity: number,
    unit: string
}

export interface Preparation {
    stepNumber: number
    stepDesc: string
}
export interface Recipe {
    USERS_username: string
    people: string
    course: string
    description: string
    difficulty: string
    isGlutenFree: boolean
    isLactoseFree: boolean
    isProteinRich: boolean
    isVegan: boolean
    name: string
    prep_time: number
    recipe_id: number
    recipe_image?: { type: "Buffer"; data: number[] } | string | null
}

export type PrepTimeFilter = "<=15" | "<=30" | "<=60" | ">60" | null
export interface Filters{
    course: string | null
    difficulty: string | null
    peopleMin: number
    prepTime: PrepTimeFilter
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
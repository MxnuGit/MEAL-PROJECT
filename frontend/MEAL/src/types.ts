export interface Recipe {
    recipe_id: number,
    name: string,
    ingredients: string[],
    author: string,
    description: string,
    difficulty: string,
    prep_time: number,
    course: string,
    stepNuber: number,
    stepDesc: string
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
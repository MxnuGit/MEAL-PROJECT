export interface Recipe {
    recipe_id: number,
    name: string,
    ingredients: string[],
    author: string,
    description: string,
    difficulty: string,
    prep_time: number,
    course: string
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
    step_number: number
    step_desc: string
}
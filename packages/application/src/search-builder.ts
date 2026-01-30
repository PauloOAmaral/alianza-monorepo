import { and, or } from 'drizzle-orm'

export class SearchBuilder {
    protected orConditions: any[] = []
    protected andConditions: any[] = []

    build() {
        const conditions = []

        if (this.orConditions.length > 0) {
            conditions.push(or(...this.orConditions))
        }

        if (this.andConditions.length > 0) {
            conditions.push(and(...this.andConditions))
        }

        if (conditions.length === 0) return undefined

        return and(...conditions)
    }
}
